var deepExtend = require('deep-extend');

// Module configuration. Public object is exposed to Front-end via options API
var globalConfig = global.opts.plugins && global.opts.plugins.browserSync ? global.opts.plugins.browserSync : {};
var config = {
    enabled: true,
    forceEnabled: false
};
// Overwriting base options
deepExtend(config, globalConfig);

var getKey = function(obj, key) {
    return key.split(".").reduce(function(o, x) {
        return (typeof o == "undefined" || o === null) ? o : o[x];
    }, obj);
};

// Turn of in non-development mode
if (global.MODE !== 'development' && !config.forceEnabled) config = false;

/*
 * Dynamically inject browser-sync script
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
var processRequest = function (req, res, next) {
    if (!config.enabled) {
        next();
        return;
    }

    if (
        req.specData &&
        req.specData.info.role !== 'navigation' && // Not navigation page
        req.specData.renderedHtml &&  // Is spec and has renderedHTML in req
        !(req.specData.info.plugins && req.specData.info.plugins.browserSync && !req.specData.info.plugins.browserSync.enabled) // Is not disabled per Spec
    ) {
        var host = req.headers.host.split(':')[0];
        var port = getKey(global.opts, 'plugins.browserSync.browserSync.port') || 3000;

        req.specData.renderedHtml += '<script async src="http://'+host+':'+port+'/browser-sync/browser-sync-client.2.5.2.js"></script>';

        next();
    } else {
        next();
    }
};

exports.process = processRequest;
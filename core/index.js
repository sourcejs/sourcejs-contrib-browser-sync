var path = require("path");
var browserSync = require("browser-sync");
var userDir = global.app.get('user');
var deepExtend = require('deep-extend');

var appLogLevel = global.commander.log.toLowerCase() || global.opts.core.common.defaultLogLevel.toLowerCase();
var logLevel = appLogLevel === 'info' ? 'silent' :  appLogLevel;

if (appLogLevel === 'trace') logLevel = 'debug';

var globalConfig = global.opts.plugins && global.opts.plugins.browserSync ? global.opts.plugins.browserSync : {};
var config = {
    enabled: true,
    forceEnabled: false,

    browserSync: {
        logLevel: logLevel,
        files: [
            'specs/**/index.+(src|src.html)',
            'specs/**/*.css',
            'specs/**/*.js'
        ],
        logSnippet: false,
        open: false
    }
};
// Overwriting base options
deepExtend(config, globalConfig);

// Turn of in non-development mode
if (global.MODE !== 'development' && !config.forceEnabled) config = false;

if (config.enabled) {
    // Preparing path relative to user folder
    config.browserSync.files = config.browserSync.files.map(function(item){
        return path.join(userDir, item);
    });

    browserSync(config.browserSync, function(){
        console.log('BrowserSync is running.');
    });
}
Browser Sync integration into SourceJS
===============

Run [browser-sync](http://www.browsersync.io) together with [SourceJS](http://sourcejs.com). Get instant web-page updates after changing Spec file or JS, CSS assets.

___

To install, run npm in `sourcejs/user` folder:

```
npm install sourcejs-contrib-browser-sync --save
```

Then restart SourceJS, plugin will be enabled on next engine start.

## Options

In `user/options.js` use `plugins.browserSync` object. Available options:

```
{
    enabled: true,
    forceEnabled: false,

    browserSync: {
        files: [
            'specs/**/index.+(src|src.html)',
            'specs/**/*.css',
            'specs/**/*.js'
        ],
        logSnippet: false,
        codeSync: false,
        open: false
    }
}
```

* `forceEnabled` - by default plugin is activated only for `development` environment, if you want to force run it in other modes, set this option to `true`
* `browserSync` - contains [configuration](http://www.browsersync.io/docs/options) passed to BrowserSync directly
* `browserSync.files` - paths to watch, relative to `sourcejs/user` folder

## TODO

* Check the path of changed files and update only specific Spec URL

___

Compatible with SourceJS v0.5.1+.

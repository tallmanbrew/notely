module.exports = {
    // entry points into the app
    entry: {
        // this will be output to app/bundle.js
        bundle: './app/manifest.js',
        // These are nodeJS require/import strings, and will be bundled if installed with npm to vendor.js
        vendor: ['angular', 'angular-ui-router', 'angular-loader']
    },
    // generate sourcemaps to aid debugging
    devtool: 'source-map',
    output: {
        path: __dirname + '/app',
        // output to same name as "entry" key
        filename: "[name].js"
    },
    module: {
        loaders: [
          // for any .js files (except in node_modules), run through babel-loader so you can write ES6+
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    }
};
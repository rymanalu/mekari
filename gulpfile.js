var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.copy('node_modules/admin-lte/bootstrap/fonts/*.*', 'public/fonts/');

    mix.scripts([
            '../../../node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js',
            '../../../node_modules/admin-lte/bootstrap/js/bootstrap.js',
            '../../../node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.min.js',
            '../../../node_modules/admin-lte/dist/js/app.js'
        ], 'public/js/admin-lte.js')
        .scripts('app.js', 'public/js/app.js');

    mix.styles([
        '../../../node_modules/admin-lte/bootstrap/css/bootstrap.css',
        '../../../node_modules/admin-lte/dist/css/AdminLTE.css',
        '../../../node_modules/admin-lte/dist/css/skins/skin-blue.css'
    ], 'public/css/admin-lte.css');

    mix.sass('app.scss');

    mix.version([
      'css/admin-lte.css',
      'css/app.css',
      'js/admin-lte.js',
      'js/app.js'
    ]);
});

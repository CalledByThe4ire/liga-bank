// Export

module.exports = {
  app: {
    name: 'Site',
    description: 'Description',
    domain: 'google.com',
  },

  use: {
    templates: '.pug',
    scripts: '.js',
    styles: '.scss',
  },

  build: {
    autoprefixer: ['last 3 versions', 'ie 11'],
    babel: true,

    sourcemaps: ['js', 'css'],
    imagemin: ['png', 'jpg'],

    pugMap: 'app/blocks/map.pug',
    globalStyles: [
      'node_modules/bootstrap/scss/_functions.scss',
      'node_modules/bootstrap/scss/_variables.scss',
      'app/blocks/develop/page/vendor/bootstrap/variables.scss',
      'node_modules/bootstrap/scss/mixins/_breakpoints.scss',
      'node_modules/bootstrap/scss/mixins/_grid.scss',
      'node_modules/bootstrap/scss/mixins/_image.scss',
      'node_modules/bootstrap/scss/mixins/_lists.scss',
      'app/blocks/develop/page/base/fonts.scss',
      'app/blocks/develop/page/base/common.scss',
      'app/blocks/develop/page/base/mixins.scss',
    ],
    HTMLRoot: './',
  },

  dist: {
    styles: 'styles',
    fonts: 'styles/fonts',
    img: 'styles/img',
    symbol: 'styles/img',
    scripts: 'scripts',
    static: 'static',
    favicons: 'favicons',
  },

  favicons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false,
  },

  addContent: {
    page:
      "extends ../blocks/common/template\n\nblock head\n\t- pageTitle = '';\n\nblock data\n\t-\n\t\tconst page = {\n\n\t\t\tpath: '[name]',\n\t\t\ttitle: '',\n\t\t\tdescription: '',\n\t\t\tattrs: []\n\n\t\t};\n\nblock content\n\n",
    pug:
      "mixin [name](data)\n\t+b('div').[name]&attributes(attributes)\n\t\tblock",
    scss: '.[name] {\n    display: block;\n}\n',
  },

  fastMake: {
    b: ['.scss', '.pug'],
  },
};

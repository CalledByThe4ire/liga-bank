module.exports = {
  modules: [
    {
      from: `node_modules/animate.css`,
      import: [`animate.min.css`],
    },
    {
      from: `node_modules/smooth-scroll`,
      inject: [`smooth-scroll.polyfills.min.js`],
    },
  ],
};

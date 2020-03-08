module.exports = {
  modules: [
    {
      from: `node_modules/animate.css`,
      import: [`animate.min.css`],
    },
    {
      from: `node_modules/smooth-scroll/dist`,
      inject: [`smooth-scroll.polyfills.min.js`],
    },
    {
      from: `app/blocks/develop/page`,
      import: [`helpers.js`],
    },
  ],
};

module.exports = {
  modules: [
    {
      from: `node_modules/imask/dist`,
      inject: [`imask.min.js`],
    },
    {
      from: `node_modules/input-range-scss`,
      import: [`_inputrange.scss`],
    },
    {
      from: `node_modules/animate.css`,
      import: [`animate.min.css`],
    },
  ],

};

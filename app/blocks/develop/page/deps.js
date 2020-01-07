module.exports = {
  nodes: [],

  modules: [
    {
      from: `node_modules/normalize.scss`,
      import: `normalize.scss`,
    },
    {
      from: `app/blocks/develop/page/base/`,
      import: `fonts.scss`,
    },
    {
      from: `app/blocks/develop/page/base/`,
      import: `common.scss`,
    },
  ],
};

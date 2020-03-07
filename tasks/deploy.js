"use strict";

// Deploy dist folder

module.exports = {
  name: "deploy",
  run(done) {
    return this.gulp
    .src("dist/**/*")
    .pipe(require("gulp-gh-pages")())
  }
};

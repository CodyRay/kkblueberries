const critical = require('critical');
const path = require('path');
const fs = require('fs');
const glob = require('glob-promise')
const _ = require('lodash')
const process = require('process');

fs.mkdirSync('./optimized')
fs.renameSync('./build', './optimized/kkblueberries')
process.chdir('./optimized')

glob('./**/*.html')
  .then((html_files) => {
    console.log(html_files);
    return _.reduce(html_files, ((promise, html) =>
      promise
        .then(() =>
          critical.generate({
            inline: true,
            base: process.cwd(),
            src: path.resolve(html),
            dest: path.resolve(path.dirname(html), path.basename(html, '.html') + '.critical.html'),
            minify: true,
            inlineImages: false,
          })
        )
        .catch((ex) => {
          console.log(ex);
        })
    ), Promise.resolve())
  })
  .then(() =>
    glob('./**/*.critical.html')
  )
  .then((html_files) => {
    _.forEach(html_files, (file) => {
      var original = path.resolve(path.dirname(file), path.basename(file, '.critical.html') + '.html')
      fs.unlinkSync(original)
      fs.renameSync(file, original)
    });
    process.chdir('..')
    fs.renameSync('./optimized/kkblueberries', './build')
    fs.rmdirSync('./optimized')
  })
  .catch((ex) => {
    console.log(ex);
  })
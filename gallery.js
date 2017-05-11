process.env['VIPS_WARNING'] = 0 // https://github.com/lovell/sharp/issues/657
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const sharp = require('sharp');
const smartcrop = require('smartcrop-sharp')
const directory = process.argv[2];
const galleryFile = path.join(directory, path.basename(directory) + '.yml');
const jsFile = path.join(directory, path.basename(directory) + '.js');

if (!directory) {
  throw new Error('Please provide the directory containing the images and the directory.yml file');
}

// If the file doesn't exist it provides a nice enough message
const gallery = yaml.safeLoad(fs.readFileSync(galleryFile, 'utf8'));

if (!gallery.photos) {
  throw new Error(galleryFile + ' must have a photos list');
}

gallery.photos.forEach((p) => {
  if (!fs.existsSync(path.join(directory, p.file))) {
    throw new Error(p.file + " doesn't seem to exist ");
  }
});

fs.readdir(directory, (err, items) => {
  items
    .filter((item) => path.extname(item) === '.jpg')
    .forEach((item) => {
      if (gallery.photos.filter((p) => p.file === item).length === 0) {
        throw new Error(item + ' exists in the directory, but it isn\'t in the *.yaml');
      }
    });
});
// TODO: Check for duplicates

Object.keys(gallery.sizes).forEach((size) => {
  if (!fs.existsSync(path.join(directory, size))) {
    fs.mkdirSync(path.join(directory, size));
  }
});

var proms = gallery.photos.map((p) => {
  p.sizes = {}
  return Object.keys(gallery.sizes).map((size) => {
    var file = path.join(size, p.file)
    var width = gallery.sizes[size].width
    var height = gallery.sizes[size].height
    p.sizes[size] = file
    var image = path.join(directory, p.file)

    if (width && height) { // We are getting a specific aspect ratio
      return smartcrop.crop(image, { width: width, height: height })
        .then(function (result) {
          return sharp(image)
            .extract({
              left: result.topCrop.x,
              top: result.topCrop.y,
              width: result.topCrop.width,
              height: result.topCrop.height
            })
            .resize(width, height)
            .jpeg({ progressive: true })
            .toFile(path.join(directory, file));
        });
    } else {
      return sharp(image)
        .resize(width, height)
        .jpeg({ progressive: true })
        .toFile(path.join(directory, file));
    }
  });
});

if (!fs.existsSync(path.join(directory, 'original'))) {
  fs.mkdirSync(path.join(directory, 'original'));
}
var originalProms = gallery.photos.map((p) => {
  var image = path.join(directory, p.file)
  return sharp(image)
    .jpeg({ progressive: true })
    .toFile(path.join(directory, 'original', p.file));
});

Promise.all(_.flatten(proms), originalProms).then(() => {
  var fileJs = fs.openSync(jsFile, 'w');

  gallery.photos.forEach((p) => {
    importFile(path.join('original', p.file))
    Object.keys(p.sizes).forEach((s) => {
      importFile(p.sizes[s])
    });

    function importFile(file) {
      fs.writeSync(fileJs, `import ${_.camelCase(file)} from './${file.replace(path.sep, '/')}'\n`)
    }
  });

  fs.writeSync(fileJs, '\nexport default [\n')
  var key = 0
  gallery.photos.forEach((p) => {
    key++
    var sizes = Object.keys(p.sizes).map((s) =>
      `${s}: ${_.camelCase(p.sizes[s])}`
    )
    var obj = [
      `key: ${key}`,
      `file: '${p.file}'`,
      `path: ${_.camelCase(path.join('original', p.file))}`,
      `alt: '${p.alt || ''}'`,
      `sizes: { ${sizes.join(', ')} }`
    ]
    fs.writeSync(fileJs, `  {\n    ${obj.join(',\n    ')}\n  },\n`)
  });
  fs.writeSync(fileJs, '];\n')
}).catch((err) => {
  console.log(err)
})

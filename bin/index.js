#!/usr/bin/env node

const yargs = require('yargs');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

const argv = yargs
  .version(version)
  .usage('Usage: resize-image <file> <size1> [<size2> [<size3> ...]]')
  .options({
    outputdir: {
      alias: 'o',
      description: 'The directory to save the resized images',
      type: 'string'
    }
  })
  .help()
  .argv;

const fileName = argv._[0];
const sizes = argv._.slice(1).map(size => Number(size));

const outputdir = argv.outputdir || '.';

const validSizes = sizes.filter(size => !isNaN(size) && size > 0);

if (!fileName || !validSizes.length) {
  console.error('Usage: resize-image <file> <size1> [<size2> [<size3> ...]]');
  process.exit(1);
}

if (!fs.existsSync(outputdir)) {
  fs.mkdirSync(outputdir);
}

Promise.all(sizes.map(async size => {
  const resizedFileName = path.join(outputdir, `${size}_${fileName}`);
  await sharp(fileName)
    .resize({ width: size })
    .toFile(resizedFileName);
}));

#!/usr/bin/env node

const sharp = require('sharp');

const fileName = process.argv[2];
const sizes = process.argv.slice(3).map(Number);

if (!fileName || !sizes.length) {
  console.error('Usage: resize-image <file> <size1> [<size2> [<size3> ...]]');
  process.exit(1);
}

Promise.all(sizes.map(async size => {
  const resizedFileName = `${size}_${fileName}`;
  await sharp(fileName)
    .resize({ width: size })
    .toFile(resizedFileName);
}));

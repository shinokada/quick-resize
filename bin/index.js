#!/usr/bin/env node

const sharp = require('sharp');

const fileName = process.argv[2];
const sizes = process.argv.slice(3).map(Number);

Promise.all(sizes.map(async size => {
  const resizedFileName = `${size}_${fileName}`;
  await sharp(fileName)
    .resize({ width: size })
    .toFile(resizedFileName);
}));

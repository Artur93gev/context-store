const fs = require('fs');
const path = require('path');

const filesToCopy = [
  'package.json',
  'README.md',
];

filesToCopy.forEach(file => fs.copyFileSync(path.join(__dirname, '..', file), path.join(__dirname, '..', 'build', file)));

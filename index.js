const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputFolderPath = "D:/WORKSPACE/HACKTHON/ImagetoWebp/home"
//  process.argv[2]; // Get folder path from command line argument

console.log(`Converting ${inputFolderPath} to WebP...`);

if (!inputFolderPath) {
  console.error('Please provide a folder path as an argument.');
  process.exit(1);
}

const outputFolderPath = path.join(inputFolderPath, 'output');

// Create "output" folder if it doesn't exist
if (!fs.existsSync(inputFolderPath)) {
  console.error(`Folder path does not exist: ${inputFolderPath}`);
  process.exit(1);
}

if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath);
}

// Watch for changes in the input folder
fs.watch(inputFolderPath, { recursive: true }, (eventType, filename) => {
    console.log("start");
    console.log(eventType);
    console.log(filename);
  if (eventType === 'change' && (filename.endsWith('.png') || filename.endsWith('.jpg'))) {
    console.log(`Converting ${filename} to WebP...`);

    const inputFilePath = path.join(inputFolderPath, filename);
    const outputFilePath = path.join(outputFolderPath, filename.replace(/\.(png|jpg)$/, '.webp'));

    console.log(outputFilePath);

    // Use sharp library to convert image to WebP
    sharp(inputFilePath)
      .webp()
      .on('info', function(info) {
        const percentage = Math.round((info.size / info.input.size) * 100);
        console.log(`Converting ${filename} to WebP (${percentage}%)...`);
      })
      .toFile(outputFilePath)
      .then(() => console.log(`Saved ${outputFilePath}`))
      .catch(err => console.error(`Error converting ${inputFilePath} to WebP:`, err));
  }
});

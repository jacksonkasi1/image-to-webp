const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputFolderPath = "D:/WORKSPACE/HACKTHON/ImagetoWebp/caseStudy"
//  process.argv[2]; // Get folder path from command line argument

console.log(`Converting images in ${inputFolderPath} to WebP...`);

if (!inputFolderPath) {
  console.error('Please provide a folder path as an argument.');
  process.exit(1);
}

const outputFolderPath = path.join(inputFolderPath, 'output');

// Create "output" folder if it doesn't exist
if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath);
}

// Get list of all image files in the input folder
fs.readdir(inputFolderPath, (err, files) => {
  if (err) {
    console.error(`Error reading folder: ${inputFolderPath}`, err);
    process.exit(1);
  }

  const imageFiles = files.filter(file => /\.(jpe?g|png)$/i.test(file));

  console.log(`Found ${imageFiles.length} image file(s) in ${inputFolderPath}.`);

  let count = 0;
  const total = imageFiles.length;

  imageFiles.forEach(file => {
    const inputFilePath = path.join(inputFolderPath, file);
    const outputFilePath = path.join(outputFolderPath, path.parse(file).name + '.webp');

    // Use sharp library to convert image to WebP
    sharp(inputFilePath)
      .webp()
      .toFile(outputFilePath)
      .then(() => {
        console.log(`Saved ${outputFilePath}`);
        console.log(`Conversion complete: ${Math.floor((++count / total) * 100)}% (${count}/${total})`);
      })
      .catch(err => console.error(`Error converting ${inputFilePath} to WebP:`, err));
  });
});

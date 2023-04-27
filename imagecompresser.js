const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputFolderPath = "C:/Users/jacks/Videos/Gizmo-input"; // input folder path
const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"]; // image extensions to compress

const compressQuality = 1; // compression quality, range: 1-100, higher value means higher quality and larger file size

// get final word  path inputFolderPath = Gizmo-input
const folderName = path.basename(inputFolderPath);

let outputFolderPath = "C:/Users/jacks/Videos/Gizmo-output"; // output folder path

outputFolderPath = outputFolderPath + "/" + folderName;

console.log(`Compressing images in ${inputFolderPath}...`);

// Create "output" folder if it doesn't exist
if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath, { recursive: true });
}

// Traverse the input folder recursively and compress all images with specified extensions
traverseFolder(inputFolderPath);

function traverseFolder(
  folderPath,
  totalFilesCount = { image: 0, other: 0 },
  compressedFilesCount = { image: 0 }
) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Create the corresponding subfolder in the output folder if it doesn't exist
      const subfolderPath = path.join(
        outputFolderPath,
        path.relative(inputFolderPath, folderPath),
        file
      );
      if (!fs.existsSync(subfolderPath)) {
        fs.mkdirSync(subfolderPath, { recursive: true });
      }

      // Recursively traverse the subfolder
      traverseFolder(filePath, totalFilesCount, compressedFilesCount);
    } else {
      const extname = path.extname(file);
      if (imageExtensions.includes(extname)) {
        // Increment the total count of images
        totalFilesCount.image++;

        // Compress the image with the same format and save it in the corresponding subfolder of the output folder
        const subfolderPath = path.join(
          outputFolderPath,
          path.relative(inputFolderPath, folderPath)
        );

        const outputFilePath = path.join(
          subfolderPath,
          file
        );

        sharp(filePath)
          .jpeg({ quality: compressQuality })
          .png({ quality: compressQuality })
          .toFile(outputFilePath)
          .then(() => {
            // Increment the count of compressed files and log the percentage of completion
            compressedFilesCount.image++;
            const percentage = Math.round(
              (compressedFilesCount.image / totalFilesCount.image) * 100
            );
            console.log(
              `Compressed ${path.basename(outputFilePath)} (${percentage}%)`
            );
          })
          .catch((err) =>
            console.error(`Error compressing ${filePath}:`, err)
          );
      } else {
        // Increment the total count of non-image files
        totalFilesCount.other++;

        // Copy the file to the corresponding subfolder of the output folder
        const subfolderPath = path.join(
          outputFolderPath,
          path.relative(inputFolderPath, folderPath)
        );

        const outputFilePath = path.join(subfolderPath, file);

        fs.copyFile(filePath, outputFilePath, (err) => {
          if (err) {
            console.error(`Error copying ${filePath} to ${outputFilePath}:`, err);
          }
        });
      }
    }
  }
}
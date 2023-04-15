const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputFolderPath = "D:/WORKSPACE/HACKTHON/ImagetoWebp/caseStudy"; // input folder path
const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"]; // image extensions to convert

const imageConvertTO = "png"; // image type to convert to. support only [ heic, heif, avif, jpeg, jpg, jpe, tile, dz, png, raw, tiff, tif, webp, gif, jp2, jpx, j2k, j2c, jxl  ]

// get final word  path inputFolderPath = caseStudy
const folderName = path.basename(inputFolderPath);

let outputFolderPath = "D:/WORKSPACE/HACKTHON/ImagetoWebp/output"; // output folder path

outputFolderPath = outputFolderPath + "/" + folderName;

console.log(`Converting images in ${inputFolderPath} to WebP...`);

// Create "output" folder if it doesn't exist
if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath, { recursive: true });
}

// Traverse the input folder recursively and convert all images with specified extensions to WebP format
traverseFolder(inputFolderPath);

function traverseFolder(
  folderPath,
  totalFilesCount = { image: 0, other: 0 },
  convertedFilesCount = { webp: 0 }
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
      traverseFolder(filePath, totalFilesCount, convertedFilesCount);
    } else {
      const extname = path.extname(file);
      if (imageExtensions.includes(extname)) {
        // Increment the total count of images
        totalFilesCount.image++;

        // Convert the image to WebP format and save it in the corresponding subfolder of the output folder
        const subfolderPath = path.join(
          outputFolderPath,
          path.relative(inputFolderPath, folderPath)
        );

        const outputFilePath = path.join(
          subfolderPath,
          file.replace(
            new RegExp(`(${imageExtensions.join("|")})$`, "i"),
            `.${imageConvertTO}`
          )
        );

        sharp(filePath)
          .toFormat(imageConvertTO)
          .toFile(outputFilePath)
          .then(() => {
            // Increment the count of converted files and log the percentage of completion
            convertedFilesCount.webp++;
            const percentage = Math.round(
              (convertedFilesCount.webp / totalFilesCount.image) * 100
            );
            console.log(
              `Converted ${path.basename(outputFilePath)} (${percentage}%)`
            );
          })
          .catch((err) =>
            console.error(`Error converting ${filePath} to WebP:`, err)
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
          } else {
            console.log(`Copied ${path.basename(outputFilePath)}`);
          // Increment the count of converted files and log the percentage of completion
            convertedFilesCount.other++;
            const percentage = Math.round(
              (convertedFilesCount.other / totalFilesCount.other) * 100
            );
            console.log(
              `Converted ${path.basename(outputFilePath)} (${percentage}%)`
            );
          }
        });
      }
    }
  }
}
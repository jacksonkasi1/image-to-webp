const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputFolderPath = "D:/WORKSPACE/HACKTHON/ImagetoWebp/caseStudy"; // input folder path
const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"]; // image extensions to convert

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
  totalFilesCount = { image: 0 },
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
    } else if (imageExtensions.includes(path.extname(file))) {
      // Increment the total count of images
      totalFilesCount.image++;

      // Convert the image to WebP format and save it in the corresponding subfolder of the output folder
      const subfolderPath = path.join(
        outputFolderPath,
        path.relative(inputFolderPath, folderPath)
      );

      //   const outputFilePath = path.join(
      //     subfolderPath,
      //     file.replace(/\.(png|jpg|jpeg|gif)$/, ".webp")
      //   );
      const outputFilePath = path.join(
        subfolderPath,
        file.replace(
          new RegExp(`(${imageExtensions.join("|")})$`, "i"),
          ".webp"
        )
      );

      sharp(filePath)
        .webp()
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
    }
  }
}

const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const inputFolderPath =
  "C:/Users/jacks/Videos/Gizmo-input/Gizmo/Video"; // input folder path

const videoExtensions = [
  ".mp4",
  ".mov",
  ".avi",
  ".wmv",
  ".flv",
  ".mkv",
  ".webm",
]; // video extensions to compress

// Compression options
const compressionOptions = [
  {
    name: "High quality, large file size",
    codec: "libx264",
    crf: 18,
    preset: "slow",
  },
  {
    name: "Medium quality, medium file size",
    codec: "libx264",
    crf: 23,
    preset: "medium",
  },
  {
    name: "Low quality, small file size",
    codec: "libx264",
    crf: 28,
    preset: "veryfast",
  },
  {
    name: "Ultra compression",
    codec: "libx264",
    crf: 30,
    preset: "ultrafast",
  },
];

const outputFolderPath = "C:/Users/jacks/Videos/OUTPUT"; // output folder path

console.log(`Compressing videos in ${inputFolderPath}...`);


const compressType = compressionOptions[0];

console.log(`Compression type: ${compressType.name}`);

// Create "output" folder if it doesn't exist
if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath, { recursive: true });
}

// Traverse the input folder recursively and compress all video files with specified extensions
traverseFolder(inputFolderPath);

async function traverseFolder(
  folderPath,
  totalFilesCount = { video: 0, other: 0 },
  convertedFilesCount = { video: 0 }
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
      await traverseFolder(filePath, totalFilesCount, convertedFilesCount);
    } else {
      const extname = path.extname(file);
      if (videoExtensions.includes(extname)) {
        // Increment the total count of videos
        totalFilesCount.video++;

        // Compress the video and save it in the corresponding subfolder of the output folder
        const subfolderPath = path.join(
          outputFolderPath,
          path.relative(inputFolderPath, folderPath)
        );

        const outputFilePath = path.join(subfolderPath, file);

        console.log(` `);
        console.log(`Compressing: ${filePath}`);
        console.log(`to ${outputFilePath}...`);

        await new Promise((resolve, reject) => {
          const compressionArgs = [
            "-c:v",
            compressType.codec,
            "-preset",
            compressType.preset,
            "-crf",
            compressType.crf,
          ];

          ffmpeg(filePath)
            .outputOptions(...compressionArgs)
            .output(outputFilePath)
            .on("progress", function (progress) {
              console.log(
                `Processing: ${path.basename(filePath)} ${progress.percent}%`
              );
            })
            .on("end", () => {
              convertedFilesCount.video++;
              resolve();
            })
            .on("error", (err) => {
              reject(err);
            })
            .run();
        });
      }
    }
  }
}

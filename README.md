# Image Conversion Script

This script allows you to convert images in a specified folder and its subfolders to the WebP format while preserving the folder structure. It also copies non-image files to the output folder. This guide provides instructions on how to use the script.

## Prerequisites

Before you begin, make sure you have the following:

1. **Node.js**: If you don't have Node.js installed, download and install it from the official website: [Node.js Official Website](https://nodejs.org/)

## Steps

Follow these steps to use the image conversion script:

1. **Prepare Your Files**:
   - Place the images you want to convert in a folder. This folder will be referred to as `inputFolderPath`. Ensure that your folder structure contains the images you want to convert.

2. **Download the Code**:
   - Download the code provided in the question and save it as a JavaScript file, e.g., `imgConvertWithExistFiles.js`.

3. **Open a Terminal or Command Prompt**:
   - On Windows, press `Win + R`, type `cmd`, and press Enter.
   - On macOS, open Spotlight (Cmd + Space), type `Terminal`, and press Enter.
   - On Linux, open a terminal window.

4. **Navigate to the Folder**:
   - Use the `cd` command to navigate to the folder where you saved the `imgConvertWithExistFiles.js` file.

5. **Run the Script**:
   - Run the script using the following command, replacing `<input_folder_path>` with the actual path to your input folder and `<output_folder_path>` with the desired output folder:
     ```
     node imgConvertWithExistFiles.js
     ```
     For example:
     ```
     node imgConvertWithExistFiles.js D:/WORKSPACE/HACKTHON/ImagetoWebp/caseStudy
     ```
   - The script will start converting images in the specified folder and its subfolders to the WebP format. It will also copy non-image files to the output folder.

6. **Check the Output**:
   - Once the script finishes running, check the `output` folder in the same directory where you ran the script. You'll find the converted images and copied non-image files there, preserving the folder structure.

## Important Notes

- **Backup Your Original Files**: Before running this script, make sure to back up your original images and non-image files, as it will modify or replace the image files in the output folder.

- **Adjust Image Extensions**: By default, the script is configured to convert files with extensions `.png`, `.jpg`, `.jpeg`, and `.gif` to WebP. You can modify the `imageExtensions` array in the code to include additional image extensions if needed.

- **Error Handling**: If you encounter any issues or errors during the process, refer to the error messages displayed in the terminal for troubleshooting.

Follow these steps to efficiently convert images to WebP format and copy non-image files using the provided script. Enjoy your converted files!

const fs = require("fs");
const path = require("path");

const deleteFolderPath = "D:/WORKSPACE/HACKTHON/ImagetoWebp/output";

// Delete folder function
function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call for subdirectories
        deleteFolder(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
    // Delete folder after all files and subfolders have been deleted
    fs.rmdirSync(folderPath);
    console.log(`Folder ${folderPath} deleted successfully.`);
  } else {
    console.log(`Folder ${folderPath} does not exist.`);
  }
}

// Call deleteFolder function with the path of the folder to delete
deleteFolder(deleteFolderPath);

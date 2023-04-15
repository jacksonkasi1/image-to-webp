const fs = require("fs").promises;
const path = require("path");

const deleteFolderPath = "D:/WORKSPACE/HACKTHON/ImagetoWebp/caseStudy";

// Delete folder function
async function deleteFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    for (const file of files) {
      const curPath = path.join(folderPath, file);
      if ((await fs.stat(curPath)).isDirectory()) {
        // Recursive call for subdirectories
        await deleteFolder(curPath);
      } else {
        // Delete file
        await fs.unlink(curPath);
      }
    }
    // Delete folder after all files and subfolders have been deleted
    await fs.rmdir(folderPath);
    console.log(`Folder ${folderPath} deleted successfully.`);
  } catch (err) {
    console.error(`Error deleting folder ${folderPath}: ${err.message}`);
  }
}

// Call deleteFolder function with the path of the folder to delete
deleteFolder(deleteFolderPath);

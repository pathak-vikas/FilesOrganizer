// This script organize files non-recursively [ only at one level ]
//imports*
let fs = require("fs"); // FileSystem Module Imported For Reading,writing,copying, deleting, checking existence etc
let path = require("path"); // Path Module mainly for managing the ambquity of WINDOWS AND LINUX "\" "/" Syntax difference 
let utliObj = require("../utility");

// 1. input -> directory path given
function OrganizeNonRecursive(dirPath) {
    let destPath;
    // 2. create -> organized_files -> directory
    if (dirPath == undefined) { // if user forgets to put path ,assumed Current Working directory as the one needs to be organised
        let currDir = process.cwd();
        dirPath = currDir;
        // 2. create -> organized_files_folder -> directory
        destPath = createOrganizedFiles_Folder(dirPath);
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {

            // 2. create -> organized_files_folder -> directory
            destPath = createOrganizedFiles_Folder(dirPath);
        } else {

            console.log("Kindly enter the correct path");
            return;
        }

    }

    // 3. identify categories of all the files present in that input directory  ->
    OrganizeNonRecursive_Helper(dirPath, destPath);
}

function createOrganizedFiles_Folder(dirPath) {
    // 2. create -> organized_files_folder -> directory
    destPath = path.join(dirPath, "Organized_Files_Folder");
    if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
    }
    return destPath;
}


function OrganizeNonRecursive_Helper(srcPath, destPath) {
    // 3. identify categories of all the files present in that input directory  ->
    let childNames = fs.readdirSync(srcPath);
    // console.log(childNames);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(srcPath, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            //console.log(childNames[i], "belongs to --> ", category);
            // 4. copy / cut  files to that organized directory inside of any of category folder 
            sendFiles(childAddress, destPath, category);
        }
    }

}
function sendFiles(srcFilePath, dest, category) {
    // 
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
  //  console.log(fileName, "copied to ", category);

}
function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (let type in utliObj.types) {
        let cTypeArray = utliObj.types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "Others";
}

module.exports = {
    organizeKey: OrganizeNonRecursive
}
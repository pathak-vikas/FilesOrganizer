let fs = require("fs"); // FileSystem Module Imported For Reading,writing,copying, deleting, checking existence etc
let path = require("path"); // Path Module mainly for managing the ambquity of WINDOWS AND LINUX "\" "/" Syntax difference 
function treefn(dirPath) {

    if (dirPath == undefined) {
        console.log("Path Incorrect : Running Tree Command on Current Working Directory");
        treeHelper(process.cwd(), ""); // node feature to get current working dir path helps in globalizing the app
        return;
    }
    else {
        let pathDoesExist = fs.existsSync(dirPath);
        if (pathDoesExist) {
            treeHelper(dirPath, "");
        } else {
            console.log("Kindly enter the correct path");
            return;
        }
    }
}

function treeHelper(dirPath, indent){
    let isFile = fs.lstatSync(dirPath).isFile();

    if(isFile) { // is file true 
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    } else { // is folder true otherwise
        let dirName = path.basename(dirPath)
        console.log(indent + "└──" + dirName);
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);
            treeHelper(childPath, indent + "\t");
        }
    }


}
module.exports = {
    treeStrucDirKey: treefn
}
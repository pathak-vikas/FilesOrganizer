#!/usr/bin/env node

// all imports are done here
let fs = require("fs"); // FileSystem Module Imported For Reading,writing,copying, deleting, checking existence etc
let path = require("path"); // Path Module mainly for managing the ambquity of WINDOWS AND LINUX "\" "/" Syntax difference 
// path module handles that ambiguity and also provides us with different helping functions like extname,basename
let utliObj = require("./utility");
let helpObj = require("./commands/help");
let treeObj = require("./commands/treeStrucDir");
let organizeObj = require("./commands/OrganizeNonRecursive");
let organizeObj2 = require("./commands/OrganizeRecursive");

// getting comm line arguments arr [passed at time of running the app], and slicing commands based on that 
let argsarr = process.argv.slice(2); // arguments array slicing and using parts from index 2  [ Since--> 0: being node , 1: being appname/scriptname/filename/commandname ]
let command = argsarr[0]; // Command provided at RunTime
let dirPath = argsarr[1]; // Path specifed at Run time / CommandLine
switch (command) {

    case "tree":
        treeObj.treeStrucDirKey(dirPath);
        break;
    case "organize":
        let flag = argsarr[1];
        if (flag == "r" || flag == "nr") {
            switch (flag) {
                case "r":
                    dirPath = argsarr[2];
                    organizeObj2.organizeKey2(dirPath);
                    break;
                case "nr":
                    dirPath = argsarr[2];
                    organizeObj.organizeKey(dirPath);
            }
        } else {
            dirPath = argsarr[1];
            organizeObj2.organizeKey2(dirPath);
        }
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please 🙏 Input Right command");
        break;
}

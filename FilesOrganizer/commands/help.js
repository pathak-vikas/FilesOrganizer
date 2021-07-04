// Help fn 
function helpFn() {
    console.log(`
    List of All The Commands:                          
                 fso tree "directoryPath"     
                 fso organize "directoryPath"  (Default : Recursive)
                 fso organize  -r "directoryPath" (Recursive)
                 fso organize  -nr "directoryPath" (Non- Recursive)
                 fso help                                  
                `);
}
module.exports = {
    helpKey: helpFn
}
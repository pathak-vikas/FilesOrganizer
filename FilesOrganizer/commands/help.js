// Help fn 
function helpFn() {
    console.log(`
    List of All The Commands:                          
                 fso tree "directoryPath"     
                 fso organize "directoryPath"     
                 fso help                                  
                `);
}
module.exports = {
    helpKey: helpFn
}
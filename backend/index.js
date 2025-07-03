const fs = require('fs');

fs.writeFile('output.txt','helloworld',(err)=>{
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('File written successfully');
    }
})
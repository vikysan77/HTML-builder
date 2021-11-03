const fs = require("fs");
const path = require('path')

const dirPath = path.join(__dirname, "secret-folder");

fs.readdir(dirPath, (err, files) => {
   if (err) {
       throw err;
   }
   for (const file of files) {

      const filePath = path.join(dirPath, file);

      fs.stat(filePath, (err, stats) => {

         if (err){
            throw err;
         } 

         if (stats.isFile()) {
            const extName = path.extname(filePath)
            const fileName = path.basename(filePath, extName)
            console.log(`${fileName} - ${extName.slice(1)} - ${((stats.size)/1024).toFixed(3)}kb`)
         }
      });
   }
});
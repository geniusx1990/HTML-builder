const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    console.log("\nCurrent directory filenames:");
    console.log('Name' + ' --- ' + 'type of file' + ' ----');

    files.forEach(file => {
      if (!file.isDirectory()) {
        fs.stat(path.resolve(__dirname, `secret-folder/${file.name}`), (err, stats) => {
          if (err) {
            console.log(`File doesn't exist.`)
          } else {
            let sizeFile = (stats.size / 1024).toFixed(3);
            console.log(file.name.split('.')[0] + ' --- ' + path.extname(file.name).slice(1) + ' ----' + sizeFile + 'kB');
          }
        })
      }
    })
  }
});
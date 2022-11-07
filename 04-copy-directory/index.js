const fs = require('fs');
const path = require('path');



async function copyDirectory() {
    const newFolderCopy = fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
        console.log('Directory created successfully!');
    });

    const oldFilesDelete = fs.readdir(path.resolve(__dirname, 'files-copy'), { withFileTypes: true }, (err, files) => {
        files.forEach(file => {
            fs.unlink(path.resolve(__dirname, `files-copy/${file.name}`), err => {
                if (err) throw err;
            })
        })
    })

    const filesCOPY = fs.readdir(path.resolve(__dirname, 'files'), { withFileTypes: true }, (err, files) => {
        files.forEach(file => {
            if (!file.isDirectory()) {
                //console.log(file.name)
                fs.copyFile(path.resolve(__dirname, `files/${file.name}`), path.resolve(__dirname, `files-copy/${file.name}`), err => {
                    if (err) throw err;
                    console.log(`File + ${file.name} copied successfully`);
                });
            }
        })
    })
}

copyDirectory();
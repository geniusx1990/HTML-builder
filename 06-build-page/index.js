const { constants } = require('buffer');
const fs = require('fs');
const path = require('path');


async function mergeCssFiles() {
    const writeToFile = await fs.createWriteStream(path.resolve(__dirname, 'project-dist/style.css'), 'utf-8')

    fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
        if (err)
            console.log(err);
        else {
            console.log("\nCSS Bundle created!");
            files.forEach(file => {
                if (!file.isDirectory() && path.extname(file.name) === '.css') {
                    const stream = fs.createReadStream(path.resolve(__dirname, `styles/${file.name}`), 'utf-8')
                    stream.pipe(writeToFile);
                }
            })
        }
    });
}

/* const newFolderCopy = fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    console.log('Directory created successfully!');
    mergeCssFiles();
}); */


async function copyDirectory() {
    const newFolderCopy = fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
        console.log('Directory created successfully!');
    });

    /*     const oldFilesDelete = fs.readdir(path.resolve(__dirname, 'files-copy'), { withFileTypes: true }, (err, files) => {
            files.forEach(file => {
                fs.unlink(path.resolve(__dirname, `files-copy/${file.name}`), err => {
                    if (err) throw err;
                })
            })
        }) */

    const filesCOPY = fs.readdir(path.resolve(__dirname, 'assets'), { withFileTypes: true }, (err, folders) => {
        folders.forEach(folder => {
            if (folder.isDirectory()) {
                // console.log(folder.name)
                fs.mkdir(path.join(__dirname, `project-dist/assets/${folder.name}`), { recursive: true }, (err) => {
                    //  console.log('Directory created successfully!');
                    fs.readdir(path.resolve(__dirname, `assets/${folder.name}`), { withFileTypes: true }, (err, files) => {
                        files.forEach(file => {
                            if (!file.isDirectory()) {
                                // console.log(file.name)
                                fs.copyFile(path.resolve(__dirname, `assets/${folder.name}/${file.name}`), path.resolve(__dirname, `project-dist/assets/${folder.name}/${file.name}`), err => {
                                    if (err) throw err;
                                    // console.log(`File + ${file.name} copied successfully`);
                                });
                            }
                        })
                    })
                });
            }
        })
    })
}






async function createHTML() {
    const stream = fs.createReadStream(path.resolve(__dirname, 'template copy.html'), 'utf-8');
    const writeToFile = await fs.createWriteStream(path.resolve(__dirname, 'project-dist/index.html'), 'utf-8')
    let template = fs.readFile(path.resolve(__dirname, 'template.html'), 'utf-8');
/*     fs.readdir(path.resolve(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {



               // console.log(file.name.split('.')[0])
                stream.on('data', (chunk) => {
                    //console.log(chunk)

                     if (chunk.includes(file.name.split('.')[0])) {
                        `${file.name.split('.')[0]}`.replace(' aaaa ')
                        //console.log(file.name.split('.')[0])
                    } 

                  }) 
            })
            //stream.pipe(writeToFile)

        }
    });
  */
    

    //stream.pipe(writeToFile);
}

createHTML()



copyDirectory();
mergeCssFiles();



const { constants } = require('buffer');
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

async function mergeCssFiles() {
    const writeToFile = await fs.createWriteStream(path.resolve(__dirname, 'project-dist/style.css'), 'utf-8')

    fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
        if (err)
            console.log(err);
        else {
            console.log("CSS Bundle created!");
            files.forEach(file => {
                if (!file.isDirectory() && path.extname(file.name) === '.css') {
                    const stream = fs.createReadStream(path.resolve(__dirname, `styles/${file.name}`), 'utf-8')
                    stream.pipe(writeToFile);
                }
            })
        }
    });
}


async function copyDirectory() {
    const newFolderCopy = fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
        console.log('Directory created successfully!');
    });

    const filesCOPY = fs.readdir(path.resolve(__dirname, 'assets'), { withFileTypes: true }, (err, folders) => {
        folders.forEach(folder => {
            if (folder.isDirectory()) {
                fs.mkdir(path.join(__dirname, `project-dist/assets/${folder.name}`), { recursive: true }, (err) => {
                    fs.readdir(path.resolve(__dirname, `assets/${folder.name}`), { withFileTypes: true }, (err, files) => {
                        files.forEach(file => {
                            if (!file.isDirectory()) {
                                fs.copyFile(path.resolve(__dirname, `assets/${folder.name}/${file.name}`), path.resolve(__dirname, `project-dist/assets/${folder.name}/${file.name}`), err => {
                                    if (err) throw err;
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
    const sourceHTML = path.resolve(__dirname, 'template.html');
    let reading = await fsPromises.readFile(sourceHTML, 'utf-8');
    const folderForReading = path.resolve(__dirname, 'components');
    const componentsHTML = await fsPromises.readdir(folderForReading);

    for (let file of componentsHTML) {
        if (path.extname(file) == '.html') {
            const htmlToAdd = path.parse(path.join(folderForReading, file)).name;
            let document = await fsPromises.readFile(path.join(folderForReading, file));
            reading = reading.replace(`{{${htmlToAdd}}}`, document);
        };
    }

    fs.writeFile(path.resolve(__dirname, 'project-dist/index.html'), reading, (err) => {
        if (err) { throw err; }
    });
}


createHTML()
copyDirectory();
mergeCssFiles();



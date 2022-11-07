const fs = require('fs');
const path = require('path');


async function mergeCssFiles() {
    const writeToFile = await fs.createWriteStream(path.resolve(__dirname, 'project-dist/bundle.css'), 'utf-8')

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


mergeCssFiles();


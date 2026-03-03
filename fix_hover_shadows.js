const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, 'app/asset-management/page.tsx'),
    path.join(__dirname, 'app/(home)/page.tsx')
];

let modifiedFiles = 0;

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        content = content.replace(/dark:hover:shadow-\[0_0_60px_rgba\(59,130,246,0\.18\)\]/g, 'dark:hover:shadow-none');

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            modifiedFiles++;
            console.log(`Updated ${file}`);
        }
    }
});

console.log(`Updated ${modifiedFiles} files.`);

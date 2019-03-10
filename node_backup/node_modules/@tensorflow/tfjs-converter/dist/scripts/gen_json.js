"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var destDir = './python/tensorflowjs/op_list/';
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}
var srcDir = './src/operations/op_list';
var fileNames = fs.readdirSync(srcDir);
fileNames.forEach(function (fileName) {
    var srcPath = path.join(srcDir, fileName);
    try {
        var m = require('../' + srcPath);
        if (m.json === null) {
            console.log('Ignored', srcPath);
            return;
        }
        var destPath = path.join(destDir, fileName.replace('.ts', '.json'));
        fs.writeFileSync(destPath, JSON.stringify(m.json, null, 2));
        console.log('Generated', destPath);
    }
    catch (ex) {
        console.log('Ignored', srcPath);
    }
});
console.log('Done!');
//# sourceMappingURL=gen_json.js.map
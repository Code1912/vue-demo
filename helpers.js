
let path = require('path');
let  minimist=require('minimist')
let _root = path.resolve(__dirname);
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args)) ;
}
function  args() {
    let argObj = minimist(process.argv.slice(2));

    argObj.env = argObj.env || "dev";
    argObj.minify=  (argObj.minify||"").trim().toLocaleLowerCase()==='true';
    console.log(argObj)
    return argObj;
}
module.exports.root = root;
module.exports.args=args;
// hello_world.js
function helloWorld() {
  console.log('hello world from javascript');
  // const lib = require('./dist/my-lib.mjs');
  // console.log(lib);
}

class Core {

  constructor() {}

  test() {
    console.log('test called');
    return "abc";
  }
}

function createCore() {
  return new Core();
}

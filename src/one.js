import two from './two'
// import '@babel/polyfill'
const test = (num) => {
    console.log("test函数" + num)
}
test(two.y)
function testable(target) {
    target.isTestable = true;
}
@testable
class MyTestableClass { }
console.log("装饰器语法", MyTestableClass.isTestable)
const delay = new Promise(resolve => console.log("new Promise()"));
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator();
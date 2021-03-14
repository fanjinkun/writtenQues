/**
 * 手写new操作符的实现
 */
/**
 * new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
 * new 关键字会进行如下的操作：
 * 1.创建一个空的简单JavaScript对象（即{}）；
 * 2.链接该对象（即设置该对象的构造函数）到另一个对象 ；
 * 3.将步骤1新创建的对象作为this的上下文 ；
 * 4.如果该函数没有返回对象，则返回this。
 */
function new_object() {
  // 创建一个空的对象
  let obj = new Object()
  // 获得构造函数
  let Con = [].shift.call(arguments)
  // 链接到原型 （不推荐使用）
  obj.__proto__ = Con.prototype
  // 绑定 this，执行构造函数
  let result = Con.apply(obj, arguments)
  // 确保 new 出来的是个对象
  return typeof result === 'object' ? result : obj
}

/**
 * 改变一个对象的 [[Prototype]] 属性, 这种行为在每一个JavaScript引擎和浏览器中都是一个非常慢且影响性能的操作
 * 创建一个新的且可以继承 [[Prototype]] 的对象，推荐使用 Object.create()
 */

// 优化后 new 实现
function create() {
  // 1、获得构造函数，同时删除 arguments 中第一个参数
  let Con = [].shift.call(arguments);
  // 2、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  let obj = Object.create(Con.prototype);
  // 3、绑定 this 实现继承，obj 可以访问到构造函数中的属性
  let ret = Con.apply(obj, arguments);
  // 4、优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
};
function Person(name,age){
  this.name=name;
  this.age=age
}
let resultNew=new Person()
let resultFristObj=new_object(Person)
let resultBetterObj=create(Person)
console.log(resultNew,resultFristObj,resultBetterObj)  //Person { name: undefined, age: undefined }
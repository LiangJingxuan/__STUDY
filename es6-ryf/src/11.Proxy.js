"use strict";

/**
 * Proxy
 * 
 */

/* 1.概述 */
// 用于修改某些操作的默认行为，等同于在语言层面做出修改，
// 所以属于一种“元编程”（meta programming），即对编程语言进行编程

/*
	Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，
	都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
	Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
*/
var obj=new Proxy({},{
	get(target,key,receiver){
		console.log(`getting ${key}!`);
    	return Reflect.get(target, key, receiver);
	},
	set(target,key,value,receiver){
		console.log(`setting ${key}!`);
    	return Reflect.set(target, key, value, receiver);
	}
});
// 运行结果：
obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2

var proxy=new Proxy({},{
	get(target,prototy){
		return 35;
	}
});
// 运行结果：
proxy.time // 35
proxy.name // 35
proxy.title // 35

// 一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
// var object={proxy: new Proxy(target, handler)};

// Proxy 实例也可以作为其他对象的原型对象
var proxy2 = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});
let obj2 = Object.create(proxy2);
obj2.time // 35

// 同一个拦截器函数，可以设置拦截多个操作
// 对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。

/* 2.Proxy 实例的方法 */

// get() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
var person={
	name:'lee'
};
var proxy3=new Proxy(person,{
	get(target,property){
		if (property in target) {
	      return target[property];
	    } else {
	      throw new ReferenceError("Property \"" + property + "\" does not exist.");
	    }
	}
});
proxy3.name // "张三"
// proxy3.age // 抛出一个错误

// get方法可以继承
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});
let obj3 = Object.create(proto);
obj3.foo // "GET foo"

// 使用get拦截，实现数组读取负数的索引
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c

// get方法的第三个参数的例子
// 如果一个属性不可配置（configurable）和不可写（writable），
// 则该属性不能被代理，通过 Proxy 对象访问该属性会报错。
const proxy4=new Proxy({},{
	get(target,property,receiver){
		return receiver;
	}
});
proxy4.getReceiver ===proxy4; // true

// set() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 例：
// 假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，
// 那么可以使用Proxy保证age的属性值符合要求。
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }
    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};
// 运行：
let person2 = new Proxy({
	age:100
}, validator);
// person2.age = 100;
console.log(person2.age); // 100
// person2.age = 'young' // 报错
// person2.age = 300 // 报错

// 例：
// 设置只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。
const handler={
	get(target,key){
		invariant(key,'get');
		return target[key];
	},
	set(target,key,value){
		invariant(key,'set');
		target[key]=value;
		return true;
	}
};
function invariant(key,action){
	if(key[0]==='_'){
		throw new Error(`Invalid attempt to ${action} private "${key}" property`);
	}
};
// 使用：
const target={};
const proxy5=new Proxy(target,handler);
// proxy5._prop='c'; // Error

// set方法第四个参数的例子
// 注意，如果目标对象自身的某个属性，不可写也不可配置，
// 那么set不得改变这个属性的值，只能返回同样的值，否则报错。
const handler2 = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy6 = new Proxy({}, handler2);
// proxy6.foo = 'bar';
proxy6.foo === proxy6 // true

// apply() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// apply方法拦截函数的调用、call和apply操作
// 参数：目标对象、目标对象的上下文对象（this）和目标对象的参数数组
// 例:
var target2 = function () { return 'I am the target'; };
var handler3 = {
  apply: function () {
    return 'I am the proxy';
  }
};
var p = new Proxy(target2, handler3);
console.log(p());

// 例:
var twice={
	apply(target,ctx,args){
		return Reflect.apply(...arguments) * 2;
	}
};
function sum (left,right) {
  return left + right;
};
var proxy = new Proxy(sum,twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30

// has() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 判断对象是否具有某个属性时，这个方法会生效
// 拦截HasProperty操作 典型的操作就是in运算符
// 如果原对象不可配置或者禁止扩展，这时has拦截会报错
// 例:
var handler4={
	has(target,key){
		if(key[0]==='_'){
			return false;
		}
		return key in target;
	}
};
var target3={_prop: 'foo', prop: 'foo'};
var proxy7=new Proxy(target3,handler4);
console.log('_prop' in proxy7);

// construct() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 拦截new命令
// construct方法返回的必须是一个对象，否则会报错
// 例:
var p2=new Proxy(function(){},{
	construct(target,args){
		console.log('called:'+args.join(','));
		return {value:args[0]*10}
	}
});
console.log( (new p2(1)).value ); // "called: 1"  // 10

// deleteProperty() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除
// 目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错
// 例:
var handler5 = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target4 = { _prop: 'foo' };
var proxy = new Proxy(target4, handler5);
// delete proxy._prop;
// Error: Invalid attempt to delete private "_prop" property

// defineProperty() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 拦截了Object.defineProperty操作
// 如果目标对象不可扩展（extensible），
// 则defineProperty不能增加目标对象上不存在的属性，否则会报错。
// 另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），
// 则defineProperty方法不得改变这两个设置。
// 例:
var handler6 = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target5 = {};
var proxy = new Proxy(target5, handler6);
// proxy.foo = 'bar'
// TypeError: proxy defineProperty handler returned false for property '"foo"'

// getOwnPropertyDescriptor() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined
// 例:
var handler7 = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target6 = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target6, handler7);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }

// getPrototypeOf() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 拦截获取对象原型
// 返回值必须是对象或者null，否则报错
// 具体拦截一下操作：
/*
Object.prototype.__proto__
Object.prototype.isPrototypeOf()
Object.getPrototypeOf()
Reflect.getPrototypeOf()
instanceof
*/
// 例:
var proto2 = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto2;
  }
});
Object.getPrototypeOf(p) === proto2 // true

// isExtensible() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 拦截Object.isExtensible操作
// 例:
var p3 = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});
Object.isExtensible(p3)
// "called"
// true

// ownKeys() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 拦截对象自身属性的读取操作
// 具体拦截一下操作：
/*
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.keys()
*/
// 拦截Object.keys()的例子
let target7 = {
  a: 1,
  b: 2,
  c: 3
};
let handler8 = {
  ownKeys(target) {
    return ['a'];
  }
};
let proxy8 = new Proxy(target7, handler8);
Object.keys(proxy8) // [ 'a' ]

// preventExtensions() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 拦截Object.preventExtensions()
// 该方法必须返回一个布尔值，否则会被自动转为布尔值
// 只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），
// proxy.preventExtensions才能返回true，否则会报错
var p = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
});
Object.preventExtensions(p); // "called"  // true

// setPrototypeOf() ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 拦截Object.setPrototypeOf方法
// 例:
var handler9 = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto3 = {};
var target2 = function () {};
var proxy = new Proxy(target2, handler9);
// Object.setPrototypeOf(proxy, proto3);
// Error: Changing the prototype is forbidden

/* 3.Proxy.revocable() */
// 返回一个可取消的 Proxy 实例
let target8 = {}, handler10 = {};
let {proxy9, revoke} = Proxy.revocable(target8, handler10);
// proxy9.foo = 123;
// proxy9.foo // 123
// revoke(); // proxy.foo // TypeError: Revoked

/* 4.this 问题 */

/* 5.实例：Web 服务的客户端 */
/*
const service = createWebService('http://example.com/data');
service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl+'/' + propKey);
    }
  });
}
*/
"use strict";

/**
 * Symbol
 * 
 */

/* 1.概述 */

/*
 ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
 它是 JavaScript 语言的第七种数据类型，
 前六种是：undefined、null、布尔值（Boolean）、字符串（String）、
 数值（Number）、对象（Object）
*/
let s1=Symbol(); // 定义
let s2=Symbol('foo'); //添加参数做标识符
let s3=Symbol('foo'); 
s2===s3; // false  互不相等
//  不能与其他值进行运算
String(s3); // Symbol('foo') 可以转为字符串也可以转为布尔 不可以转数字  

/* 2.作为属性名的 Symbol */
let mySymbol=Symbol();
let a={
	[mySymbol]:'hello',
}
console.log(a[mySymbol]);

// 例 常量使用 Symbol 其他任何值都不可能有相同的值
const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
    }
}

/* 3.实例：消除魔术字符串 */
// 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
// 风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
const shapeType={
	triangle:Symbol(),
};
function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case [shapeType.triangle]:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}
getArea([shapeType.triangle], { width: 100, height: 100 });

/* 4.属性名的遍历 */
// Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
const s4={};
let aa=Symbol('a'), bb=Symbol('b');
s4[aa]='hello';
s4[bb]='lee';
const objectSymbols = Object.getOwnPropertySymbols(s4);
console.log(objectSymbols);

// Reflect.ownKeys方法返回所有类型的键名
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};
var res1=Reflect.ownKeys(obj);
console.log(res1);

/* 5.Symbol.for()，Symbol.keyFor() */

// Symbol.for()使用同一个 Symbol 值
let s5=Symbol.for('foo'), s6=Symbol.for('foo');
s5===s6; // true

// Symbol.keyFor()返回一个已登记的 Symbol 类型值的key
let s7 = Symbol.for("foo");
Symbol.keyFor(s7); // "foo"

let s8 = Symbol("foo");
Symbol.keyFor(s8); // undefined

/* 6.实例：模块的 Singleton 模式 */
// Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例

/* 7.内置的 Symbol 值 */

// Symbol.hasInstance 方法
// 当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true

class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
};
1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false

// Symbol.isConcatSpreadable 属性
// 等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

// Symbol.species 属性
// 指向一个构造函数。创建衍生对象时，会使用该属性
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
const aaa = new MyArray();
const bbb = aaa.map(x => x);
bbb instanceof MyArray // false
bbb instanceof Array // true

// Symbol.match 属性
// 指向一个函数。当执行str.match(myObject)时，
// 如果该属性存在，会调用它，返回该方法的返回值
/*
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)
class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
};
'e'.match(new MyMatcher()) // 1
*/

// Symbol.replace 属性
// 指向一个方法，当该对象被String.prototype.replace方法调用时，
// 会返回该方法的返回值
const x = {};
x[Symbol.replace] = (...s) => console.log(s);
'Hello'.replace(x, 'World') // ["Hello", "World"]

// Symbol.search 属性
// 指向一个方法，当该对象被String.prototype.search方法调用时，
// 会返回该方法的返回值
/*
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
*/

// Symbol.split 属性
// 指向一个方法，当该对象被String.prototype.split方法调用时，
// 会返回该方法的返回值
class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    let index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}

'foobar'.split(new MySplitter('foo')) // ['', 'bar']

'foobar'.split(new MySplitter('bar')) // ['foo', '']

'foobar'.split(new MySplitter('baz')) // 'foobar'

// Symbol.iterator 属性
// 指向该对象的默认遍历器方法。
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
  console.log(value);
};

// Symbol.toPrimitive 属性
// 指向一个方法。该对象被转为原始类型的值时，
// 会调用这个方法，返回该对象对应的原始类型值。
let obj2 = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj2 // 246
3 + obj2 // '3default'
obj2 == 'default' // true
String(obj2) // 'str'

// Symbol.toStringTag 属性
/*
对象的Symbol.toStringTag属性，指向一个方法。
在该对象上面调用Object.prototype.toString方法时，
如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，
表示对象的类型。也就是说，这个属性可以用来定制[object Object]
或[object Array]中object后面的那个字符串。
*/
// 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

// 例二
class Collection2 {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
let x2 = new Collection2();
Object.prototype.toString.call(x) // "[object xxx]"

// Symbol.unscopables 属性
// 指向一个对象。该对象指定了使用with关键字时，
// 哪些属性会被with环境排除。
Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']
// 上面代码说明，数组有 7 个属性，会被with命令排除。
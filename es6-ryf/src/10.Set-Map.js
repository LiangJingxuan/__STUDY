"use strict";

/**
 * Set 和 Map 数据结构
 * 
 */

/* 1.Set */

// 基本用法
const s1=new Set();
[2,1,3,2,4,5,6,0].forEach(x=>s1.add(x));

for(let i of s1){
	console.log(i);
};

const s2=new Set([1,2,3,2,1]);
console.log([...s2]);

const s3=new Set([1,3,2,1,2]);
console.log(s3.size);

// Set中NaN等于本身 {}与{}不相等

// Set 实例的属性和方法

// 属性
console.log(s1.size);

// 操作方法
s1.add(9).add(9).add(15);
console.log(s1);

console.log(s1.has(9)); // true
console.log(s1.has(18)); // false

s1.delete(9);
console.log(s1.has(9)); // false

// 遍历方法
// 1）keys()，values()，entries()
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
};
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
};
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
};
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

for (let x of set) { // 默认遍历器生成函数就是它的values方法可以省略values方法
  console.log(x);
};
// red
// green
// blue

// 2）forEach()
// Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
set.forEach((value,key)=>console.log(key+':'+value));

// 3）遍历的应用
let set2 = new Set(['red', 'green', 'blue']);
let arr = [...set]; // ['red', 'green', 'blue']

// 扩展运算符和 Set 结构相结合，就可以去除数组的重复成员
let arr2 = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr2)]; // [3, 5, 2]

let set3 = new Set([1, 2, 3]);
set3 = new Set([...set3].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set4 = new Set([1, 2, 3, 4, 5]);
set4 = new Set([...set4].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

/* 2.WeakSet */
// 只能存放对象、 WeakSet 不可遍历。
const ws=new WeakSet();

// 参数必须是对象 否则会报错
const a1=[[1,2],[3,4]], a2=[4,3,2], a3=[];
const ws2=new WeakSet(a1);

// 方法
ws2.add(a3);
ws2.has(a3); // true
ws2.delete(a3);
ws2.has(a3); // false

/* 3.Map */
// 含义和基本用法
// 提供了“值—值”的对应，是一种更完善的 Hash 结构实现
const m=new Map();
const o={p:'hello'};
m.set(o,'content');
m.get(o); // content
m.has(o); // true
m.delete(o); // true
m.has(o); // false

const m2=new Map([
		['name','张三'],
		['title','Author']
	]);
// m2.size(); // 2
m2.has('name'); // true
m2.get('name'); // 张三
m2.has('title'); // true
m2.get('title'); // Author

const set5 = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set5);
m1.get('foo') // 1

const m4 = new Map([['baz', 3]]);
const m3 = new Map(m4);
m3.get('baz') // 3

let map = new Map();

map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123

// 实例的属性和操作方法

// 属性
// 1）size 属性
console.log(map.size);

// 方法
// 2）set(key, value)
const m5 = new Map();
m5.set('edition', 6)        // 键是字符串
m5.set(262, 'standard')     // 键是数值
m5.set(undefined, 'nah')    // 键是 undefined
// 采用链式写法
let map1 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

// 3）get(key)
map1.get(3);

// 4）has(key)
map1.has(2);

// 5）delete(key)
map1.delete(2);

// 6）clear() 没有返回值
map1.clear();

// 遍历方法
/*
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
*/

// Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）
const map2 = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map2.keys()];
// [1, 2, 3]

[...map.values()];
// ['one', 'two', 'three']

[...map2.entries()];
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map2];
// [[1,'one'], [2, 'two'], [3, 'three']]

map2.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});

// 与其他数据结构的互相转换
// 1）Map 转为数组
[...map2];

// 2）数组 转为 Map
// new Map([1,2,3],[4,5]);

// 3）Map 转为对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
};
const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap);

// 4）对象转为 Map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
};
objToStrMap({yes: true, no: false});

// 5）Map 转为 JSON
// 一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap2 = new Map().set('yes', true).set('no', false);
strMapToJson(myMap2)
// 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap3 = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap3)

// 6）JSON 转为 Map
// 所有键名都是字符串
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}

// 整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}

/* 4.WeakMap */
// WeakMap可以使用set方法添加成员
const wm1=new WeakMap();
const key={foo:1};
wm1.set(key,2);
wm1.get(key); // 2

// WeakMap 也可以接受一个数组，作为构造函数的参数
const k1=[1,2,3], k2=[4,5], wm2=new WeakMap([[k1,'foo'],[k2,'bar']]);
wm2.get(k2); // 'bar'

// 与map的区别：只接受对形象作为键名（null除外）不接受其他类型的值作为键名
// WeakMap的键名所指向的对象不计入垃圾回收机制

// WeakMap 的语法
// WeakMap只有四个方法可用：get()、set()、has()、delete()

// WeakMap 的示例

// WeakMap 的用途
// WeakMap 应用的典型场合就是 DOM 节点作为键名
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
/*
myElement是一个 DOM 节点，每当发生click事件，就更新一下状态。
我们将这个状态作为键值放在 WeakMap 里，对应的键名就是myElement。
一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
*/

// WeakMap 的另一个用处是部署私有属性
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
/*
Countdown类的两个内部属性_counter和_action，是实例的弱引用，
所以如果删除实例，它们也就随之消失，不会造成内存泄漏。
*/

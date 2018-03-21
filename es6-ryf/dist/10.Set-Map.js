"use strict";

/**
 * Set 和 Map 数据结构
 * 
 */

/* 1.Set */

// 基本用法

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var s1 = new Set();
[2, 1, 3, 2, 4, 5, 6, 0].forEach(function (x) {
  return s1.add(x);
});

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = s1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var i = _step.value;

    console.log(i);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

;

var s2 = new Set([1, 2, 3, 2, 1]);
console.log([].concat(_toConsumableArray(s2)));

var s3 = new Set([1, 3, 2, 1, 2]);
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
var set = new Set(['red', 'green', 'blue']);

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = set.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var item = _step2.value;

    console.log(item);
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

;
// red
// green
// blue

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = set.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var _item = _step3.value;

    console.log(_item);
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

;
// red
// green
// blue

var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
  for (var _iterator4 = set.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var _item2 = _step4.value;

    console.log(_item2);
  }
} catch (err) {
  _didIteratorError4 = true;
  _iteratorError4 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion4 && _iterator4.return) {
      _iterator4.return();
    }
  } finally {
    if (_didIteratorError4) {
      throw _iteratorError4;
    }
  }
}

;
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

var _iteratorNormalCompletion5 = true;
var _didIteratorError5 = false;
var _iteratorError5 = undefined;

try {
  for (var _iterator5 = set[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
    var x = _step5.value;
    // 默认遍历器生成函数就是它的values方法可以省略values方法
    console.log(x);
  }
} catch (err) {
  _didIteratorError5 = true;
  _iteratorError5 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion5 && _iterator5.return) {
      _iterator5.return();
    }
  } finally {
    if (_didIteratorError5) {
      throw _iteratorError5;
    }
  }
}

;
// red
// green
// blue

// 2）forEach()
// Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
set.forEach(function (value, key) {
  return console.log(key + ':' + value);
});

// 3）遍历的应用
var set2 = new Set(['red', 'green', 'blue']);
var arr = [].concat(_toConsumableArray(set)); // ['red', 'green', 'blue']

// 扩展运算符和 Set 结构相结合，就可以去除数组的重复成员
var arr2 = [3, 5, 2, 2, 5, 5];
var unique = [].concat(_toConsumableArray(new Set(arr2))); // [3, 5, 2]

var set3 = new Set([1, 2, 3]);
set3 = new Set([].concat(_toConsumableArray(set3)).map(function (x) {
  return x * 2;
}));
// 返回Set结构：{2, 4, 6}

var set4 = new Set([1, 2, 3, 4, 5]);
set4 = new Set([].concat(_toConsumableArray(set4)).filter(function (x) {
  return x % 2 == 0;
}));
// 返回Set结构：{2, 4}

var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);

// 并集
var union = new Set([].concat(_toConsumableArray(a), _toConsumableArray(b)));
// Set {1, 2, 3, 4}

// 交集
var intersect = new Set([].concat(_toConsumableArray(a)).filter(function (x) {
  return b.has(x);
}));
// set {2, 3}

// 差集
var difference = new Set([].concat(_toConsumableArray(a)).filter(function (x) {
  return !b.has(x);
}));
// Set {1}

/* 2.WeakSet */
// 只能存放对象、 WeakSet 不可遍历。
var ws = new WeakSet();

// 参数必须是对象 否则会报错
var a1 = [[1, 2], [3, 4]],
    a2 = [4, 3, 2],
    a3 = [];
var ws2 = new WeakSet(a1);

// 方法
ws2.add(a3);
ws2.has(a3); // true
ws2.delete(a3);
ws2.has(a3); // false

/* 3.Map */
// 含义和基本用法
// 提供了“值—值”的对应，是一种更完善的 Hash 结构实现
var m = new Map();
var o = { p: 'hello' };
m.set(o, 'content');
m.get(o); // content
m.has(o); // true
m.delete(o); // true
m.has(o); // false

var m2 = new Map([['name', '张三'], ['title', 'Author']]);
// m2.size(); // 2
m2.has('name'); // true
m2.get('name'); // 张三
m2.has('title'); // true
m2.get('title'); // Author

var set5 = new Set([['foo', 1], ['bar', 2]]);
var m1 = new Map(set5);
m1.get('foo'); // 1

var m4 = new Map([['baz', 3]]);
var m3 = new Map(m4);
m3.get('baz'); // 3

var map = new Map();

map.set(-0, 123);
map.get(+0); // 123

map.set(true, 1);
map.set('true', 2);
map.get(true); // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined); // 3

map.set(NaN, 123);
map.get(NaN); // 123

// 实例的属性和操作方法

// 属性
// 1）size 属性
console.log(map.size);

// 方法
// 2）set(key, value)
var m5 = new Map();
m5.set('edition', 6); // 键是字符串
m5.set(262, 'standard'); // 键是数值
m5.set(undefined, 'nah'); // 键是 undefined
// 采用链式写法
var map1 = new Map().set(1, 'a').set(2, 'b').set(3, 'c');

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
var map2 = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);

[].concat(_toConsumableArray(map2.keys()));
// [1, 2, 3]

[].concat(_toConsumableArray(map.values()));
// ['one', 'two', 'three']

[].concat(_toConsumableArray(map2.entries()));
// [[1,'one'], [2, 'two'], [3, 'three']]

[].concat(_toConsumableArray(map2));
// [[1,'one'], [2, 'two'], [3, 'three']]

map2.forEach(function (value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});

// 与其他数据结构的互相转换
// 1）Map 转为数组
[].concat(_toConsumableArray(map2));

// 2）数组 转为 Map
// new Map([1,2,3],[4,5]);

// 3）Map 转为对象
function strMapToObj(strMap) {
  var obj = Object.create(null);
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = strMap[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var _step6$value = _slicedToArray(_step6.value, 2),
          k = _step6$value[0],
          v = _step6$value[1];

      obj[k] = v;
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return obj;
};
var myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap);

// 4）对象转为 Map
function objToStrMap(obj) {
  var strMap = new Map();
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = Object.keys(obj)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var k = _step7.value;

      strMap.set(k, obj[k]);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return strMap;
};
objToStrMap({ yes: true, no: false });

// 5）Map 转为 JSON
// 一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

var myMap2 = new Map().set('yes', true).set('no', false);
strMapToJson(myMap2);
// 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON
function mapToArrayJson(map) {
  return JSON.stringify([].concat(_toConsumableArray(map)));
}

var myMap3 = new Map().set(true, 7).set({ foo: 3 }, ['abc']);
mapToArrayJson(myMap3);

// 6）JSON 转为 Map
// 所有键名都是字符串
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}');
// Map {'yes' => true, 'no' => false}

// 整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]');
// Map {true => 7, Object {foo: 3} => ['abc']}

/* 4.WeakMap */
// WeakMap可以使用set方法添加成员
var wm1 = new WeakMap();
var key = { foo: 1 };
wm1.set(key, 2);
wm1.get(key); // 2

// WeakMap 也可以接受一个数组，作为构造函数的参数
var k1 = [1, 2, 3],
    k2 = [4, 5],
    wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2); // 'bar'

// 与map的区别：只接受对形象作为键名（null除外）不接受其他类型的值作为键名
// WeakMap的键名所指向的对象不计入垃圾回收机制

// WeakMap 的语法
// WeakMap只有四个方法可用：get()、set()、has()、delete()

// WeakMap 的示例

// WeakMap 的用途
// WeakMap 应用的典型场合就是 DOM 节点作为键名
var myElement = document.getElementById('logo');
var myWeakmap = new WeakMap();

myWeakmap.set(myElement, { timesClicked: 0 });

myElement.addEventListener('click', function () {
  var logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
/*
myElement是一个 DOM 节点，每当发生click事件，就更新一下状态。
我们将这个状态作为键值放在 WeakMap 里，对应的键名就是myElement。
一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
*/

// WeakMap 的另一个用处是部署私有属性
var _counter = new WeakMap();
var _action = new WeakMap();

var Countdown = function () {
  function Countdown(counter, action) {
    _classCallCheck(this, Countdown);

    _counter.set(this, counter);
    _action.set(this, action);
  }

  _createClass(Countdown, [{
    key: 'dec',
    value: function dec() {
      var counter = _counter.get(this);
      if (counter < 1) return;
      counter--;
      _counter.set(this, counter);
      if (counter === 0) {
        _action.get(this)();
      }
    }
  }]);

  return Countdown;
}();

var c = new Countdown(2, function () {
  return console.log('DONE');
});

c.dec();
c.dec();
// DONE
/*
Countdown类的两个内部属性_counter和_action，是实例的弱引用，
所以如果删除实例，它们也就随之消失，不会造成内存泄漏。
*/
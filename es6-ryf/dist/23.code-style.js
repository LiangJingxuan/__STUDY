"use strict";

/**
 * 编程风格
 * 
 */

/*块级作用域*/

// 1）let 取代 var
// let完全可以取代var，因为两者语义相同，而且let没有副作用

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (true) {
	var x = 'lee';
};
for (var i = 0; i < 10; i++) {
	console.log(i);
};

// 2）全局常量和线程安全
// 在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量
// 所以多使用const，有利于提高程序的运行效率
var a = 1,
    b = 2,
    c = 3;

var d = 1,
    e = 2,
    f = 3;

// 所有的函数都应该设置为常量

/*字符串*/

// 静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号

var g = 'foobar',
    h = 'foo' + a + 'bar';

/*解构赋值*/

// 使用数组成员对变量赋值时，优先使用解构赋值
var arr = [1, 2, 3, 4];
var first = arr[0],
    second = arr[1];

// 函数的参数如果是对象的成员，优先使用解构赋值

function getFullName(_ref) {
	var firstName = _ref.firstName,
	    lastName = _ref.lastName;
};

// 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值
// 这样便于以后添加返回值，以及更改返回值的顺序
function processInput(input) {
	return { left: left, right: right, top: top, bottom: bottom };
};

var _processInput = processInput(input),
    left = _processInput.left,
    right = _processInput.right;

/*对象*/

// 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。


var obj1 = { k1: 'v1', k2: 'v2' };
var obj2 = {
	k1: 'v1',
	k2: 'v2'
};

// 对象尽量静态化，一旦定义，就不得随意添加新的属性。
// 如果添加属性不可避免，要使用Object.assign方法

// if reshape unavoidable
var a2 = {};
Object.assign(a2, { x: 3 });

// good
var a3 = { x: null };
a3.x = 3;

// 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义
var obj3 = _defineProperty({
	id: 5,
	name: 'San Francisco'
}, getKey('enabled'), true);

// 对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写
var atom = {
	ref: ref,
	value: 1,
	addValue: function addValue(value) {
		return this.value + value;
	}
};

/*数组*/

// 使用扩展运算符（...）拷贝数组
var itemsCopy = [].concat(_toConsumableArray(items));

// 使用 Array.from 方法，将类似数组的对象转为数组
var foo = document.querySelectorAll('.foo');
var nodes = Array.from(foo);

/*函数*/

// 立即执行函数可以写成箭头函数的形式
(function () {
	console.log('Welcome to the Internet.');
})();

// 那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this
[1, 2, 3].map(function (x) {
	return x * x;
});

// 箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this
var boundMethod = function boundMethod() {
	for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
		params[_key] = arguments[_key];
	}

	return method.apply(undefined, params);
};

// 简单的、单行的、不会复用的函数，建议采用箭头函数。
// 如果函数体较为复杂，行数较多，还是应该采用传统的函数写法

// 所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数
function divide(a, b) {
	var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	    _ref2$option = _ref2.option,
	    option = _ref2$option === undefined ? false : _ref2$option;
};

// 不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替
// 因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，
// 而 rest 运算符可以提供一个真正的数组
function concatenateAll() {
	for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		args[_key2] = arguments[_key2];
	}

	return args.join('');
};

// 使用默认值语法设置函数参数的默认值
function handleThings() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
};

/*Map 结构*/

// 注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。
// 如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制
var map = new Map(arr);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = map.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var key = _step.value;

		console.log(key);
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

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
	for (var _iterator2 = map.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		var value = _step2.value;

		console.log(value);
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

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
	for (var _iterator3 = map.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
		var item = _step3.value;

		console.log(item[0], item[1]);
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

/*Class*/

// 总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解

var Queue = function () {
	function Queue() {
		var contents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		_classCallCheck(this, Queue);

		this._queue = [].concat(_toConsumableArray(contents));
	}

	_createClass(Queue, [{
		key: 'pop',
		value: function pop() {
			var value = this._queue[0];
			this._queue.splice(0, 1);
			return value;
		}
	}]);

	return Queue;
}();

// 使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险


var PeekableQueue = function (_Queue) {
	_inherits(PeekableQueue, _Queue);

	function PeekableQueue() {
		_classCallCheck(this, PeekableQueue);

		return _possibleConstructorReturn(this, (PeekableQueue.__proto__ || Object.getPrototypeOf(PeekableQueue)).apply(this, arguments));
	}

	_createClass(PeekableQueue, [{
		key: 'peek',
		value: function peek() {
			return this._queue[0];
		}
	}]);

	return PeekableQueue;
}(Queue);

/*模块*/

// Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用import取代require
// import { func1, func2 } from 'moduleA';

// 使用export取代module.exports
/*
	import React from 'react';
	class Breadcrumbs extends React.Component {
	  render() {
	    return <nav />;
	  }
	};
	export default Breadcrumbs;
*/

// 如果模块只有一个输出值，就使用export default，如果模块有多个输出值，
// 就不使用export default，export default与普通的export不要同时使用。

// 不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）
// import myObject from './importModule';

// 如果模块默认输出一个函数，函数名的首字母应该小写
// function makeStyleGuide() {};
// export default makeStyleGuide;

// 如果模块默认输出一个对象，对象名的首字母应该大写
// const StyleGuide = {  es6: {} };
// export default StyleGuide;

/*ESLint 的使用*/

// ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码

// 安装 ESLint:
// $ npm i -g eslint

// 然后，安装 Airbnb 语法规则，以及 import、a11y、react 插件:
// $ npm i -g eslint-config-airbnb
// $ npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

// 最后，在项目的根目录下新建一个.eslintrc文件，配置 ESLint。
/*
	{
	  "extends": "eslint-config-airbnb"
	}
*/
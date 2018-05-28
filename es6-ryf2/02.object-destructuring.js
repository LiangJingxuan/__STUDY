/*2.对象的解构赋值*/

let {foo,bar}={foo:'aaa',bar:'bbb'};
// foo: aaa
// bar: bbb

let {baz}={foo:'aaa',bar:'bbb'};
// baz: undefined


// 如果变量名与属性名不一致，必须写成下面这样。
let {foo:baz}={foo:'aaa',bar:'bbb'};
// baz: 'aaa'

let obj={first:'hello',last:'world'};
let {first: f,last: l}=obj;
// f: hello
// l: world


// 与数组一样，解构也可以用于嵌套结构的对象。
let obj={p:['hello',{y:'world'}]};
let {p:[x,{y}]}=obj;
// x: hello
// y: world

// 下面是嵌套赋值的例子。
let obj={};
let arr=[];
({foo:obj.prop,bar:arr[0]}={foo:123,bar:true});
// obj: {prop:123}
// arr: [true]


// 默认值

let {x=3}={}; // x: 3

let {x,y=5}={x:1}; // x: 1 y: 5

let {x:y=3}={}; // y: 3

let {x:y=3}={x:5}; // y: 5

let { message: msg = 'Something went wrong' } = {}; // msg: "Something went wrong"



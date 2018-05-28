/*1.数组的解构赋值*/

let [a,b,c]=[1,2,3];

let [foo,[[bar],baz]]=[11,[[2],3]];

let [,,third]=['foo','bar','baz'];

let [x,,y]=[1,2,3];

let [head,...tail]=[1,2,3,4];
// head: 1
// tail: [2,3,4]


let [xx,yy,...zz]=['a']; // 如果解构不成功，变量的值就等于undefined。
// xx: a
// yy: undefined
// zz: []


// 另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
let [xxx,yyy]=[1,2,3];
// xxx: 1
// yyy: 2

let [aa,[bb],cc]=[1,[2,3],4];
// aa: 1
// bb: 2
// cc: 4

// 例:
for(let [i,len]=[0,5];i<len;i++){
	console.log(i);
}


// 默认值
let [j=true]=[];

let [q,k='b']=['a'];

let [w,o='b']=['a',undefined];

let [l=1]=[null]; // l: null

let [ll=2]=[undefined]; // ll: 2
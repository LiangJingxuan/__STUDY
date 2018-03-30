// 事件
const EventEmitter = require('events').EventEmitter,
    event = new EventEmitter();

event.on('someEvent',function(){
    console.log('some event ... ...');
});

setTimeout(function(){
    event.emit('someEvent');
},1000);
// 异步读取文件
const F = require('fs');
F.readFile('test.txt','utf8',function(err,res){
    if(err){
        console.log(err);
    }else{
        console.log(res)
    }
});

// 同步读取文件
console.log(F.readFileSync('test.txt','utf8'));



console.log(1);


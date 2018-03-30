// 创建一个服务器
const HTTP = require('http');
HTTP.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h1>hello node ... ... ...</h1>');
    res.end();
}).listen(3000);

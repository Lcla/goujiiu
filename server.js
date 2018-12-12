'use strict';
const express=require('express');
var proxy=require('http-proxy-middleware');

let app=express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});


 //代理服务器
  app.use('/api',proxy({
    'target':'http://m.gjw.com/BtCApi/Home/',      
    'changeOrigin':true,
    'pathRewrite':{
        '^/api':'/'
    }
}))


app.listen(3004,function(){
    console.log('服务器已开启  http://location:3004')
})

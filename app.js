var fs=require('fs');
var http =require('http');
var template=require('art-template');
var url =require('url');
var comment=[
    {
        name:'三',
        message:'睡觉',
        dateTime:'2020/02/02'
    },
    {
        name:'四',
        message:'吃饭',
        dateTime:'2020/02/02'
    },
    {
        name:'五',
        message:'打豆豆',
        dateTime:'2020/02/02'
    },
    {
        name:'hi6666',
        message:'全干',
        dateTime:'2020/02/02'
    },
]
//  /pinglun?name=123&message=123123
http.createServer(function(req,res){
    //使用url.parse 方法将路径解析为一个方便操作的对象，第二个参数为true，表示将查询字符串转为对象(通过query属性来访问)

    var parseObj=url.parse(req.url,true);
//单独获取不包含查询字符串的路径部分(该路径不包含?之后的那些内容)
    var pathName= parseObj.pathname;
    // var url =req.url;
    if(pathName === '/'){
        fs.readFile('./view/index.html',function(err,data){
            if(err){
                return res.end('404')
            }
           var htmlStr= template.render(data.toString(),{
                comment:comment
            })
            res.end(htmlStr)
        })  
    }else if(pathName === '/post'){
        fs.readFile('./view/post.html',function(err,data){
            if(err){
                return res.end('404')
            }
            res.end(data)
        })
    } else if( pathName.indexOf('/public/') === 0){
        //开放资源
        // public/css/main.css
        // public/js/main.js
        // public/img/hh.jpg
// 统一处理
// 如果请求路径是以 /public/开头的， 则就认为 需要获取public里面的某一个资源 ，我们就可以把请求路径当做文件路径直接读取
        console.log(pathName)
        fs.readFile('.'+pathName,function(err,data){
            if(err){
                return res.end('404')
            }
            res.end(data)
        })
    }else if(pathName === '/pinglun'){
//注意：这个时候无论/pinglun 之后是是你们  都不需要考虑了  pathName 是不含?之后的那个路径
console.log('收到请求的了')
        // 这里已经成功的接收到数据  使用的url的parse方法把路径的中的查询字符串解析成一个对象了
        // res.end(JSON.stringify(parseObj.query));
        //所以接下来要做的是
            // 1.获取表单提交的数据
            // 2.生成日期到数据对象，然后存储到数组中
            // 3.让用户重定向跳转到首页 /
            //     当用户重新请求 / 的时候， 数组中的数据已经发生变化了，所以用户看到的界面也就变了
       var com=parseObj.query;
       com.dateTime='2030/02/02';
       comment.unshift(com);
       //服务端存储数据后，然后重新请求 / 页面，就可以实现添加后的数据了
       
       // 1. 302 临时重定向 ,301 永久重定向
    //    statusCode
    //    2.在响应头中通过location 告诉客户端 往哪重定向
    // setHeader
        res.statusCode= 302;
        res.setHeader('Location','/')
        res.end();



    }else{
        //404处理
        fs.readFile('./view/404.html',function(err,data){
            if(err){
                return res.end('404')
            }
            res.end(data)
        })
    }
    
})
.listen(3000,function(){
    console.log('运行成功')
})
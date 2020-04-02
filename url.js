var url=require('url');
var obj=url.parse('/pinglun?name=123&message=123123',true);
console.log(obj);
console.log(obj.query)
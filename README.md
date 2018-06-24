## Solution for Social Media APP/Web

## Database Design
[Relational Database Solutions](https://blog.csdn.net/u011035407/article/details/78592787), for this solution, how to implement comments of comments?<br>
Using NoSQL: json string is more extendible than relations.<br>
MongoDB & Redis: MongoDB for long-term storage and Redis for caching?

## Editor
Docs: https://www.kancloud.cn/wangfupeng/wangeditor3/335782 <br>
The output of this editor is HTML format, so in case of Cross SiteScript (xss), the front-end must call htmlspecialchars_decode()(for PHP developer) or use this library: "https://cdn.bootcss.com/js-xss/0.3.3/xss.js" (for js developer) before posting to the database.
```js
<script src="https://cdn.bootcss.com/js-xss/0.3.3/xss.js"></script>
<script>
    var html = filterXSS('<script>alert(123)<\/script>');
    alert(html);
    //output：&lt;script&gt;alert(123)&lt;/script&gt;
</script>
```

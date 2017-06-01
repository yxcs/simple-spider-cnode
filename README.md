### 一个简单的爬取[http://cnodejs.org](http://cnodejs.org)文章的小爬虫

使用node爬取

同时使用了node的**async**、**cheerio**、**request**插件,用mongodb存储一下爬取下来的数据 

通过page参数，设置爬取的页数，默认的是爬3页：
``` javascript
var page = 3;    // 设置读取多少页
```
#### 运行

```shell
git clone https://github.com/yxcs/simple-spider-cnode.git 
npm install 
npm start 
```

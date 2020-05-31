var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号 8888");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  response.statusCode = 200;
  // 默认主页
  const filePath = path === "/" ? "/index.html" : path;
  const index = filePath.lastIndexOf(".");
  const suffix = filePath.substring(index);
  const fileType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "text/json",
    ".xml": "text/xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };
  response.setHeader(
    "Content-Type",
    `${fileType[suffix] || "text/html"};charset=utf-8`
  );
  let content;
  try {
    content = fs.readFileSync(`./public${filePath}`);
  } catch (error) {
    content = "错误,文件不存在";
    response.statusCode = 404;
  }
  response.write(content);
  response.end();
  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log("监听 " + port + " 成功\n预览请打开页面 http://localhost:" + port);

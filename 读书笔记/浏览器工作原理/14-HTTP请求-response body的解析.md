# HTTP请求-response body的解析

- Response的body可能根据Content-Type有不同的结构，因此我们会采用子Parser的结构来解决问题

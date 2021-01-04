# HTTP请求-response解析

- Response必须分段构造，所以我们要用一个ResponseParser来'装配'
- ResponseParser分段处理ResponseText，我们用状态机来分析文本的结构
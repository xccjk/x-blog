## <script>、<script async>、<script defer>的区别

### script

执行流程：

1. 解析HTML
2. 解析到<script>标签后，加载远端JavaScript脚本
3. 脚本加载完成后，执行JavaScript脚本，HTML停止解析
4. 继续解析后面的HTML

### script async

执行流程：

1. 解析HTML
2. 解析到<script async>标签后，加载远端JavaScript脚本同时解析HTML
3. 脚本加载完成后，执行JavaScript脚本，HTML停止解析
4. 继续解析后面的HTML

### script defer

执行流程：

1. 解析HTML
2. 解析到<script defer>标签后，加载远端JavaScript脚本同时解析HTML
3. 脚本加载完成后，继续解析HTML
4. HTML解析完成后，执行加载的JavaScript脚本

<img src="/Users/xujinkai/Desktop/xcc/blog/Html/image/image.png" />


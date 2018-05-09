# 踩坑记录 #

1.当你尝试使用 extract-text-webpack-plugin 来提取css单独成一个文件时，可能会报错

> chunk.sortModules is not a function

解决方案：
回退 extract-text-webpack-plugin 版本至2.1.2

```
	npm i extract-text-webpack-plugin@2.1.2 -D
```

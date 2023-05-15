#!/bin/bash

#判断文件是否存在
if [ -f "package.md5" ]; then
  echo "文件已经存在"
else
  echo "文件不存在,需要重新安装依赖"
  yarn install
  #把文件的md5值写入到目标文件中
  md5sum package.json >package.md5
fi

#检查md5sum是否有变更
if (md5sum -c --status package.md5); then
  echo "package.json未修改"
else
  echo "package.json发生修改，需要重新安装依赖"
  yarn install
  md5sum package.json >package.md5
fi

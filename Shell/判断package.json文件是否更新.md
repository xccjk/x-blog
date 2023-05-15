#!/bin/bash

set -e

echo node版本: $(node -v)
echo npm版本: $(npm -v)
echo yarn版本: $(yarn -v)
echo 当前时间: "$(date +%Y-%m-%d,%H:%m:%S)"

#获取当前分支和标签名
function current_branch() {
  local folder="$(pwd)"
  [ -n "$1" ] && folder="$1"
  git -C "$folder" rev-parse --abbrev-ref HEAD | grep -v HEAD ||
    git -C "$folder" describe --exact-match HEAD ||
    git -C "$folder" rev-parse HEAD
}

#获取commit id
current_git_branch_latest_id=$(git rev-parse HEAD)

#获取分支提交数
current_branch_commit_num=$(git log --oneline | wc -l)

echo 当前分支: $(current_branch)

echo 分支commit id: $current_git_branch_latest_id

echo 分支提交次数: $current_branch_commit_num

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

yarn build

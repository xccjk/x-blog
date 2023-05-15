#飞书通知
JOB_URL="${JENKINS_URL}job/${JOB_NAME}"
getBuildState(){
  buildNr=$1
  curl -u username:password  ${JOB_URL}/${buildNr}/api/json |grep -Po '"result":\s*"\K\w+'
}
state=$(getBuildState ${BUILD_NUMBER}  )
JENKINS_URL=$JENKINS_URL
JOB_NAME=$JOB_NAME
GIT_BRANCH=$GIT_BRANCH
nowTime=$(date "+%Y-%m-%d %H:%M:%S")

if [[ "${state}" == "SUCCESS" ]] ; then
   curl -X POST -H "Content-Type: application/json" \
        -d '{
          "msg_type":"post",
          "content": {
            "post": {
              "zh_cn": {
                "title": "发布成功",
                "content": [
                  [
                    {"tag": "text", "text": "'"应用：$JOB_NAME\n"'"},
                    {"tag": "text", "text": "'"分支："'"},
                    {"tag": "a", "href": "'"$GIT_URL"'", "text": "'"$GIT_BRANCH\n"'"},
                    {"tag": "text", "text": "'"状态：成功\n"'"},
                    {"tag": "text", "text": "'"构建："'"},
                    {"tag": "a", "href": "'"${JOB_URL}/${buildNr}"'", "text": "'"$BUILD_DISPLAY_NAME\n"'"},
                    {"tag": "text", "text": "'"日期：$nowTime\n"'"}
                  ]
                ]
              }
            }
          }
        }' \
https://open.feishu.cn/open-apis/bot/v2/hook/xxx
else
   curl -X POST -H "Content-Type: application/json" \
        -d '{
          "msg_type":"post",
          "content": {
            "post": {
              "zh_cn": {
                "title": "发布失败",
                "content": [
                  [
                    {"tag": "text", "text": "'"应用：$JOB_NAME\n"'"},
                    {"tag": "text", "text": "'"分支："'"},
                    {"tag": "a", "href": "'"$GIT_URL"'", "text": "'"$GIT_BRANCH\n"'"},
                    {"tag": "text", "text": "'"状态：失败\n"'"},
                    {"tag": "text", "text": "'"构建："'"},
                    {"tag": "a", "href": "'"${JOB_URL}/${buildNr}"'", "text": "'"$BUILD_DISPLAY_NAME\n"'"},
                    {"tag": "text", "text": "'"日期：$nowTime\n"'"}
                  ]
                ]
              }
            }
          }
        }' \
https://open.feishu.cn/open-apis/bot/v2/hook/xxx
 
fi

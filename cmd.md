./go/go && docker restart vuepress && docker exec -t vuepress yarn build && git add . && git commit -m "update" && git push
./go/go && docker restart vuepress &&  git add . && git commit -m "update" && git push

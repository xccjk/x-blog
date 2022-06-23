git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; echo "${remote#origin/}"; git checkout "${remote#origin/}"; git pull; done
git fetch --all
git pull --all
git remote set-url origin $1
git push --all
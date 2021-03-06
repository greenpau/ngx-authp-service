# Developer Notes

## Release

Format prior to committing:

```bash
ng lint
npm run format:write
ng test
```

Prior to release, increment version in `projects/ngx-authp-service/package.json`.

```bash
cat README.md > projects/ngx-authp-service/README.md
versioned --source projects/ngx-authp-service/package.json --patch
NPM_PKG_VER=(`cat ./projects/ngx-authp-service/package.json | jq -r .version`)
git add .
git commit -m "release v${NPM_PKG_VER}"
```

Then, run the following commands to tag and release:

```bash
npm run package
NPM_PKG_VER=(`cat ./projects/ngx-authp-service/package.json | jq -r .version`)
git tag -a v${NPM_PKG_VER} -m "v${NPM_PKG_VER}"
git push
git push --tags
```

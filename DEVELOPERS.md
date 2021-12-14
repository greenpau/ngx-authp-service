# Developer Notes

## Release

Format prior to committing:

```bash
ng lint
npm run format:write
```

Prior to release, increment version in `projects/ngx-authp-service/package.json`.

Then, run the following commands to tag and release:

```bash
npm run package
NPM_PKG_VER=(`cat ./projects/ngx-authp-service/package.json | jq -r .version`)
git tag -a v${NPM_PKG_VER} -m "v${NPM_PKG_VER}"
git push
git push --tags
```

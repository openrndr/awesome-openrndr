Things to show:

- [x] sort by last commit date
- [x] archived
- [ ] commits ahead and behind:

```
$ curl https://github.com/hamoid/openrndr-template/ | grep "This branch is "
```

- [ ] num of .kt files
- [ ] num of "fun main"

```
$ ag --kotlin "fun main" --stats-only src/main/kotlin/
84 files contained matches
114 files searched
```

- [x] if fork, show name only if it differs from the original branch
- [ ] if fork, show repo only if ahead. 
- [x] create a file where to maintain local descriptions in this repo, which would replace
  the descriptions from the actual repos. In case the original one is not clear enough
  in this context, or it's the default one.
- [x] days since last update 

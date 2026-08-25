# Changesets

릴리즈에 포함할 변경에는 다음 명령으로 changeset을 추가합니다.

```sh
corepack yarn changeset
```

changeset이 포함된 커밋이 `main`에 직접 반영되면 GitHub Actions가 버전 커밋과 태그를 같은 트리에 추가하고 GitHub Release를 발행합니다. changeset이 없으면 새 버전과 태그를 만들지 않으며, npm에는 배포하지 않습니다.

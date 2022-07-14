# Project unnamed
```
프로젝트 및 문서 미완성.
```

## Git Commit Prefix
```
기본적으로 Conventional Commits 1.0.0 규약을 따름
```

---
### Type
```shell
feat: - 기능 추가
fix: - 에러 수정 
docs: - 문서 작성
refactor: 리펙토링
chore: - 기타 기능 관련없는 코드 수정
test: - 테스트 관련
# ex) git commit -am 'feat: new button'
```
---
<br>

## Issue 
```
Github의 Issue를 사용하고 우선순위와 라벨을 붙혀 등록을 해놓습니다.
처리한 이슈는 Close 처리합니다.
```
---
<br>

## Test
```
TDD(Test Driven Development)를 기본 원칙으로 함  
```
---


### Unit Test
> Jest
```shell
$ npm run test
```

### E2E Test
> Cypress

```shell
$ npm run cypress
```
<br>

---

## CSS
> Tailwind CSS를 사용합니다.
각 Component 및 Page 내부의 ClassName에 위치하는 것이 기본.
적용이 쉽고 좋으나 가독성이 마냥 좋지많은 않음.
---
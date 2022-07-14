# Project unnamed
```
프로젝트 및 문서 미완성.
```

## Git Commit Prefix
###### 기본적으로 Conventional Commits 1.0.0 규약을 따름
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

## Issue 

---
Github의 Issue를 사용하고 우선순위와 라벨을 붙혀 등록을 해놓습니다.
처리한 이슈는 Close 처리합니다.

## Test  

---
TDD(Test Driven Development)를 기본 원칙으로 함  

### Unit Test

```shell
$ npm run test
```

> ##### 규칙
> 1. 모든 함수는 최소 1개의 단위 테스트가 있어야 합니다.
> 2. 하나의 테스트에 하나의 기능만 검증합니다. 
> 3. 함수가 테스트 하기 어렵다면 테스트 하기 쉽게 분리하고 변경합니다. 

### E2E Test
평소 사용하던 Cypress를 사용합니다.

```shell
$ npm run cypress
```

## CSS

---
Tailwind CSS를 사용합니다.
각 Component 및 Page 내부의 ClassName에 위치하는 것이 기본.

적용이 쉽고 좋으나 가독성이 마냥 좋지많은 않음.

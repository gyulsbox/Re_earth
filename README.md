<p align='center'>
  <img src="https://user-images.githubusercontent.com/85726838/181292321-519f5b3a-a3c0-4fe8-9016-961eed30f70c.png" width=80% alt='logo'/>
</p>

<div align='center'>
  <img src='https://img.shields.io/badge/Next-v12.2.3-black?style=flat-square&logo=Next.js'/>
  <img src='https://img.shields.io/badge/React-v18.2.0-blue?style=flat-square&logo=React'/>
  <img src="https://img.shields.io/badge/TypeScript-v4.7.4-3178C6?style=flat-square&logo=TypeScript&logoColor=#3178C6" alt="TypeScript badge" />
  <img src="https://img.shields.io/badge/TailwindCSS-v3.1.3-teal?style=flat-square&logo=Tailwind CSS&logoColor=#CA4245" alt="react-router badge" />
  <img src="https://img.shields.io/badge/Prisma-v3.15.2-white?style=flat-square&logo=Prisma" />
  <img src="https://img.shields.io/badge/Cypress-v10.3.0-DB7093?style=flat-square&logo=Cypress&logoColor=#DB7093" alt="styled-components badge" />
  <img src="https://img.shields.io/badge/Jest-v28.1.2-DB7093?style=flat-square&logo=Jest&logoColor=#0055FF" alt="Framer badge" />
  <br />
  <img src="https://img.shields.io/badge/-React--hook--form--v7.32.3-gray?style=flat-square&" />
  <img src="https://img.shields.io/badge/-React--dom--v18.2.0-gray?style=flat-square&" />
  <img src="https://img.shields.io/badge/-React--loading--skeleton--v3.1.0-gray?style=flat-square&" />
  <img src="https://img.shields.io/badge/-Remark--html--v15.0.1-gray?style=flat-square&"/>
  <img src="https://img.shields.io/badge/-Remark--parse--v10.0.1-gray?style=flat-square&" />
  <br />
  <img src="https://img.shields.io/badge/-SWR--v1.3.0-gray?style=flat-square&" />
  <img src="https://img.shields.io/badge/-TS--node--v10.8.1-gray?style=flat-square&" />
  <img src="https://img.shields.io/badge/-Twilio--v3.77.3-gray?style=flat-square&"/>
  <img src="https://img.shields.io/badge/-Nodemailer--v6.7.5-gray?style=flat-square&" />
  <img src="https://img.shields.io/badge/-Unified--v10.1.2-gray?style=flat-square&" />
  <img src="https://img.shields.io/badge/-Iron--Session--v6.1.3-gray?style=flat-square&" />
  <img src="https://img.shields.io/badge/-Gray--Matter--v4.0.3-gray?style=flat-square&"/>
  
  <br />
  <br />                                                                              
  <a href='https://re-earth.vercel.app/'> -->🏠<--</a>                                                                             
</div>

# Description                                                                                
> 22.06.20 ~ ing
  ```
- Next.js & TypeScript를 활용하여 개발 진행
- Next를 통한 API 구현
- SWR를 통한 데이터 패칭
- Tailwind CSS를 통한 CSS 구현
- Prisma + PlanetScale 통한 Serverless DB 구현
- CloudFlare 통한 이미지 및 영상 관리
- Vercel 배포
  ```
  

```
History
220620 Project Unnamed 시작.
220723 프로토타입 완성 및 vercel 배포.
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
## Structure  
```
└─── src
    │
    │  middleware.tsx
    │  
    ├─── Pages
    │   ├─── _app.tsx
    │   ├─── _document.tsx
    │   ├─── enter.tsx
    │   ├─── index.tsx
    │   │ 
    │   ├─── Api
    │   │   ├─── files.ts
    │   │   ├─── reviews.ts
    │   │   │
    │   │   ├─── chats
    │   │   │      ├─── index.ts
    │   │   │      └─── [id]
    │   │   │             └─── index.ts
    │   │   │
    │   │   ├─── posts
    │   │   │      ├─── index.ts
    │   │   │      └─── [id]
    │   │   │             ├─── index.ts
    │   │   │             ├─── comment.ts
    │   │   │             └─── empathy.ts  
    │   │   │
    │   │   ├─── products
    │   │   │      ├─── index.ts
    │   │   │      └─── [id]
    │   │   │             ├─── index.ts
    │   │   │             ├─── comment.ts
    │   │   │             └─── wish.ts  
    │   │   │
    │   │   ├─── stream
    │   │   │      ├─── index.ts
    │   │   │      └─── [id]
    │   │   │             ├─── index.ts
    │   │   │             └─── messages.ts
    │   │   │
    │   │   └─── users
    │   │          ├─── confirm.ts
    │   │          ├─── enter.ts
    │   │          ├─── signin.ts
    │   │          ├─── signup.ts  
    │   │          └─── me
    │   │                 ├─── index.ts
    │   │                 └─── record.ts
    │   │
    │   ├─── Blog
    │   │       ├─── index.tsx
    │   │       └─── [slug].tsx
    │   │
    │   ├─── Chats
    │   │       ├─── index.ts
    │   │       └─── [id]
    │   │             └─── index.ts
    │   │
    │   ├─── Community
    │   │      ├─── index.tsx
    │   │      ├─── write.tsx
    │   │      └─── [id].tsx  
    │   │
    │   ├─── Products
    │   │      ├─── upload.tsx
    │   │      └─── [id].tsx
    │   │
    │   ├─── Profile
    │   │      ├─── index.tsx
    │   │      ├─── edit.tsx
    │   │      ├─── purchased.tsx 
    │   │      ├─── wishlist.tsx
    │   │      └─── sold.tsx
    │   │
    │   └─── Stream
    │          ├─── index.tsx
    │          ├─── create.tsx
    │          └─── [id].tsx
    │
    ├─── Components
    │   │   ├─── button.tsx
    │   │   ├─── float-button.tsx
    │   │   ├─── input.tsx
    │   │   ├─── item.tsx
    │   │   ├─── message.tsx
    │   │   ├─── pagination.tsx
    │   │   ├─── product-list.tsx
    │   │   └─── textarea.tsx
    │   │
    │   └─── layouts
    │          ├─── layout.tsx
    │          ├─── backButton.tsx
    │          └─── bottomNavBar.tsx
    │
    ├─── libs
    │   ├─── client
    │   │      ├─── useCoords.ts
    │   │      ├─── useMutation.ts
    │   │      ├─── useUser.ts
    │   │      └─── utils.ts
    │   │
    │   └─── server
    │          ├─── client.ts
    │          ├─── email.ts
    │          ├─── withHandler.ts
    │          └─── withSession.ts
    │
    ├─── Public
    │   │   ├─── favicon.ico
    │   │   └─── vercel.svg
    │   │
    │   └─── static
    │          └─── logos.png
    │
    ├─── Prisma
    │  ├─── schema.prisma
    │  └─── seed.ts
    │
    ├─── Styles
    │  └───   globals.css
    │
    ├─── Posts
    │  ├─── 01-first-post.md
    │  ├─── 02-work-thought.md
    │  ├─── 03-gym-time.md
    │  └─── 04-weight-down.md
    │
    ├─── Cypress
    │
    └─── Tests
        └─── unit
            └─── pages
               └─── home.spec.tsx

```

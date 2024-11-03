# SSAFYNEWS 📰

> Vue 3 기반 개인 맞춤형 뉴스 큐레이팅 서비스

SSAFY 개인 맞춤형 뉴스 서비스는 AI 기반 뉴스 추천 기능을 통해 사용자의 취향에 맞춘 다양한 뉴스를 제공하며, 뉴스 기반 ai 챗봇 기능을 제공합니다.




## 🌟 주요 기능

- **회원가입 및 로그인**: 개인 맞춤형 뉴스 큐레이팅 기능

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/aa2e92c8-d4ac-46e6-aa09-36e73c9bd352" alt="image" width="500"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/dd88eafa-13e4-4a77-b9b7-479ccbbcefa8" alt="image" width="500"/>
    </td>
  </tr>
</table>

- **AI 맞춤 뉴스 추천**: 개인 맞춤형 뉴스 큐레이팅 기능 : 카테고리별, 최신순/추천순 필터링 
 <img width="1512" alt="image" src="https://github.com/user-attachments/assets/b16c92cb-1bad-45db-9fd9-92ae706aa571">
- **뉴스 상세 페이지**: 글을 '좋아요'하여 저장할 수 있으며, 사이드바에 글과 관련된 뉴스가 표시됩니다.
 <img width="1512" alt="image" src="https://github.com/user-attachments/assets/ab9a2093-bf6f-448f-bec7-d6348053fd15">

- **뉴스 ai 챗봇**: 뉴스에 대해 ai와 대화할 수 있습니다.
- <img width="1011" alt="image" src="https://github.com/user-attachments/assets/4cb07452-6010-47a3-b8eb-ea057ed32fc7">

- **커뮤니티 게시판**: 글/댓글 작성 가능, 맞춤 뉴스가 추천됩니다.
 <table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/e699f5f6-ac01-4e09-85a1-2feaba6d58b7" alt="image" width="500"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/5c0cd489-ad24-4647-acce-336101f54f4f" alt="image" width="500"/>
    </td>
  </tr>
</table>
- **게시판 글작성**: 카테고리 및 해시태그 설정 가능
  <img width="1503" alt="image" src="https://github.com/user-attachments/assets/05b68bbd-ea6b-4ec1-bbfc-944490d847f6">

- **대시보드**: 개인의 활동을 시각화한 대시보드입니다.
  - 나의 관심 카테고리 : 사용자가 주로 읽은 카테고리를 시각화
  - 주요 키워드 : 사용자가 관심있게 본 뉴스 기사들에서 많이 등장한 핵심 키워드 추출
  - 주간 읽은 기사 : 최근 일주일동안 하루에 몇개의 기사를 읽었는지 시각화
  - 좋아요 누른 기사 : 사용자가 좋아요한 기사들을 한번에 모아 확인 
<img width="1206" alt="image" src="https://github.com/user-attachments/assets/12b5a052-9245-4a51-a094-c709846fecc2">

---

## 🚀 시작하기

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Node.js install

이 프로젝트를 실행하려면 [Node.js](https://nodejs.org/)가 필요합니다. 설치가 되어 있지 않다면 [여기](https://nodejs.org/)에서 다운로드 및 설치를 진행해 주세요.

## clone this project

```sh
git clone https://github.com/surfers-ai/ssafy-custom-news-frontend.git
cd ssafy-custom-news-frontend
```

## Project Setup

프로젝트의 종속성을 설치합니다.

```sh
npm install
```

## .env 파일 생성 및 환경변수 설정

```sh
VITE_BASE_URL='http://api.ssafy-ds-pjt.com:8000'
```

### Compile and Hot-Reload for Development

개발 환경에서 프로젝트 실행

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

타입 확인, 컴파일, 코드 압축을 포함하여 프로젝트를 프로덕션 환경에 맞게 빌드

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

eslint 실행 명령어

```sh
npm run lint
```

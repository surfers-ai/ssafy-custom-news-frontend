# 16주차 관통 PJT: 백엔드&프론트엔드 프로젝트 구축(Vue와 Django)

> **목적: 학생들이 뷰와 장고를 활용하여 카프카와 플링크가 내부적으로 돌아가는 프론트와 백앤드를 구축한다**
>
> 세부사항:
>
> - 뷰와 장고는 학생들이 앞 단에서 배운 내용들만 가능하면 사용해야 한다.
>   - 이 부분은 지난 번 만들었던 최종 결과물에서 커뮤니티와 기사 주제로 대화 기능 제거
> - 데이터가 처리되는 것을 시각화 해야한다
>   - 예를들어, 새로고침 버튼을 누르면 RSS를 활용하여 새로운 데이터가 적재되고, 카프카와 플링크가 동작하여 뉴스 기사가 새롭게 화면에 뷰잉되어야 한다.

## 목차

1. 프로젝트 설치
2. 실행 및 백엔드 연동 확인

## 1. 프로젝트 설치

### 1.1. Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### 1.2.Node.js 설치

이 프로젝트를 실행하려면 [Node.js](https://nodejs.org/)가 필요합니다. 설치가 되어 있지 않다면 [여기](https://nodejs.org/)에서 다운로드 및 설치를 진행해 주세요.

### 1.3.저장소 클론

```sh
git clone https://github.com/surfers-ai/ssafy-custom-news-frontend.git
cd ssafy-custom-news-frontend
```

### 1.4. npm 종속성 설치

프로젝트의 종속성을 설치합니다.

```sh
npm install
```

### 1.5. .env 파일 생성 및 환경변수 설정

```sh
VITE_BASE_URL='http://localhost:8000'
```

## 2. 실행 및 백엔드 연동 확인

### 2.1. 개발 환경에서 프로젝트 실행

```sh
npm run dev
```

### 2.2. (optional) eslint 실행 [ESLint](https://eslint.org/)

eslint 실행 명령어

```sh
npm run lint
```


### 2.3. 배포 환경에서 프로젝트 빌드 및 실행

타입 확인, 컴파일, 코드 압축을 포함하여 프로젝트를 프로덕션 환경에 맞게 빌드

```sh
npm run build
npm run start
```

### 2.4. 브라우저에서 백엔드와 연동 확인
개발환경 url (http://localhost:5173), 배포환경 url (http://localhost:4173) 에 접속해 데이터가 잘 보이는지 확인

메인 페이지
<img width="1439" alt="image" src="https://github.com/user-attachments/assets/3f4c3820-8124-4e97-84f2-fd981b3b2b83" />

대시보드 페이지
<img width="1352" alt="image" src="https://github.com/user-attachments/assets/591d7627-6b27-4e99-982a-214efe6f8835" />




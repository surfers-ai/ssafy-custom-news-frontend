# 18주차 관통 PJT: 맞춤형 큐레이션을 위한 추천시스템 구현(OpenAI + Vector Search)

> **목적: 생성형 AI를 사용하기 위한 큐레이션 시스템 구현한다**
>
> 세부사항:
> - Postgresql을 사용해서 진행
> - 사전에 Postgresql을 배울 때 여기서 사용할 것이라고 명확한 안내 필요

## 목차

1. 최신순, 추천순 UI 확인
2. latest, recommend 옵션과 함께 /news-list 요청되는지 확인

## 1. 최신순, 추천순 UI 확인
아래 명령어 실행 후 http://localhost:5173/news 주소로 접속해 최신순, 추천순 UI 확인

```bash
npm i
npm run dev
```

<img width="1344" alt="image" src="https://github.com/user-attachments/assets/4cbf36ed-bca9-4002-b224-9bdcad78073e" />

<img width="369" alt="image" src="https://github.com/user-attachments/assets/8e251397-0e1c-40c6-b783-35f5f53488cc" />



## 2. latest, recommend 옵션과 함께 /news-list 요청되는지 확인

최신순, 추천순 옵션에 따라 뉴스 목록이 달라지는지 확인합니다.

<img width="1467" alt="image" src="https://github.com/user-attachments/assets/d41b8061-510e-44f8-987f-cdf867478e70" />

<img width="1374" alt="image" src="https://github.com/user-attachments/assets/15a2905a-65fc-4ccc-9aaf-7e3f292c46b0" />



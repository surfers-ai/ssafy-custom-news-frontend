# Node.js 이미지를 기반으로 설정
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 프로젝트 파일 복사
COPY package*.json ./
COPY . .

# 의존성 설치 및 프로젝트 빌드
RUN npm install
RUN npm run build

# 프로덕션 환경을 위한 서버 설치
RUN npm install -g serve

# 컨테이너 실행 시 실행할 명령어
CMD ["serve", "-s", "dist", "-l", "4173"]

# 4173 포트 노출
EXPOSE 4173
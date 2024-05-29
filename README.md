# Klin TF

## Intellij IDEA 기반으로 설명 (Windows)

### 형상 관리 (예정)

- GitLab

### 배포 관리 (예정)

- GitLab CI/CD

### javascript runtime

- Node.js : ^20.11.1

### 빌드 도구

- Vite : ^5.2.7

### 패키지 매니저

- yarn : ^1.22.21

### Framework & Library

- Vue.js : ^3.4.21
- Vuetify : ^3.5.13

### 로컬 환경 기본 설치 정보

#### Intellij IDEA 설정

- 관리자 권한으로 실행 할 수 있도록 설정

#### git 설정

- git 설치
  - https://git-scm.com/downloads

#### node 설정

- nvm 설치

  - https://github.com/coreybutler/nvm-windows

- node 20 설치 및 사용
  - nvm install 20
  - nvm use 20

#### yarn

- yarn 설치
  - npm install --location=global yarn

#### node 모듈 설치

- yarn.lock 을 이용한 설치
  - yarn install

#### local(development) 환경 실행

- yarn dev

#### npm

- npm 설치
  - node 설치하면 자동 설치됨

#### node 모듈 설치

- [npm install] or [npm i]

#### local(development) 환경 실행

- npm run dev

#### Dialog

- 다이얼로그 예제 /src/components/dialog
- [대, 중, 소]

#### Style

- @/plugins/vuetify.js 설정파일
- @/plugins/vuetify/theme.js 색상
- @/plugins/vuetify/defaults.js 기본 컴포넌트 스타일 변경

#### validation rules

- @/utils/validationRules.js

#### 다국어(사용안함으로 결론)

- @/utils/i18n.js
- 화면에서 사용시 $t('login.username')


#### 목록 상단 검색(공통)

- @/pages/common-search.vue(참고용)
- 호출하는 컴포넌트에서 배열로 타입과 항목 넘겨줌
- input, select만 우선 추가
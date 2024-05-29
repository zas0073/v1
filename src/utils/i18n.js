// src/i18n.js
import { createI18n } from "vue-i18n";

// 메시지 정의
const messages = {
  en: {
    welcome: "Welcome",
    login: {
      username: "Username",
      password: "Password",
      signIn: "Sign In",
      backToHome: "Back To Home",
    },
  },
  ko: {
    welcome: "환영합니다",
    login: {
      username: "사용자 이름",
      password: "비밀번호",
      signIn: "로그인",
      backToHome: "홈으로 돌아가기",
    },
  },
  // 다른 언어 추가
};

// i18n 인스턴스 생성
const i18n = createI18n({
  locale: "ko", // 기본 언어 설정
  messages,
});

export default i18n;

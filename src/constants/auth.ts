export enum EAuthStatus {
  incorrect_password = 1,
  no_user = 2,
}

export enum EUserStatus {
  // 登录状态
  loginEd = 2,
  // 登出状态
  loginOut = 1,
}

export const AUTH_MESSAGE = {
  NO_USER: "用户未注册",
  INCORRECT_PASSWORD: "账号密码不正确",
  INCORRECT_CAPTCHA: "图形验证码输入不正确",
};

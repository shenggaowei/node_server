// 图形验证码服务
import { CaptchaObj, create } from "svg-captcha";

// 创建验证码
export const createCaptcha = (): CaptchaObj => {
  const captcha = create({
    width: 130,
    height: 30,
  });
  return captcha;
};

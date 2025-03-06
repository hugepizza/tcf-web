export function handleErrorCode(code: number) {
  let message = "";
  switch (code) {
    case 1009:
      message = "用户名不存在";
      break;
    case 1059:
      message = "用户已被禁用";
      break;
    case 1065:
      message = "验证码错误";
      break;
    case 1010:
      message = "密码错误";
      break;
    case 1076:
      message = "帐号被暂时锁定, 修改密码即可解锁";
      break;
    case 1075:
      message = "登陆链接已发送至邮箱, 点击链接即可登陆";
      break;
    case 1073:
      message = "请绑定邮箱后使用";
      break;
    case 1074:
      message = "验证码已发送至邮箱, 填写验证码登陆";
      break;
    case 1077:
      message = "链接已过期, 请重新获取";
      break;
  }
  return {
    code,
    message: message,
  };
}

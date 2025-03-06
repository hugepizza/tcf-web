export class BizError extends Error {
  public code: number;
  public name = 'BizError';

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export class VerificationCodeNotFoundError extends BizError {
  constructor() {
    super(10000, 'Verification code not found');
  }
}

export class VerificationCodeExpiredError extends BizError {
  constructor() {
    super(10001, 'Verification code expired');
  }
}

export class VerificationCodeUsedError extends BizError {
  constructor() {
    super(10002, 'Verification code used');
  }
}

export class EmailRegisteredError extends BizError {
  constructor() {
    super(10003, 'Email registered');
  }
}

export class PasswordError extends BizError {
  constructor() {
    super(10004, 'Password error');
  }
}

export class UserSuspendedError extends BizError {
  constructor() {
    super(10005, 'User suspended');
  }
}

export class UserAwaitingResetPasswordError extends BizError {
  constructor() {
    super(10006, 'User awaiting reset password');
  }
}

export class UserAwaitingEmailVerifyError extends BizError {
  constructor() {
    super(10007, 'User awaiting email verify');
  }
}

export class UserAwaitingTwoFaError extends BizError {
  constructor() {
    super(10008, 'User awaiting two fa');
  }
}

export class UserAwaitingMagicLinkError extends BizError {
  constructor() {
    super(10009, 'User awaiting magic link');
  }
}

export class UserNotFoundError extends BizError {
  constructor() {
    super(10010, 'User not found');
  }
}

export class AdminUserNotFoundError extends BizError {
  constructor() {
    super(10011, 'Admin user not found');
  }
}

export class AdminUserPasswordError extends BizError {
  constructor() {
    super(10012, 'Admin user password error');
  }
}

export class MagicLinkNotFoundError extends BizError {
  constructor() {
    super(10013, 'Magic link not found');
  }
}

export class PlanNotFoundError extends BizError {
  constructor() {
    super(10014, 'Plan not found');
  }
}

export class QuestionNotFoundError extends BizError {
  constructor() {
    super(10015, 'Question not found');
  }
}

export class CompetencyNotFoundError extends BizError {
  constructor() {
    super(10016, 'Competency not found');
  }
}

export class ProgramNotFoundError extends BizError {
  constructor() {
    super(10017, 'Program not found');
  }
}

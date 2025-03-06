export enum UserStatus {
  SUSPENDED = "SUSPENDED",
  NORMAL = "NORMAL",
  AWAIT_RESET_PASSWORD = "AWAIT_RESET_PASSWORD",
}

export enum UserChannel {
  REGISTER = "REGISTER",
  ADMIN_GENERATE = "ADMIN_GENERATE",
}

export enum LoginMethod {
  AFTER_EMAIL_VERIFY = "AFTER_EMAIL_VERIFY",
  TWO_FA = "TWO_FA",
  MAGIC_LINK = "MAGIC_LINK",
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum PracticeQuestionStatus {
  ANSWERED = "ANSWERED",
  NOT_ANSWERED = "NOT_ANSWERED",
  MARKED = "MARKED",
}

export enum QuestionDifficulty {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
}

export enum Subject {
  LISTENING = "LISTENING",
  READING = "READING",
  WRITING = "WRITING",
  SPEAKING = "SPEAKING",
}

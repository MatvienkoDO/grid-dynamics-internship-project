export interface Error {
  target: Error.Target;
  message: string;
}

export namespace Error {
  export enum Target {
    SignUp,
    LogIn,
  }
}

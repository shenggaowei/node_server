import * as EXCEPTION_INFO from '@/constants/exception_info'

export class Exception extends Error{
  constructor(message = EXCEPTION_INFO.HTTP_MESSAGE, code = EXCEPTION_INFO.HTTP_CODE) {
    super()
    this.code = code 
    this.message = message 
  }
  code: number;
  message: string;
}
  
export class ParameterException extends Exception{
  constructor(message = EXCEPTION_INFO.PARAMETER_MESSAGE, code = EXCEPTION_INFO.PARAMETER_CODE) {
    super()
    this.code = code 
    this.message = message 
  }
}
  
export class NotFound extends Exception {
  constructor(message = EXCEPTION_INFO.NOT_FOUND_MESSAGE, code = EXCEPTION_INFO.NOT_FOUND_CODE) {
    super()
    this.code = code
    this.message = message 
  }
}
  
export class AuthFailed extends Exception {
  constructor(message = EXCEPTION_INFO.AUTH_FAILED_MESSAGE, code = EXCEPTION_INFO.AUTH_FAILED_CODE) {
    super()
    this.code = code
    this.message = message 
  }
}
  
export class Forbidden extends Exception {
  constructor(message = EXCEPTION_INFO.FORBIDDEN_MESSAGE, code = EXCEPTION_INFO.FORBIDDEN_CODE) {
    super()
    this.code = code
    this.message = message
  }
}
  
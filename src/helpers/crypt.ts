import * as crypto from 'crypto'

/**
 * 生成盐 
 * @returns {string} 盐
 */
export function createSalt(): string {
  return crypto.randomBytes(10).toString('base64');
}

/**
 * 生成 token
 * @param text 密码
 * @param salt 盐
 * @returns 
 */
export function createToken(text: string, salt: string): string {
  const token = crypto.createHmac('sha256', salt).update(text).digest('hex')
  return token
}
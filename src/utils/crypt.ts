import * as crypto from 'crypto'

/**
 * 生成盐 
 * @returns {string} 盐
 */
 export function createSalt(): string {
    return '$1995$' + crypto.randomBytes(10).toString('base64');
 }
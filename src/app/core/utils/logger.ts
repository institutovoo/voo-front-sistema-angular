import { isDevMode } from '@angular/core';

export class Logger {
  private static sensitiveKeys = [
    'senha',
    'password',
    'token',
    'confirmarsenha',
    'cpf_cnpj',
    'authorization',
    'cookie'
  ];

  static info(message: string, data?: any) {
    this.log('INFO', message, data);
  }

  static warn(message: string, data?: any) {
    this.log('WARN', message, data);
  }

  static error(message: string, error?: any) {
    this.log('ERROR', message, error);
  }

  private static log(level: string, message: string, data?: any) {
    if (!isDevMode() && level === 'INFO') {
      return;
    }

    const timestamp = new Date().toISOString();
    const sanitizedData = data ? this.sanitize(data) : '';
    
    const prefix = `[${timestamp}] [${level}]`;
    
    switch (level) {
      case 'ERROR':
        console.error(`${prefix} ${message}`, sanitizedData);
        break;
      case 'WARN':
        console.warn(`${prefix} ${message}`, sanitizedData);
        break;
      default:
        console.log(`${prefix} ${message}`, sanitizedData);
    }
  }

  private static sanitize(data: any): any {
    if (!data) return data;
    
    if (typeof data !== 'object') return data;
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitize(item));
    }
    
    if (data instanceof Error) {
      return {
        message: data.message,
        stack: data.stack,
        name: data.name
      };
    }

    const sanitized: any = { ...data };
    
    for (const key in sanitized) {
      if (Object.prototype.hasOwnProperty.call(sanitized, key)) {
        const lowerKey = key.toLowerCase();
        
        if (this.sensitiveKeys.some(s => lowerKey.includes(s))) {
          sanitized[key] = '*** [REDACTED] ***';
        } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
          sanitized[key] = this.sanitize(sanitized[key]);
        }
      }
    }

    return sanitized;
  }
}

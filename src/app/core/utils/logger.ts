import { isDevMode } from '@angular/core';

export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'AUDIT';

export class Logger {
  private static sensitiveKeys = [
    'senha', 'password', 'token', 'confirmarsenha', 'cpf_cnpj', 
    'authorization', 'cookie', 'secret', 'key'
  ];

  /**
   * Log de Informação - Passos do sistema
   */
  static info(message: string, context?: string, data?: any) {
    this.log('INFO', message, context, data);
  }

  /**
   * Log de Aviso - Situações inesperadas mas não críticas
   */
  static warn(message: string, context?: string, data?: any) {
    this.log('WARN', message, context, data);
  }

  /**
   * Log de Erro - Falhas técnicas ou de integração
   */
  static error(message: string, context?: string, error?: any) {
    this.log('ERROR', message, context, error);
  }

  /**
   * Log de Auditoria - Ações do usuário e chamadas críticas (CloudWatch/Auditoria)
   */
  static audit(message: string, context?: string, data?: any) {
    this.log('AUDIT', message, context, data);
  }

  private static log(level: LogLevel, message: string, context: string = 'System', data?: any) {
    // Em produção, INFO pode ser silenciado se desejado, mas AUDIT e ERROR sempre ficam
    if (!isDevMode() && level === 'INFO') {
      return;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      context,
      message,
      data: data ? this.sanitize(data) : undefined,
      environment: isDevMode() ? 'development' : 'production'
    };

    const logString = JSON.stringify(logEntry);

    switch (level) {
      case 'ERROR':
        console.error(`[${level}] ${message}`, logEntry);
        break;
      case 'WARN':
        console.warn(`[${level}] ${message}`, logEntry);
        break;
      case 'AUDIT':
        // Audit logs em destaque
        console.log(`%c[AUDIT]%c ${message}`, 'color: #21b7cd; font-weight: bold;', '', logEntry);
        break;
      default:
        console.log(`[${level}] ${message}`, logEntry);
    }
    
    // Aqui poderíamos enviar para um endpoint de logs se estivermos em produção
    // if (!isDevMode()) { this.sendToLogServer(logEntry); }
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

    try {
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
    } catch (e) {
      return '[Complex Object - Sanitize Failed]';
    }
  }
}

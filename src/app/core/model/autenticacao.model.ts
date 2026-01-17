export interface Usuario {
  id: string;
  nome_completo: string;
  nome_social?: string;
  endereco?: string;
  email: string;
  whatsapp?: string;
  cpf_cnpj: string;
  nome_mae?: string;
  ultima_formacao?: string;
  status_ultima_formacao?: string;
  indicador_tipo_conta: 'PF' | 'PJ';
  criadoEm: string;
  atualizadoEm: string;
}

export interface LoginRequest {
  cpf_cnpj: string;
  senha: string;
}

export interface CadastroRequest {
  nome_completo: string;
  nome_social?: string;
  endereco?: string;
  email: string;
  senha: string;
  indicador_tipo_conta: 'PF' | 'PJ' | 'Aluno' | 'Instrutor' | 'Empresa';
  whatsapp?: string;
  cpf_cnpj: string;
  nome_mae?: string;
  ultima_formacao?: string;
  status_ultima_formacao?: string;
  aceitouTermos: boolean;
}

export interface EsqueciSenhaRequest {
  email: string;
}

export interface ResetSenhaRequest {
  email: string;
  codigo: string;
  novaSenha: string;
}

export interface AuthResponse {
  sucesso: boolean;
  token?: string;
  usuario?: Usuario;
  mensagem?: string;
}

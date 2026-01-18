export type TipoConta =
  | 'Admin'
  | 'Aluno'
  | 'PJ Conveniados'
  | 'Instituição Parceira (PJ)'
  | 'Instrutor (PF)'
  | 'Instrutor (PJ)';

export interface Usuario {
  id: string;
  nome_completo: string;
  nome_social?: string;
  endereco?: string;
  email: string;
  whatsapp?: string;
  cpf_cnpj: string; // Documento principal (CPF ou CNPJ de cadastro)
  documentos: string[]; // Lista de todos os documentos [CPF, CNPJ]
  nome_mae?: string;
  ultima_formacao?: string;
  status_ultima_formacao?: string;
  indicador_tipo_conta: TipoConta; // Perfil principal/primeiro
  perfis: TipoConta[]; // Lista de todos os perfis do usuário
  perfilAtual?: TipoConta; // Perfil ativo no momento
  criadoEm: string;
  atualizadoEm: string;
}

export interface LoginRequest {
  identificador: string;
  senha: string;
}

export interface CadastroRequest {
  nome_completo: string;
  nome_social?: string;
  endereco?: string;
  email: string;
  senha: string;
  indicador_tipo_conta: TipoConta;
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

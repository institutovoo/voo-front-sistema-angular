/**
 * Remove todos os caracteres que não são dígitos
 */
export function apenasNumeros(valor: string): string {
  return valor.replace(/\D/g, '');
}

/**
 * Formata um número para o padrão de telefone brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export function mascaraTelefone(valor: string): string {
  let numeros = apenasNumeros(valor);
  
  if (numeros.length > 11) {
    numeros = numeros.substring(0, 11);
  }

  if (numeros.length === 0) return '';
  if (numeros.length <= 2) return `(${numeros}`;
  if (numeros.length <= 6) return `(${numeros.substring(0, 2)}) ${numeros.substring(2)}`;
  if (numeros.length <= 10) return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
  return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7, 11)}`;
}

/**
 * Formata um número para o padrão CPF: XXX.XXX.XXX-XX
 */
export function mascaraCpf(valor: string): string {
  let numeros = apenasNumeros(valor).substring(0, 11);
  
  return numeros
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/**
 * Formata um número para o padrão CNPJ: XX.XXX.XXX/XXXX-XX
 */
export function mascaraCnpj(valor: string): string {
  let numeros = apenasNumeros(valor).substring(0, 14);
  
  return numeros
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

/**
 * Formata dinamicamente baseado no tamanho (CPF ou CNPJ)
 */
export function mascaraDocumento(valor: string): string {
  const numeros = apenasNumeros(valor);
  if (numeros.length <= 11) {
    return mascaraCpf(numeros);
  }
  return mascaraCnpj(numeros);
}

/**
 * Formata um número para o padrão CEP: XXXXX-XXX
 */
export function mascaraCep(valor: string): string {
  let numeros = apenasNumeros(valor).substring(0, 8);
  return numeros.replace(/(\d{5})(\d)/, '$1-$2');
}

// Configurações do site — edite à vontade.
// A URL e a chave pública ficam em Supabase > Project Settings > API Keys.
// A chave pública (anon / publishable) PODE ficar aqui: quem protege os dados
// são as regras de segurança do banco (schema.sql). Nunca coloque a "service_role"/"secret".
window.CONFIG = {
  supabaseUrl: 'https://konuinfanhnbumzoalua.supabase.co',
  supabaseChavePublica: 'sb_publishable_iBQJL5IXQFgj-75xKKrvKw_Vh3zToZn',

  nomeColonia: 'Colônia de Férias Bambolê',
  edicao: '9ª Edição · Pré-venda',
  periodo: '04/01/2027 a 15/01/2027',
  // Vagas, idades e turmas ficam no banco (tabelas configuracao e turmas).

  // Dados exibidos para o responsável efetuar o pagamento.
  pagamento: {
    chavePix: '43004783000194',
    tipoChave: 'CNPJ',
    favorecido: 'Colônia de Férias Bambolê',
    // Se mudar esta lista, mude também em supabase/schema.sql (tabela pagamentos).
    formas: ['PIX', 'Dinheiro', 'Cartão de crédito', 'Cartão de débito', 'Transferência', 'Boleto'],
  },
};

window.configurado = !window.CONFIG.supabaseUrl.includes('SEU-PROJETO');
window.sb = window.configurado
  ? window.supabase.createClient(window.CONFIG.supabaseUrl, window.CONFIG.supabaseChavePublica)
  : null;

// Chama uma função do banco e transforma o erro em mensagem amigável.
window.rpc = async function (nome, args) {
  if (!window.sb) throw new Error('Site ainda não conectado ao Supabase: preencha o arquivo config.js.');
  const { data, error } = await window.sb.rpc(nome, args);
  if (error) throw new Error(error.message);
  return data;
};

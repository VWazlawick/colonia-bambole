# Colônia de Férias Bambolê — inscrições

Site de inscrições da 9ª edição (pré-venda), com informe de pagamento.

- **Site:** https://vwazlawick.github.io/colonia-bambole/
- **Painel da equipe:** https://vwazlawick.github.io/colonia-bambole/admin.html

```
Pais / Equipe ──▶ GitHub Pages (páginas)  ──▶  Supabase (PostgreSQL + login), servidores em São Paulo
```

| Arquivo | Para quê |
|---|---|
| `index.html` | Formulário de inscrição, consulta e "informar pagamento" (público) |
| `admin.html` | Painel da equipe (login com e-mail e senha) |
| `aviso-privacidade.html` | Aviso de Privacidade (LGPD) |
| `config.js` | Conexão com o Supabase, nome da colônia, PIX e dados do aviso de privacidade |
| `schema.sql` | Estrutura do banco: tabelas, regras de segurança e funções |

## Como atualizar o site
1. Crie uma branch, faça as mudanças e o commit.
2. `git push` e abra um Pull Request no GitHub.
3. Ao fazer o merge na `main`, o GitHub Pages publica em 1–2 minutos.

## Onde mudar cada coisa
- **Turmas, valores, vagas por turma:** Supabase → Table Editor → `turmas` (`ativa = false` tira do formulário).
- **Total de vagas, data de início, faixa de idade:** Supabase → Table Editor → `configuracao`.
- **Nome, período, PIX, contato de privacidade:** `config.js`.
- **Estrutura do banco:** `schema.sql` (pode ser rodado de novo no SQL Editor sem apagar dados).

## Administradores
Crie o usuário em **Authentication → Users → Add user** (marque *Auto Confirm User*) e depois rode no SQL Editor:
```sql
insert into public.admins (user_id)
select id from auth.users where email = 'email-da-pessoa@exemplo.com';
```
Mantenha desligado **Authentication → Sign In / Providers → Allow new users to sign up**.

## LGPD
- O responsável legal precisa aceitar o Aviso de Privacidade; o banco recusa inscrições sem o aceite e grava data e versão do aviso.
- Ao mudar o texto do aviso, atualize `privacidade.versaoAviso` em `config.js`.
- Pedido de exclusão: no painel, abra a inscrição → **Apagar dados pessoais (LGPD)**.
- **Prazo de guarda:** os dados pessoais devem ser apagados até a data de `privacidade.guardarAte` (`config.js`).
- A planilha exportada contém dados sensíveis: guarde em local seguro e apague quando não precisar mais.

## Bom saber
- **Pausa do plano grátis:** o Supabase pausa o projeto após 7 dias sem acesso. Para reativar: painel do Supabase → **Restore project**.
- **Segurança:** visitantes não acessam as tabelas; só criam inscrição, consultam a própria (nº + telefone) e informam pagamento. Só usuários da tabela `admins` veem os dados.
- **Chaves:** a chave pública do Supabase pode ficar no código. **Nunca** coloque a chave `service_role` / `secret` no site.

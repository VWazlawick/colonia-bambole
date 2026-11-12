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

**Mudou `style.css` ou `config.js`?** Aumente a versão nos links (`style.css?v=2` → `?v=3`, idem `config.js`)
em `index.html`, `admin.html` e `aviso-privacidade.html`. Sem isso, o navegador de quem já visitou o site
pode continuar usando o arquivo antigo (o GitHub Pages guarda cache por até 10 minutos).

## Lotes de venda
| Lote | Período | 1 semana | 2 semanas (PIX) | 2 semanas (cartão) | Diárias | Vagas |
|---|---|---|---|---|---|---|
| Pré-venda | até 12/11/2026 12h | R$ 380 | R$ 700 | R$ 700 (via WhatsApp) | — | 30 |
| Venda normal | a partir de 12/11/2026 12h | R$ 430 | R$ 800 | R$ 860 = R$ 430 PIX + R$ 430 cartão | R$ 100/dia; 3+ dias R$ 90/dia | sem limite |

- O endereço principal mostra sozinho o lote em vigor. `?lote=normal` (ou `?lote=pre-venda`) abre um lote específico; antes de abrir, mostra a data e bloqueia o envio.
- Diárias: os 10 dias úteis da colônia (tabela `dias_colonia`); somente PIX.

## Pagamento
- **PIX:** o responsável paga e anexa o comprovante (foto ou PDF, até 5 MB) na própria inscrição — sem comprovante, a inscrição não é aceita. Com o comprovante, o pagamento **já entra confirmado** e a inscrição fica *Pago*. O comprovante continua disponível no painel (📎); se algum for inválido, exclua aquele pagamento e a inscrição volta a ficar em aberto.
- **Cartão:** só no pacote de **2 semanas** (1 semana e diárias: somente PIX — regra no banco, coluna `turmas.aceita_cartao`). Na venda normal, a entrada de R$ 430 é paga no PIX com comprovante na própria inscrição (`precos.entrada_pix`). A inscrição fica *Contato pendente* até o cartão ser pago e o responsável é orientado a chamar a equipe no WhatsApp. Depois de receber, no painel: filtre **Contato pendente** → abra a inscrição → **✔ Recebido no crédito** (ou **no débito**). A inscrição passa para *Pago*.
- Os comprovantes ficam no Supabase Storage (bucket privado `comprovantes`); só administradores conseguem abrir.

## Onde mudar cada coisa
- **Lotes (datas de abertura/fechamento, título, limite de vagas):** Supabase → Table Editor → `lotes`.
- **Preços por lote** (PIX, cartão, entrada): `precos`. **Diárias:** `precos_diaria` (faixas) e `dias_colonia` (dias).
- **Turmas** (nome, aceita cartão, ativa): `turmas` (`ativa = false` tira do formulário).
- **Data de início e faixa de idade:** `configuracao`.
- **Nome, período, PIX, WhatsApp da equipe, contato de privacidade:** `config.js`.
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

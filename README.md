# Colônia de Férias — versão GitHub Pages + Supabase

Site de inscrições com pagamento, hospedado de graça:

```
Pais / Admin ──▶ GitHub Pages (index.html, admin.html)  ──▶  Supabase (PostgreSQL + login)
```

| Arquivo | Para quê |
|---|---|
| `index.html` | Formulário de inscrição, consulta e "informar pagamento" (público) |
| `admin.html` | Painel da equipe (login com e-mail e senha) |
| `config.js` | URL/chave do Supabase, nome da colônia, chave PIX |
| `supabase/schema.sql` | Tabelas, turmas, regras de segurança e funções do banco |

## 1. Criar o banco no Supabase
1. Crie uma conta em https://supabase.com e clique em **New project** (região: *South America (São Paulo)*).
2. Abra **SQL Editor → New query**, cole todo o conteúdo de `supabase/schema.sql` e clique em **Run**.
3. Confira em **Table Editor → turmas** as turmas, valores e vagas (edite ali mesmo).

## 2. Criar o usuário administrador
1. **Authentication → Users → Add user → Create new user**: informe e-mail e senha e marque *Auto Confirm User*.
2. No **SQL Editor**, rode (trocando o e-mail):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'seu-email@exemplo.com';
   ```
3. **Authentication → Sign In / Providers**: desligue **Allow new users to sign up** (ninguém mais cria conta).

## 3. Conectar o site ao banco
Em **Project Settings → API Keys** copie a **Project URL** e a chave pública (*anon* / *publishable*) e cole em `config.js`.
Ajuste também o nome da colônia e a chave PIX.

> A chave pública pode ficar no código: os dados são protegidos pelas regras do banco.
> **Nunca** coloque a chave `service_role` / `secret` no site.

## 4. Publicar no GitHub Pages
Crie um repositório no GitHub (ex.: `colonia-ferias`) e, dentro desta pasta, rode:

```bash
git init
git add .
git commit -m "Site de inscrições da colônia de férias"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/colonia-ferias.git
git push -u origin main
```

No GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
Em 1–2 minutos o site estará em `https://SEU-USUARIO.github.io/colonia-ferias/`
e o painel em `.../colonia-ferias/admin.html`.

Para atualizar depois: `git add .`, `git commit -m "..."` e `git push`.

### Domínio próprio (opcional)
**Settings → Pages → Custom domain**, e no registro.br crie um `CNAME` apontando para `SEU-USUARIO.github.io`.

## Bom saber
- **Pausa do plano grátis:** o projeto do Supabase pausa após 7 dias sem nenhum acesso. Para reativar: painel do Supabase → **Restore project**.
- **Backup:** no painel admin, use *Exportar Excel (CSV)* de vez em quando.
- **Segurança:** visitantes não acessam as tabelas; só podem criar inscrição, consultar a própria (nº + telefone) e informar pagamento. Só usuários na tabela `admins` veem os dados.
- **Turmas:** são editadas no Supabase (Table Editor → turmas). Para tirar uma turma do formulário, marque `ativa = false`.

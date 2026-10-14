# FinCore Perino

Acesse o sistema: https://ragcodebr.github.io/fincore-perino/

Cópia independente do FinCore com banco Supabase próprio. O endereço é público e o acesso aos dados exige login. Administrador desta instalação: `master@financeiro.com`, com a senha definida pelo responsável.

A cópia preserva dashboard, ambientes, contas, plano de contas, receitas, despesas, recorrência, parcelas, edição de séries, contatos, bancos, juros, descontos, anexos, relatórios, usuários/permissões.

O projeto Supabase desta instalação é `zpxrkaxmwrkrdwdbmspe`. Os cadastros começaram zerados. O Master está ativo e as permissões de criação de ambiente, receita e despesa foram validadas sob RLS com uma transação revertida.

## Desenvolvimento

```sh
npm ci
cp .env.example .env.local
npm run dev
```

## Publicação

Push em `main` publica pelo GitHub Actions. As variáveis do repositório `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` configuram a conexão. A chave publishable é pública; a proteção dos dados é feita pelas políticas RLS do Supabase.

## Banco

A estrutura já foi instalada. `supabase/instalacao-limpa.sql` serve apenas para uma instalação nova, sem usuários nem tabelas FinCore. Não reaplique no banco desta instalação. `supabase/ativar-master.sql` documenta a ativação do administrador, já executada.

## Validação

Build e os seis testes em `tests/seriesDates.test.mjs` passaram. As permissões reais de criar ambiente, conta automática, receita e despesa passaram no banco próprio. Login validado no endereço público como Master em 14/10/2026. O dashboard abriu zerado e os controles Novo plano / centro, Nova despesa e Nova receita foram conferidos na interface.

## Origem e isolamento

Base: `RAGCodeBR/sistema-financeiro`, commit `e3d8f533bbc6dd7751cbb68cc6c23ba800d6a0ee`. O repositório e banco do FinCore original foram preservados. Esta aplicação bloqueia a conexão com o projeto Supabase original.

A seção Notas da equipe foi retirada desta edição Perino em 14/10/2026.

## Criação delegada de planos

Operadores com a permissão `__create_plans__` podem criar planos/centros e categorias. A operação `create_managed_cost_center` valida a permissão no banco e concede ao criador acesso ao centro criado. O perfil continua Operador; administração de usuários e edição/exclusão de centros continuam restritas ao Master. A permissão é preservada nas demais edições de acesso.

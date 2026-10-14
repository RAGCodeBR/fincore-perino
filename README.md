# FinCore Perino

Acesse o sistema: https://ragcodebr.github.io/fincore-perino/

Cópia independente do FinCore com banco Supabase próprio. O endereço é público e o acesso aos dados exige login. Administrador desta instalação: `master@financeiro.com`, com a senha definida pelo responsável.

A cópia preserva dashboard, ambientes, contas, plano de contas, receitas, despesas, recorrência, parcelas, edição de séries, contatos, bancos, juros, descontos, anexos, relatórios, usuários/permissões e notas da equipe.

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

Build e os seis testes em `tests/seriesDates.test.mjs` passaram. As permissões reais de criar ambiente, conta automática, receita e despesa passaram no banco próprio. O login na interface exige a senha do responsável e ainda não foi validado nesta sessão.

## Origem e isolamento

Base: `RAGCodeBR/sistema-financeiro`, commit `e3d8f533bbc6dd7751cbb68cc6c23ba800d6a0ee`. O repositório e banco do FinCore original foram preservados. Esta aplicação bloqueia a conexão com o projeto Supabase original.

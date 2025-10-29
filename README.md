# Como Rodar o Projeto

Este projeto é estruturado em **Micro-Frontends (MF)** e possui três aplicações: `app-listing`, `app-login` e `app-main`. Cada aplicação deve ser instalada e executada individualmente.

1. **Clone o repositório**:

Clone o repositório do projeto para sua máquina.

-Entre na branch main

2. **Instale as dependências**:

Vá para cada micro-frontend e execute `pnpm install`:

- No diretório `app-listing`, execute `pnpm install`.
- No diretório `app-login`, execute `pnpm install`.
- No diretório `app-main`, execute `pnpm install`.

3. **Execute os micro-frontends**:

Inicie cada micro-frontend individualmente com `pnpm run serve-mf`, começando pelo `app-listing`, depois `app-login` e por último `app-main`:

- No `app-listing`, execute `pnpm run serve-mf`.
- No `app-login`, execute `pnpm run serve-mf`.
- No `app-main`, execute `pnpm run serve-mf`.

4. **Acesse a aplicação**:

Após iniciar todos os micro-frontends, abra seu navegador e acesse `http://localhost:5000/login`.


5.deploy:

- https://teste-front-teddy.vercel.app/login

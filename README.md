# Customers API

## Executando o projeto

<hr>

1. Certifique-se de qual porta o front-end está utilizando, pois, isso influenciará no mecanismo do CORS (origin).
2. Crie um arquivo .env na raíz do projeto seguindo o arquivo exemplo <strong>env.example</strong>.
3. Instale as dependências do projeto utilizando o comando: <strong>yarn</strong>.
4. Certifique-se de que tenha um banco de dados PostgreSQL rodando na porta estipulada no arquivo <strong>.env</strong>.
5. Utilize o comando: <strong>yarn prisma generate</strong>, para ser possível a utilização do cliente do PrismaORM dentro do código.
6. Utilize o comando <strong>yarn prisma migrate deploy</strong>, para aplicar as migrações do Prisma ao seu banco de dados.
7. Se tudo ocorrer sem nenhum erro, utilize o comando <strong>yarn dev</strong> para rodar o projeto no ambiente de desenvolvimento.
8. Para buildar e rodar o projeto, utilize o comando <strong>yarn build</strong>.
9. Para rodar a build do projeto, utilize o comando <strong>yarn prod</strong>.
10. Para aplicar as regras do eslint nos arquivos .ts, utilize o comando <strong>yarn lint</strong>.
11. Para formatar os arquivos, utilize o comando <strong>yarn format</strong>.
12. Para rodar os testes unitários, utlize o comando <strong>yarn test</strong>.

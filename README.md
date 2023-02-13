<div align="center">
  <h1>OCEAN REPORT v1.0</h1>
  <br> 
  Ocean Report é um software feito para gerenciar reports das condições oceânicas das praias do Rio de Janeiro. Os reports são feitos através de um algoritmo alimentado com base nos dados em tempo real de uma boia meteo-oceanográfica. Além disso, também é possível receber os reports diretamente por email, e compartilhar suas próprias observações sobre as condições oceanográficas na sua região com outros usuários através da nossa timeline. Esse é um projeto full stack. <a href = "https://github.com/guedesclaudio/oceanreport-frontend">Repositório do front-end</a>
  <br>
  <br>
</div>
<br>
  
# Funcionalidades
- Fluxo de login e cadastro
- Opção de receber reports por email
- Acompanhar reports de outros usuários
- Compartilhar o seu próprio report
- Acesso a previsão de tempo e mar com link externo (Windy)

# Pŕoximas atualizações para v2.0
- Login federado com opção de Github e Google
- Filtro de palavras ofensivas ao postar uma publicação
- Opção de poder avaliar a acertividade do algoritmo que gera o report
- Opção do usuário poder gerenciar sua conta
- Configuração do Docker

# Stack principal Backend
- Node.js
- TypeScript
- Express
- Joi
- Redis
- JWT
- PostgreSQL
- Vercel
- Git
- Linux

# Como rodar
1. Clone esse repositório
2. Certifique-se que você tenha instalado:
```bash
npm >= v9.2.0
redis >= v7.0.7
node >= v18.12.1
typescript >= v4.5.4
```
3. Rode os seguintes comandos:
```bash
dev:migration:run
test:migration:run

dev:migration:generate
test:migration:generate
```
3. Crie uma chave de acesso no serviço sendgrid e coloque na sua variável de ambiente de acordo com o .env.example
2. Instale as dependências:
```bash
npm i
```
3. Configure o .env de acordo com o .env.example
4. Crie um env.development para ambiente de desenvolvimento
5. Crie um env.test para ambiente de teste
6. Inicie o redis:
```bash
redis-server
```
7. Inicie a aplicação:
```bash
npm run dev
```
<br>

# Projeto Mobile - Mottu

Este é um aplicativo mobile desenvolvido com **React Native** utilizando o **framework Expo**. O projeto foi construído com foco em soluções para a empresa **Mottu**, visando funcionalidades como cadastro de usuários, exibição de motos disponíveis, gerenciamento de pátios e apresentação da equipe de desenvolvimento.

## 👥 Integrantes do Projeto

- Pedro Henrique dos Santos - RM559064
- Thiago Thomaz Sales Conceição - RM557992
- Vinícius de Oliveira Coutinho - RM556182

## 📱 Funcionalidades do App

- **Tela Inicial (`index.tsx`)**: ponto de entrada do aplicativo e fala sobre a empresa Mottu no geral.
- **Cadastro (`cadastro.tsx`)**: formulário para cadastro de motos pra empresa.
- **Lista de Motos (`listamotos.tsx`)**: exibe as motos disponíveis.
- **Pátios (`patios.tsx`)**: mostra os locais onde as motos estão armazenadas.
- **Equipe (`integrantes.tsx`)**: mostra os nomes e dados dos desenvolvedores.
- **Navegação (`_layout.tsx`)**: configuração da navegação entre telas.

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## ⚙️ Instruções de Execução API

### Pré-requisitos
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Nota**: O EF Core CLI será instalado automaticamente no passo 2 das instruções.

### Passos
1. Clone o repositório:
   ```bash
     git clone https://github.com/MottuChallenge/dotnet.git
   ```
2. Instale o EF Core CLI globalmente (se ainda não tiver):
   ```bash
     dotnet tool install --global dotnet-ef
   ```
3. Entre na pasta do projeto e rode o comando do docker compose para subir um banco mysql no docker:
   ```bash
     cd .\dotnet\
     docker-compose up -d
   ```
4. Rode o comando do database update para lançar as migrations no banco:
   ```bash
     dotnet ef database update --startup-project MottuChallenge.Api --project MottuChallenge.Infrastructure
   ```
4. Se quiser deixar o banco populado com alguns registros, use uma das opções abaixo:

   **Opção A - Usando Docker (recomendado):**
   ```bash
   docker exec -i mysql mysql -u user_test -puser_password MottuGridDb < .\mysql-init\init.sql
   ```

   **Opção B - Copiando arquivo para o container:**
   ```bash
   docker cp .\mysql-init\init.sql mysql:/tmp/init.sql
   docker exec mysql mysql -u user_test -puser_password MottuGridDb -e "source /tmp/init.sql"
   ```

   **Opção C - Se tiver cliente MySQL instalado:**
   ```bash
   mysql -h 127.0.0.1 -P 3307 -u user_test -p MottuGridDb < .\mysql-init\init.sql
   # aqui vai pedir para colocar a senha: user_password
   ```
5. Rode o programa:
   ```bash
    dotnet run --project MottuChallenge.Api
   # Abra a url no navegador http://localhost:5006/swagger/index.html
   ``` 

---

## 📦 Instalação

```bash
git clone https://github.com/MottuChallenge/Mobile.git
cd Mobile

npm install
npx expo start <-- Opção 1
npm start <-- Opção 2


Este projeto é uma aplicação Fullstack desenvolvida para facilitar o controle financeiro de uma residência. O sistema permite gerenciar membros da família, categorias de gastos e transações financeiras, oferecendo um dashboard com uma visão geral das transações.

Tecnologias Utilizadas

Front-end
- React + TypeScript
- ite
- TailwindCSS
- Recharts: Biblioteca para visualização de dados (Gráficos).
- Lucide React: Ícones leves.

Back-end
- .NET 8 (C#): API RESTful.
- Service Pattern.
- Swagger/OpenAPI para Documentação.
- JSON Data Context: Banco de dados foi simulado em um arquivo JSON


 Arquitetura e Decisões de Projeto

O projeto foi estruturado no formato Monorepo, contendo o Front-end e o Back-end no mesmo repositório para facilitar a versionamento e execução.

Funcionalidades

- Dashboard: Visão geral com totais de Receita, Despesa, Saldo e Gráfico de barras por pessoa.
- Gestão de Pessoas: CRUD de membros da família.
- Categorias: CRUD de categorias personalizadas.
- Transações: Lançamento de movimentações financeiras.

Como Rodar o Projeto

Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [.NET SDK](https://dotnet.microsoft.com/download) (v8.0)

1: Executando a API (Back-end)

Abra um terminal na pasta raiz do projeto e execute:

cd backend
dotnet run

2: Executando o Front-End
Abra um novo terminal na pasta raiz do projeto e execute:

cd frontend
npm install
npm run dev


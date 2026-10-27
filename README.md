# 🎓 IPCM Internship Hub

> Plataforma de divulgação, filtragem e sugestão de oportunidades de estágio para finalistas do **Instituto Privado Campos Maria (IPCM)**.  
> *Ligando formação académica a oportunidades profissionais.*

---

## 📑 Índice

1. [Sobre o Projecto](#sobre-o-projecto)
2. [Problema Identificado](#problema-identificado)
3. [Objectivos](#objectivos)
4. [Solução Proposta](#solução-proposta)
5. [Funcionalidades Previstas](#funcionalidades-previstas)
6. [Perfis de Utilizador](#perfis-de-utilizador)
7. [Fluxo Principal](#fluxo-principal)
8. [Arquitectura de Referência](#arquitectura-de-referência)
9. [Tecnologias](#tecnologias)
10. [Modelo Conceitual de Dados](#modelo-conceitual-de-dados)
11. [Segurança e Regras de Negócio](#segurança-e-regras-de-negócio)
12. [Metodologia do Projecto](#metodologia-do-projecto)
13. [Instalação e Execução](#instalação-e-execução)
14. [Estado do Desenvolvimento](#estado-do-desenvolvimento)
15. [Equipa e Contexto Académico](#equipa-e-contexto-académico)

---

## 🚀 Sobre o Projecto

O **IPCM Internship Hub** é uma plataforma web concebida para centralizar a divulgação e a consulta de oportunidades de estágio destinadas aos finalistas do **Instituto Privado Campos Maria (IPCM)**.

A proposta procura tornar o processo de acesso às vagas mais organizado, facilitar a descoberta de oportunidades compatíveis com a formação dos estudantes e apoiar a coordenação do IPCM no acompanhamento de empresas, vagas e candidaturas.

Em vez de depender exclusivamente de avisos presenciais ou de canais informais, a plataforma propõe um ponto de acesso digital onde as oportunidades e os respectivos requisitos podem ser consultados de forma estruturada.

> ⚠️ **Nota sobre o estado do projecto:** Este README descreve o âmbito e a arquitectura de referência do projecto académico. As funcionalidades, tecnologias e instruções de execução devem ser ajustadas ao código que estiver efectivamente implementado no repositório.

---

## ⚠️ Problema Identificado

A divulgação dispersa de oportunidades pode dificultar o acesso dos finalistas às vagas, provocar perda de informação e tornar mais difícil a gestão das candidaturas. A falta de critérios centralizados também pode levar estudantes a procurar oportunidades que não correspondem ao seu curso ou às suas competências.

A pergunta que orienta o projecto é:
> *De que forma um site de gestão de estágios pode facilitar o acesso a oportunidades e melhorar a integração dos finalistas do IPCM no mercado de trabalho?*

---

## 🎯 Objectivos

### Objectivo Geral
Desenvolver um site centralizado para divulgação, consulta e sugestão de vagas de estágio aos finalistas do IPCM.

### Objectivos Específicos
* Analisar o processo actual de procura e atribuição de estágios.
* Identificar requisitos junto dos finalistas, da coordenação e das empresas parceiras.
* Estruturar os dados de estudantes, empresas, vagas e candidaturas.
* Disponibilizar pesquisa e filtragem de oportunidades por critérios relevantes.
* Permitir candidaturas online e acompanhamento do respectivo estado.
* Apoiar a coordenação na validação de empresas e vagas e na gestão das candidaturas.

---

## 💡 Solução Proposta

A plataforma organiza o processo em torno de quatro elementos principais:
* **Estudantes:** Mantêm um perfil académico e consultam oportunidades.
* **Empresas:** Disponibilizam informações e propõem vagas, sujeitas às regras de validação definidas.
* **Vagas:** Apresentam requisitos, área de formação, competências e outras condições.
* **Candidaturas:** Registam a manifestação de interesse do estudante e o estado do processo.

*O sistema pode sugerir oportunidades com base no perfil do estudante e nos requisitos da vaga. A sugestão representa uma medida de compatibilidade segundo os critérios definidos pela plataforma; não garante a selecção pela empresa nem substitui a decisão da coordenação.*

---

## ⚙️ Funcionalidades Previstas

### Para Finalistas
* [ ] Registo e autenticação.
* [ ] Criação e actualização do perfil académico.
* [ ] Consulta do mural de vagas.
* [ ] Pesquisa e filtragem por curso, área e competências.
* [ ] Visualização dos requisitos e detalhes de cada oportunidade.
* [ ] Submissão de candidaturas online.
* [ ] Consulta do estado das candidaturas.
* [ ] Visualização de sugestões compatíveis com o perfil.

### Para Empresas
* [ ] Registo e manutenção dos dados da empresa.
* [ ] Submissão de vagas com requisitos e critérios definidos.
* [ ] Consulta das vagas submetidas.
* [ ] Acompanhamento das candidaturas associadas às suas vagas (conforme permissões).

### Para a Coordenação / Administração do IPCM
* [ ] Gestão dos perfis e dos acessos.
* [ ] Validação de empresas e oportunidades.
* [ ] Aprovação ou rejeição de vagas.
* [ ] Acompanhamento e actualização do estado das candidaturas.
* [ ] Consulta de informação para apoiar a organização do processo de estágios.

---

## 👥 Perfis de Utilizador

| Perfil | Responsabilidade Principal |
| :--- | :--- |
| **Finalista** | Gerir o perfil, encontrar vagas e candidatar-se. |
| **Empresa** | Submeter oportunidades e acompanhar candidaturas autorizadas. |
| **Administrador / Coordenação IPCM** | Validar empresas e vagas e supervisionar o processo. |

---

## 🔄 Fluxo Principal

```mermaid
flowchart TD
    A([Início]) --> B{Perfil de utilizador}
    B -->|Finalista| C[Registar-se / iniciar sessão]
    C --> D[Completar perfil académico]
    D --> E[Consultar e filtrar vagas]
    E --> F[Verificar compatibilidade com os requisitos]
    F --> G{Vaga adequada?}
    G -->|Não| E
    G -->|Sim| H[Submeter candidatura]
    H --> I[Acompanhar estado da candidatura]

    B -->|Empresa| J[Registar empresa]
    J --> K[Submeter dados e vaga]
    K --> L{Validação da coordenação}
    L -->|Rejeitada| M[Corrigir dados ou vaga]
    M --> K
    L -->|Aprovada| N[Vaga publicada]
    N --> E

    B -->|Coordenação IPCM| O[Gerir empresas, vagas e candidaturas]
    O --> L
    O --> P[Actualizar estado da candidatura]
    P --> I

flowchart LR
    U[Utilizadores<br/>Finalistas, empresas e coordenação]
    subgraph FRONT["Camada de apresentação"]
        FE[HTML + CSS + JavaScript]
    end
    subgraph APP["Camada de aplicação"]
        API[API / serviços de aplicação]
        RULES[Validação e regras de negócio]
    end
    subgraph DATA["Camada de dados"]
        SB[Supabase]
        PG[(PostgreSQL)]
    end
    HOST[Vercel<br/>Alojamento e implantação]

    U --> FE
    FE --> API
    API --> RULES
    RULES --> SB
    SB --> PG
    HOST -. disponibiliza a aplicação .-> FE

erDiagram
    ESTUDANTE ||--o{ CANDIDATURA : submete
    VAGA ||--o{ CANDIDATURA : recebe
    EMPRESA ||--o{ VAGA : publica

    ESTUDANTE {
        uuid id
        string nome
        string email
        string curso
        string competencias
    }

    EMPRESA {
        uuid id
        string nome
        string email
        string estado_validacao
    }

    VAGA {
        uuid id
        string titulo
        string descricao
        string curso_alvo
        string estado
    }

    CANDIDATURA {
        uuid id
        uuid estudante_id
        uuid vaga_id
        string estado
        date data_submissao
    }

Relações Essenciais
​Uma empresa pode publicar várias vagas.

​Uma vaga pode receber várias candidaturas.

​Um estudante pode submeter candidaturas para diferentes vagas.

​Cada candidatura associa um estudante a uma vaga e mantém o estado do processo.


​🔒 Segurança e Regras de Negócio
​Autenticação: Verificar a identidade do utilizador antes de permitir operações restritas.

​Autorização por perfil: Separar estritamente as permissões de finalistas, empresas e coordenação.
​
Validação no servidor: Garantir validações seguras independentemente do navegador.

​Protecção de dados: Restringir o acesso aos dados pessoais e candidaturas.

​Integridade: Impedir candidaturas duplicadas à mesma vaga.
​
Gestão de Segredos: Nunca incluir palavras-passe, tokens privados ou chaves de serviço no repositório. Utilizar variáveis de ambiente (.gitignore).



​Políticas de Base de Dados: Configurar correctamente as políticas de Row Level Security (RLS) no Supabase.


​📈 Metodologia do Projecto
​De acordo com o enquadramento académico, o trabalho recorre a:
​Pesquisa Aplicada: Procura resolver uma necessidade concreta identificada no IPCM.
​Pesquisa Exploratória e Descritiva: Compreender o processo actual e descrever as necessidades da solução.
​Pesquisa Bibliográfica: Consulta de livros, artigos e documentação técnica.
​Estudo de Campo: Recolha de informação no contexto do IPCM.
​Abordagem Qualitativa: Interpretação das dificuldades e necessidades dos intervenientes.
​💻 Instalação e Execução
​1. Clonar o repositório
```bash
git clone <URL-DO-REPOSITORIO>

cd <PASTA-DO-PROJECTO>
```

2. Instalar dependências
​Caso o projecto utilize um gestor de pacotes (package.json):
```bash
npm install
```
3. Configurar variáveis de ambiente
​Crie um ficheiro .env na raiz do projecto com base nas credenciais do seu serviço (ex: Supabase):
```bash
DATABASE_URL=o_seu_url_de_base_de_dados
SUPABASE_URL=o_seu_supabase_url
SUPABASE_ANON_KEY=a_sua_supabase_anon_key
```

4. Executar em ambiente de desenvolvimento
```bash
npm run dev
```

📋 Estado do Desenvolvimento
​[x] Análise de requisitos e levantamento do processo actual.
​[x] Modelação da base de dados.
​[ ] Registo e autenticação de utilizadores.
​[ ] Gestão e validação de empresas.
​[ ] Publicação e aprovação de vagas.
​[ ] Pesquisa e filtragem de oportunidades.
​[ ] Sugestão de vagas por perfil.
​[ ] Submissão e acompanhamento de candidaturas.
​[ ] Painel de administração da coordenação.
​[ ] Testes funcionais e de segurança.
​[ ] Implantação e validação em ambiente de produção.
​👥 Equipa e Contexto Académico
​Projecto desenvolvido no âmbito do Curso Técnico de Informática.
​Efésios M. Bunga
​Emanuel G. Gonçalves
​Joel S. da Costa
​Manuel F. Cauende
​Orientação: Eng. Luís Locupanga
​Instituição de Ensino: Instituto Politécnico n.º 2039 — “30 de Setembro”
​Instituição Beneficiária: Instituto Privado Campos Maria (IPCM)
​Localização do Estudo: Município de Belas, Luanda, Angola
​Ano: 2026
​Mais organização na divulgação de estágios. Mais clareza no acesso às oportunidades.



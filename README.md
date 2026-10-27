
🎓 IPCM Internship Hub

> Plataforma de divulgação, filtragem e sugestão de oportunidades de estágio para finalistas do **Instituto Privado Campos Maria (IPCM)**.  
> *Ligando formação académica a oportunidades profissionais.*

---

📑 Índice

1. [Sobre o Projecto](#-sobre-o-projecto)
2. [Problema Identificado](#-problema-identificado)
3. [Objectivos](#-objectivos)
4. [Solução Proposta](#-solução-proposta)
5. [Funcionalidades Previstas](#-funcionalidades-previstas)
6. [Perfis de Utilizador](#-perfis-de-utilizador)
7. [Fluxo Principal](#-fluxo-principal)
8. [Arquitectura de Referência](#-arquitectura-de-referência)
9. [Tecnologias](#-tecnologias)
10. [Modelo Conceitual de Dados](#-modelo-conceitual-de-dados)
11. [Segurança e Regras de Negócio](#-segurança-e-regras-de-negócio)
12. [Metodologia do Projecto](#-metodologia-do-projecto)
13. [Instalação e Execução](#-instalação-e-execução)
14. [Estado do Desenvolvimento](#-estado-do-desenvolvimento)
15. [Equipa e Contexto Académico](#-equipa-e-contexto-académico)

---

🚀 Sobre o Projecto

O **IPCM Internship Hub** é uma plataforma web concebida para centralizar a divulgação e a consulta de oportunidades de estágio destinadas aos finalistas do **Instituto Privado Campos Maria (IPCM)**.

A proposta procura tornar o processo de acesso às vagas mais organizado, facilitar a descoberta de oportunidades compatíveis com a formação dos estudantes e apoiar a coordenação do IPCM no acompanhamento de empresas, vagas e candidaturas.

> ⚠️ **Nota:** Este README descreve o âmbito e a arquitectura de referência. As funcionalidades devem ser ajustadas ao código efectivamente implementado.

---

⚠️ Problema Identificado

A divulgação dispersa de oportunidades dificulta o acesso dos finalistas às vagas, provoca perda de informação e torna mais difícil a gestão das candidaturas.

> *De que forma um site de gestão de estágios pode facilitar o acesso a oportunidades e melhorar a integração dos finalistas do IPCM no mercado de trabalho?*

---

🎯 Objectivos

Objectivo Geral
Desenvolver um site centralizado para divulgação, consulta e sugestão de vagas de estágio aos finalistas do IPCM.

Objectivos Específicos
* Analisar o processo actual de procura e atribuição de estágios.
* Identificar requisitos junto dos finalistas, da coordenação e das empresas parceiras.
* Estruturar os dados de estudantes, empresas, vagas e candidaturas.
* Disponibilizar pesquisa e filtragem de oportunidades por critérios relevantes.
* Permitir candidaturas online e acompanhamento do respectivo estado.

---

💡 Solução Proposta

* **Estudantes:** Mantêm perfil académico e consultam oportunidades.
* **Empresas:** Disponibilizam informações e propõem vagas, sujeitas a validação.
* **Vagas:** Apresentam requisitos, área de formação e competências.
* **Candidaturas:** Registam a manifestação de interesse e o estado do processo.

*A sugestão representa uma medida de compatibilidade segundo critérios definidos; não garante a selecção pela empresa.*

---

⚙️ Funcionalidades Previstas

Para Finalistas
* [ ] Registo e autenticação.
* [ ] Criação e actualização do perfil académico.
* [ ] Consulta do mural de vagas.
* [ ] Pesquisa e filtragem por curso, área e competências.
* [ ] Submissão de candidaturas online.
* [ ] Consulta do estado das candidaturas.

Para Empresas
* [ ] Registo e manutenção dos dados da empresa.
* [ ] Submissão de vagas.
* [ ] Acompanhamento das candidaturas associadas.

Para Coordenação / Administração
* [ ] Validação de empresas e vagas.
* [ ] Acompanhamento e actualização do estado das candidaturas.

---

👥 Perfis de Utilizador

| Perfil | Responsabilidade Principal |
| :--- | :--- |
| **Finalista** | Gerir o perfil, encontrar vagas e candidatar-se. |
| **Empresa** | Submeter oportunidades e acompanhar candidaturas. |
| **Administrador / Coordenação IPCM** | Validar empresas e vagas e supervisionar o processo. |

---

🔄 Fluxo Principal

```mermaid
flowchart TD
    A([Início]) --> B{Perfil de utilizador}
    B -->|Finalista| C[Registar-se / iniciar sessão]
    C --> D[Completar perfil académico]
    D --> E[Consultar e filtrar vagas]
    E --> F[Verificar compatibilidade]
    F --> G{Vaga adequada?}
    G -->|Não| E
    G -->|Sim| H[Submeter candidatura]
    H --> I[Acompanhar estado]

    B -->|Empresa| J[Registar empresa]
    J --> K[Submeter vaga]
    K --> L{Validação da coordenação}
    L -->|Rejeitada| M[Corrigir dados]
    M --> K
    L -->|Aprovada| N[Vaga publicada]
    N --> E

    B -->|Coordenação| O[Gerir empresas, vagas e candidaturas]
    O --> L
---

🏗️ Arquitectura de Referência
flowchart LR
    U[Utilizadores<br/>Finalistas, empresas e coordenação]
    subgraph FRONT[Camada de apresentação]
        FE[HTML + CSS + JavaScript]
    end
    subgraph APP[Camada de aplicação]
        API[API / serviços]
        RULES[Regras de negócio]
    end
    subgraph DATA[Camada de dados]
        SB[Supabase]
        PG[(PostgreSQL)]
    end
    HOST[Vercel<br/>Alojamento]

    U --> FE
    FE --> API
    API --> RULES
    RULES --> SB
    SB --> PG
    HOST -.-> FE
---

🗄️ Modelo Conceitual de Dados
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
*Relações Essenciais:*
- Uma empresa pode publicar várias vagas.
- Uma vaga pode receber várias candidaturas.
- Um estudante pode candidatar-se a diferentes vagas.

---

🔒 Segurança e Regras de Negócio

- *Autenticação:* Verificar identidade antes de operações restritas.
- *Autorização por perfil:* Separar permissões de finalistas, empresas e coordenação.
- *Validação no servidor:* Garantir validações seguras no backend.
- *Protecção de dados:* Restringir acesso a dados pessoais.
- *Integridade:* Impedir candidaturas duplicadas à mesma vaga.
- *Gestão de Segredos:* Nunca incluir passwords ou chaves no repo. Usar `.env` e `.gitignore`.
- *RLS:* Configurar Row Level Security no Supabase.

---

📈 Metodologia do Projecto

- Pesquisa Aplicada, Exploratória e Descritiva
- Pesquisa Bibliográfica
- Estudo de Campo no IPCM
- Abordagem Qualitativa

---

💻 Instalação e Execução

1. Clonar o repositório
```bash
git clone https://github.com/SEU-USER/IPCM_SOFTWARE.git
cd IPCM_SOFTWARE

```
2. Instalar dependências
```bash
npm install
```

3. Configurar variáveis de ambiente
Crie um ficheiro `.env` na raiz:
```bash
SUPABASE_URL=o_seu_supabase_url
SUPABASE_ANON_KEY=a_sua_supabase_anon_key
DATABASE_URL=o_seu_url_de_base_de_dados

```
4. Executar em desenvolvimento
```bash
npm run dev
```

📋 Estado do Desenvolvimento

- Análise de requisitos e modelação da BD
- [ ] Registo e autenticação
- [ ] Gestão e validação de empresas
- [ ] Publicação e aprovação de vagas
- [ ] Pesquisa e filtragem
- [ ] Sugestão de vagas por perfil
- [ ] Submissão e acompanhamento de candidaturas
- [ ] Painel de administração
- [ ] Testes e Implantação[x]

---

👥 Equipa e Contexto Académico

*Projecto desenvolvido no âmbito do Curso Técnico de Informática.*

- Efésios M. Bunga
- Emanuel G. Gonçalves
- Joel S. da Costa
- Manuel F. Cauende

*Orientação:* Eng. Luís Locupanga
*Instituição:* Instituto Politécnico n.º 2039 — “30 de Setembro”
*Beneficiária:* Instituto Privado Campos Maria (IPCM)
*Local:* Município de Belas, Luanda, Angola
*Ano:* 2026

> Mais organização na divulgação de estágios. Mais clareza no acesso às oportunidades.




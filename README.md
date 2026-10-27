
#IPCM Internship Hub
##Plataforma de divulgação, filtragem e sugestão de oportunidades de estágio para finalistas do Instituto Privado Campos Maria
Ligando formação académica a oportunidades profissionais.
� � � � �

Índice
Sobre o projecto
Problema identificado
Objectivos
Solução proposta
Funcionalidades previstas
Perfis de utilizador
Fluxo principal
Arquitectura de referência
Tecnologias
Modelo conceptual de dados
Segurança e regras de negócio
Metodologia do projecto
Instalação e execução
Estado do desenvolvimento
Equipa
Contexto académico
Sobre o projecto
O IPCM Internship Hub é uma plataforma web concebida para centralizar a divulgação e a consulta de oportunidades de estágio destinadas aos finalistas do Instituto Privado Campos Maria (IPCM).
A proposta procura tornar o processo de acesso às vagas mais organizado, facilitar a descoberta de oportunidades compatíveis com a formação dos estudantes e apoiar a coordenação do IPCM no acompanhamento de empresas, vagas e candidaturas.
Em vez de depender exclusivamente de avisos presenciais ou de canais informais, a plataforma propõe um ponto de acesso digital onde as oportunidades e os respectivos requisitos podem ser consultados de forma estruturada.
Nota sobre o estado do projecto: este README descreve o âmbito e a arquitectura de referência do projecto académico. As funcionalidades, tecnologias e instruções de execução devem ser ajustadas ao código que estiver efectivamente implementado no repositório.
Problema identificado
A divulgação dispersa de oportunidades pode dificultar o acesso dos finalistas às vagas, provocar perda de informação e tornar mais difícil a gestão das candidaturas. A falta de critérios centralizados também pode levar estudantes a procurar oportunidades que não correspondem ao seu curso ou às suas competências.
A pergunta que orienta o projecto é:
De que forma um site de gestão de estágios pode facilitar o acesso a oportunidades e melhorar a integração dos finalistas do IPCM no mercado de trabalho?
Objectivos
Objectivo geral
Desenvolver um site centralizado para divulgação, consulta e sugestão de vagas de estágio aos finalistas do IPCM.
Objectivos específicos
Analisar o processo actual de procura e atribuição de estágios.
Identificar requisitos junto dos finalistas, da coordenação e das empresas parceiras.
Estruturar os dados de estudantes, empresas, vagas e candidaturas.
Disponibilizar pesquisa e filtragem de oportunidades por critérios relevantes.
Permitir candidaturas online e acompanhamento do respectivo estado.
Apoiar a coordenação na validação de empresas e vagas e na gestão das candidaturas.
Solução proposta
A plataforma organiza o processo em torno de quatro elementos principais:
Estudantes: mantêm um perfil académico e consultam oportunidades.
Empresas: disponibilizam informações e propõem vagas, sujeitas às regras de validação definidas.
Vagas: apresentam requisitos, área de formação, competências e outras condições.
Candidaturas: registam a manifestação de interesse do estudante e o estado do processo.
O sistema pode sugerir oportunidades com base no perfil do estudante e nos requisitos da vaga. A sugestão representa uma medida de compatibilidade segundo os critérios definidos pela plataforma; não garante a selecção pela empresa nem substitui a decisão da coordenação.
Funcionalidades previstas
Para finalistas
Registo e autenticação.
Criação e actualização do perfil académico.
Consulta do mural de vagas.
Pesquisa e filtragem por curso, área e competências.
Visualização dos requisitos e detalhes de cada oportunidade.
Submissão de candidaturas online.
Consulta do estado das candidaturas.
Visualização de sugestões compatíveis com o perfil.
Para empresas
Registo e manutenção dos dados da empresa.
Submissão de vagas com requisitos e critérios definidos.
Consulta das vagas submetidas.
Acompanhamento das candidaturas associadas às suas vagas, de acordo com as permissões atribuídas.
Para a coordenação / administração do IPCM
Gestão dos perfis e dos acessos.
Validação de empresas e oportunidades.
Aprovação ou rejeição de vagas.
Acompanhamento das candidaturas.
Actualização do estado das candidaturas.
Consulta de informação para apoiar a organização do processo de estágios.
Estas funcionalidades constituem o âmbito funcional definido para o projecto; a sua disponibilidade concreta depende da implementação existente.
Perfis de utilizador
Perfil
Responsabilidade principal
Finalista
Gerir o perfil, encontrar vagas e candidatar-se.
Empresa
Submeter oportunidades e acompanhar candidaturas autorizadas.
Administrador / Coordenação IPCM
Validar empresas e vagas e supervisionar o processo.
Fluxo principal
O diagrama seguinte utiliza Mermaid, suportado directamente pelo GitHub. Representa o fluxo funcional proposto, não uma confirmação de que cada etapa já esteja implementada.
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
Arquitectura de referência
A arquitectura conceptual separa a interface, a lógica de aplicação e a persistência dos dados. A configuração final deverá reflectir as decisões técnicas presentes no repositório.
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
Interpretação: HTML, CSS e JavaScript podem compor a interface; Node.js pode executar a lógica de servidor; Supabase disponibiliza serviços de dados baseados em PostgreSQL; e Vercel pode alojar a aplicação. A comunicação exacta entre estes componentes depende da implementação escolhida. Não se deve assumir que todos estão ligados desta forma sem verificar o código e a configuração do projecto.
Tecnologias
Tecnologia
Papel previsto
HTML5
Estrutura semântica das páginas e formulários.
CSS3
Estilos, disposição e adaptação a diferentes ecrãs.
JavaScript
Interacções, validações no cliente e comunicação com os serviços.
Node.js
Execução de JavaScript no servidor, caso seja usada uma API própria.
Supabase
Serviços de dados e, se configurado, autenticação.
PostgreSQL
Armazenamento relacional de estudantes, empresas, vagas e candidaturas.
Vercel
Alojamento e implantação da aplicação, se adoptado no projecto.
Git e GitHub
Controlo de versões, colaboração e documentação.
Os nomes acima representam as tecnologias consideradas na documentação do projecto. Confirma a utilização efectiva de cada uma antes de apresentar esta tabela como descrição definitiva da implementação.
Modelo conceptual de dados
O modelo inicial considera quatro entidades centrais. Os atributos e as relações exactas devem ser confirmados no esquema real da base de dados.
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
Relações essenciais
Uma empresa pode publicar várias vagas.
Uma vaga pode receber várias candidaturas.
Um estudante pode submeter candidaturas para diferentes vagas.
Cada candidatura associa um estudante a uma vaga e mantém o estado do processo.
O diagrama é conceptual. Tipos de dados, campos obrigatórios, chaves estrangeiras, restrições e políticas de acesso devem corresponder ao esquema implementado.
Segurança e regras de negócio
A plataforma deverá considerar, no mínimo, os seguintes pontos:
Autenticação: verificar a identidade do utilizador antes de permitir operações restritas.
Autorização por perfil: separar as permissões de finalistas, empresas e coordenação.
Validação no servidor: não confiar exclusivamente em validações feitas no navegador.
Protecção dos dados: restringir o acesso aos dados pessoais e às candidaturas.
Integridade: impedir candidaturas duplicadas à mesma vaga, se essa for a regra adoptada.
Validação de vagas: definir quem pode publicar, aprovar, suspender ou encerrar oportunidades.
Segredos e credenciais: nunca incluir palavras-passe, tokens privados ou chaves de serviço no repositório.
Políticas de base de dados: se for usado Supabase, configurar correctamente as políticas de Row Level Security (RLS) e as permissões de acesso.
Estas são recomendações para orientar a implementação e a revisão de segurança, não uma declaração de que todos estes controlos já existem.
Metodologia do projecto
De acordo com o enquadramento académico, o trabalho recorre a:
Pesquisa aplicada: procura resolver uma necessidade concreta identificada no IPCM.
Pesquisa exploratória e descritiva: compreender o processo actual e descrever as necessidades e funcionalidades da solução.
Pesquisa bibliográfica: consultar livros, artigos e documentação técnica.
Estudo de campo: recolher informação no contexto do IPCM.
Abordagem qualitativa: interpretar as dificuldades e necessidades dos intervenientes.
A avaliação da plataforma deverá verificar se as funcionalidades respondem aos requisitos identificados, se os fluxos principais funcionam correctamente e se a solução facilita a consulta e o acompanhamento das oportunidades.
Instalação e execução
As instruções seguintes são um modelo genérico. Antes de as usar, confirma a estrutura do repositório, os scripts disponíveis e os serviços configurados.
1. Clonar o repositório
git clone <URL-DO-REPOSITORIO>
cd <PASTA-DO-PROJECTO>
2. Instalar dependências
Se o projecto tiver um package.json:
npm install
Se não houver package.json, o projecto poderá usar apenas ficheiros estáticos ou outra configuração. Nesse caso, segue a estrutura real do repositório em vez de executar este comando.
3. Configurar variáveis de ambiente
Se a aplicação depender de serviços externos ou de uma API, cria o ficheiro de ambiente esperado pelo projecto, por exemplo .env, e define apenas as variáveis exigidas pelo código.
# Exemplo ilustrativo — substituir pelos nomes realmente usados no projecto
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
Não preenchas variáveis sem confirmar se a aplicação as utiliza. Não publiques segredos no GitHub; adiciona ficheiros locais de ambiente ao .gitignore.
4. Executar em desenvolvimento
Se o package.json definir um script dev, usa:
npm run dev
Caso contrário, consulta o README, os scripts e a configuração existentes no repositório para identificar o comando correcto. Não existe um comando universal de execução para todos os projectos web.
Estado do desenvolvimento
Actualiza esta secção com base no que já foi concluído e testado.
[ ] Análise de requisitos e levantamento do processo actual.
[ ] Modelação da base de dados.
[ ] Registo e autenticação de utilizadores.
[ ] Gestão e validação de empresas.
[ ] Publicação e aprovação de vagas.
[ ] Pesquisa e filtragem de oportunidades.
[ ] Sugestão de vagas por perfil.
[ ] Submissão e acompanhamento de candidaturas.
[ ] Painel de administração da coordenação.
[ ] Testes funcionais e de segurança.
[ ] Implantação e validação em ambiente de produção.
Equipa
Projecto desenvolvido no âmbito do Curso Técnico de Informática.
Efésios M. Bunga
Emanuel G. Gonçalves
Joel S. da Costa
Manuel F. Cauende
Orientação: Eng. Luís Locupanga.
Contexto académico
Instituição: Instituto Politécnico n.º 2039 — “30 de Setembro”
Instituição beneficiária do projecto: Instituto Privado Campos Maria (IPCM)
Localização do estudo: Município de Belas, Luanda, Angola
Ano: 2026

IPCM Internship Hub
Mais organização na divulgação de estágios. Mais clareza no acesso às oportunidades.

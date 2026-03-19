export interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagem: string;
  categoria: string;
  autor: string;
  data: string;
  destaque: boolean;
}

export const categorias = [
  "Todas",
  "Inclusão",
  "Eventos",
  "Políticas Públicas",
  "Saúde",
  "Educação",
  "Direitos",
];

export const noticias: Noticia[] = [
  {
    id: "1",
    titulo: "CMPCD Jaú realiza audiência pública sobre acessibilidade urbana",
    resumo: "Evento reuniu representantes da sociedade civil e do poder público para discutir melhorias na infraestrutura urbana.",
    conteudo: "O Conselho Municipal da Pessoa com Deficiência de Jaú realizou na última terça-feira uma audiência pública voltada à discussão de acessibilidade urbana no município. O evento contou com a participação de representantes de diversas secretarias municipais, organizações da sociedade civil e cidadãos interessados.\n\nDurante o encontro, foram apresentados dados sobre as condições de acessibilidade nas principais vias e prédios públicos da cidade. Os participantes puderam expor suas experiências e sugestões para melhorias.\n\nEntre as principais demandas levantadas estão: instalação de rampas de acesso em calçadas, sinalização tátil em pontos estratégicos, adequação de semáforos com sinal sonoro e melhoria no transporte público adaptado.\n\nO presidente do CMPCD destacou a importância da participação popular na construção de políticas públicas inclusivas e anunciou que as propostas serão compiladas em um documento a ser encaminhado à Prefeitura.",
    imagem: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=400&fit=crop",
    categoria: "Políticas Públicas",
    autor: "CMPCD Jaú",
    data: "2025-03-15",
    destaque: true,
  },
  {
    id: "2",
    titulo: "Parceria com APAE amplia atendimento a pessoas com deficiência intelectual",
    resumo: "Convênio firmado entre o conselho e a APAE visa expandir os serviços de reabilitação e inclusão.",
    conteudo: "O CMPCD Jaú firmou uma parceria estratégica com a APAE local para ampliação dos serviços de atendimento a pessoas com deficiência intelectual. O convênio prevê a expansão dos programas de reabilitação, capacitação profissional e inclusão social.\n\nA iniciativa busca atender uma demanda crescente identificada nos cadastros realizados pelo conselho. Os dados mostram que uma parcela significativa das pessoas com deficiência no município necessita de acompanhamento especializado contínuo.\n\nA parceria inclui também ações de conscientização junto à comunidade, visando combater o preconceito e promover a inclusão efetiva dessas pessoas no mercado de trabalho e na vida social.",
    imagem: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop",
    categoria: "Inclusão",
    autor: "CMPCD Jaú",
    data: "2025-03-10",
    destaque: true,
  },
  {
    id: "3",
    titulo: "Campanha de conscientização sobre direitos das pessoas com deficiência",
    resumo: "Ação educativa visa informar a população sobre os direitos garantidos por lei.",
    conteudo: "O CMPCD Jaú lançou uma campanha de conscientização sobre os direitos das pessoas com deficiência, garantidos pela Lei Brasileira de Inclusão (Lei 13.146/2015). A campanha utiliza materiais informativos distribuídos em escolas, postos de saúde e espaços públicos do município.\n\nEntre os direitos abordados estão: acesso à educação inclusiva, atendimento prioritário, vagas reservadas no mercado de trabalho, benefícios assistenciais e o direito à acessibilidade em espaços públicos e privados.",
    imagem: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=400&fit=crop",
    categoria: "Direitos",
    autor: "CMPCD Jaú",
    data: "2025-02-28",
    destaque: false,
  },
  {
    id: "4",
    titulo: "Workshop sobre tecnologias assistivas é realizado em Jaú",
    resumo: "Evento apresentou inovações tecnológicas que auxiliam no dia a dia de pessoas com deficiência.",
    conteudo: "O município de Jaú sediou um workshop sobre tecnologias assistivas, organizado pelo CMPCD em parceria com a Secretaria de Educação. O evento apresentou diversos equipamentos e softwares que auxiliam pessoas com diferentes tipos de deficiência em suas atividades cotidianas.\n\nForam demonstrados leitores de tela, dispositivos de comunicação alternativa, próteses de última geração e adaptações para uso de computadores e celulares. Os participantes puderam experimentar as tecnologias e tirar dúvidas com especialistas.",
    imagem: "https://images.unsplash.com/photo-1531746790095-e5e5da42e358?w=800&h=400&fit=crop",
    categoria: "Eventos",
    autor: "CMPCD Jaú",
    data: "2025-02-20",
    destaque: false,
  },
  {
    id: "5",
    titulo: "Programa de inclusão no mercado de trabalho atinge 100 colocações",
    resumo: "Iniciativa do conselho já ajudou mais de 100 pessoas com deficiência a encontrarem emprego.",
    conteudo: "O programa de inclusão no mercado de trabalho, coordenado pelo CMPCD Jaú em parceria com empresas locais, atingiu a marca de 100 colocações profissionais. O projeto oferece capacitação, acompanhamento e mediação entre candidatos com deficiência e empregadores.\n\nO sucesso do programa se deve à abordagem integrada, que inclui não apenas a colocação profissional, mas também o acompanhamento pós-contratação para garantir a adaptação adequada tanto do trabalhador quanto da empresa.",
    imagem: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    categoria: "Inclusão",
    autor: "CMPCD Jaú",
    data: "2025-02-10",
    destaque: false,
  },
  {
    id: "6",
    titulo: "Conselho participa de encontro estadual sobre políticas de inclusão",
    resumo: "Representantes do CMPCD Jaú compartilharam experiências em evento estadual.",
    conteudo: "Membros do CMPCD Jaú participaram do Encontro Estadual de Conselhos Municipais da Pessoa com Deficiência, realizado em São Paulo. O evento reuniu representantes de diversos municípios para troca de experiências e discussão de políticas públicas de inclusão.\n\nA delegação de Jaú apresentou os resultados do programa de cadastro digital de PCDs e do sistema de acompanhamento de políticas públicas, que foram destacados como referência para outros municípios.",
    imagem: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
    categoria: "Políticas Públicas",
    autor: "CMPCD Jaú",
    data: "2025-01-25",
    destaque: false,
  },
];

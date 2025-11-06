// script.js

const musicas = [
  {
    id: 1,
    titulo: 'MEIA NOITE (VOCÊ TEM MEU WHATSAPP)',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/01 - MEIA NOITE (VOCÊ TEM MEU WHATSAPP) - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 2,
    titulo: 'HOJE DÓI',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/02 - HOJE DÓI - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 3,
    titulo: 'NÃO QUER CORRER O RISCO',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/03 - NÃO QUER CORRER O RISCO - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 4,
    titulo: 'PARECENDO LOUCA',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/04 - PARECENDO LOUCA - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 5,
    titulo: 'VALEU GALÊGA',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/05 - VALEU GALÊGA - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 6,
    titulo: 'AMOR PROIBIDO',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/06 - AMOR PROIBIDO - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 7,
    titulo: 'QUE CULPA TENHO EU',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/07 - QUE CULTA TENHO EU - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 8,
    titulo: 'SE VAI ME DEIXAR',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/08 - SE VAI ME DEIXAR - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 9,
    titulo: 'VOLTA MEU AMOR',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/09 - VOLTA MEU AMOR - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 10,
    titulo: 'SE QUISER É DESSE JEITO',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/10 - SE QUISER É DESSE JEITO - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 11,
    titulo: 'A PIOR PARTE',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/11 - A PIOR PARTE - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 12,
    titulo: 'AMOR E FÉ',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/12 - AMOR E FÉ - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 13,
    titulo: 'JOGO DA TRAIÇÃO',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/13 - JOGO DA TRAIÇÃO - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 14,
    titulo: 'SEMPRE FUI VAQUEIRO',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/14 - SEMPRE FUI VAQUEIRO - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 15,
    titulo: 'SE QUISER VOLTAR',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/15 - SE QUISER VOLTAR - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 16,
    titulo: 'SÓ ME DESPREZOU',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/16 - SÓ ME DESPREZOU - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 17,
    titulo: 'A CIDADE SABE (LABIRINTO DO AMOR)',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/17 - A CIDADE SABE (LABIRINTO DO AMOR) - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 18,
    titulo: 'TONELADA DE SOLIDÃO',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/18 - TONELADA DE SOLIDÃO - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 19,
    titulo: 'TOQUE CARINHOSO',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/19 - TOQUE CARINHOSO - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 20,
    titulo: 'TIRAR VOCÊ DO CABARÉ',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/20 - TIRAR VOCÊ DO CABARÉ - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 21,
    titulo: 'COMO UM CRISTAL',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/21 - COMO UM CRISTAL - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 22,
    titulo: 'POR VOCÊ VOU TER QUE MUDAR',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/22 - POR VOCÊ VOU TER QUE MUDAR - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 23,
    titulo: 'MEU MUNDO SEM VOCÊ',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/23 - MEU MUNDO SEM VOCÊ - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  },
  {
    id: 24,
    titulo: 'ISSO É AMOR',
    artista: 'Tarcísio do Acordeon',
    genero: 'Forró',
    arquivo: 'JSCODE/Forró/24 - ISSO É AMOR - Tarcísio do Acordeon.mp3',
    capa: 'JSCODE/capas/tarcisio.webp',
    favorita: false
  }
];
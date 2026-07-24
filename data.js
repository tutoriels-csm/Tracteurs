// ==================== DonnÃ©es des Tutoriels ====================
// Modifiez ce fichier pour ajouter vos propres tutoriels YouTube

const tutorials = [
    // === CHARGEMENT PRODUITS, GESTION DES FAVORIS ===
    {
        id: 1,
        title: "Chargement d'un produit dans le tracteur",
        description: "Apprenez comment charger correctement un produit dans votre tracteur CLAAS",
        category: "Chargement produits, gestion des favoris",
        youtubeId: "yg_vJ1MOdFU",
        duration: "00:00",
        thumbnail: "https://img.youtube.com/vi/yg_vJ1MOdFU/hqdefault.jpg"
    },
    {
        id: 2,
        title: "Gestion des favoris",
        description: "DÃ©couvrez comment gÃ©rer et organiser vos favoris dans CEBIS.",
        category: "Chargement produits, gestion des favoris",
        youtubeId: "xUcrtv7DOtE",
        duration: "00:00",
        thumbnail: "https://img.youtube.com/vi/xUcrtv7DOtE/hqdefault.jpg"
    },

    // === CALIBRATION DES CAPTEURS ===
    {
        id: 3,
        title: "Calibration du quantimÃ¨tre",
        description: "Apprenez Ã  calibrer correctement le quantimÃ¨tre de votre tracteur CLAAS.",
        category: "Calibration des capteurs",
        youtubeId: "OmpPT2jmrA8",
        duration: "00:00",
        thumbnail: "https://img.youtube.com/vi/OmpPT2jmrA8/hqdefault.jpg"
    },
    {
        id: 4,
        title: "Calibration de capteurs liÃ©s Ã  CEMOS Dialog",
        description: "Configuration et calibration des capteurs intÃ©grÃ©s Ã  CEMOS Dialog.",
        category: "Calibration des capteurs",
        youtubeId: "j3skWj0wlxo",
        duration: "00:00",
        thumbnail: "https://img.youtube.com/vi/j3skWj0wlxo/hqdefault.jpg"
    },
    {
        id: 5,
        title: "Calibration de la camÃ©ra de qualitÃ©",
        description: "ProcÃ©dure de calibration de la camÃ©ra de qualitÃ©.",
        category: "Calibration des capteurs",
        youtubeId: "hei91mWOxfY",
        duration: "00:00",
        thumbnail: "https://img.youtube.com/vi/hei91mWOxfY/hqdefault.jpg"
    },

    // === RÃ‰GLAGES DES OUTILS ET ATTELAGES ===
    {
        id: 6,
        title: "RÃ©gler les positions d'outils et d'attelage",
        description: "Apprenez Ã  rÃ©gler correctement les positions de vos outils et attelages.",
        category: "RÃ©glages des outils et attelages",
        youtubeId: "fSQoGX-LpnU",
        duration: "00:00",
        thumbnail: "https://img.youtube.com/vi/fSQoGX-LpnU/hqdefault.jpg"
    },
    {
        id: 7,
        title: "RÃ©gler les paramÃ¨tres de travail au champ",
        description: "DÃ©couvrez comment rÃ©gler les paramÃ¨tres de travail pour optimiser vos passages.",
        category: "RÃ©glages des outils et attelages",
        youtubeId: "sCuZ6YiILQc",
        duration: "00:00",
        thumbnail: "https://img.youtube.com/vi/sCuZ6YiILQc/hqdefault.jpg"
    },

    // === UTILISATION DES OUTILS D'ASSISTANCE Ã€ LA CONDUITE ===
    {
        id: 8,
        title: "RÃ©gler le CRUISE PILOT",
        description: "Apprenez Ã  configurer et utiliser le CRUISE PILOT pour une conduite optimisÃ©e.",
        category: "Utilisation des outils d'assistance Ã  la conduite",
        youtubeId: "OvDbUC-OYUY",
        duration: "00:00",
        thumbnail: "https://img.youtube.com/vi/OvDbUC-OYUY/hqdefault.jpg"
    },
    {
        id: 9,
        title: "Optimiser les stratÃ©gies avec CEMOS AUTO PRO",
        description: "DÃ©couvrez comment optimiser vos stratÃ©gies de travail avec CEMOS AUTO PRO.",
        category: "Utilisation des outils d'assistance Ã  la conduite",
        youtubeId: "sZq71o275TM",
        duration: "00:00",
        thumbnail: "https://img.youtube.com/vi/sZq71o275TM/hqdefault.jpg"
    },
    {
        id: 10,
        title: "Proposition d'optimisation avec CEMOS DIALOG",
        description: "Explorez les propositions d'optimisation automatiques de CEMOS DIALOG.",
        category: "Utilisation des outils d'assistance Ã  la conduite",
        youtubeId: "ahPUQ3MBD8I",
        duration: "00:00",
        thumbnail: "https://img.youtube.com/vi/ahPUQ3MBD8I/hqdefault.jpg"
    }
];


// CatÃ©gories ouvrant un module de formation indÃ©pendant.
// Elles utilisent exactement les mÃªmes cartes que les catÃ©gories vidÃ©o existantes.
const externalCategories = [
    {
        title: "CEMOS Tracteur",
        description: "CLAAS ARION 6.190 CMATIC",
        count: 47,
        url: "cemos-tracteur/index.html"
    }
];

// ==================== INSTRUCTIONS D'UTILISATION ====================
// Pour ajouter vos propres tutoriels :
//
// 1. Trouvez l'ID de votre vidÃ©o YouTube :
//    - Allez sur votre vidÃ©o YouTube
//    - L'ID se trouve dans l'URL : https://www.youtube.com/watch?v=VOTRE_VIDEO_ID
//
// 2. Modifiez un objet tutorial :
//    {
//        id: [numÃ©ro unique],
//        title: "Titre de votre tutoriel",
//        description: "Description courte du contenu",
//        category: "Nom de la catÃ©gorie",
//        youtubeId: "VOTRE_VIDEO_ID", // Remplacez par l'ID rÃ©el
//        duration: "MM:SS",
//        thumbnail: "https://img.youtube.com/vi/VOTRE_VIDEO_ID/hqdefault.jpg"
//    }
//
// 3. Les catÃ©gories disponibles :
//    - Chargement produits, gestion des favoris
//    - Calibration des capteurs
//    - RÃ©glages des outils et attelages
//    - Utilisation des outils d'assistance Ã  la conduite
//    - CEMOS
//
// 4. Enregistrez et rechargez la page pour voir vos changements !

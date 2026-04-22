import type { PageInfo, PageSection } from '../types/PageContent';

export const initialPageData: PageInfo[] = [
  {
    id: 'home',
    name: 'Accueil',
    path: '/',
    description: 'Page d\'accueil avec hero, statistiques et mur d\'articles',
    status: 'active',
    lastModified: new Date(),
    sections: [
      {
        id: 'hero',
        title: 'Section Hero',
        content: 'Rejoignez la Communauté Data du Congo Brazzaville. Connectez-vous avec les data scientists, ingénieurs et développeurs passionnés par l\'innovation data au Congo.',
        type: 'hero',
        order: 1,
        visible: true
      },
      {
        id: 'stats',
        title: 'Statistiques',
        content: '250+ membres, 45 articles, 12 événements, 98% satisfaction',
        type: 'stats',
        order: 2,
        visible: true
      },
      {
        id: 'articles',
        title: 'Mur des articles',
        content: 'Découvrez les derniers articles de notre communauté data sur le data engineering, machine learning, python, big data et les use cases congo.',
        type: 'articles',
        order: 3,
        visible: true
      },
      {
        id: 'how-it-works',
        title: 'Comment ça fonctionne',
        content: 'Kit de survie en 4 étapes simples pour rejoindre notre communauté',
        type: 'custom',
        order: 4,
        visible: true
      }
    ]
  },
  {
    id: 'story',
    name: 'Story',
    path: '/story',
    description: 'Page narrative sur l\'histoire de Data Eng Congo',
    status: 'active',
    lastModified: new Date(),
    sections: [
      {
        id: 'hero-story',
        title: 'Hero Story',
        content: 'L\'histoire de Data Eng Congo, une communauté née de la passion pour la data et l\'innovation au Congo.',
        type: 'hero',
        order: 1,
        visible: true
      },
      {
        id: 'origine',
        title: 'Origine',
        content: 'Naissance de Data Eng Congo en 2023, autour d\'un café entre passionnés de data.',
        type: 'custom',
        order: 2,
        visible: true
      },
      {
        id: 'constat',
        title: 'Constat',
        content: 'L\'écosystème data congolais était fragmenté, manque de partage et de collaboration.',
        type: 'custom',
        order: 3,
        visible: true
      },
      {
        id: 'vision',
        title: 'Vision',
        content: 'Créer un espace collaboratif moderne et inclusif pour les professionnels de la data au Congo.',
        type: 'custom',
        order: 4,
        visible: true
      }
    ]
  },
  {
    id: 'members',
    name: 'Membres',
    path: '/members',
    description: 'Page présentant les membres de la communauté',
    status: 'active',
    lastModified: new Date(),
    sections: [
      {
        id: 'hero-members',
        title: 'Hero Membres',
        content: 'Découvrez les talents qui font la richesse de notre communauté data congolaise.',
        type: 'hero',
        order: 1,
        visible: true
      },
      {
        id: 'members-grid',
        title: 'Grille des membres',
        content: 'Présentation des profils : Data Engineers, ML Engineers, Data Scientists, Analysts.',
        type: 'custom',
        order: 2,
        visible: true
      },
      {
        id: 'join-cta',
        title: 'Appel à rejoindre',
        content: 'Rejoignez notre communauté et développez vos compétences dans un environnement collaboratif.',
        type: 'cta',
        order: 3,
        visible: true
      }
    ]
  },
  {
    id: 'events',
    name: 'Événements',
    path: '/events',
    description: 'Page des événements et meetups Data Eng',
    status: 'active',
    lastModified: new Date(),
    sections: [
      {
        id: 'hero-events',
        title: 'Hero Événements',
        content: 'Participez à nos événements et meetups pour apprendre et réseauter.',
        type: 'hero',
        order: 1,
        visible: true
      },
      {
        id: 'upcoming-events',
        title: 'Événements à venir',
        content: 'Prochains meetups, workshops et conférences sur la data et l\'IA au Congo.',
        type: 'custom',
        order: 2,
        visible: true
      },
      {
        id: 'past-events',
        title: 'Événements passés',
        content: 'Retour sur nos précédentes éditions et les témoignages des participants.',
        type: 'custom',
        order: 3,
        visible: true
      }
    ]
  },
  {
    id: 'write',
    name: 'Rédaction',
    path: '/write',
    description: 'Page de rédaction d\'articles',
    status: 'maintenance',
    lastModified: new Date(),
    sections: [
      {
        id: 'hero-write',
        title: 'Hero Rédaction',
        content: 'Partagez votre expertise avec la communauté Data Eng Congo.',
        type: 'hero',
        order: 1,
        visible: true
      },
      {
        id: 'editor',
        title: 'Éditeur',
        content: 'Interface de rédaction d\'articles avec formatage et aperçu en temps réel.',
        type: 'custom',
        order: 2,
        visible: false
      }
    ]
  },
  {
    id: 'auth',
    name: 'Authentification',
    path: '/login',
    description: 'Page de connexion et d\'inscription',
    status: 'active',
    lastModified: new Date(),
    sections: [
      {
        id: 'login-form',
        title: 'Formulaire de connexion',
        content: 'Connexion sécurisée pour les membres de la communauté Data Eng.',
        type: 'custom',
        order: 1,
        visible: true
      },
      {
        id: 'register-form',
        title: 'Formulaire d\'inscription',
        content: 'Inscription pour rejoindre la communauté Data Eng Congo.',
        type: 'custom',
        order: 2,
        visible: true
      }
    ]
  }
];

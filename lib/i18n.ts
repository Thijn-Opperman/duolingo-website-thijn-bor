export const translations = {
  nl: {
    nav: {
      concepts: 'Concepten',
      team: 'Team',
    },
    hero: {
      hook: 'Wist jij dat Duolingo gratis onderwijs geeft aan 125 miljoen mensen per maand?',
      hookSub: 'De meeste mensen kennen alleen de uil. Wij lieten de missie spreken.',
      headlinePre: 'van stil',
      headlineMid: 'naar',
      headlineAccent: 'luid.',
      subline: "Vier concepten die Duolingo's missie van stil naar luid brengen.",
      cta: 'Bekijk de concepten',
    },
    stats: {
      learners: 'maandelijkse gratis leerders',
      languages: 'talen beschikbaar',
      rank: 'meest gedownloade educatie-app',
    },
    concepts: {
      title: 'de concepten',
      preview: {
        readMore: 'Lees meer',
        q1: 'Wat als je leerde wat JIJ interessant vindt?',
        q2: 'Wat als jouw karakter echt in de game leefde?',
        q3: 'Wat als leren een sport was?',
        q4: 'Wat als de straat jou iets kon leren?',
      },
    },
    process: {
      title: 'het proces',
      teaser: 'Dit is niet zomaar een idee.\nDit is weken research, testen en bouwen.',
      steps: ['Onderzoek', 'Prototypen', 'Uitwerken'],
      seeProcess: 'Bekijk het proces',
    },
    team: {
      title: 'het team',
      madeBy: 'gemaakt door',
      aboutUs: 'Over ons',
      projectTitle: 'Over het Project',
      projectText:
        'Dit project is gemaakt in het kader van semester 4 van de opleiding ICT Media (richting Content Creation) aan Fontys Eindhoven. De opdracht was gebaseerd op de D&AD New Blood Awards 2026 briefing van Duolingo: \'Turn a quiet mission into a loud conversation.\' Wij ontwikkelden vier originele concepten om Duolingo\'s missie — gratis wereldklasse onderwijs voor iedereen — bekend te maken bij jongeren van 16 tot 24 jaar.',
    },
    footer: {
      rights: 'Alle rechten voorbehouden',
    },
    xp: {
      gained: 'XP verdiend!',
      allDone: 'Alle concepten bekeken! 🏆',
    },
    concept: {
      back: '← Alle concepten',
      viewPrototype: 'Bekijk prototype',
      readProcess: 'Lees het proces',
      previous: '← Vorig concept',
      next: 'Volgend concept →',
      backOverview: 'Terug naar overzicht',
      theConcept: 'Het Concept',
      theProcess: 'Het Proces',
      prototype: 'Prototype',
      features: 'Kenmerken',
    },
  },
  en: {
    nav: {
      concepts: 'Concepts',
      team: 'Team',
    },
    hero: {
      hook: 'Did you know Duolingo gives free education to 125 million people every month?',
      hookSub: 'Most people only know the owl. We made the mission speak.',
      headlinePre: 'from quiet',
      headlineMid: 'to',
      headlineAccent: 'loud.',
      subline: "Four concepts that turn Duolingo's mission from quiet to loud.",
      cta: 'See the concepts',
    },
    stats: {
      learners: 'monthly free learners',
      languages: 'languages available',
      rank: 'most downloaded education app',
    },
    concepts: {
      title: 'the concepts',
      preview: {
        readMore: 'Read more',
        q1: 'What if you learned what YOU find interesting?',
        q2: 'What if your character actually lived in the game?',
        q3: 'What if learning was a sport?',
        q4: 'What if the street could teach you something?',
      },
    },
    process: {
      title: 'the process',
      teaser: "This isn't just an idea.\nThis is weeks of research, testing and building.",
      steps: ['Research', 'Prototyping', 'Developing'],
      seeProcess: 'See the process',
    },
    team: {
      title: 'the team',
      madeBy: 'made by',
      aboutUs: 'About us',
      projectTitle: 'About the Project',
      projectText:
        "This project was created as part of semester 4 of the ICT Media programme (Content Creation) at Fontys Eindhoven. The brief was based on the D&AD New Blood Awards 2026 brief by Duolingo: 'Turn a quiet mission into a loud conversation.' We developed four original concepts to make Duolingo's mission — free world-class education for everyone — known to young people aged 16 to 24.",
    },
    footer: {
      rights: 'All rights reserved',
    },
    xp: {
      gained: 'XP earned!',
      allDone: 'All concepts viewed! 🏆',
    },
    concept: {
      back: '← All concepts',
      viewPrototype: 'View prototype',
      readProcess: 'Read the process',
      previous: '← Previous concept',
      next: 'Next concept →',
      backOverview: 'Back to overview',
      theConcept: 'The Concept',
      theProcess: 'The Process',
      prototype: 'Prototype',
      features: 'Features',
    },
  },
} as const

export type Language = 'nl' | 'en'
export type Translations = typeof translations

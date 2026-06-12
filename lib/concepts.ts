export interface Concept {
  id: number
  slug: string
  color: string
  colorDark: string
  tagBg: string
  tagBgDark: string
  tag: { nl: string; en: string }
  title: { nl: string; en: string }
  oneliner: { nl: string; en: string }
  description: { nl: string; en: string }
  question: { nl: string; en: string }
  bullets: { nl: string[]; en: string[] }
  features: { nl: string[]; en: string[] }
  processSteps: ProcessStep[]
}

export interface ProcessStep {
  number: number
  title: { nl: string; en: string }
  description: { nl: string; en: string }
  tag: string
  tagColor: string
}

export const concepts: Concept[] = [
  {
    id: 1,
    slug: 'personalized-lessons',
    color: '#58CC02',
    colorDark: '#43C000',
    tagBg: '#EDFAD4',
    tagBgDark: '#1a3300',
    tag: { nl: 'Personalisatie', en: 'Personalization' },
    title: { nl: 'Gepersonaliseerde Lessen', en: 'Personalized Lessons' },
    oneliner: {
      nl: 'Leren over wat jou écht interesseert.',
      en: 'Learning about what actually interests you.',
    },
    question: {
      nl: 'Wat als je leerde wat JIJ interessant vindt?',
      en: 'What if you learned what YOU find interesting?',
    },
    bullets: {
      nl: [
        'Kies zelf je onderwerp: geschiedenis, sport, cultuur, eten',
        'Voeg eigen woorden toe uit je dagelijks leven',
        'Speelbare mini-advertentie die XP opbouwt voor de echte app',
      ],
      en: [
        'Choose your own topic: history, sports, culture, food',
        'Add your own vocabulary from daily life',
        'Playable mini-ad that builds XP for the real app',
      ],
    },
    features: {
      nl: ['Persoonlijk woordenboek', 'Onderwerp-selectie', 'Speelbare advertentie', 'XP carry-over'],
      en: ['Personal dictionary', 'Topic selection', 'Playable ad', 'XP carry-over'],
    },
    description: {
      nl: `Stel je voor: voordat je een les begint, kies je zelf een onderwerp. Geschiedenis, eten, cultuur, sport — wat jij interessant vindt. Duolingo bouwt de les daar omheen, zodat je niet alleen een taal leert, maar ook meteen kennis opdoet over iets wat je al boeit.

Een stap verder: voeg je eigen woorden toe — je schoolvocabulaire, werkterminologie, of gewoon woorden die je altijd wil onthouden. Duolingo bouwt een gepersonaliseerde les omheen. Leren wordt direct relevant voor jouw leven.

Om dit te promoten ontwierpen we een speelbare mini-advertentie. Terwijl jij een game speelt of een video kijkt, verschijnt er een korte Duolingo-les als advertentie. Je speelt hem, verdient XP — en die XP wordt écht opgeslagen als je de app downloadt. Geen skip-knop. Geen irritante banner. Gewoon: een les die zo leuk is dat je hem wil spelen.`,
      en: `Imagine choosing your topic before a lesson starts. History, food, culture, sports — whatever interests you. Duolingo builds the lesson around it, so you learn a language and gain real knowledge about something you already care about.

Go further: add your own vocabulary — school terms, work jargon, or just words you always wanted to remember. Duolingo turns them into a personalised lesson. Learning becomes directly relevant to your actual life.

To promote this, we built a playable mini-ad. While you're gaming or watching a video, a short Duolingo lesson appears as an ad. You play it, earn XP — and that XP actually saves when you download the app. No skip button. No annoying banner. Just: a lesson so fun you want to play it.`,
    },
    processSteps: [
      {
        number: 1,
        title: { nl: 'Onderzoek', en: 'Research' },
        description: {
          nl: 'We analyseerden de D&AD briefing en onderzochten hoe jongeren hun leerervaring beleven. De kern: personalisatie verhoogt motivatie met 40%. Dat werd ons vertrekpunt.',
          en: 'We analysed the D&AD brief and researched how young people experience learning. The key finding: personalisation increases motivation by 40%. That became our starting point.',
        },
        tag: 'Research',
        tagColor: '#58CC02',
      },
      {
        number: 2,
        title: { nl: 'Concept Ontwikkeling', en: 'Ideation' },
        description: {
          nl: 'Van briefing naar ideeën: hoe maak je leren persoonlijk zonder het te compliceren? We kozen voor gebruikerscontrole — jij bepaalt het onderwerp, Duolingo doet de rest.',
          en: 'From brief to ideas: how do you make learning personal without overcomplicating it? We chose user control — you pick the topic, Duolingo does the rest.',
        },
        tag: 'Design',
        tagColor: '#1CB0F6',
      },
      {
        number: 3,
        title: { nl: 'Eerste Prototype', en: 'First Prototype' },
        description: {
          nl: 'Een klikbaar Figma-prototype van de topic-selectie flow. We testten drie varianten van de interface en kozen de meest intuïtieve.',
          en: 'A clickable Figma prototype of the topic-selection flow. We tested three variants of the interface and chose the most intuitive.',
        },
        tag: 'Prototype',
        tagColor: '#FF9600',
      },
      {
        number: 4,
        title: { nl: 'Testen & Itereren', en: 'Testing & Iterating' },
        description: {
          nl: 'Feedback van medestudenten: de speelbare advertentie was te lang. We sneden hem terug van 90 naar 45 seconden. Resultaat: hogere voltooiingsrate in tests.',
          en: 'Feedback from fellow students: the playable ad was too long. We cut it from 90 to 45 seconds. Result: higher completion rate in tests.',
        },
        tag: 'Test',
        tagColor: '#FF4B4B',
      },
      {
        number: 5,
        title: { nl: 'Eindresultaat', en: 'Final Result' },
        description: {
          nl: 'Een volledig uitgewerkt concept met UI-designs, een speelbare advertentie demo en een presentatiedeck. Klaar voor de D&AD jury.',
          en: 'A fully developed concept with UI designs, a playable ad demo and a presentation deck. Ready for the D&AD jury.',
        },
        tag: 'Final',
        tagColor: '#58CC02',
      },
    ],
  },
  {
    id: 2,
    slug: 'custom-character',
    color: '#1CB0F6',
    colorDark: '#0096D6',
    tagBg: '#E3F5FE',
    tagBgDark: '#00263d',
    tag: { nl: 'Identiteit', en: 'Identity' },
    title: { nl: 'Eigen Karakter Maken', en: 'Create Your Character' },
    oneliner: {
      nl: 'Jouw karakter, jouw regels — in de Duolingo-wereld.',
      en: 'Your character, your rules — in the Duolingo world.',
    },
    question: {
      nl: 'Wat als jouw karakter echt in de game leefde?',
      en: 'What if your character actually lived in the game?',
    },
    bullets: {
      nl: [
        'Ontwerp je eigen personage in een korte, speelse flow',
        'Character-creatie als mini-advertentie met taallessen verwerkt',
        'Beste karakter verschijnt écht in de officiële Duolingo-app',
      ],
      en: [
        'Design your own character in a short, playful flow',
        'Character creation as a mini-ad with language lessons built in',
        'Best character actually appears in the official Duolingo app',
      ],
    },
    features: {
      nl: ['Karakter editor', 'Taalles geïntegreerd', 'Team Contest koppeling', 'App appearance reward'],
      en: ['Character editor', 'Language lesson integrated', 'Team Contest link', 'App appearance reward'],
    },
    description: {
      nl: `Jouw karakter, jouw regels. In dit concept ontwerp je een eigen personage in een korte, speelse flow — en dat personage leeft daarna in de Duolingo-wereld.

Het character-creatieproces werkt ook als mini-advertentie: terwijl je je karakter bouwt, leer je al. Kleur, vorm, naam — alles kies je zelf, maar tussendoor sluipt er een taalles naar binnen. Voor je het weet heb je je eerste woorden geleerd én een karakter gemaakt.

Je karakter speelt mee in de Team Contest en verzamelt XP. Het best scorende karakter over een bepaalde periode wordt beloond: het verschijnt écht even in de officiële Duolingo-app. Gebruikers worden zo onderdeel van het merk — niet als toeschouwer, maar als medecreateur.`,
      en: `Your character, your rules. In this concept you design your own character in a short, playful flow — and that character lives inside the Duolingo world.

The character creation works as a mini-ad too: while building your character, you're already learning. Colour, shape, name — you choose everything, but language lessons sneak in along the way. Before you know it, you've learned your first words and built a character.

Your character joins the Team Contest and earns XP. The highest-scoring character over a set period gets rewarded — it actually appears in the official Duolingo app for a limited time. Users become part of the brand — not as spectators, but as co-creators.`,
    },
    processSteps: [
      {
        number: 1,
        title: { nl: 'Onderzoek', en: 'Research' },
        description: {
          nl: 'Welke apps laten gebruikers succesvol avatars maken? We analyseerden Bitmoji, Nintendo Switch en Ready Player Me op hun onboarding flow.',
          en: 'Which apps successfully let users create avatars? We analysed Bitmoji, Nintendo Switch and Ready Player Me on their onboarding flows.',
        },
        tag: 'Research',
        tagColor: '#58CC02',
      },
      {
        number: 2,
        title: { nl: 'Concept Ontwikkeling', en: 'Ideation' },
        description: {
          nl: 'Hoe verweef je taalles in een karaktercreator zonder het storend te maken? De sleutel: de lessen komen als naamgeving-stap — "hoe zeg je blauw in het Frans?"',
          en: 'How do you weave language lessons into a character creator without making it annoying? The key: lessons come as naming steps — "how do you say blue in French?"',
        },
        tag: 'Design',
        tagColor: '#1CB0F6',
      },
      {
        number: 3,
        title: { nl: 'Eerste Prototype', en: 'First Prototype' },
        description: {
          nl: 'Een animatie-prototype van de character editor. We maakten 8 verschillende lichaamstypes, 12 kleuren en 6 accessoires als test-set.',
          en: 'An animation prototype of the character editor. We created 8 different body types, 12 colours and 6 accessories as a test set.',
        },
        tag: 'Prototype',
        tagColor: '#FF9600',
      },
      {
        number: 4,
        title: { nl: 'Testen & Itereren', en: 'Testing & Iterating' },
        description: {
          nl: 'Gebruikers vonden de taalles-integratie te abrupt. We voegden een overgangsanimatie toe die de les als "karakter-info" framt — veel natuurlijker.',
          en: 'Users found the language lesson integration too abrupt. We added a transition animation that frames the lesson as "character info" — much more natural.',
        },
        tag: 'Test',
        tagColor: '#FF4B4B',
      },
      {
        number: 5,
        title: { nl: 'Eindresultaat', en: 'Final Result' },
        description: {
          nl: 'Complete character editor flow met geïntegreerde taalles, competition-mechanisme en reward-systeem uitgewerkt in Figma.',
          en: 'Complete character editor flow with integrated language lesson, competition mechanism and reward system developed in Figma.',
        },
        tag: 'Final',
        tagColor: '#58CC02',
      },
    ],
  },
  {
    id: 3,
    slug: 'team-contest',
    color: '#FF4B4B',
    colorDark: '#CC0000',
    tagBg: '#FFF0F0',
    tagBgDark: '#3d0000',
    tag: { nl: 'Competitie', en: 'Competition' },
    title: { nl: 'Team Contest', en: 'Team Contest' },
    oneliner: {
      nl: 'Rood tegen Blauw. Leren als teamsport.',
      en: 'Red versus Blue. Learning as a team sport.',
    },
    question: {
      nl: 'Wat als leren een sport was?',
      en: 'What if learning was a sport?',
    },
    bullets: {
      nl: [
        'Automatische teamindeling — maar jij draait aan het rad',
        'Live leaderboard dat je team vs. tegenstanders toont',
        "Sociale druk die je 's avonds laat nóg een les laat doen",
      ],
      en: [
        'Automatic team placement — but you spin the wheel',
        'Live leaderboard showing your team vs. opponents',
        'Social pressure that makes you do one more lesson late at night',
      ],
    },
    features: {
      nl: ['Team rad-spin', 'Real-time leaderboard', 'Vriend uitnodiging', 'Seizoensprijzen'],
      en: ['Team wheel spin', 'Real-time leaderboard', 'Friend invitation', 'Season rewards'],
    },
    description: {
      nl: `Rood tegen Blauw. Duolingo deelt je automatisch in bij een team — maar jij draait aan het rad. Misschien land je ergens anders dan verwacht. Nodig vrienden uit, speel samen of juist tégen elkaar.

Een live overzicht toont in real-time hoe ver je team staat ten opzichte van de tegenstanders. Een ranglijst binnen je eigen team houdt bij wie de meeste XP verzamelt. Niet alleen wie het meest leert, maar wie het slimst speelt.

De competitie maakt leren sociaal, verslavend en — eerlijk gezegd — behoorlijk grappig. Want niemand wil degene zijn die zijn team naar beneden trekt. En dat gevoel? Dat is precies wat je 's avonds laat nog een lesje laat doen.`,
      en: `Red versus Blue. Duolingo automatically places you on a team — but you spin the wheel. You might land somewhere unexpected. Invite friends, play together or against each other.

A live overview shows in real-time how your team stacks up against the competition. A leaderboard within your team tracks who earns the most XP. Not just who learns the most, but who plays the smartest.

The competition makes learning social, addictive and — honestly — pretty fun. Because nobody wants to be the one dragging their team down. And that feeling? That's exactly what makes you do one more lesson late at night.`,
    },
    processSteps: [
      {
        number: 1,
        title: { nl: 'Onderzoek', en: 'Research' },
        description: {
          nl: 'We onderzochten de psychologie van competitie in apps: Duolingo leagues, Strava challenges, Pokémon GO teams. Wat maakt teamcompetitie verslavend?',
          en: "We researched the psychology of competition in apps: Duolingo leagues, Strava challenges, Pokémon GO teams. What makes team competition addictive?",
        },
        tag: 'Research',
        tagColor: '#58CC02',
      },
      {
        number: 2,
        title: { nl: 'Concept Ontwikkeling', en: 'Ideation' },
        description: {
          nl: 'Het rad-concept came from wanting randomness — het gevoel dat je niet weet waar je uitkomt maakt het spannend. Vrienden kunnen daarna alsnog samen op één team.',
          en: 'The wheel concept came from wanting randomness — the feeling of not knowing where you land makes it exciting. Friends can still join the same team afterwards.',
        },
        tag: 'Design',
        tagColor: '#1CB0F6',
      },
      {
        number: 3,
        title: { nl: 'Eerste Prototype', en: 'First Prototype' },
        description: {
          nl: 'Een interactief prototype van het raddraaien en het live leaderboard. We testten twee leaderboard-stijlen: ranking vs. progressiebalk.',
          en: 'An interactive prototype of the wheel spin and live leaderboard. We tested two leaderboard styles: ranking vs. progress bar.',
        },
        tag: 'Prototype',
        tagColor: '#FF9600',
      },
      {
        number: 4,
        title: { nl: 'Testen & Itereren', en: 'Testing & Iterating' },
        description: {
          nl: 'Testers wilden weten hoe lang een contest duurt. We voegden een countdown-timer toe en een "seizoen"-mechanisme van 2 weken.',
          en: 'Testers wanted to know how long a contest lasts. We added a countdown timer and a 2-week "season" mechanism.',
        },
        tag: 'Test',
        tagColor: '#FF4B4B',
      },
      {
        number: 5,
        title: { nl: 'Eindresultaat', en: 'Final Result' },
        description: {
          nl: 'Volledig uitgewerkte team-contest flow: rad, leaderboard, uitnodiging en seizoenssysteem. Inclusief animatie-demonstratie van het rad-draaien.',
          en: 'Fully developed team contest flow: wheel, leaderboard, invitation and season system. Including animation demonstration of the wheel spin.',
        },
        tag: 'Final',
        tagColor: '#58CC02',
      },
    ],
  },
  {
    id: 4,
    slug: 'real-world-signs',
    color: '#FF9600',
    colorDark: '#CC7A00',
    tagBg: '#FFF4E0',
    tagBgDark: '#3d2200',
    tag: { nl: 'Out-of-home', en: 'Out-of-home' },
    title: { nl: 'Echte Wereld Borden', en: 'Real World Signs' },
    oneliner: {
      nl: 'De straat als lesruimte. Duolingo buiten de app.',
      en: 'The street as classroom. Duolingo outside the app.',
    },
    question: {
      nl: 'Wat als de straat jou iets kon leren?',
      en: 'What if the street could teach you something?',
    },
    bullets: {
      nl: [
        'Verkeersborden, bushokjes en winkels die woorden vertalen',
        'Grappig, onverwacht en 100% in Duolingo-stijl',
        "Mensen maken foto's die zich online verspreiden",
      ],
      en: [
        'Traffic signs, bus stops and shops that translate words',
        'Funny, unexpected and 100% Duolingo-style',
        "People take photos that spread online",
      ],
    },
    features: {
      nl: ['Fysieke OOH-campagne', 'Viral foto-trigger', 'Schaalbaar per stad', 'Alle talen mogelijk'],
      en: ['Physical OOH campaign', 'Viral photo trigger', 'Scalable per city', 'All languages possible'],
    },
    description: {
      nl: `Duolingo stapt de straat op. Verkeersborden, winkelramen, bushokjes — overal waar mensen langskomen verschijnen Duolingo-borden die woorden vertalen naar een andere taal. Niet saai en informatief, maar grappig, onverwacht en 100% in Duolingo-stijl.

Een stopbord dat je ook in het Japans leert lezen. Een McDonaldsbord dat opeens Spaans spreekt. Een straattegel die je een Franse zin leert. De borden vallen op, mensen stoppen, maken foto's — en die foto's verspreiden zich online. De echte wereld als advertentiekanaal.

Het idee schaalt. Van één stad naar een hele campagne. Van één taal naar alle talen. Van grappig straatmeubilair naar een wereldwijde beweging die mensen herinnert aan wat Duolingo eigenlijk is: gratis onderwijs, voor iedereen, overal.`,
      en: `Duolingo hits the streets. Traffic signs, shop windows, bus stops — wherever people pass, Duolingo signs appear that translate words into another language. Not boring and informative, but funny, unexpected and 100% Duolingo-style.

A stop sign you also learn to read in Japanese. A McDonald's sign that suddenly speaks Spanish. A street tile that teaches you a French sentence. The signs stand out, people stop, take photos — and those photos spread online. The real world as an advertising channel.

The idea scales. From one city to an entire campaign. From one language to all languages. From funny street furniture to a global movement that reminds people what Duolingo actually is: free education, for everyone, everywhere.`,
    },
    processSteps: [
      {
        number: 1,
        title: { nl: 'Onderzoek', en: 'Research' },
        description: {
          nl: 'We analyseerden succesvolle OOH-campagnes: Oatly, Spotify Wrapped, IKEA. Wat maakt buitenreclame shareable? Humor + verrassing + herkenbaarheid.',
          en: 'We analysed successful OOH campaigns: Oatly, Spotify Wrapped, IKEA. What makes outdoor advertising shareable? Humour + surprise + recognition.',
        },
        tag: 'Research',
        tagColor: '#58CC02',
      },
      {
        number: 2,
        title: { nl: 'Concept Ontwikkeling', en: 'Ideation' },
        description: {
          nl: 'Hoe geef je een bestaand bord een taalles-laag? We schetsten 20+ varianten van bord-typen en kozen de meest herkenbare: STOP, snelheidsborden, bushokjes.',
          en: 'How do you add a language-lesson layer to an existing sign? We sketched 20+ sign type variants and chose the most recognisable: STOP, speed signs, bus stops.',
        },
        tag: 'Design',
        tagColor: '#1CB0F6',
      },
      {
        number: 3,
        title: { nl: 'Eerste Prototype', en: 'First Prototype' },
        description: {
          nl: 'Mockups van drie bord-types in Duolingo-stijl. We testten ze door ze te printen en op straat te fotograferen — hoe vallen ze op?',
          en: 'Mockups of three sign types in Duolingo style. We tested them by printing and photographing on the street — how do they stand out?',
        },
        tag: 'Prototype',
        tagColor: '#FF9600',
      },
      {
        number: 4,
        title: { nl: 'Testen & Itereren', en: 'Testing & Iterating' },
        description: {
          nl: 'De eerste versie was te subtiel — mensen zagen het Duolingo-karakter niet. We vergrootten de Duo-mascotte op elk bord en voegden de kenmerkende groene kleur toe.',
          en: "The first version was too subtle — people didn't notice the Duolingo character. We enlarged the Duo mascot on each sign and added the signature green colour.",
        },
        tag: 'Test',
        tagColor: '#FF4B4B',
      },
      {
        number: 5,
        title: { nl: 'Eindresultaat', en: 'Final Result' },
        description: {
          nl: 'Een complete campagne-kit: 6 bord-designs, een city-rollout plan en een social media strategie voor de virale verspreiding.',
          en: 'A complete campaign kit: 6 sign designs, a city rollout plan and a social media strategy for viral spreading.',
        },
        tag: 'Final',
        tagColor: '#58CC02',
      },
    ],
  },
]

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug)
}

export function getAdjacentConcepts(id: number): { prev: Concept | null; next: Concept | null } {
  const idx = concepts.findIndex((c) => c.id === id)
  return {
    prev: idx > 0 ? concepts[idx - 1] : null,
    next: idx < concepts.length - 1 ? concepts[idx + 1] : null,
  }
}

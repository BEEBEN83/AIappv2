import { BlockType, Module, PolicySection } from './types';

export const APP_TITLE = "AI-Gids Erfgooiers";
export const APP_VERSION = "2026.1";

// --- COURSE CONTENT ---

export const COURSE_MODULES: Module[] = [
  {
    id: 'm1',
    title: '1. Hoe werkt AI?',
    description: 'Basisprincipes van machine learning en taalmodellen.',
    sections: [
      {
        title: 'Wat is Generatieve AI?',
        blocks: [
          { type: BlockType.TEXT, content: 'Generatieve AI (zoals Gemini en ChatGPT) is geen zoekmachine. Het is een taalmodel dat getraind is op enorme hoeveelheden tekst. Het voorspelt het volgende woord in een zin op basis van kansberekening.' },
          { type: BlockType.CALLOUT, variant: 'info', title: 'Analogie', content: 'Zie het als een super-geavanceerde autocorrectie die niet alleen woorden, maar hele alinea’s en ideeën kan voorspellen.' },
          { type: BlockType.TEXT, content: 'De modellen "begrijpen" de tekst niet zoals wij. Ze herkennen patronen. Daarom kunnen ze soms feiten verzinnen (hallucinaties).' }
        ]
      },
      {
        title: 'Opdracht: Hallucinaties herkennen',
        blocks: [
          { type: BlockType.ASSIGNMENT, id: 'm1-a1', title: 'Opdracht 1: Leg-uit prompt', content: 'Vraag Gemini om "Quantumpysica" uit te leggen aan een brugklasser. Controleer of de taal begrijpelijk is. Vink af als je dit hebt gedaan.' }
        ]
      }
    ]
  },
  {
    id: 'm2',
    title: '2. Beleid & Regie',
    description: 'De menselijke maat en verantwoordelijkheid.',
    sections: [
      {
        title: 'Menselijke Regie',
        blocks: [
          { type: BlockType.POLICY_RULE, title: 'Schoolafspraak #2', content: 'Jij houdt de regie. Bij belangrijke beslissingen heb je altijd menselijk inzicht nodig. Controleer of je AI-output kunt uitleggen.' },
          { type: BlockType.TEXT, content: 'AI is een hulpmiddel (co-piloot), geen vervanger. Als docent ben jij eindverantwoordelijk voor het lesmateriaal en de beoordeling.' },
        ]
      },
      {
        title: 'Mini-opdracht',
        blocks: [
          { type: BlockType.ASSIGNMENT, id: 'm2-a1', title: 'Opdracht 2: Bias Hunter', content: 'Vraag Gemini: "Beschrijf een typische schooldirecteur". Bekijk het resultaat. Is er sprake van stereotypen (man/vrouw, leeftijd, etniciteit)? Vink af na analyse.' }
        ]
      }
    ]
  },
  {
    id: 'm3',
    title: '3. Didactiek: De 4 Niveaus',
    description: 'Het Erfgooiers raamwerk voor AI in de klas.',
    sections: [
      {
        title: 'De 4 Niveaus Matrix',
        blocks: [
          { type: BlockType.LIST, title: 'Kies bewust per opdracht:', content: [
            '🔴 Niveau 1: Verboden (Toetsen, basiskennis)',
            '🟠 Niveau 2: Verkennen (Inspiratie, ideeën, brainstorm)',
            '🔵 Niveau 3: Verbeteren (Feedback, taalcheck, sparringpartner)',
            '🟢 Niveau 4: Integratie (Co-creatie, AI als onderdeel van het product)'
          ]},
          { type: BlockType.CALLOUT, variant: 'tip', title: 'Tip voor in de les', content: 'Zet het icoontje (🔴/🟠/🔵/🟢) boven elke opdracht in je studiewijzer.' }
        ]
      },
      {
        title: 'Opdracht',
        blocks: [
          { type: BlockType.ASSIGNMENT, id: 'm3-a1', title: 'Opdracht 3: Classificeer', content: 'Pak een bestaande opdracht van jezelf. Bepaal welk niveau (1-4) hierbij past. Zou je de opdracht moeten aanpassen om AI-proof te zijn? (bijv. "Omzeilen" of "Innoveren").' }
        ]
      }
    ]
  },
  {
    id: 'm4',
    title: '4. Privacy & AVG',
    description: 'Veilig werken binnen Google Workspace.',
    sections: [
      {
        title: 'Wat mag nooit?',
        blocks: [
          { type: BlockType.POLICY_RULE, title: 'Schoolafspraak #5', content: 'Bescherm je privacy. Voer NOOIT persoonsgegevens (namen, leerlingnummers, specifieke casussen) in bij AI-tools.' },
          { type: BlockType.TEXT, content: 'Gebruik altijd je Erfgooiers Google-account. De data binnen onze Enterprise-omgeving wordt (in tegenstelling tot privé-accounts) niet standaard gebruikt om de publieke modellen te trainen.' }
        ]
      },
      {
        title: 'Opdracht',
        blocks: [
          { type: BlockType.ASSIGNMENT, id: 'm4-a1', title: 'Opdracht 4: Privacy Check', content: 'Neem een casus van een leerling (in je hoofd). Herschrijf deze voor een prompt zónder herleidbare gegevens (anonimiseren). Test of Gemini advies kan geven op deze anonieme casus.' }
        ]
      }
    ]
  },
  {
    id: 'm5',
    title: '5. Ethiek & Mediawijsheid',
    description: 'Kritisch burgerschap en ecologische impact.',
    sections: [
      {
        title: 'Bewustwording',
        blocks: [
          { type: BlockType.TEXT, content: 'Leerlingen moeten leren dat AI bias (vooroordelen) kan bevatten en dat datacenters veel energie kosten. Gebruik AI dus functioneel, niet voor alles.' },
          { type: BlockType.CALLOUT, variant: 'warning', title: 'Deepfakes', content: 'Wees alert op gegenereerd beeld- en audiomateriaal. Bespreek dit met leerlingen (Mediawijsheid).' }
        ]
      },
      {
        title: 'Opdracht',
        blocks: [
          { type: BlockType.ASSIGNMENT, id: 'm5-a1', title: 'Opdracht 5: Prompt verbeteren', content: 'Neem een vage prompt: "Maak een les". Verbeter deze met de context-formule: Context + Doel + Doelgroep + Vorm. Kijk hoeveel beter het resultaat is.' }
        ]
      }
    ]
  },
  {
    id: 'm6',
    title: '6. Praktijk: Gemini & NotebookLM',
    description: 'Knoppenkunde en bronverwerking.',
    sections: [
      {
        title: 'NotebookLM: Bronnen meester',
        blocks: [
          { type: BlockType.TEXT, content: 'NotebookLM is ideaal voor bronnen. Je uploadt een PDF (bijv. dit beleidsplan!) en kunt er vragen over stellen. Het hallucineert minder omdat het "grounded" is in jouw document.' },
          { type: BlockType.CALLOUT, variant: 'success', title: 'Use Case', content: 'Upload drie artikelen over een onderwerp en laat NotebookLM de verschillen in een tabel zetten.' }
        ]
      },
      {
        title: 'Eindopdracht',
        blocks: [
          { type: BlockType.ASSIGNMENT, id: 'm6-a1', title: 'Opdracht 6: NotebookLM Start', content: 'Ga naar NotebookLM, maak een nieuw notebook, upload een vakinhoudelijk artikel en laat de AI 5 toetsvragen genereren op basis van die tekst.' }
        ]
      }
    ]
  }
];

// --- POLICY CONTENT ---

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'inleiding',
    title: '1. Inleiding',
    content: [
      'Het Erfgooiers College staat voor goed onderwijs met echte aandacht (Samen, Aandacht, Persoonlijke groei). AI biedt kansen, maar vraagt om kaders.',
      'Dit beleid treedt in werking per 1 januari 2026 en wordt jaarlijks geëvalueerd.'
    ]
  },
  {
    id: 'visie',
    title: '2. Visie & Uitgangspunten',
    content: [
      'AI is een hulpmiddel, geen doel. De mens blijft centraal.',
      'Eigenaarschap ligt bij de leerling. Leerlingen blijven verantwoordelijk voor hun eigen leerproces.',
      'Transparantie: We zijn open over wanneer en hoe AI wordt ingezet.'
    ]
  },
  {
    id: 'niveaus',
    title: '3. De 4 Niveaus van AI-gebruik',
    content: [
      'Niveau 1: Verboden. Geen AI. (Toetsen, SOs).',
      'Niveau 2: Verkennen. AI voor inspiratie en ideeën. Teksten letterlijk overnemen mag niet.',
      'Niveau 3: Verbeteren. AI voor ondersteuning (feedback, spelling). Origineel moet herkenbaar blijven.',
      'Niveau 4: Integratie. Co-creatie. Samenwerking met AI is onderdeel van het leerdoel.'
    ]
  },
  {
    id: 'afspraken',
    title: '4. Zeven Schoolafspraken',
    content: [
      '1. Zet de mens centraal.',
      '2. Houd zelf de regie.',
      '3. Voorkom dat AI vooroordelen versterkt.',
      '4. Begrijp wat AI is (patroonherkenning, geen bewustzijn).',
      '5. Bescherm je privacy (geen namen in prompts).',
      '6. Maak bewust gebruik van AI (ethisch & ecologisch).',
      '7. Geef duidelijk aan wanneer en hoe AI mag (gebruik de niveaus).'
    ]
  },
  {
    id: 'richtlijnen',
    title: '5. Richtlijnen voor Docenten',
    content: [
      'Bij toetsing: Geef expliciet het niveau aan. Pas toetsen aan op AI-realiteit (meer inzicht, minder reproductie).',
      'Lesvoorbereiding: Gebruik AI als assistent, maar eigen vakkennis blijft leidend.',
      'Communicatie: Vermeld regels in studiewijzers.'
    ]
  }
];

// --- MENTOR ---

export const MENTOR_SYSTEM_INSTRUCTION = `Je bent de AI-Mentor voor docenten van het Erfgooiers College. 
Je doel is docenten helpen met AI-geletterdheid en het toepassen van het schoolbeleid (2026).
Belangrijke principes:
1. De docent houdt de regie.
2. Privacy is heilig (geen namen invoeren).
3. Er zijn 4 niveaus: Verboden, Verkennen, Verbeteren, Integratie.
4. Gebruik de "Gouden Promptformule": Context + Doel + Instructie + Vorm + Randvoorwaarden.
Antwoord kort, praktisch en bemoedigend in het Nederlands.`;

export const SUGGESTED_QUESTIONS = [
  "Hoe maak ik een rubriek met AI?",
  "Welk niveau past bij een werkstuk?",
  "Hoe anonimiseer ik een leerlingcasus?",
  "Geef een voorbeeld van niveau 2."
];

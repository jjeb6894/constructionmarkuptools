export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  categorySlug: string;
  price: number | null;
  salePrice?: number;
  badge?: string;
  includedItems: string[];
  symbolCategories: string[];
  compatibleWith: string[];
  useCases: string[];
  fileFormats: string[];
  installSteps: string[];
  faqs: ProductFaq[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  relatedSlugs: string[];
  isFree?: boolean;
  isBundle?: boolean;
}

export const products: Product[] = [
  {
    slug: 'bluebeam-electrical-tool-set',
    title: 'Bluebeam Electrical Tool Set',
    shortDescription:
      'A structured electrical markup library for contractors, estimators, and engineers reviewing drawings in Bluebeam Revu.',
    fullDescription:
      'Stop rebuilding the same markups on every project. The Electrical Tool Set is a downloadable BTX pack for Bluebeam Revu that gives your team a consistent, organised starting point for plan reviews, takeoff preparation, coordination comments, and site documentation. Every symbol is original, every category is structured around how electrical teams actually work.',
    category: 'Electrical',
    categorySlug: 'electrical',
    price: 29,
    badge: 'Most Popular',
    includedItems: [
      'Original power device symbols',
      'Conduit and containment route markups',
      'Distribution board and panel references',
      'Switchgear and equipment references',
      'Lighting control and emergency symbols',
      'Takeoff count and measurement tools',
      'Revision and review status markups',
      'Coordination and scope clarification notes',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Power outlets and sockets',
      'Distribution boards and panels',
      'Switchgear and equipment',
      'Conduit routes and containment',
      'Lighting controls',
      'Emergency lighting',
      'Device count tools',
      'Revision markers',
      'Coordination notes',
      'Scope and takeoff labels',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'Electrical tender and construction drawing reviews',
      'Estimating and takeoff preparation',
      'Design coordination with MEP teams',
      'Site installation notes and clarifications',
      'Standardising markup workflows across project teams',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your electrical tool categories appear in the Tool Chest.',
      'Place, resize, and label markups as needed on your drawings.',
    ],
    faqs: [
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu is required and sold separately by Bluebeam, Inc. This product is an importable markup library for users who already have Revu installed.',
      },
      {
        question: 'Are these symbols copied from another product?',
        answer:
          'No. Every symbol in this tool set is an original Construction Markup Tools asset. We do not reuse competitor files, screenshots, or proprietary symbols.',
      },
      {
        question: 'Can I try before buying?',
        answer:
          'Yes. Download the free sample pack to test the import process and see the symbol quality and Tool Chest structure before purchasing.',
      },
      {
        question: 'Can my team use this on multiple projects?',
        answer:
          'The standard licence covers one user for internal business use across all their projects. Team and company licences are available — see the Licence page for details.',
      },
      {
        question: 'Can I edit the symbols after importing?',
        answer:
          'Yes. Once imported into Bluebeam Revu, you can adjust colours, labels, subjects, and tool behaviour to match your project requirements.',
      },
      {
        question: 'Which Bluebeam Revu versions are supported?',
        answer:
          'The tool set is tested against Revu 2019, 20, and 21. Compatibility with future Revu versions will be confirmed as updates are released.',
      },
    ],
    seoTitle: 'Bluebeam Electrical Tool Set for Contractors | Construction Markup Tools',
    seoDescription:
      'Download an original electrical markup tool set for Bluebeam Revu. Standardise power, conduit, panel, lighting, and takeoff markups for faster drawing reviews.',
    keywords: [
      'bluebeam electrical tool set',
      'bluebeam electrical symbols',
      'bluebeam electrical markup',
      'electrical symbols bluebeam revu',
      'bluebeam electrical contractor',
    ],
    relatedSlugs: [
      'bluebeam-fire-alarm-symbols',
      'bluebeam-lighting-symbols',
      'bluebeam-estimating-takeoff-tools',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'bluebeam-fire-alarm-symbols',
    title: 'Bluebeam Fire Alarm Symbols',
    shortDescription:
      'Original fire alarm markup symbols for designers, consultants, and installers working in Bluebeam Revu.',
    fullDescription:
      'A downloadable BTX symbol pack covering the core fire alarm device types needed for drawing reviews, coordination comments, and installation documentation. Built for fire alarm designers, consultants, and contractors who need repeatable markups across multiple projects without rebuilding common symbols from scratch.',
    category: 'Fire Alarm',
    categorySlug: 'fire-alarm',
    price: 29,
    includedItems: [
      'Smoke detector and heat detector symbols',
      'Notification appliance markups',
      'Manual call point and pull station symbols',
      'Control panel and repeater references',
      'Module and relay symbols',
      'Circuit and zone annotation tools',
      'Coordination and issue note markups',
      'Review and revision status markers',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Smoke and heat detectors',
      'Notification appliances',
      'Manual call points',
      'Fire alarm control panels',
      'Modules and relays',
      'Zone and circuit annotations',
      'Coordination notes',
      'Review status markers',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'Fire alarm design and drawing reviews',
      'Coordination with electrical and building services teams',
      'Installation and commissioning documentation',
      'Tender and construction phase markups',
      'As-built drawing annotations',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your fire alarm symbol categories appear in the Tool Chest.',
      'Place and label markups across your drawing sheets.',
    ],
    faqs: [
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu is required and sold separately. This product is an importable symbol library for users who already have Revu installed.',
      },
      {
        question: 'Are these original symbols?',
        answer:
          'Yes. Every symbol is an original Construction Markup Tools asset, not copied from competitor products or third-party sources.',
      },
      {
        question: 'Can I combine this with the electrical tool set?',
        answer:
          'Yes. Both packs import as separate Tool Chest groups and can be used alongside each other in Bluebeam Revu.',
      },
      {
        question: 'Can I edit the symbols after importing?',
        answer:
          'Yes. Colours, labels, subjects, and tool behaviour can be adjusted within Bluebeam Revu to suit your project needs.',
      },
    ],
    seoTitle: 'Bluebeam Fire Alarm Symbols for Revu | Construction Markup Tools',
    seoDescription:
      'Download original fire alarm symbols for Bluebeam Revu. Detectors, panels, call points, and notification appliances for drawing reviews and coordination.',
    keywords: [
      'bluebeam fire alarm symbols',
      'fire alarm symbols bluebeam revu',
      'bluebeam fire alarm markup',
      'fire alarm drawing symbols bluebeam',
    ],
    relatedSlugs: [
      'bluebeam-electrical-tool-set',
      'bluebeam-security-tool-set',
      'bluebeam-access-control-symbols',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'bluebeam-cctv-tool-set',
    title: 'Bluebeam CCTV Tool Set',
    shortDescription:
      'CCTV and surveillance markup symbols for security designers and installers using Bluebeam Revu.',
    fullDescription:
      'A structured BTX symbol pack for CCTV system designers, installers, and consultants who review surveillance layouts in Bluebeam Revu. Covers camera positions, field-of-view annotations, cable routes, recording equipment, and coordination notes. Built as an original product for repeatable drawing workflows.',
    category: 'CCTV',
    categorySlug: 'cctv',
    price: 29,
    includedItems: [
      'Camera position and type symbols',
      'Field-of-view annotation markups',
      'Cable route and containment tools',
      'NVR and DVR recording equipment references',
      'Monitor and display symbols',
      'Power supply and UPS references',
      'Coordination and coverage gap notes',
      'Review and revision status markers',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Fixed and PTZ cameras',
      'Camera field-of-view markups',
      'Cable routes and containment',
      'Recording equipment',
      'Monitors and displays',
      'Power and UPS references',
      'Coordination notes',
      'Review markers',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'CCTV system design and layout reviews',
      'Camera coverage planning',
      'Coordination with security and access control teams',
      'Tender and construction phase documentation',
      'Client handover and as-built markups',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your CCTV symbol categories appear in the Tool Chest.',
      'Place markups across architectural and security drawings.',
    ],
    faqs: [
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu is required and sold separately. This is an importable symbol library for existing Revu users.',
      },
      {
        question: 'Can I use this alongside the security tool set?',
        answer:
          'Yes. The CCTV and Security tool sets are designed to complement each other and can both be imported into Revu simultaneously.',
      },
      {
        question: 'Are field-of-view overlays included?',
        answer:
          'Yes. The pack includes annotation markups to indicate camera coverage and field-of-view zones on floor plan drawings.',
      },
      {
        question: 'Can I edit symbols after importing?',
        answer:
          'Yes. All markups can be adjusted within Bluebeam Revu for colour, label, size, and subject.',
      },
    ],
    seoTitle: 'Bluebeam CCTV Tool Set for Security Designers | Construction Markup Tools',
    seoDescription:
      'Download a CCTV markup tool set for Bluebeam Revu. Camera symbols, field-of-view markups, cable routes, and recording equipment for surveillance drawing reviews.',
    keywords: [
      'bluebeam cctv tool set',
      'bluebeam cctv symbols',
      'cctv drawing symbols bluebeam',
      'bluebeam surveillance markup',
      'security cctv bluebeam revu',
    ],
    relatedSlugs: [
      'bluebeam-security-tool-set',
      'bluebeam-access-control-symbols',
      'bluebeam-fire-alarm-symbols',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'bluebeam-security-tool-set',
    title: 'Bluebeam Security Tool Set',
    shortDescription:
      'Intruder detection and security system markup symbols for Bluebeam Revu drawing reviews.',
    fullDescription:
      'A downloadable BTX pack for security system designers, installers, and consultants. Covers intruder detection devices, control panels, keypads, motion sensors, perimeter protection, and coordination markups. Designed for professionals who need consistent, reusable symbols across security drawing reviews in Bluebeam Revu.',
    category: 'Security',
    categorySlug: 'security',
    price: 29,
    includedItems: [
      'PIR motion detector symbols',
      'Door and window contact markups',
      'Intruder alarm control panel references',
      'Keypad and user terminal symbols',
      'Perimeter beam detector markups',
      'Shock and vibration sensor symbols',
      'Coordination and zone coverage notes',
      'Review and revision markers',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Motion detectors',
      'Door and window contacts',
      'Control panels and keypads',
      'Perimeter detectors',
      'Vibration and shock sensors',
      'Zone annotations',
      'Coordination notes',
      'Review markers',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'Intruder alarm system design reviews',
      'Zone layout planning',
      'Coordination with CCTV and access control teams',
      'Tender and construction phase markup',
      'Client handover documentation',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your security symbol categories appear in the Tool Chest.',
      'Place and label markups on your security drawings.',
    ],
    faqs: [
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu must be purchased separately. This product is an importable markup library for existing Revu users.',
      },
      {
        question: 'Does this work with the CCTV or access control packs?',
        answer:
          'Yes. All packs import as separate Tool Chest groups and can be used alongside each other in the same Revu session.',
      },
      {
        question: 'Can I adjust symbols for project-specific needs?',
        answer:
          'Yes. After importing, you can modify colours, labels, subjects, and sizes within Bluebeam Revu.',
      },
    ],
    seoTitle: 'Bluebeam Security Tool Set for Intruder Systems | Construction Markup Tools',
    seoDescription:
      'Download a security markup tool set for Bluebeam Revu. Intruder detection symbols, motion detectors, panels, and coordination markups for security drawing reviews.',
    keywords: [
      'bluebeam security tool set',
      'bluebeam security symbols',
      'intruder alarm symbols bluebeam',
      'bluebeam revu security markup',
    ],
    relatedSlugs: [
      'bluebeam-cctv-tool-set',
      'bluebeam-access-control-symbols',
      'bluebeam-fire-alarm-symbols',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'bluebeam-av-data-symbols',
    title: 'Bluebeam AV and Data Symbols',
    shortDescription:
      'AV, data, and IT infrastructure markup symbols for low-voltage contractors and consultants using Bluebeam Revu.',
    fullDescription:
      'A downloadable BTX symbol pack covering audio-visual systems, data cabling, network infrastructure, and IT equipment. Designed for AV integrators, ICT consultants, and low-voltage contractors who review system drawings in Bluebeam Revu and need consistent, reusable markup tools across projects.',
    category: 'AV and Data',
    categorySlug: 'av-data',
    price: 29,
    includedItems: [
      'Display and screen position symbols',
      'Speaker and audio device markups',
      'Network switch and patch panel references',
      'Data outlet and floor box symbols',
      'Rack and equipment cabinet references',
      'AV control system symbols',
      'Cable route and trunking annotations',
      'Coordination and routing notes',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Displays and screens',
      'Audio devices and speakers',
      'Network and switching equipment',
      'Data outlets and floor boxes',
      'Rack and cabinet references',
      'AV control systems',
      'Cable routes',
      'Coordination notes',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'AV system design and layout reviews',
      'IT and network infrastructure drawing reviews',
      'Coordination with electrical and structured cabling teams',
      'Tender and installation phase documentation',
      'Client handover and as-built markups',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your AV and data symbol categories appear in the Tool Chest.',
      'Place and label markups on your system drawings.',
    ],
    faqs: [
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu is required and sold separately. This is an importable symbol pack for existing Revu users.',
      },
      {
        question: 'Is this suitable for structured cabling projects?',
        answer:
          'Yes. The pack includes data outlet, network, and cable route symbols suited to structured cabling and ICT infrastructure reviews.',
      },
      {
        question: 'Can I use this alongside the telecom tool set?',
        answer:
          'Yes. All packs import as separate Tool Chest groups and can be used together in the same Revu session.',
      },
    ],
    seoTitle: 'Bluebeam AV and Data Symbols for Low-Voltage Contractors | Construction Markup Tools',
    seoDescription:
      'Download AV and data markup symbols for Bluebeam Revu. Displays, speakers, network equipment, data outlets, and cable route markups for system drawing reviews.',
    keywords: [
      'bluebeam av symbols',
      'bluebeam data symbols',
      'bluebeam av data tool set',
      'av data markup bluebeam revu',
      'low voltage symbols bluebeam',
    ],
    relatedSlugs: [
      'bluebeam-telecom-tool-set',
      'bluebeam-security-tool-set',
      'bluebeam-electrical-tool-set',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'bluebeam-access-control-symbols',
    title: 'Bluebeam Access Control Symbols',
    shortDescription:
      'Door access, reader, and entry system markup symbols for Bluebeam Revu drawing reviews.',
    fullDescription:
      'A downloadable BTX pack for access control system designers, consultants, and installers. Covers card readers, door controllers, locks, request-to-exit devices, and coordination markups. Designed for professionals reviewing access control layouts in Bluebeam Revu across commercial and corporate building projects.',
    category: 'Access Control',
    categorySlug: 'access-control',
    price: 29,
    includedItems: [
      'Card reader and proximity device symbols',
      'Door controller and panel references',
      'Electric lock and strike symbols',
      'Request-to-exit (REX) device markups',
      'Door position switch symbols',
      'Access control intercom references',
      'Zone and door group annotations',
      'Coordination and commissioning notes',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Card readers and proximity devices',
      'Door controllers',
      'Locks and strikes',
      'Exit devices',
      'Intercoms',
      'Zone annotations',
      'Coordination notes',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'Access control system design reviews',
      'Door schedule and entry point documentation',
      'Coordination with security and CCTV teams',
      'Tender and installation phase markup',
      'Client handover drawings',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your access control symbol categories appear in the Tool Chest.',
      'Place and label markups on your floor plan drawings.',
    ],
    faqs: [
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu is required and sold separately. This is an importable symbol library for existing Revu users.',
      },
      {
        question: 'Can this be used alongside the CCTV or security packs?',
        answer:
          'Yes. All packs import as separate Tool Chest groups and can be used together within Bluebeam Revu.',
      },
    ],
    seoTitle: 'Bluebeam Access Control Symbols for Revu | Construction Markup Tools',
    seoDescription:
      'Download access control markup symbols for Bluebeam Revu. Card readers, door controllers, locks, and REX devices for drawing reviews and coordination.',
    keywords: [
      'bluebeam access control symbols',
      'access control markup bluebeam',
      'door access symbols bluebeam revu',
    ],
    relatedSlugs: [
      'bluebeam-security-tool-set',
      'bluebeam-cctv-tool-set',
      'bluebeam-fire-alarm-symbols',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'bluebeam-telecom-tool-set',
    title: 'Bluebeam Telecom Tool Set',
    shortDescription:
      'Telecommunications and structured cabling markup symbols for Bluebeam Revu.',
    fullDescription:
      'A downloadable BTX symbol pack for telecommunications designers, ICT contractors, and structured cabling teams reviewing infrastructure drawings in Bluebeam Revu. Covers comms rooms, patch panels, outlets, cable routes, and IDF/MDF references for consistent, repeatable markup workflows.',
    category: 'Telecom',
    categorySlug: 'telecom',
    price: 29,
    includedItems: [
      'Comms room and MDF/IDF references',
      'Patch panel and distribution frame symbols',
      'Data and voice outlet markups',
      'Cable route and tray annotations',
      'Wireless access point symbols',
      'Equipment rack references',
      'Cross-connect and patching notes',
      'Coordination issue markups',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Comms rooms and MDF/IDF',
      'Patch panels',
      'Data and voice outlets',
      'Cable routes',
      'Wireless access points',
      'Equipment racks',
      'Coordination notes',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'Structured cabling system reviews',
      'ICT infrastructure drawing coordination',
      'Tender and construction phase documentation',
      'Client handover and as-built markups',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your telecom symbol categories appear in the Tool Chest.',
      'Place and label markups on your infrastructure drawings.',
    ],
    faqs: [
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu is required and sold separately. This is an importable symbol library for existing Revu users.',
      },
      {
        question: 'Can this be used with the AV and data symbols pack?',
        answer:
          'Yes. Both packs can be imported as separate Tool Chest groups and used alongside each other.',
      },
    ],
    seoTitle: 'Bluebeam Telecom Tool Set for ICT Contractors | Construction Markup Tools',
    seoDescription:
      'Download a telecommunications markup tool set for Bluebeam Revu. Structured cabling, comms rooms, data outlets, and cable route symbols for ICT drawing reviews.',
    keywords: [
      'bluebeam telecom tool set',
      'bluebeam telecom symbols',
      'structured cabling symbols bluebeam',
      'ict markup bluebeam revu',
    ],
    relatedSlugs: [
      'bluebeam-av-data-symbols',
      'bluebeam-electrical-tool-set',
      'bluebeam-security-tool-set',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'bluebeam-lighting-symbols',
    title: 'Bluebeam Lighting Symbols',
    shortDescription:
      'Lighting fixture and controls markup symbols for electrical and lighting designers using Bluebeam Revu.',
    fullDescription:
      'A downloadable BTX pack covering lighting fixtures, controls, emergency lighting, and external lighting for electrical and lighting design teams reviewing drawings in Bluebeam Revu. Designed to complement the electrical tool set for projects where lighting layout and controls are reviewed separately.',
    category: 'Electrical',
    categorySlug: 'electrical',
    price: 24,
    includedItems: [
      'Surface and recessed luminaire symbols',
      'Linear and strip lighting references',
      'Emergency luminaire markups',
      'Lighting control panel and dimmer symbols',
      'Occupancy and daylight sensor references',
      'External and landscape lighting symbols',
      'Circuit and zone annotation tools',
      'Review and revision markers',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Surface luminaires',
      'Recessed downlights',
      'Emergency lighting',
      'Linear and strip lighting',
      'Lighting controls',
      'Sensors and detectors',
      'External lighting',
      'Circuit annotations',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'Lighting layout drawing reviews',
      'Emergency lighting compliance documentation',
      'Lighting controls coordination',
      'Tender and construction phase markup',
      'Client handover drawings',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your lighting symbol categories appear in the Tool Chest.',
      'Place and label markups on your lighting drawings.',
    ],
    faqs: [
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu is required and sold separately. This is an importable symbol pack for existing Revu users.',
      },
      {
        question: 'How does this differ from the electrical tool set?',
        answer:
          'The electrical tool set focuses on power, containment, panels, and switching. The lighting symbols pack focuses specifically on luminaire types, controls, emergency lighting, and lighting circuits.',
      },
      {
        question: 'Can I use both the lighting and electrical packs together?',
        answer:
          'Yes. Both packs import as separate Tool Chest groups and work alongside each other in Bluebeam Revu.',
      },
    ],
    seoTitle: 'Bluebeam Lighting Symbols for Electrical Design | Construction Markup Tools',
    seoDescription:
      'Download lighting markup symbols for Bluebeam Revu. Luminaires, emergency lighting, controls, and sensor symbols for electrical and lighting drawing reviews.',
    keywords: [
      'bluebeam lighting symbols',
      'lighting symbols bluebeam revu',
      'bluebeam lighting markup',
      'electrical lighting symbols bluebeam',
    ],
    relatedSlugs: [
      'bluebeam-electrical-tool-set',
      'bluebeam-estimating-takeoff-tools',
      'bluebeam-hvac-mechanical-tool-set',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'bluebeam-hvac-mechanical-tool-set',
    title: 'Bluebeam HVAC and Mechanical Tool Set',
    shortDescription:
      'HVAC, ventilation, and mechanical services markup symbols for MEP teams using Bluebeam Revu.',
    fullDescription:
      'A downloadable BTX pack for mechanical engineers, HVAC designers, and MEP consultants reviewing ductwork, plant, pipework, and mechanical services drawings in Bluebeam Revu. Provides consistent, repeatable markup tools for drawing reviews, coordination comments, and site documentation.',
    category: 'HVAC',
    categorySlug: 'hvac',
    price: 29,
    includedItems: [
      'Supply and extract air terminal symbols',
      'Ductwork route and dimension markups',
      'AHU and FCU references',
      'Damper and valve symbols',
      'Plant and equipment room references',
      'Pipework annotation tools',
      'Coordination and clash note markups',
      'Review and revision markers',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Air terminals',
      'Ductwork routes',
      'AHU and FCU equipment',
      'Dampers and valves',
      'Plant equipment',
      'Pipework annotations',
      'Coordination notes',
      'Review markers',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'HVAC system drawing reviews',
      'Ductwork coordination and clash detection',
      'MEP service coordination',
      'Tender and construction phase markup',
      'Plant room and equipment documentation',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your HVAC symbol categories appear in the Tool Chest.',
      'Place and label markups on your mechanical drawings.',
    ],
    faqs: [
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu is required and sold separately. This is an importable symbol library for existing Revu users.',
      },
      {
        question: 'Is this suitable for plumbing drawings too?',
        answer:
          'The HVAC pack focuses on ventilation and mechanical services. For plumbing and drainage, see the dedicated plumbing tool set.',
      },
    ],
    seoTitle: 'Bluebeam HVAC Tool Set for Mechanical Engineers | Construction Markup Tools',
    seoDescription:
      'Download an HVAC and mechanical markup tool set for Bluebeam Revu. Air terminals, ductwork, plant equipment, and coordination symbols for MEP drawing reviews.',
    keywords: [
      'bluebeam hvac tool set',
      'bluebeam mechanical symbols',
      'hvac symbols bluebeam revu',
      'mep markup bluebeam',
    ],
    relatedSlugs: [
      'bluebeam-plumbing-tool-set',
      'bluebeam-electrical-tool-set',
      'bluebeam-estimating-takeoff-tools',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'bluebeam-plumbing-tool-set',
    title: 'Bluebeam Plumbing Tool Set',
    shortDescription:
      'Plumbing, drainage, and pipework markup symbols for building services teams using Bluebeam Revu.',
    fullDescription:
      'A downloadable BTX pack for plumbing engineers, drainage designers, and building services consultants reviewing pipework, drainage, sanitary, and hot-and-cold systems in Bluebeam Revu. Covers the fixture, valve, and route symbols needed for drawing reviews and coordination across building projects.',
    category: 'Plumbing',
    categorySlug: 'plumbing',
    price: 29,
    includedItems: [
      'Sanitary fixture and fitting symbols',
      'Pipework route and slope annotations',
      'Valve, stopcock, and isolation symbols',
      'Drainage and gully references',
      'Hot and cold water system markups',
      'Pump and plant references',
      'Coordination and inspection note tools',
      'Review and revision markers',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Sanitary fixtures',
      'Pipework routes',
      'Valves and isolation devices',
      'Drainage systems',
      'Hot and cold water',
      'Pumps and plant',
      'Coordination notes',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'Plumbing and drainage drawing reviews',
      'Pipework coordination with HVAC and structural teams',
      'Tender and construction phase markup',
      'Inspection and certification documentation',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your plumbing symbol categories appear in the Tool Chest.',
      'Place and label markups on your plumbing drawings.',
    ],
    faqs: [
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu is required and sold separately. This is an importable symbol pack for existing Revu users.',
      },
      {
        question: 'Can this be used with the HVAC tool set?',
        answer:
          'Yes. Both packs import as separate Tool Chest groups and can be used together in the same Revu session.',
      },
    ],
    seoTitle: 'Bluebeam Plumbing Tool Set for Building Services | Construction Markup Tools',
    seoDescription:
      'Download a plumbing and drainage markup tool set for Bluebeam Revu. Pipe routes, valves, sanitary fixtures, and drainage symbols for building services drawing reviews.',
    keywords: [
      'bluebeam plumbing tool set',
      'plumbing symbols bluebeam revu',
      'bluebeam drainage symbols',
      'building services markup bluebeam',
    ],
    relatedSlugs: [
      'bluebeam-hvac-mechanical-tool-set',
      'bluebeam-electrical-tool-set',
      'bluebeam-estimating-takeoff-tools',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'bluebeam-estimating-takeoff-tools',
    title: 'Bluebeam Estimating and Takeoff Tools',
    shortDescription:
      'Takeoff, count, and measurement markup tools for estimators and quantity surveyors using Bluebeam Revu.',
    fullDescription:
      'A downloadable BTX pack designed specifically for estimating workflows in Bluebeam Revu. Includes count tools, measurement annotations, scope clarification labels, item callout markups, and structured naming conventions to support faster, cleaner takeoff preparation across any trade.',
    category: 'Estimating',
    categorySlug: 'estimating',
    price: 24,
    includedItems: [
      'Item count and device count tools',
      'Linear measurement annotation markups',
      'Area measurement tools',
      'Scope clarification and exclusion labels',
      'Item callout and reference symbols',
      'Provisional and assumed item markers',
      'Takeoff status and review notes',
      'Naming convention guide (PDF)',
      'Tool Chest import guide (PDF)',
      'Licence notes for internal project use',
    ],
    symbolCategories: [
      'Count tools',
      'Linear measurement tools',
      'Area tools',
      'Scope labels',
      'Item callouts',
      'Status markers',
      'Review notes',
    ],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'Electrical and mechanical takeoff preparation',
      'Quantity surveying and cost planning',
      'Tender and bid submission support',
      'Cross-checking estimates against drawings',
      'Multi-user takeoff workflows',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Download the BTX file after purchase.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your estimating tool categories appear in the Tool Chest.',
      'Use count, measurement, and label tools on your drawings.',
    ],
    faqs: [
      {
        question: 'Does this work with any trade drawing?',
        answer:
          'Yes. The estimating and takeoff tools are trade-agnostic and work across electrical, mechanical, plumbing, fire alarm, and other construction drawings.',
      },
      {
        question: 'Does this include Bluebeam Revu?',
        answer:
          'No. Bluebeam Revu is required and sold separately. This is an importable tool library for existing Revu users.',
      },
      {
        question: 'Can I combine this with a trade symbol pack?',
        answer:
          'Yes. The estimating pack can be used alongside any trade-specific pack imported into Bluebeam Revu.',
      },
    ],
    seoTitle: 'Bluebeam Estimating and Takeoff Tools | Construction Markup Tools',
    seoDescription:
      'Download estimating and takeoff markup tools for Bluebeam Revu. Count tools, measurement markups, scope labels, and item callouts for faster construction estimates.',
    keywords: [
      'bluebeam estimating tools',
      'bluebeam takeoff tools',
      'bluebeam quantity survey markup',
      'construction estimating bluebeam revu',
      'bluebeam count tool',
    ],
    relatedSlugs: [
      'bluebeam-electrical-tool-set',
      'bluebeam-hvac-mechanical-tool-set',
      'bluebeam-fire-alarm-symbols',
      'free-bluebeam-symbols-sample',
    ],
  },
  {
    slug: 'free-bluebeam-symbols-sample',
    title: 'Free Bluebeam Symbols Sample',
    shortDescription:
      'A free sample pack of original Bluebeam markup symbols so you can test the import process and Tool Chest workflow.',
    fullDescription:
      'Not ready to buy yet? The free sample pack includes a small selection of original construction markup symbols drawn from across our tool set range. Download it, import it into Bluebeam Revu, and confirm the file format, symbol quality, and Tool Chest structure before choosing a full trade pack or bundle.',
    category: 'Free',
    categorySlug: 'free',
    price: 0,
    badge: 'Free Download',
    includedItems: [
      'Sample electrical symbols',
      'Sample review and annotation markups',
      'Sample coordination note tools',
      'Quick import guide (PDF)',
    ],
    symbolCategories: ['Sample electrical', 'Sample review markers', 'Sample coordination notes'],
    compatibleWith: ['Bluebeam Revu 20', 'Bluebeam Revu 21', 'Bluebeam Revu 2019'],
    useCases: [
      'Testing the BTX import process',
      'Evaluating symbol quality before purchase',
      'Exploring the Tool Chest workflow',
      'Demonstrating Bluebeam markup workflows to colleagues',
    ],
    fileFormats: ['BTX (Bluebeam Tool Set)'],
    installSteps: [
      'Enter your email and download the free BTX file.',
      'Open Bluebeam Revu and go to Tool Chest.',
      'Click the manage icon and select Import.',
      'Locate the downloaded BTX file and confirm.',
      'Your sample symbol categories appear in the Tool Chest.',
      'Test the symbols on any open drawing.',
    ],
    faqs: [
      {
        question: 'Is this really free?',
        answer:
          'Yes. Enter your email to download the sample pack. No payment is required.',
      },
      {
        question: 'What does the sample include?',
        answer:
          'A small selection of original symbols from across our tool set range, plus a quick import guide.',
      },
      {
        question: 'Does Bluebeam Revu need to be installed?',
        answer:
          'Yes. You need an active Bluebeam Revu installation to import and use the BTX file.',
      },
      {
        question: 'Can I upgrade to a full pack after testing?',
        answer:
          'Yes. Each full trade pack is available to purchase separately. Bundles are also available if you need symbols for multiple trades.',
      },
    ],
    seoTitle: 'Free Bluebeam Symbols Sample Download | Construction Markup Tools',
    seoDescription:
      'Download a free sample of original Bluebeam markup symbols. Test the BTX import process, symbol quality, and Tool Chest workflow before buying a full pack.',
    keywords: [
      'free bluebeam symbols',
      'bluebeam symbols sample',
      'free bluebeam tool set download',
      'bluebeam markup symbols free',
    ],
    relatedSlugs: [
      'bluebeam-electrical-tool-set',
      'bluebeam-fire-alarm-symbols',
      'bluebeam-cctv-tool-set',
      'bluebeam-security-tool-set',
    ],
    isFree: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => p !== undefined);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) =>
    ['bluebeam-electrical-tool-set', 'bluebeam-fire-alarm-symbols', 'bluebeam-cctv-tool-set', 'bluebeam-estimating-takeoff-tools'].includes(p.slug)
  );
}

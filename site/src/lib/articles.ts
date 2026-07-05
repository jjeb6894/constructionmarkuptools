export interface Article {
  slug: string;
  title: string;
  category: 'guide' | 'blog' | 'compare';
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  relatedProducts: string[];
  publishedDate: string;
  readTime: number;
}

export const articles: Article[] = [
  {
    slug: 'how-to-import-bluebeam-btx-tool-set',
    title: 'How to Import a Bluebeam BTX Tool Set',
    category: 'guide',
    excerpt:
      'A step-by-step guide to importing a BTX tool set file into the Bluebeam Revu Tool Chest, with tips for organising your markup library.',
    content: `
## What is a BTX file?

A BTX file is a Bluebeam Tool Set export format. It packages a collection of markup tools, symbols, and categories into a single importable file that can be shared across a team or downloaded and added to any Bluebeam Revu installation.

When you import a BTX file, its tool categories and symbols appear inside your Bluebeam Revu Tool Chest, ready to use on any drawing without rebuilding common markups from scratch.

## Before you start

You will need:
- Bluebeam Revu installed on your computer (Revu 2019, 20, or 21)
- The BTX file you want to import (downloaded to a local folder)
- A PDF or drawing open in Revu (optional, but useful for testing after import)

Bluebeam Revu is not included with any Construction Markup Tools download. You must have an active Revu licence to use BTX tool set files.

## Step-by-step import instructions

### Step 1: Open the Tool Chest

Open Bluebeam Revu. In the main interface, locate the Tool Chest panel. This is usually docked on the right side of the screen. If it is not visible, go to **View > Panels > Tool Chest** from the menu bar.

### Step 2: Click the manage icon

At the top of the Tool Chest panel, you will see a small icon that opens the Tool Chest management menu. Click it to expand the options.

### Step 3: Select Import

From the management menu, choose **Import**. A file browser window will open.

### Step 4: Locate the BTX file

Navigate to the folder where you saved your downloaded BTX file. Select the file and click Open or Confirm.

### Step 5: Confirm the import

Bluebeam Revu will ask you to confirm the import. The tool categories from the BTX file will appear in your Tool Chest. Scroll through the panel to see the new groups.

### Step 6: Test on a drawing

Open any PDF or drawing in Bluebeam Revu. Select a tool from the newly imported categories and place it on the drawing to confirm everything is working correctly.

## Organising your Tool Chest after import

When you import a BTX file, its categories appear as separate groups in the Tool Chest. You can:

- Drag groups to reorder them
- Right-click a group to rename, hide, or delete it
- Right-click individual tools to modify their properties
- Export a new BTX file to share your organised Tool Chest with colleagues

For busy projects, organising your Tool Chest by workflow phase (review tools, takeoff tools, coordination tools) rather than by trade can make the markup process faster.

## Common import problems

**The Tool Chest shows no new groups after import**
Close and reopen the Tool Chest panel. If the groups still do not appear, try the import process again with the BTX file saved to a simpler folder path (e.g. Desktop or Downloads).

**Revu asks to overwrite existing tools**
If you have previously imported a tool set with the same category names, Revu may warn about duplicate groups. In most cases, you can choose to merge or replace. Creating a backup BTX export of your existing tools before importing is a safe approach.

**The BTX file does not open**
Confirm that the file has a .btx extension and was not corrupted during download. Try downloading the file again to a different folder.

## Sharing the tool set with your team

Once you have imported and organised your Tool Chest, you can export a fresh BTX file and share it with colleagues so everyone works from the same symbol library. To export:

1. Click the manage icon in the Tool Chest.
2. Select Export.
3. Choose which groups to include.
4. Save the BTX file and share it with your team.

## Next steps

If you are new to Bluebeam markup tool sets, start with the free sample pack to test the import process on your system. Once you are comfortable with the workflow, the full trade packs provide a complete library of original construction markup symbols for each discipline.
    `,
    seoTitle: 'How to Import a Bluebeam BTX Tool Set | Step-by-Step Guide',
    seoDescription:
      'Learn how to import a BTX tool set file into Bluebeam Revu. Step-by-step instructions for adding symbol packs to your Tool Chest, with tips for organisation and team sharing.',
    keywords: [
      'how to import bluebeam btx tool set',
      'bluebeam btx import guide',
      'import tool set bluebeam revu',
      'bluebeam tool chest import',
      'btx file bluebeam',
    ],
    relatedProducts: ['free-bluebeam-symbols-sample', 'bluebeam-electrical-tool-set'],
    publishedDate: '2024-09-01',
    readTime: 6,
  },
  {
    slug: 'bluebeam-tool-chest-organisation-guide',
    title: 'How to Organise Your Bluebeam Tool Chest',
    category: 'guide',
    excerpt:
      'A practical guide to structuring your Bluebeam Revu Tool Chest for faster drawing reviews, cleaner takeoffs, and easier team workflows.',
    content: `
## Why Tool Chest organisation matters

A cluttered Tool Chest slows down drawing reviews. When your markup library is a single long list of tools built up over multiple projects, finding the right symbol becomes a task in itself.

A well-organised Tool Chest makes the markup process faster because the tools you need are where you expect them. It also makes it easier to onboard new team members, share consistent workflows, and maintain a professional standard of documentation across projects.

## Three approaches to Tool Chest structure

### By trade

Grouping tools by trade (Electrical, HVAC, Fire Alarm, Security, etc.) works well if your team reviews drawings for multiple disciplines. Each trade has its own group, and users can collapse the groups they do not need for the current task.

**Best for:** MEP consultants, multi-discipline teams, estimators covering multiple trades.

### By workflow phase

Grouping tools by phase (Tender Review, Design Review, Construction Comments, As-Built Notes) places the markup types you need at each project stage in a single logical group.

**Best for:** Project managers, document controllers, teams who work across trades but focus on review phases.

### By markup type

Grouping tools by type (Symbols, Notes, Measurements, Status Markers) creates a flatter structure where all similar markup styles are together regardless of trade.

**Best for:** Smaller teams, estimators, individuals who prefer a minimal Tool Chest.

## Practical setup tips

### Name groups clearly

Use consistent, descriptive group names. Avoid abbreviations that only make sense to one person. Clear names make the Tool Chest readable at speed during a busy drawing review.

### Limit the number of top-level groups

More than eight to ten active groups in the Tool Chest creates visual noise. Archive or hide groups you are not using on a current project rather than scrolling through everything every time.

### Use consistent tool naming

Give each tool a Subject or Label that makes its purpose obvious in the markup list. A tool named "Electrical outlet — double socket" is easier to filter in the markups panel than one named "Symbol 14".

### Export a master BTX file for your team

Once you have a Tool Chest structure that works, export it as a BTX file and share it. This ensures every team member starts from the same baseline when they join a project.

### Keep a project-specific layer

On complex projects, maintain one group of tools specifically configured for that project (with project-specific colours, subjects, or callout labels). Export a project BTX at the end of each phase as a record.

## Common Tool Chest problems to avoid

**Too many similar tools doing the same job.** Duplication happens when tools are created quickly under pressure on each new project. Auditing your Tool Chest every few months and removing redundant tools keeps the library clean.

**Single-person Tool Chests.** If only one person understands the markup library, the team becomes dependent on them. A shared, documented BTX file reduces that risk.

**No naming convention.** Inconsistent tool names make the markups panel hard to filter and sort, which slows down coordination reviews and quantity take-offs.

## Getting started with a clean Tool Chest

The fastest way to start with a clean, professional Tool Chest is to import a ready-made tool set rather than building one from scratch. A well-structured BTX file gives you an organised starting point that you can then adapt to your own workflows.

The free sample pack is a good place to start if you want to see how a structured tool set looks inside the Tool Chest before committing to a full trade pack.
    `,
    seoTitle: 'How to Organise Your Bluebeam Tool Chest | Construction Markup Tools',
    seoDescription:
      'Learn how to structure your Bluebeam Revu Tool Chest for faster drawing reviews. Practical tips for grouping, naming, and sharing markup tools across your team.',
    keywords: [
      'bluebeam tool chest organisation',
      'organise bluebeam tool chest',
      'bluebeam markup library structure',
      'bluebeam revu tool chest tips',
    ],
    relatedProducts: ['free-bluebeam-symbols-sample', 'bluebeam-electrical-tool-set'],
    publishedDate: '2024-09-15',
    readTime: 7,
  },
  {
    slug: 'bluebeam-electrical-symbols-guide',
    title: 'Bluebeam Electrical Symbols: A Guide for Contractors and Estimators',
    category: 'blog',
    excerpt:
      'An overview of the electrical markup symbols electrical contractors and estimators need in Bluebeam Revu, and how to build a consistent symbol library for drawing reviews.',
    content: `
## Why consistent electrical symbols matter in Bluebeam

Electrical drawing reviews in Bluebeam Revu cover a wide range of tasks: marking missing devices, flagging panel issues, noting conduit route changes, identifying coordination conflicts, and preparing takeoff counts. Each task benefits from a different type of markup.

When electrical teams build their markup habits project by project, the Tool Chest gradually fills with inconsistent symbols, duplicated markups, and tools that only one person understands. A structured electrical symbol library solves this by giving the team a repeatable, shared starting point.

## Core electrical symbol categories

A complete electrical markup library for Bluebeam Revu should cover these categories:

### Power devices
Outlets, sockets, double sockets, floor outlets, specialist power devices, and distribution references. These are the most commonly placed markups in electrical drawing reviews and takeoffs.

### Panels and distribution
Distribution board references, consumer unit markers, switchgear callouts, and transformer symbols. Consistent naming for panels is important for takeoff accuracy, particularly when estimating quantities for multiple floors or zones.

### Conduit and containment routes
Cable tray, trunking, conduit, and duct bank route annotations. These markups help electrical teams coordinate containment routes with structural, HVAC, and plumbing teams.

### Lighting controls
Lighting panel references, dimmer switch symbols, lighting control system annotations, and circuit break references. These are often needed separately from the main lighting fixture library.

### Emergency lighting
Emergency luminaire symbols, maintained and non-maintained annotations, central battery system references, and test switch callouts.

### Review and coordination tools
These are the least trade-specific but among the most frequently used: revision clouds, issue notes, RFI markers, scope clarification labels, and hold indicators. A clean set of coordination tools speeds up review cycles across any drawing type.

### Takeoff and count tools
Item count symbols, measurement tools, area markups, and scope labels configured for electrical itemisation. Consistent naming here makes it possible to sort and filter markups in the Revu markups list, which saves time when checking counts.

## How electrical estimators use Bluebeam symbols

For electrical estimators, the primary value of a structured symbol library is repeatability. When the same markup tools are used across every drawing package, the takeoff process becomes faster and easier to audit.

Key benefits for estimating workflows:
- Count tools with consistent subjects allow markup data to be sorted and exported cleanly.
- Scope labels and exclusion notes reduce ambiguity during tender review.
- Coordination markups make it easier to identify missing information without separate email threads.
- Revision markers help track drawing changes between tender stages.

## Building a practical electrical symbol library

The fastest way to build a practical electrical symbol library in Bluebeam Revu is to import a ready-made BTX tool set rather than creating each symbol individually. A good electrical BTX file saves hours of setup time and gives the team a clean, consistent starting point.

Once imported, the library can be adapted to project-specific needs by adjusting colours, labels, and subjects within Revu. The original BTX file can always be re-imported to restore the baseline.

Start with the free sample pack if you want to test the import process and see the structure of a professional symbol library before purchasing a full electrical tool set.
    `,
    seoTitle: 'Bluebeam Electrical Symbols Guide for Contractors | Construction Markup Tools',
    seoDescription:
      'An overview of the electrical markup symbols and categories you need in Bluebeam Revu. Learn how to build a consistent symbol library for drawing reviews and estimating.',
    keywords: [
      'bluebeam electrical symbols',
      'bluebeam electrical markup guide',
      'electrical symbols bluebeam revu',
      'bluebeam symbols for electrical contractors',
    ],
    relatedProducts: ['bluebeam-electrical-tool-set', 'bluebeam-estimating-takeoff-tools', 'free-bluebeam-symbols-sample'],
    publishedDate: '2024-10-01',
    readTime: 8,
  },
  {
    slug: 'bluebeam-fire-alarm-symbols-guide',
    title: 'Bluebeam Fire Alarm Symbols: What You Need for Drawing Reviews',
    category: 'blog',
    excerpt:
      'A guide to the fire alarm symbols fire alarm designers and contractors need in Bluebeam Revu for drawing reviews, coordination, and documentation.',
    content: `
## Fire alarm drawing reviews in Bluebeam Revu

Fire alarm drawing reviews involve marking detection devices, notification appliances, control panels, zones, and circuits across architectural and services drawings. When the same symbols are used consistently across a project, reviews are faster and easier to discuss with the wider project team.

## Key fire alarm symbol categories

### Detection devices
Smoke detectors, heat detectors, multi-sensor devices, and beam detectors. These are typically the highest-volume symbols in a fire alarm drawing review, as they appear on every floor and zone.

### Notification appliances
Sounders, sounder beacons, visual alarm devices, and voice alarm speakers. These often need to be marked against architectural layouts to confirm coverage and aesthetics compliance.

### Manual call points
Manual call points, break-glass devices, and weatherproof call point references. Location accuracy is important for compliance reviews.

### Control panels and repeaters
Fire alarm control panel references, repeater panel callouts, and zone expander symbols. These support system topology reviews and coordination with the electrical switchboard design.

### Modules and relays
Input, output, and interface modules; relay and sounder circuit references; addressable device annotations. These markups help coordination between fire alarm designers and other building services teams.

### Circuit and zone annotations
Zone boundary callouts, circuit number annotations, cable route markups, and zone override indicators. A consistent approach to zone and circuit labelling reduces errors in commissioning documentation.

## Coordination with other trades

Fire alarm systems interact with electrical power supplies, sprinkler systems, building management systems, access control, HVAC, and evacuation systems. Clear markup tools for coordination comments make multi-discipline drawing reviews faster and more effective.

Useful coordination markup types for fire alarm reviews include:
- Clash or conflict notes
- Interface requirement callouts
- Responsibility boundary markers
- Hold and awaiting information (AWI) flags

## Getting a consistent fire alarm symbol library

Building a fire alarm symbol library from scratch in Bluebeam Revu is time-consuming. Starting from a structured BTX file saves setup time and ensures the team is working from a clean, organised baseline.

The free sample pack includes a small selection of symbols across construction disciplines. The full fire alarm symbols pack provides a complete set of original markups organised by category for use across design, tender, and construction drawing reviews.
    `,
    seoTitle: 'Bluebeam Fire Alarm Symbols Guide | Construction Markup Tools',
    seoDescription:
      'A guide to the fire alarm markup symbols you need in Bluebeam Revu. Detectors, notification appliances, panels, zones, and coordination tools for drawing reviews.',
    keywords: [
      'bluebeam fire alarm symbols guide',
      'fire alarm drawing review bluebeam',
      'bluebeam fire alarm markup',
      'fire alarm symbols bluebeam revu',
    ],
    relatedProducts: ['bluebeam-fire-alarm-symbols', 'bluebeam-electrical-tool-set', 'free-bluebeam-symbols-sample'],
    publishedDate: '2024-10-10',
    readTime: 7,
  },
  {
    slug: 'bluebeam-cctv-symbols-guide',
    title: 'Bluebeam CCTV Symbols for Security Drawing Reviews',
    category: 'blog',
    excerpt:
      'How to use structured CCTV markup symbols in Bluebeam Revu for surveillance system drawing reviews, coverage planning, and coordination.',
    content: `
## CCTV drawing reviews in Bluebeam Revu

Reviewing CCTV and surveillance system drawings in Bluebeam Revu involves more than marking camera positions. Coverage planning, equipment routing, power supply coordination, and coordination with access control and security alarm systems all benefit from a consistent markup approach.

## What CCTV markup symbols are needed

### Camera symbols
Fixed dome cameras, PTZ cameras, bullet cameras, fisheye and panoramic cameras, and specialist camera types. Clear symbol differentiation helps reviewers distinguish camera types at a glance across complex layouts.

### Field-of-view annotations
Coverage cone and sector markups show the intended field of view for each camera position. These are particularly useful for client approval drawings and commissioning documentation, where coverage gaps need to be identified and resolved before installation.

### Recording and viewing equipment
NVR (network video recorder) and DVR references, server rack symbols, monitor wall callouts, and video management workstation references. These support system topology reviews and coordination with IT teams.

### Cable routes and containment
Network cable route annotations, conduit and trunking markups, and riser shaft references. CCTV cable routes often need coordination with electrical containment, data cabling, and structural teams.

### Power supply symbols
PoE switch references, local power supply callouts, and UPS symbols. Power supply resilience is a key design consideration for CCTV systems.

### Coordination and coverage notes
Coordination issue markers, coverage gap callouts, mounting height notes, and line-of-sight obstruction flags. These allow reviewers to communicate specific concerns directly on the drawing.

## Integrating CCTV reviews with access control and security systems

CCTV drawing reviews are often conducted in parallel with access control and intruder alarm reviews. Using a structured, consistent set of markup symbols across all three disciplines makes multi-discipline coordination meetings more efficient.

When CCTV, access control, and security symbols follow the same colour and labelling conventions, drawing comments are easier to read, filter, and action.

## Starting with a structured CCTV symbol library

The CCTV tool set provides a ready-made BTX file with original camera, equipment, route, and coordination symbols organised for use in Bluebeam Revu. Download the free sample pack first to test the import process, then upgrade to the full CCTV pack or the low-voltage bundle if you need symbols for multiple security disciplines.
    `,
    seoTitle: 'Bluebeam CCTV Symbols Guide for Security Designers | Construction Markup Tools',
    seoDescription:
      'How to use CCTV markup symbols in Bluebeam Revu. Camera types, field-of-view annotations, cable routes, and coordination tools for surveillance drawing reviews.',
    keywords: [
      'bluebeam cctv symbols guide',
      'bluebeam surveillance symbols',
      'cctv drawing review bluebeam revu',
      'bluebeam security cctv markup',
    ],
    relatedProducts: ['bluebeam-cctv-tool-set', 'bluebeam-security-tool-set', 'bluebeam-access-control-symbols'],
    publishedDate: '2024-10-20',
    readTime: 7,
  },
  {
    slug: 'best-bluebeam-toolsets-for-contractors',
    title: 'Best Bluebeam Tool Sets for Construction Contractors',
    category: 'blog',
    excerpt:
      'A practical guide to choosing the right Bluebeam markup tool sets for electrical, low-voltage, mechanical, and multi-trade construction workflows.',
    content: `
## What makes a Bluebeam tool set useful for contractors?

A practical Bluebeam tool set is not just a collection of symbols. The structure matters as much as the individual markups. A well-designed BTX file organises symbols into logical groups, uses consistent naming, and covers the markup types a contractor actually needs during a drawing review — not just a generic selection of shapes.

For contractors, the most useful tool sets share four characteristics:

**Organised by workflow, not just by type.** Tools for review comments, takeoff counts, coordination notes, and revision markers serve different purposes. Keeping these in separate groups means less searching.

**Consistent subject and label naming.** When markup tools use clear, consistent names, the markups panel in Bluebeam Revu becomes easier to filter, sort, and export for quantity checking.

**Adaptable after import.** Good tool sets give you a clean starting point you can adjust for project-specific needs without rebuilding from scratch.

**Original, not copied.** Tool sets built from original assets are more reliable and avoid the legal and quality risks of using redistributed or copied symbol files.

## Recommended tool sets by trade

### Electrical contractors
The electrical tool set is the most widely used pack for construction markup workflows. It covers power devices, conduit routes, panels, lighting controls, and takeoff preparation tools. Estimators and engineers benefit from the same pack as site teams.

### Fire alarm designers and installers
The fire alarm symbols pack covers detection, notification, panels, and zones. It is designed to complement electrical tool sets on projects where both disciplines are reviewed simultaneously.

### CCTV and security installers
The CCTV and security tool sets work best together. The CCTV pack covers camera types, field-of-view annotations, and recording equipment. The security pack covers intruder detection devices, panels, and zones. The access control pack adds door readers, controllers, and entry hardware.

### MEP consultants
MEP teams covering electrical, HVAC, and plumbing will find the most value in the individual trade packs imported together. Each pack creates a separate Tool Chest group, so all three disciplines are available in the same Revu session without conflicts.

### Estimators and quantity surveyors
The estimating and takeoff tools pack is designed specifically for count, measurement, and scope annotation workflows. It is trade-agnostic and works alongside any discipline-specific symbol pack.

## Bundles vs individual packs

If you regularly review drawings for more than one trade, buying individual packs adds up quickly. Check the bundle options for multi-trade combinations at a reduced combined price.

The free sample pack is the best way to test the symbol quality, Tool Chest structure, and import process before committing to a purchase.
    `,
    seoTitle: 'Best Bluebeam Tool Sets for Construction Contractors | Construction Markup Tools',
    seoDescription:
      'A practical guide to the best Bluebeam markup tool sets for electrical, CCTV, security, fire alarm, MEP, and estimating workflows on construction projects.',
    keywords: [
      'best bluebeam tool sets for contractors',
      'bluebeam construction tool sets',
      'bluebeam markup tools for contractors',
      'bluebeam revu tool sets construction',
    ],
    relatedProducts: ['bluebeam-electrical-tool-set', 'bluebeam-estimating-takeoff-tools', 'free-bluebeam-symbols-sample'],
    publishedDate: '2024-11-01',
    readTime: 9,
  },
  {
    slug: 'bluebeam-toolsets-vs-manual-markups',
    title: 'Bluebeam Tool Sets vs Building Markups From Scratch',
    category: 'compare',
    excerpt:
      'A comparison of using a structured BTX tool set versus building markups manually in Bluebeam Revu for construction drawing reviews.',
    content: `
## The manual markup approach

Most Bluebeam Revu users start by building markups manually. They draw shapes, add text, adjust colours, and save tools to the Tool Chest one at a time. Over several projects, a personal markup library accumulates in the Tool Chest.

This approach works for individual users but creates problems when multiple people need to review the same drawings consistently.

**Advantages of building manually:**
- Full control over every symbol and tool property
- No cost beyond the Revu licence
- Tools evolve naturally over time to match working habits

**Disadvantages of building manually:**
- Inconsistency between team members
- Significant time investment per project
- Symbol quality depends on the individual's Revu skills
- No structured organisation without deliberate effort
- The Tool Chest becomes cluttered over time

## The structured tool set approach

A structured BTX tool set provides a ready-made, organised starting point. Symbols are designed for clarity, categories are grouped logically, and the naming conventions are consistent from the first use.

**Advantages of using a structured tool set:**
- Immediate consistency across the team
- No setup time before project reviews begin
- Professional symbol quality without needing advanced Revu skills
- Logical Tool Chest structure from the start
- Easier to onboard new team members

**Disadvantages of using a structured tool set:**
- Less flexible than a fully bespoke library initially
- Requires an upfront purchase (or free sample download)
- May include categories that are not relevant to every workflow
- Still needs to be adapted for highly specific project requirements

## What the comparison shows

For most construction teams reviewing drawings regularly, the time saved by starting from a structured tool set outweighs the upfront cost. The free sample pack reduces the risk of the purchase decision by letting teams test the import process and symbol quality before committing.

For teams with very specific or unusual requirements, a structured tool set still provides a better starting point than a blank Tool Chest, since any imported symbols can be modified after import to match project needs.
    `,
    seoTitle: 'Bluebeam Tool Sets vs Manual Markups | Construction Markup Tools',
    seoDescription:
      'A comparison of using a structured BTX tool set versus building Bluebeam markups from scratch. Pros, cons, and recommendations for construction drawing review teams.',
    keywords: [
      'bluebeam tool set vs manual markup',
      'bluebeam revu markup comparison',
      'should I buy a bluebeam tool set',
    ],
    relatedProducts: ['free-bluebeam-symbols-sample', 'bluebeam-electrical-tool-set'],
    publishedDate: '2024-11-10',
    readTime: 6,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Article['category']): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getAllGuides(): Article[] {
  return articles.filter((a) => a.category === 'guide');
}

export function getAllBlogPosts(): Article[] {
  return articles.filter((a) => a.category === 'blog');
}

export function getAllComparePages(): Article[] {
  return articles.filter((a) => a.category === 'compare');
}

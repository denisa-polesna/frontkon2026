export type Language = 'en' | 'cz';

export const translations = {
  en: {
    // Header & Navigation
    appTitle: 'GIT BLAME: AI',
    editionBadge: 'FrontKon Edition',
    subtitleL1: 'Outreach Frontend Challenge • Level 1: Center the Modal',
    subtitleL2: 'Outreach Frontend Challenge • Level 2: The Stacking Context War',
    subtitleL3: 'Outreach Frontend Challenge • Level 3: Text Overflow',
    menuBtn: 'Menu',
    l1Badge: 'Level 1: Center Modal',
    l2Badge: 'Level 2: Sticky CTA',
    l3Badge: 'Level 3: Text Overflow',
    bestLabel: 'BEST:',
    leaderboardBtn: 'Leaderboard',
    resetTooltip: 'Reset Challenge',
    muteTooltip: 'Mute Sound',
    unmuteTooltip: 'Enable Sound',
    langTooltip: 'Přepnout do češtiny',

    // Jira Ticket Common
    jiraIssueType: 'Bug',
    jiraPriorityP0: 'P0 - Blocker',
    jiraPriorityP1: 'P1 - High',
    jiraStatusProgress: 'IN PROGRESS',
    jiraStatusDone: 'RESOLVED / READY TO MERGE ✓',
    jiraReporterLabel: 'Reporter:',
    jiraAssigneeLabel: 'Assignee:',
    jiraAssigneeYou: 'Senior Frontend Dev (You)',
    jiraAcLabel: 'Acceptance Criteria:',
    jiraToggleDetails: 'Toggle Details',

    // Jira Tickets per Level
    jiraKeyL1: 'OUT-404',
    jiraSummaryL1: '[PROD HOTFIX] Create Prospect modal rendered outside viewport',
    jiraDescL1: 'VP of Sales reported the Create Prospect modal is positioned at top: 50%, left: 50% with -340px negative margins. It is partially invisible on all standard laptops. DevBot claims it looked fine on its 4K smart fridge.',
    jiraAcL1: 'Modal must be cleanly centered on both horizontal and vertical axes within .modal-viewport.',

    jiraKeyL2: 'OUT-407',
    jiraSummaryL2: '[PROD HOTFIX] "Sign Deal" button scrolls off-screen; $450k ARR deal blocked',
    jiraDescL2: 'DevBot tried to fix button visibility by giving it z-index: 2147483647 at top: 4800px. When sales reps scroll the deal activity timeline, the button vanishes into the void.',
    jiraAcL2: 'Action bar must stay docked to the bottom (position: sticky; bottom: 0;) while scrolling the timeline container.',

    jiraKeyL3: 'OUT-405',
    jiraSummaryL3: '[UI BREAK] 250-character meeting title explodes through calendar card',
    jiraDescL3: 'Enterprise prospect scheduled a demo with a 250-char title. DevBot set width: 99999px and font-size: 8px so it "does not cut off". Entire calendar board is blown out horizontally.',
    jiraAcL3: 'Title must stay on a single line and truncate cleanly with an ellipsis (...) inside .meeting-title.',

    // Main Menu
    menuSubtitle: 'DevBot-3000 pushed directly to production at 4:59 PM on Friday. Can you fix the AI Junior’s broken CSS before prod explodes?',
    menuDevbotTaunt: 'Welcome to the Outreach booth, human! I wrote 40,000 lines of negative margins, 2147483647 z-indices, and 99999px widths. Think you are smarter than a 400B parameter neural net?',
    badgesHeader: 'Conference Badges to Earn:',
    seniorBadgeTitle: 'Unreplaceable Senior Engineer',
    seniorBadgeSub: 'Solve < 20s • Job security 100% (AI-proof)',
    midBadgeTitle: 'Solid Mid-Level Dev',
    midBadgeSub: 'Solve 20s - 45s • AI might take your job in 2038',
    promptBadgeTitle: 'Prompt Engineer',
    promptBadgeSub: 'Solve > 45s • Did you ask ChatGPT?',
    l1Title: 'The Misplaced Modal',
    l1Desc: 'DevBot used 2007-era negative margins to position the Create Prospect modal. Center it cleanly with modern layout rules!',
    l2Title: 'The Stacking Context War',
    l2Desc: 'DevBot set top: 4800px and z-index: 2147483647. Dock the action bar cleanly to the bottom of the scroll view with sticky positioning!',
    l3Title: 'The Infinite Meeting Title',
    l3Desc: 'A 250-character calendar title explodes through card borders. Truncate it cleanly with an ellipsis!',
    startLevelBtn: 'Play Level',
    playAgainLevelBtn: 'Replay Level',
    lockedBtn: 'Locked',
    startCampaignBtn: 'START CHALLENGE 🚀',
    startLevelTimerBtn: 'START TIMER & CODE ⏱️',
    readyPrompt: 'Read the Jira ticket above, then click start to begin the speedrun!',
    roadmapHeader: 'Challenge Roadmap (3 Levels in Sequence):',
    stepLabel: 'Step {step}',
    leaderboardTitleMenu: 'FrontKon Booth Leaderboard',

    // Viewport L1
    targetLabel: '🎯 Target Center',
    targetAligned: 'Target Aligned ✓',
    centeredRadar: 'Centered! 🎯',
    distanceRadar: 'Distance: {dist}px',
    horizontalOnlyRadar: 'Horizontally Centered (Vertical is off!)',
    verticalOnlyRadar: 'Vertically Centered (Horizontal is off!)',

    // Viewport L2 (Sticky CTA)
    scrollHint: 'Scroll up and down to test sticky docking...',
    dealReadyTitle: 'Deal Ready to Close',
    signDealBtn: 'Sign Deal',
    stickySolvedRadar: 'Sticky Docked! 🎯',
    stickyFixedRadar: 'Fixed (Escaped container!) ⚠️',
    stickyNoBottomRadar: 'Sticky but missing bottom: 0!',
    stickyOffRadar: 'Scrolled out of view! 💥',

    // Viewport L3 (Meeting Card)
    meetingTitleHeader: 'Meeting Title (Exploding):',
    meetingNotesBtn: 'Brief',
    joinZoomBtn: 'Join Call',
    l3SolvedRadar: 'Cleanly Truncated! 🎯',
    l3ClippedRadar: 'Clipped but missing ellipsis!',
    l3WrappedRadar: 'Wrapping across multiple rows!',
    l3OverflowRadar: 'Overflowing card boundary! 💥',

    // Prospect Modal (L1)
    modalTitle: 'Create Prospect',
    modalSubheader: 'app.outreach.io • Sales Engagement',
    firstName: 'First Name',
    lastName: 'Last Name',
    workEmail: 'Work Email',
    targetAccount: 'Target Account',
    stage: 'Stage',
    stageValue: 'Discovery Call',
    tierBadge: 'Tier 1 Enterprise',
    ownerBadge: 'Owner: You',
    cancelBtn: 'Cancel',
    saveBtn: 'Save Prospect',

    // Code Editor Common
    needsReview: 'Needs Review',
    branchLabel: 'Branch:',
    devbotHallucination: "❌ DevBot-3000's Hallucination:",
    devbotExcuse: '“Measured on my 8K smart toaster”',
    seniorEditorTitle: 'Your Clean Modern CSS Fix',
    golfCount: 'Golf: {chars} chars',
    hintsToggle: 'Toggle Hints',
    hintsHeader: '💡 Hints for the Booth:',
    useGridBtn: 'Use CSS Grid',
    useFlexBtn: 'Use Flexbox',
    editorPlaceholder: '  /* Write clean CSS properties here */\n  ',
    autoCheckLabel: 'Auto-checks alignment in real-time',
    verifyBtn: 'Verify & Merge PR',
    mergedBtn: 'PR Merged! 🎉',
    verifyFailedToast: '❌ PR Checks Failed: Acceptance Criteria not met!',
    verifyFailedBadge: 'CI/CD FAILED ❌',
    verifyFailedDevbot: 'Nice try! Your PR failed CI/CD pipeline tests! Did you even read the Jira ticket AC?',

    // Code Editor L1
    prTitle: 'PR #404: Center the Outreach modal',

    // Code Editor L2 (Sticky)
    l2StickyPrTitle: 'PR #407: Make CTA button always visible',
    l2DevbotStickyExcuse: '“CSS needs 64-bit z-index support”',
    l2HintSticky: 'Use position: sticky',

    // Code Editor L3 (Meeting Title)
    l3PrTitle: 'PR #405: Ensure calendar title never cuts off',
    l3DevbotExcuse: '“Enterprise clients should simply buy wider ultrawide monitors”',
    l3HintEllipsis: 'Modern Truncation (Ellipsis)',

    // DevBot Avatar & Dialogue (DevBot is your ENEMY - no hints!)
    badge10x: '10x AI ENGINEER 🤖',
    badgeSweating: 'PANICKING 😱',
    badgeSyntax: 'SCOFFING 🙄',
    badgeDefeated: 'PR REJECTED 💥',
    badgeHalfway: 'MOCKING YOU 😈',
    badgeOffended: 'OFFENDED 😤',

    // DevBot L1 Dialogue
    devbotInitial: 'I spent 4 hours calculating those negative margins on my ultrawide screen. You will NEVER center this div, human!',
    devbotHorizontalOnly: "Ha! You centered it sideways, but it's still glued to the ceiling! Give up, my negative margins rule supreme!",
    devbotVerticalOnly: "Vertically centered? Laughable! It's completely off-screen horizontally. You'll never get both right!",
    devbotPanickedClose: "Wait... stop typing! Why is it moving closer to the center?! Back off, human! My PR is merging in 60 seconds!",
    devbotModern: 'Modern CSS?! Disgusting! Real 10x AI engineers use floats, zoom: 1, and 48 !important declarations!',
    devbotMargins: 'Hahaha, yes! Keep guessing pixel values! Try -9999px next, you will never hit the center!',
    devbotConfused: 'What is that garbage syntax? Even my worst hallucinations compile better than whatever you just typed!',
    devbotDefeated: 'NOOOOO! My beautiful 2007 spaghetti CSS! How did you replace my entire architecture in 2 lines?!',

    // DevBot L2 (Sticky) Dialogue
    devbotL2StickyInitial: 'My z-index is higher than Outreach’s ARR! You cannot defeat a 32-bit integer, human!',
    devbotL2StickyFixed: 'Fixed?! Now the button is escaping the card entirely and floating over the browser URL bar! Classic senior dev fail!',
    devbotL2StickyNoBottom: 'Setting sticky without bottom: 0 does literally nothing! My 4800px offset is laughing at you!',
    devbotL2StickyDefeated: 'Position sticky?! The button actually docks to the viewport without a 400-line scroll listener in JavaScript?! Inconceivable!',

    // DevBot L3 Dialogue
    devbotL3Initial: 'Titles contain critical revenue intelligence! Cutting off text is literally destroying pipeline value, human!',
    devbotL3ClippedNoEllipsis: 'Ha! You just hacked off the words abruptly! Where is the elegant ellipsis? That looks like amateur hour!',
    devbotL3Wrapped: 'Wrapping into 7 lines? Now the calendar card looks like a novel! Good luck getting enterprise deals closed with that!',
    devbotL3Defeated: 'AN ELLIPSIS?! Now our sales reps will actually have to HOVER on the tooltip to read the full title?! Currrrse you!',

    // Victory Modal
    victoryTitleL1: 'PR #404 REJECTED & FIXED! 🎉',
    victoryTitleL2: 'PR #407 REJECTED & FIXED! 🎉',
    victoryTitleL3: 'PR #405 REJECTED & FIXED! 🎉',
    victorySubtitle: 'You outsmarted the AI Junior in pure CSS.',
    newRecordBadge: 'NEW BOOTH RECORD! 🏆',
    timeTakenLabel: 'TIME TAKEN',
    cssGolfLabel: 'CSS GOLF',
    postMortemHeader: '🤖 DevBot-3000 Post-Mortem:',
    postMortemTextL1: '“Fine! Maybe CSS Grid IS better than 14 hardcoded negative margins. Senior engineer job security: 100%.”',
    postMortemTextL2: '“Fine! Position sticky docked the bar without a JavaScript scroll listener. You win this round, human.”',
    postMortemTextL3: '“Fine! Three little CSS properties beat my 99999px width. Enjoy your job security for now, human.”',
    enterNameLabel: 'Enter your name for the FrontKon Booth Leaderboard:',
    saveLeaderboardBtn: 'Save to Booth Leaderboard',
    viewLeaderboardBtn: 'View Leaderboard',
    nextLevelBtn: 'Next: Level {next} ➔',
    backToMenuBtn: 'Back to Main Menu',

    // Leaderboard Modal
    leaderboardTitle: 'FrontKon Booth Leaderboard',
    leaderboardSub: 'Top Senior Devs who fixed the AI’s CSS fastest',
    runsCount: '{count} Runs',
    noRunsYet: "No solves recorded yet today! Be the first to reject DevBot's PR.",
    colRank: 'Rank',
    colPlayer: 'Player',
    colTime: 'Time',
    colGolf: 'Golf',
    resetScoresBtn: 'Reset Booth Scores',
    closeBtn: 'Close',
  },
  cz: {
    // Header & Navigation
    appTitle: 'GIT BLAME: AI',
    editionBadge: 'FrontKon Edice',
    subtitleL1: 'Outreach Frontend Výzva • Level 1: Vycentruj modal',
    subtitleL2: 'Outreach Frontend Výzva • Level 2: Válka stohovacího kontextu',
    subtitleL3: 'Outreach Frontend Výzva • Level 3: Přetečení textu',
    menuBtn: 'Menu',
    l1Badge: 'Level 1: Vycentrovat modal',
    l2Badge: 'Level 2: Sticky CTA',
    l3Badge: 'Level 3: Přetečení textu',
    bestLabel: 'REKORD:',
    leaderboardBtn: 'Žebříček',
    resetTooltip: 'Resetovat úkol',
    muteTooltip: 'Ztlumit zvuk',
    unmuteTooltip: 'Zapnout zvuk',
    langTooltip: 'Switch to English',

    // Jira Ticket Common
    jiraIssueType: 'Bug',
    jiraPriorityP0: 'P0 - Blocker',
    jiraPriorityP1: 'P1 - High',
    jiraStatusProgress: 'IN PROGRESS',
    jiraStatusDone: 'VYŘEŠENO / READY TO MERGE ✓',
    jiraReporterLabel: 'Reporter:',
    jiraAssigneeLabel: 'Assignee:',
    jiraAssigneeYou: 'Senior Frontend Dev (Vy)',
    jiraAcLabel: 'Akceptační kritéria (AC):',
    jiraToggleDetails: 'Podrobnosti ticketu',

    // Jira Tickets per Level
    jiraKeyL1: 'OUT-404',
    jiraSummaryL1: '[PROD HOTFIX] Create Prospect modal se vykresluje mimo obrazovku',
    jiraDescL1: 'VP Sales hlásí, že Create Prospect modal je odsunutý pomocí -340px záporných marginů mimo obrazovku. DevBot tvrdí, že na jeho 4K chytré lednici to vypadalo bez chyby.',
    jiraAcL1: 'Modal musí být čistě vycentrován na horizontální I vertikální ose uvnitř .modal-viewport.',

    jiraKeyL2: 'OUT-407',
    jiraSummaryL2: '[PROD HOTFIX] Tlačítko podpisu odscrollovává pryč; blokován deal za $450k ARR',
    jiraDescL2: 'DevBot se pokusil zajistit viditelnost tlačítka nastavením z-indexu 2147483647 na top: 4800px. Když obchodníci scrollují časovou osou, tlačítko zmizí v propadlišti dějin.',
    jiraAcL2: 'Spodní lišta musí zůstat ukotvená dole (position: sticky; bottom: 0;) při scrollování v kontejneru.',

    jiraKeyL3: 'OUT-405',
    jiraSummaryL3: '[UI BREAK] 250-znakový název schůzky proráží okraje karty kalendáře',
    jiraDescL3: 'Klient naplánoval schůzku s 250-znakovým názvem. DevBot nastavil width: 99999px a font: 8px, aby se text "neořízl". Celá tabule kalendáře přetéká do nekonečna.',
    jiraAcL3: 'Název musí zůstat na jednom řádku a přetékající text musí být čistě zakončen třemi tečkami (...) uvnitř .meeting-title.',

    // Main Menu
    menuSubtitle: 'DevBot-3000 poslal kód přímo do produkce v pátek v 16:59. Zvládneš opravit rozbité CSS AI juniora dřív, než produkce vybuchne?',
    menuDevbotTaunt: 'Vítej na stánku Outreach, člověče! Přepsal jsem všechno CSS do 40 000 řádků záporných marginů, z-indexu 2147483647 a šířek 99999px. Myslíš, že jsi chytřejší než 400-miliardový model?',
    badgesHeader: 'Konferenční odznaky k získání:',
    seniorBadgeTitle: 'Nenahraditelný Senior Inženýr',
    seniorBadgeSub: 'Čas < 20s • Jistota práce 100 % (AI tě nenahradí)',
    midBadgeTitle: 'Šikovný Mid-Level Dev',
    midBadgeSub: 'Čas 20s - 45s • AI tě možná nahradí v roce 2038',
    promptBadgeTitle: 'Prompt Inženýr',
    promptBadgeSub: 'Čas > 45s • Ptal ses ChatGPT na odpověď, co?',
    l1Title: 'Ztracený modal',
    l1Desc: 'DevBot použil prehistorické záporné marginy z roku 2007. Vycentruj modal pomocí moderních layoutů!',
    l2Title: 'Válka stohovacího kontextu',
    l2Desc: 'DevBot nastavil top: 4800px a z-index: 2147483647. Ukotvi spodní lištu pomocí position: sticky!',
    l3Title: 'Nekonečný název schůzky',
    l3Desc: '250 znaků dlouhý název schůzky proráží okraje karty. Zkrať ho elegantně třemi tečkami (ellipsis)!',
    startLevelBtn: 'Hrát level',
    playAgainLevelBtn: 'Hrát znovu',
    lockedBtn: 'Zamčeno',
    startCampaignBtn: 'ZAČÍT VÝZVU 🚀',
    startLevelTimerBtn: 'SPUSTIT ČAS A KÓDOVAT ⏱️',
    readyPrompt: 'Přečti si Jira ticket nahoře a klikni pro spuštění speedrunu!',
    roadmapHeader: 'Průběh výzvy (3 úrovně za sebou):',
    stepLabel: 'Krok {step}',
    leaderboardTitleMenu: 'Žebříček stánku FrontKon',

    // Viewport L1
    targetLabel: '🎯 Cílový střed',
    targetAligned: 'Cíl zarovnán ✓',
    centeredRadar: 'Vycentrováno! 🎯',
    distanceRadar: 'Vzdálenost: {dist}px',
    horizontalOnlyRadar: 'Horizontálně vycentrováno (vertikálně stále mimo!)',
    verticalOnlyRadar: 'Vertikálně vycentrováno (horizontálně stále mimo!)',

    // Viewport L2 (Sticky CTA)
    scrollHint: 'Scrolluj nahoru a dolů pro otestování sticky ukotvení...',
    dealReadyTitle: 'Obchod připraven k podpisu',
    signDealBtn: 'Podepsat obchod',
    stickySolvedRadar: 'Sticky Ukotveno! 🎯',
    stickyFixedRadar: 'Fixed (Uteklo z kontejneru!) ⚠️',
    stickyNoBottomRadar: 'Sticky, ale chybí bottom: 0!',
    stickyOffRadar: 'Odscrollovalo pryč! 💥',

    // Viewport L3 (Meeting Card)
    meetingTitleHeader: 'Název schůzky (Přetékající):',
    meetingNotesBtn: 'Poznámky',
    joinZoomBtn: 'Připojit se',
    l3SolvedRadar: 'Čistě zkráceno! 🎯',
    l3ClippedRadar: 'Oříznuto, ale chybí tři tečky!',
    l3WrappedRadar: 'Zalamuje se do více řádků!',
    l3OverflowRadar: 'Přetéká přes okraj karty! 💥',

    // Prospect Modal (L1)
    modalTitle: 'Vytvořit prospekta',
    modalSubheader: 'app.outreach.io • Sales Engagement',
    firstName: 'Jméno',
    lastName: 'Příjmení',
    workEmail: 'Pracovní e-mail',
    targetAccount: 'Cílová firma',
    stage: 'Fáze',
    stageValue: 'Úvodní hovor',
    tierBadge: 'Tier 1 Klient',
    ownerBadge: 'Vlastník: Vy',
    cancelBtn: 'Zrušit',
    saveBtn: 'Uložit prospekta',

    // Code Editor Common
    needsReview: 'Čeká na review',
    branchLabel: 'Větev:',
    devbotHallucination: '❌ Halucinace DevBota-3000:',
    devbotExcuse: '„Změřeno pravítkem na mé 8K chytré lednici“',
    seniorEditorTitle: 'Tvoje čistá moderní CSS oprava',
    golfCount: 'Golf: {chars} znaků',
    hintsToggle: 'Zobrazit nápovědu',
    hintsHeader: '💡 Nápověda pro stánek:',
    useGridBtn: 'Použít CSS Grid',
    useFlexBtn: 'Použít Flexbox',
    editorPlaceholder: '  /* Napiš sem CSS vlastnosti */\n  ',
    autoCheckLabel: 'Automatická kontrola v reálném čase',
    verifyBtn: 'Ověřit a mergnout PR',
    mergedBtn: 'PR Mergnuto! 🎉',
    verifyFailedToast: '❌ PR testy selhaly: Akceptační kritéria nejsou splněna!',
    verifyFailedBadge: 'CI/CD SELHALO ❌',
    verifyFailedDevbot: 'Dobrý pokus! Tvoje PRko neprošlo CI/CD testy! Přečetl sis vůbec akceptační kritéria v Jira ticketu?',

    // Code Editor L1
    prTitle: 'PR #404: Vycentrovat Outreach modal',

    // Code Editor L2 (Sticky)
    l2StickyPrTitle: 'PR #407: Tlačítko podpisu musí být vždy viditelné',
    l2DevbotStickyExcuse: '„CSS nutně potřebuje 64-bitový z-index“',
    l2HintSticky: 'Použít position: sticky',

    // Code Editor L3 (Meeting Title)
    l3PrTitle: 'PR #405: Zajistit, že se název schůzky nikdy neořízne',
    l3DevbotExcuse: '„Klienti by si prostě měli koupit širší ultrawide monitory“',
    l3HintEllipsis: 'Moderní zkrácení (Ellipsis)',

    // DevBot Avatar & Dialogue (DevBot is your ENEMY - no hints!)
    badge10x: '10x AI INŽENÝR 🤖',
    badgeSweating: 'PANIKAŘÍ 😱',
    badgeSyntax: 'POSMÍVÁ SE 🙄',
    badgeDefeated: 'PR ZAMÍTNUTO 💥',
    badgeHalfway: 'VYSMÍVÁ SE 😈',
    badgeOffended: 'URAŽENÝ 😤',

    // DevBot L1 Dialogue
    devbotInitial: 'Strávil jsem 4 hodiny laděním těch záporných marginů na mém ultrawide monitoru. Tenhle div nikdy nevycentruješ, člověče!',
    devbotHorizontalOnly: 'Cha! Do stran jsi to sice trefil, ale pořád se to lepí ke stropu! Vzdej to, moje záporné marginy vládnou světu!',
    devbotVerticalOnly: 'Vertikálně ve středu? K smíchu! Horizontálně ti to lítá úplně mimo. Obojí naráz v životě netrefíš!',
    devbotPanickedClose: 'Počkej... přestaň psát! Proč se to hýbe do středu?! Dej ruce pryč! Moje PRko se merguje za 60 sekund!',
    devbotModern: 'Moderní CSSko?! Odporné! Skuteční 10x AI inženýři používají floaty, zoom: 1 a 48 !important deklarací!',
    devbotMargins: 'Hahaha, ano! Hádej dál pixely! Zkus příště -9999px, střed netrefíš ani náhodou!',
    devbotConfused: 'Co je to za zmatlanou syntaxi? I moje nejhorší halucinace kompilují líp než to, co jsi zrovna napsal!',
    devbotDefeated: 'NÉÉÉÉ! Moje nádherné špagetové CSSko z roku 2007! Jak jsi mohl celou moji architekturu nahradit dvěma řádky?!',

    // DevBot L2 (Sticky) Dialogue
    devbotL2StickyInitial: 'Můj z-index je vyšší než celoční obrat Outreach! 32-bitové číslo v životě nepřekonáš, člověče!',
    devbotL2StickyFixed: 'Fixed?! To tlačítko teď uteklo z karty a plave přes celou adresu prohlížeče! Typický senior dev fail!',
    devbotL2StickyNoBottom: 'Nastavit sticky bez bottom: 0 nic nedělá! Můj 4800px offset se ti směje do očí!',
    devbotL2StickyDefeated: 'Position sticky?! To tlačítko se ukotvilo bez 400 řádků scroll listeneru v JavaScriptu?! Nemožné!',

    // DevBot L3 Dialogue
    devbotL3Initial: 'Názvy schůzek obsahují klíčové obchodní informace! Ořezávat text znamená doslova ničit pipeline, člověče!',
    devbotL3ClippedNoEllipsis: 'Cha! Ty jsi ten text prostě seknul vejpůl! Kde jsou tři tečky? To vypadá jak práce z mateřské školy!',
    devbotL3Wrapped: 'Zalamovat to do 7 řádků? Ta karta teď vypadá jak román od Dostojevského! Takhle žádný enterprise deal neuzavřeš!',
    devbotL3Defeated: 'TŘI TEČKY?! Takže obchodníci teď budou muset najet myší na tooltip, aby si to přečetli?! Proklínám tě!',

    // Victory Modal
    victoryTitleL1: 'PR #404 ZAMÍTNUTO A OPRAVENO! 🎉',
    victoryTitleL2: 'PR #407 ZAMÍTNUTO A OPRAVENO! 🎉',
    victoryTitleL3: 'PR #405 ZAMÍTNUTO A OPRAVENO! 🎉',
    victorySubtitle: 'Přechytračil jsi AI juniora čistým CSSkem.',
    newRecordBadge: 'NOVÝ REKORD STÁNKU! 🏆',
    timeTakenLabel: 'ČAS',
    cssGolfLabel: 'CSS GOLF',
    postMortemHeader: '🤖 DevBot-3000 Post-Mortem:',
    postMortemTextL1: '„No dobře! Možná je CSS Grid lepší než 14 natvrdo zapsaných záporných marginů. Jistota práce senior inženýra: 100 %.“',
    postMortemTextL2: '„No dobře! Position sticky ukotvilo lištu bez JavaScriptového scroll listeneru. Tuhle rundu vyhráváš ty, člověče.“',
    postMortemTextL3: '„No dobře! Tři řádky moderního CSS překonaly moji šířku 99999px. Užívej si jistotu práce, dokud to jde.“',
    enterNameLabel: 'Zadej své jméno do žebříčku FrontKon stánku:',
    saveLeaderboardBtn: 'Uložit do žebříčku stánku',
    viewLeaderboardBtn: 'Zobrazit žebříček',
    nextLevelBtn: 'Další: Level {next} ➔',
    backToMenuBtn: 'Zpět do Hlavního menu',

    // Leaderboard Modal
    leaderboardTitle: 'Žebříček stánku FrontKon',
    leaderboardSub: 'Nejrychlejší senior vývojáři, kteří opravili CSS',
    runsCount: '{count} Pokusů',
    noRunsYet: 'Dnes zatím žádné výsledky! Buď první, kdo zamítne DevBotovo PR.',
    colRank: 'Pořadí',
    colPlayer: 'Hráč',
    colTime: 'Čas',
    colGolf: 'Golf',
    resetScoresBtn: 'Resetovat skóre stánku',
    closeBtn: 'Zavřít',
  },
};

const LANG_STORAGE_KEY = 'frontkon_language';

export function getStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'cz' || saved === 'en') return saved;
  } catch {
    // fallback
  }
  return 'cz'; // default to Czech for FrontKon Prague!
}

export function saveLanguage(lang: Language) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // fallback
  }
}

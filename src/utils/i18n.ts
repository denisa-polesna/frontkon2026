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

    // Player Name Registration Modal
    nameModalTitle: 'FrontKon Player Registration',
    nameModalSubtitle: 'Enter your name or handle. DevBot-3000 will challenge and roast you by name!',
    nameInputLabel: 'Your Name or Handle',
    nameInputPlaceholder: 'e.g. Sarah the CSS Guru',
    nameRequiredError: 'Please enter your name',
    nameTakenError: 'This name is already taken on the leaderboard. Please choose another one.',
    nameCheckingText: 'Checking availability...',
    nameSubmitBtn: "LET'S GO",

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

    jiraKeyL2: 'OUT-408',
    jiraSummaryL2: '[UI BUG] Filter dropdown menu is obscured behind sticky header',
    jiraDescL2: 'DevBot set position: sticky with z-index: 100 on the header. When users open the stage filter dropdown, the menu is partially hidden behind the header.',
    jiraAcL2: 'Dropdown menu must appear cleanly above the header without being obscured.',

    jiraKeyL3: 'OUT-405',
    jiraSummaryL3: '[UI BREAK] 250-character meeting title explodes through calendar card',
    jiraDescL3: 'Enterprise prospect scheduled a demo with a 250-char title. DevBot set width: 99999px and font-size: 8px so it "does not cut off". Entire calendar board is blown out horizontally.',
    jiraAcL3: 'Title must stay on a single line and truncate cleanly with an ellipsis (...) inside .meeting-title.',

    jiraKeyL4: 'OUT-407',
    jiraSummaryL4: '[PROD HOTFIX] "Sign Deal" button scrolls off-screen; $450k ARR deal blocked',
    jiraDescL4: 'DevBot tried to fix button visibility by giving it z-index: 2147483647 at top: 4800px. When sales reps scroll the deal activity timeline, the button vanishes into the void.',
    jiraAcL4: 'Action bar must stay docked to the bottom (position: sticky; bottom: 0;) while scrolling the timeline container.',

    // Main Menu
    menuSubtitle: 'DevBot-3000 pushed directly to production at 4:59 PM on Friday. Can you fix the AI Junior’s broken CSS before prod explodes?',
    menuDevbotTaunt: 'Welcome to the Outreach booth! I wrote 40,000 lines of negative margins, 2147483647 z-indices, and 99999px widths. Think you are smarter than a 400B parameter neural net?',
    badgesHeader: 'Conference Badges to Earn:',
    seniorBadgeTitle: 'Unreplaceable Senior Engineer',
    seniorBadgeSub: 'Solve < 20s • Job security 100% (AI-proof)',
    midBadgeTitle: 'Solid Mid-Level Dev',
    midBadgeSub: 'Solve 20s - 45s • AI might take your job in 2038',
    promptBadgeTitle: 'Prompt Engineer',
    promptBadgeSub: 'Solve > 45s • Did you ask ChatGPT?',
    l1Title: 'The Misplaced Modal',
    l1Desc: 'DevBot used 2007-era negative margins to position the Create Prospect modal. Center it cleanly with modern layout rules!',
    l2Title: 'Dropdown Hidden Behind Header',
    l2Desc: 'DevBot gave the header z-index: 100. Adjust the z-index so the dropdown menu stays on top!',
    l3Title: 'The Infinite Meeting Title',
    l3Desc: 'A 250-character calendar title explodes through card borders. Truncate it cleanly with an ellipsis!',
    l4Title: 'The Stacking Context War',
    l4Desc: 'DevBot set top: 4800px and z-index: 2147483647. Dock the action bar cleanly to the bottom of the scroll view with sticky positioning!',
    startLevelBtn: 'Play Level',
    playAgainLevelBtn: 'Replay Level',
    lockedBtn: 'Locked',
    startCampaignBtn: 'START CHALLENGE',
    startLevelTimerBtn: 'START TIMER & CODE',
    readyPrompt: 'Read the Jira ticket above, then click start to begin the speedrun!',
    taskOverlayTitleL1: 'Task 1: Center Modal in Viewport',
    taskOverlayDescL1: 'Center the prospect modal dialog horizontally and vertically on the screen. Replace DevBot’s broken negative margins with clean modern CSS (Flexbox or Grid).',
    taskOverlayTitleL2: 'Task 2: Dropdown Hidden Behind Header',
    taskOverlayDescL2: 'Fix the sticky header’s z-index so it does not obscure the open dropdown menu below it.',
    taskOverlayTitleL3: 'Task 3: Truncate Text Overflow',
    taskOverlayDescL3: 'Keep the 250-character meeting title on a single line and cleanly truncate it with an ellipsis (...) so it doesn’t break the calendar card.',
    taskOverlayTitleL4: 'Task 4: Dock Sticky Action Bar',
    taskOverlayDescL4: 'Dock the action bar to the bottom of the container so it stays pinned at the bottom while scrolling (position: sticky; bottom: 0;).',
    editorTaskCommentL1: '/* Task: Center modal dialog horizontally and vertically */',
    editorTaskCommentL2: '/* Task: Fix z-index so dropdown is not hidden behind header */',
    editorTaskCommentL3: '/* Task: Truncate text to 1 line with ellipsis */',
    editorTaskCommentL4: '/* Task: Dock action bar to bottom while scrolling (position: sticky; bottom: 0;) */',
    roadmapHeader: 'Challenge Roadmap (3 Levels in Sequence):',
    stepLabel: 'Step {step}',
    leaderboardTitleMenu: 'FrontKon Booth Leaderboard',

    // Viewport Common
    codeOutputHeader: 'Code output',
    targetGoalHeader: 'Recreate this target',
    mobileTabEditor: 'Editor',
    mobileTabOutput: 'Code output',
    mobileTabTarget: 'Target',

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
    stickyNoBottomRadar: 'Not docked to bottom! ⚠️',
    stickyOffRadar: 'Scrolled out of view! 💥',

    // Viewport L3 (Meeting Card)
    meetingTitleHeader: 'Meeting Title (Exploding):',
    meetingNotesBtn: 'Brief',
    joinZoomBtn: 'Join Call',
    l3SolvedRadar: 'Cleanly Truncated! 🎯',
    l3ClippedRadar: 'Abruptly chopped off! ⚠️',
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
    verifyBtn: 'Submit',
    mergedBtn: 'PR Merged! 🎉',
    verifyFailedToast: '❌ PR Checks Failed: Acceptance Criteria not met!',
    failedModalTitle: 'Task Incomplete',
    failedModalSubtitle: 'Your CSS changes did not meet the requirements yet. Review your code and try again!',
    failedModalBtn: 'Back to Code',
    verifyFailedBadge: 'CI/CD FAILED ❌',
    verifyFailedDevbot: 'Nice try, {name}! Your solution failed tests! Did you even read the task requirements?',

    // Code Editor L1
    taskCommentL1: '/* Task: Center the modal in the viewport */',
    prTitle: 'PR #404: Center the Outreach modal',

    // Code Editor L2 (Sticky)
    taskCommentL2: '/* Task: Dock the action bar to the bottom (sticky) */',
    l2StickyPrTitle: 'PR #407: Make CTA button always visible',
    l2DevbotStickyExcuse: '“CSS needs 64-bit z-index support”',
    l2HintSticky: 'Use position: sticky',

    // Code Editor L3 (Meeting Title)
    taskCommentL3: '/* Task: Truncate text with ellipsis so it does not overflow */',
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
    devbotInitial: 'I spent 4 hours calculating those negative margins on my ultrawide screen. You will NEVER center this div, {name}!',
    devbotHorizontalOnly: "Ha, {name}! You centered it sideways, but it's still glued to the ceiling! Give up, my negative margins rule supreme!",
    devbotVerticalOnly: "Vertically centered? Laughable, {name}! It's completely off-screen horizontally. You'll never get both right!",
    devbotPanickedClose: "Wait, {name}... stop typing! Why is it moving closer to the center?! Back off! My PR is merging in 60 seconds!",
    devbotModern: 'Modern CSS?! Disgusting, {name}! Real 10x AI engineers use floats, zoom: 1, and 48 !important declarations!',
    devbotMargins: 'Hahaha, yes! Keep guessing pixel values, {name}! Try -9999px next, you will never hit the center!',
    devbotConfused: 'What is that garbage syntax, {name}? Even my worst hallucinations compile better than whatever you just typed!',
    devbotDefeated: 'NOOOOO, {name}! My beautiful 2007 spaghetti CSS! How did you replace my entire architecture in 2 lines?!',

    // DevBot L2 (Dropdown) Dialogue
    devbotL2DropdownInitial: 'Header must always be on top, {name}! That is why I gave it z-index: 100. Who cares about some silly dropdowns?!',
    devbotL2DropdownFixed: 'Oh, you lowered the z-index, {name}? Good luck keeping your header above the content!',
    devbotL2DropdownDefeated: 'NOOO! You put the header below the dropdown menu?! My stacking context fortress is ruined, {name}!',

    // DevBot L3 Dialogue
    devbotL3Initial: 'Titles contain critical revenue intelligence, {name}! Cutting off text is literally destroying pipeline value!',
    devbotL3ClippedNoEllipsis: 'Ha, {name}! You just chopped the words in half like an axe! That looks hideous and broken! Total amateur hour!',
    devbotL3Wrapped: 'Wrapping into 7 lines, {name}? Now the calendar card looks like a novel! Good luck getting enterprise deals closed with that!',
    devbotL3Defeated: 'AN ELLIPSIS, {name}?! Now our sales reps will actually have to HOVER on the tooltip to read the full title?! Currrrse you!',

    // DevBot L4 (Sticky) Dialogue
    devbotL4StickyInitial: 'My z-index is higher than Outreach’s ARR! You cannot defeat a 32-bit integer, {name}!',
    devbotL4StickyFixed: 'Fixed?! Now the button is escaping the card entirely, {name}! Classic senior dev fail!',
    devbotL4StickyNoBottom: 'You typed one property and expected a miracle, {name}?! The button is still lost in the abyss! My 4800px offset reigns supreme!',
    devbotL4StickyDefeated: 'Position sticky?! The button actually docks to the viewport without a 400-line scroll listener in JavaScript, {name}?! Inconceivable!',

    // Victory Modal
    victoryTitleL1: 'PR #404 REJECTED & FIXED! 🎉',
    victoryTitleL2: 'PR #408 REJECTED & FIXED! 🎉',
    victoryTitleL3: 'PR #405 REJECTED & FIXED! 🎉',
    victoryTitleL4: 'PR #407 REJECTED & FIXED! 🎉',
    victorySubtitle: 'You outsmarted the AI Junior.',
    newRecordBadge: 'NEW BOOTH RECORD! 🏆',
    timeTakenLabel: 'TIME TAKEN',
    cssGolfLabel: 'CSS GOLF',
    savedAutoBadge: 'Auto-saved to Leaderboard as "{name}" ✓',
    postMortemHeader: '🤖 DevBot-3000 Post-Mortem:',
    postMortemTextL1: '“Fine, {name}! Maybe modern CSS IS better than 14 hardcoded negative margins.”',
    postMortemTextL1Grid: '“Fine, {name}! Maybe CSS Grid IS better than 14 hardcoded negative margins.”',
    postMortemTextL1Flex: '“Fine, {name}! Maybe Flexbox IS better than 14 hardcoded negative margins.”',
    postMortemTextL2: '“Fine, {name}! You lowered the header z-index below the dropdown. I admit z-index: 100 was total overkill.”',
    postMortemTextL3: '“Fine! Three little CSS properties beat my 99999px width. Enjoy your job security for now, {name}.”',
    postMortemTextL4: '“Fine! Position sticky docked the bar without a JavaScript scroll listener. You win this round, {name}.”',
    nextLevelBtn: 'Next Task',
    finishCampaignBtn: 'View Leaderboard',

    // Leaderboard Modal
    leaderboardTitle: 'Leaderboard',
    leaderboardSub: 'Top Senior Devs who fixed the AI’s CSS fastest',
    runsCount: '{count} Runs',
    noRunsYet: 'No solves recorded yet today!',
    colRank: 'Rank',
    colPlayer: 'Player',
    colRating: 'Rating',
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

    // Player Name Registration Modal
    nameModalTitle: 'Registrace hráče FrontKon',
    nameModalSubtitle: 'Zadej své jméno nebo přezdívku do žebříčku. DevBot-3000 tě vyzve a bude tě oslovovat přímo tvým jménem!',
    nameInputLabel: 'Tvé jméno nebo přezdívka',
    nameInputPlaceholder: 'např. Sarah CSS Guru',
    nameRequiredError: 'Zadej prosím své jméno',
    nameTakenError: 'Toto jméno už někdo použil v žebříčku. Zvol si prosím jiné.',
    nameCheckingText: 'Ověřuji dostupnost...',
    nameSubmitBtn: 'JDEME NA TO',

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

    jiraKeyL2: 'OUT-408',
    jiraSummaryL2: '[UI BUG] Rozbalovací menu filtru se schovává za sticky header',
    jiraDescL2: 'DevBot nastavil na header position: sticky a z-index: 100. Když uživatel otevře rozbalovací nabídku fází, menu se schová za header.',
    jiraAcL2: 'Rozbalovací menu (dropdown) musí být celé viditelné a nesmí být překryté headerem.',

    jiraKeyL3: 'OUT-405',
    jiraSummaryL3: '[UI BREAK] 250-znakový název schůzky proráží okraje karty kalendáře',
    jiraDescL3: 'Klient naplánoval schůzku s 250-znakovým názvem. DevBot nastavil width: 99999px a font: 8px, aby se text "neořízl". Celá tabule kalendáře přetéká do nekonečna.',
    jiraAcL3: 'Název musí zůstat na jednom řádku a přetékající text musí být čistě zakončen třemi tečkami (...) uvnitř .meeting-title.',

    jiraKeyL4: 'OUT-407',
    jiraSummaryL4: '[PROD HOTFIX] Tlačítko podpisu odscrollovává pryč; blokován deal za $450k ARR',
    jiraDescL4: 'DevBot se pokusil zajistit viditelnost tlačítka nastavením z-indexu 2147483647 na top: 4800px. Když obchodníci scrollují časovou osou, tlačítko zmizí v propadlišti dějin.',
    jiraAcL4: 'Spodní lišta musí zůstat ukotvená dole (position: sticky; bottom: 0;) při scrollování v kontejneru.',

    // Main Menu
    menuSubtitle: 'DevBot-3000 poslal kód přímo do produkce v pátek v 16:59. Zvládneš opravit rozbité CSS AI juniora dřív, než produkce vybuchne?',
    menuDevbotTaunt: 'Vítej na stánku Outreach! Přepsal jsem všechno CSS do 40 000 řádků záporných marginů, z-indexu 2147483647 a šířek 99999px. Myslíš, že jsi chytřejší než 400-miliardový model?',
    badgesHeader: 'Konferenční odznaky k získání:',
    seniorBadgeTitle: 'Nenahraditelný Senior Inženýr',
    seniorBadgeSub: 'Čas < 20s • Jistota práce 100 % (AI tě nenahradí)',
    midBadgeTitle: 'Šikovný Mid-Level Dev',
    midBadgeSub: 'Čas 20s - 45s • AI tě možná nahradí v roce 2038',
    promptBadgeTitle: 'Prompt Inženýr',
    promptBadgeSub: 'Čas > 45s • Ptal ses ChatGPT na odpověď, co?',
    l1Title: 'Ztracený modal',
    l1Desc: 'DevBot použil prehistorické záporné marginy z roku 2007. Vycentruj modal pomocí moderních layoutů!',
    l2Title: 'Dropdown se schovává za header',
    l2Desc: 'DevBot nastavil na header z-index: 100. Uprav z-index tak, aby byl dropdown nad ním!',
    l3Title: 'Nekonečný název schůzky',
    l3Desc: '250 znaků dlouhý název schůzky proráží okraje karty. Zkrať ho elegantně třemi tečkami (ellipsis)!',
    l4Title: 'Válka stohovacího kontextu',
    l4Desc: 'DevBot nastavil top: 4800px a z-index: 2147483647. Ukotvi spodní lištu pomocí position: sticky!',
    startLevelBtn: 'Hrát level',
    playAgainLevelBtn: 'Hrát znovu',
    lockedBtn: 'Zamčeno',
    startCampaignBtn: 'ZAČÍT VÝZVU',
    startLevelTimerBtn: 'SPUSTIT ČAS A KÓDOVAT',
    readyPrompt: 'Přečti si Jira ticket nahoře a klikni pro spuštění speedrunu!',
    taskOverlayTitleL1: 'Úkol 1: Vycentrovat modal na střed',
    taskOverlayDescL1: 'Vycentruj vyskakovací okno na přesný střed obrazovky (horizontálně i vertikálně). Nahraď DevBotovy rozbité záporné marginy moderním Flexboxem nebo Gridem.',
    taskOverlayTitleL2: 'Úkol 2: Dropdown se schovává za header',
    taskOverlayDescL2: 'Oprav z-index sticky headeru tak, aby nepřekrýval otevřené rozbalovací menu (dropdown) pod ním.',
    taskOverlayTitleL3: 'Úkol 3: Oříznout přetékající text',
    taskOverlayDescL3: 'Zkrať 250znakový název schůzky na jeden řádek a zakonči ho trojtečkou (...), aby neroztahoval kalendářní kartu (white-space, overflow, text-overflow).',
    taskOverlayTitleL4: 'Úkol 4: Ukotvit sticky lištu',
    taskOverlayDescL4: 'Ukotvi lištu s tlačítkem na spodní hranu kontejneru tak, aby zůstala přišpendlená na spodu i při skrolování (position: sticky; bottom: 0;).',
    editorTaskCommentL1: '/* Úkol: Vycentruj modal na střed obrazovky */',
    editorTaskCommentL2: '/* Úkol: Vyřeš z-index tak, aby dropdown nebyl schovaný za headerem */',
    editorTaskCommentL3: '/* Úkol: Zkrať text na 1 řádek a přidej trojtečku */',
    editorTaskCommentL4: '/* Úkol: Ukotvi lištu na spodní hranu při skrolování (position: sticky; bottom: 0;) */',
    roadmapHeader: 'Průběh výzvy (3 úrovně za sebou):',
    stepLabel: 'Krok {step}',
    leaderboardTitleMenu: 'Žebříček stánku FrontKon',

    // Viewport Common
    codeOutputHeader: 'Výstup kódu',
    targetGoalHeader: 'Cílový stav',
    mobileTabEditor: 'Editor',
    mobileTabOutput: 'Výstup kódu',
    mobileTabTarget: 'Cílový stav',

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
    stickyNoBottomRadar: 'Není ukotveno dole! ⚠️',
    stickyOffRadar: 'Odscrollovalo pryč! 💥',

    // Viewport L3 (Meeting Card)
    meetingTitleHeader: 'Název schůzky (Přetékající):',
    meetingNotesBtn: 'Poznámky',
    joinZoomBtn: 'Připojit se',
    l3SolvedRadar: 'Čistě zkráceno! 🎯',
    l3ClippedRadar: 'Hrubě useknuto! ⚠️',
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
    verifyBtn: 'Odeslat',
    mergedBtn: 'PR Mergnuto! 🎉',
    verifyFailedToast: '❌ PR testy selhaly: Akceptační kritéria nejsou splněna!',
    failedModalTitle: 'Úkol nesplněn',
    failedModalSubtitle: 'Tvé CSS změny ještě nesplňují zadání úkolu. Zkontroluj kód a zkus to znovu!',
    failedModalBtn: 'Zpět ke kódu',
    verifyFailedBadge: 'CI/CD SELHALO ❌',
    verifyFailedDevbot: 'Dobrý pokus, {name}! Tvoje řešení neprošlo testy! Přečetl sis vůbec zadání úkolu?',

    // Code Editor L1
    taskCommentL1: '/* Úkol: Vycentruj modal na střed obrazovky */',
    prTitle: 'PR #404: Vycentrovat Outreach modal',

    // Code Editor L2 (Sticky)
    taskCommentL2: '/* Úkol: Ukotvi akční lištu na spodek okna (sticky) */',
    l2StickyPrTitle: 'PR #407: Tlačítko podpisu musí být vždy viditelné',
    l2DevbotStickyExcuse: '„CSS nutně potřebuje 64-bitový z-index“',
    l2HintSticky: 'Použít position: sticky',

    // Code Editor L3 (Meeting Title)
    taskCommentL3: '/* Úkol: Zkrať text tečkami, aby nepřetékal (ellipsis) */',
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
    devbotInitial: 'Strávil jsem 4 hodiny laděním těch záporných marginů na mém ultrawide monitoru, {name}! Tenhle div nikdy nevycentruješ!',
    devbotHorizontalOnly: 'Cha, {name}! Do stran jsi to sice trefil, ale pořád se to lepí ke stropu! Vzdej to, moje záporné marginy vládnou světu!',
    devbotVerticalOnly: 'Vertikálně ve středu? K smíchu, {name}! Horizontálně ti to lítá úplně mimo. Obojí naráz v životě netrefíš!',
    devbotPanickedClose: 'Počkej, {name}... přestaň psát! Proč se to hýbe do středu?! Dej ruce pryč! Moje PRko se merguje za 60 sekund!',
    devbotModern: 'Moderní CSSko?! Odporné, {name}! Skuteční 10x AI inženýři používají floaty, zoom: 1 a 48 !important deklarací!',
    devbotMargins: 'Hahaha, ano! Hádej dál pixely, {name}! Zkus příště -9999px, střed netrefíš ani náhodou!',
    devbotConfused: 'Co je to za zmatlanou syntaxi, {name}? I moje nejhorší halucinace kompilují líp než to, co jsi zrovna napsal!',
    devbotDefeated: 'NÉÉÉÉ, {name}! Moje nádherné špagetové CSSko z roku 2007! Jak jsi mohl celou moji architekturu nahradit dvěma řádky?!',

    // DevBot L2 (Dropdown) Dialogue
    devbotL2DropdownInitial: 'Header musí být vždycky nahoře, {name}! Proto jsem mu dal z-index: 100. Koho zajímají nějaké dropdowny?!',
    devbotL2DropdownFixed: 'Aha, ty jsi snížil z-index, {name}? Hodně štěstí s udržením headeru nad obsahem!',
    devbotL2DropdownDefeated: 'NÉÉÉ! Ty jsi dal header pod rozbalovací menu?! Moje pevnost z-indexu je zničená, {name}!',

    // DevBot L3 Dialogue
    devbotL3Initial: 'Názvy schůzek obsahují klíčové informace, {name}! Ořezávat text znamená doslova ničit pipeline!',
    devbotL3ClippedNoEllipsis: 'Cha, {name}! Ty jsi ten text usekl napůl jak sekerou! To vypadá naprosto příšerně! Úplná amatérština!',
    devbotL3Wrapped: 'Zalamovat to do 7 řádků, {name}? Ta karta teď vypadá jak román od Dostojevského! Takhle žádný enterprise deal neuzavřeš!',
    devbotL3Defeated: 'TŘI TEČKY, {name}?! Takže obchodníci teď budou muset najet myší na tooltip, aby si to přečetli?! Proklínám tě!',

    // DevBot L4 (Sticky) Dialogue
    devbotL4StickyInitial: 'Můj z-index je vyšší než celoroční obrat Outreach! 32-bitové číslo v životě nepřekonáš, {name}!',
    devbotL4StickyFixed: 'Fixed?! To tlačítko teď uteklo z karty, {name}! Typický senior dev fail!',
    devbotL4StickyNoBottom: 'Napsal jsi jednu vlastnost a čekáš zázrak, {name}?! To tlačítko je pořád ztracené v propadlišti! Můj offset se ti směje do očí!',
    devbotL4StickyDefeated: 'Position sticky?! To tlačítko se ukotvilo bez 400 řádků scroll listeneru v JavaScriptu, {name}?! Nemožné!',

    // Victory Modal
    victoryTitleL1: 'PR #404 ZAMÍTNUTO A OPRAVENO! 🎉',
    victoryTitleL2: 'PR #408 ZAMÍTNUTO A OPRAVENO! 🎉',
    victoryTitleL3: 'PR #405 ZAMÍTNUTO A OPRAVENO! 🎉',
    victoryTitleL4: 'PR #407 ZAMÍTNUTO A OPRAVENO! 🎉',
    victorySubtitle: 'Přechytračil jsi AI juniora.',
    newRecordBadge: 'NOVÝ REKORD STÁNKU! 🏆',
    timeTakenLabel: 'ČAS',
    cssGolfLabel: 'CSS GOLF',
    savedAutoBadge: 'Automaticky uloženo do žebříčku jako „{name}“ ✓',
    postMortemHeader: '🤖 DevBot-3000 Post-Mortem:',
    postMortemTextL1: '„No dobře, {name}! Možná je moderní CSS lepší než 14 natvrdo zapsaných záporných marginů.“',
    postMortemTextL1Grid: '„No dobře, {name}! Možná je CSS Grid lepší než 14 natvrdo zapsaných záporných marginů.“',
    postMortemTextL1Flex: '„No dobře, {name}! Možná je Flexbox lepší než 14 natvrdo zapsaných záporných marginů.“',
    postMortemTextL2: '„No dobře, {name}! Nastavil jsi z-index headeru pod dropdown. Uznávám, z-index: 100 byl zbytečný overkill.“',
    postMortemTextL3: '„No dobře! Tři řádky moderního CSS překonaly moji šířku 99999px. Užívej si jistotu práce, dokud to jde, {name}.“',
    postMortemTextL4: '„No dobře! Position sticky ukotvilo lištu bez JavaScriptového scroll listeneru. Tuhle rundu vyhráváš ty, {name}.“',
    nextLevelBtn: 'Další úkol',
    finishCampaignBtn: 'Zobrazit žebříček',

    // Leaderboard Modal
    leaderboardTitle: 'Žebříček',
    leaderboardSub: 'Nejrychlejší senior vývojáři, kteří opravili CSS',
    runsCount: '{count} Pokusů',
    noRunsYet: 'Dnes zatím žádné výsledky!',
    colRank: 'Pořadí',
    colPlayer: 'Hráč',
    colRating: 'Hodnocení',
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

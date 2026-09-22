export type Language = 'en' | 'cz';

export const translations = {
  en: {
    // Header & Navigation
    appTitle: 'GIT BLAME: AI',
    editionBadge: 'FrontKon Edition',
    subtitleL1: 'Outreach Frontend Challenge • Level 1: Center the Modal',
    subtitleL2: 'Outreach Frontend Challenge • Level 2: The Stacking Context War',
    subtitleL3: 'Outreach Frontend Challenge • Level 3: Text Overflow',
    subtitleL4: 'Outreach Frontend Challenge • Level 4: Activity List',
    subtitleL5: 'Outreach Frontend Challenge • Level 5: Tooltip',
    menuBtn: 'Menu',
    l1Badge: 'Level 1: Dropdown',
    l2Badge: 'Level 2: Center Modal',
    l3Badge: 'Level 3: Text Overflow',
    l4Badge: 'Level 4: Activity List',
    l5Badge: 'Level 5: Tooltip',
    bestLabel: 'BEST:',
    leaderboardBtn: 'Leaderboard',
    resetTooltip: 'Reset Challenge',
    muteTooltip: 'Mute Sound',
    unmuteTooltip: 'Enable Sound',
    langTooltip: 'Přepnout do češtiny',

    // Player Name Registration Modal
    nameModalTitle: 'FrontKon Player Registration',
    nameModalSubtitle: 'Enter your name or handle. FailBot-404 will challenge and roast you by name!',
    nameInputLabel: 'Your Name or Handle',
    nameInputPlaceholder: 'e.g. Sarah the CSS Guru',
    nameRequiredError: 'Please enter your name',
    nameTakenError: 'This name is already taken on the leaderboard. Please choose another one.',
    nameCheckingText: 'Checking availability...',
    nameSubmitBtn: "Let's Go",

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
    jiraKeyL1: 'OUT-408',
    jiraSummaryL1: '[UI BUG] Filter dropdown menu is obscured behind sticky header',
    jiraDescL1: 'The header has position: sticky with z-index: 100. The dropdown menu has z-index: 1 and is partially hidden behind the header.',
    jiraAcL1: 'Dropdown menu must appear cleanly above the header.',

    jiraKeyL2: 'OUT-404',
    jiraSummaryL2: '[PROD HOTFIX] Create Prospect modal rendered outside viewport',
    jiraDescL2: 'VP of Sales reported the Create Prospect modal is positioned at top: 50%, left: 50% with -340px negative margins. It is partially invisible on all standard laptops. FailBot claims it looked fine on its 4K smart fridge.',
    jiraAcL2: 'Modal must be cleanly centered on both horizontal and vertical axes within .modal-viewport.',

    jiraKeyL3: 'OUT-405',
    jiraSummaryL3: '[UI BREAK] 250-character meeting title explodes through calendar card',
    jiraDescL3: 'Enterprise prospect scheduled a demo with a 250-char title. FailBot set width: 99999px and font-size: 8px so it "does not cut off". Entire calendar board is blown out horizontally.',
    jiraAcL3: 'Title must stay on a single line and truncate cleanly with an ellipsis (...) inside .meeting-title.',

    jiraKeyL4: 'OUT-409',
    jiraSummaryL4: '[UI BREAK] Activity feed items squished horizontally without spacing',
    jiraDescL4: 'FailBot set display: flex without column direction or gaps. All 4 activity cards are crammed onto a single overflowing row.',
    jiraAcL4: 'Activity items must be neatly stacked in column-reverse with 10px gaps inside .activity-list.',

    jiraKeyL5: 'OUT-410',
    jiraSummaryL5: '[UI BUG] AI tooltip escapes button and floats at top of card',
    jiraDescL5: 'AI tooltip escaped the button and floats across the card. Align the tooltip above the button, aligned to the right with an 8px gap.',
    jiraAcL5: 'Tooltip must be anchored above the button, aligned to the right with an 8px gap.',

    // Main Menu
    menuSubtitle: 'FailBot-404 pushed directly to production at 4:59 PM on Friday. Can you fix the AI Junior’s broken CSS before prod explodes?',
    menuDevbotTaunt: 'Welcome to the Outreach booth! I wrote 40,000 lines of negative margins, 2147483647 z-indices, and 99999px widths. Think you are smarter than a 400B parameter neural net?',
    badgesHeader: 'Conference Badges to Earn:',
    seniorBadgeTitle: 'Unreplaceable Senior Engineer',
    seniorBadgeSub: 'Solve < 20s • Job security 100% (AI-proof)',
    midBadgeTitle: 'Solid Mid-Level Dev',
    midBadgeSub: 'Solve 20s - 45s • AI might take your job in 2038',
    promptBadgeTitle: 'Prompt Engineer',
    promptBadgeSub: 'Solve > 45s • Did you ask ChatGPT?',
    l1Title: 'Dropdown Hidden Behind Header',
    l1Desc: 'The sticky header has z-index: 100. Position the dropdown menu so that it appears above the header!',
    l2Title: 'The Misplaced Modal',
    l2Desc: 'FailBot used 2007-era negative margins to position the Create Prospect modal. Center it cleanly with modern layout rules!',
    l3Title: 'The Infinite Meeting Title',
    l3Desc: 'A 250-character calendar title explodes through card borders. Truncate it cleanly with an ellipsis!',
    l4Title: 'The Broken Activity List',
    l4Desc: 'Arrange the activity items into column-reverse with 10px gaps!',
    l5Title: 'The Escaped Tooltip',
    l5Desc: 'Align the tooltip above the button, aligned to the right with an 8px gap!',
    startLevelBtn: 'Play Level',
    playAgainLevelBtn: 'Replay Level',
    lockedBtn: 'Locked',
    startCampaignBtn: 'Start Challenge',
    startLevelTimerBtn: 'Start Timer & Code',
    readyPrompt: 'Read the Jira ticket above, then click start to begin the speedrun!',
    taskOverlayTitleL1: 'Task 1: Dropdown Hidden Behind Header',
    taskOverlayDescL1: 'The sticky header has z-index: 100. Adjust the dropdown menu so that it displays cleanly above the header.',
    taskOverlayTitleL2: 'Task 2: Center Modal in Viewport',
    taskOverlayDescL2: 'Center the prospect modal dialog horizontally and vertically on the screen.',
    taskOverlayTitleL3: 'Task 3: Truncate Text Overflow',
    taskOverlayDescL3: 'Keep the meeting title on a single line and cleanly truncate it with an ellipsis (...) so it doesn’t break the calendar card.',
    taskOverlayTitleL4: 'Task 4: Arrange Activity List',
    taskOverlayDescL4: 'Stack the activity cards into a column in reverse order with 10px gaps.',
    taskOverlayTitleL5: 'Task 5: Anchor Tooltip to Button',
    taskOverlayDescL5: 'Align the tooltip above the button, aligned to the right with an 8px gap.',
    editorTaskCommentL1: '/* Task: The sticky header has z-index: 100. Adjust the dropdown menu so that it displays cleanly above the header */',
    editorTaskCommentL2: '/* Task: Center the prospect modal dialog horizontally and vertically on the screen */',
    editorTaskCommentL3: '/* Task: Keep the meeting title on a single line and cleanly truncate it with an ellipsis (...) so it doesn’t break the calendar card */',
    editorTaskCommentL4: '/* Task: Stack the activity cards into a column in reverse order with 10px gaps */',
    editorTaskCommentL5: '/* Task: FailBot set position: relative on .tooltip instead of .button. Align the tooltip above the button */',
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
    meetingTitleHeader: 'Meeting Subject:',
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
    devbotHallucination: "❌ FailBot-404's Hallucination:",
    devbotExcuse: '“Measured on my 8K smart toaster”',
    seniorEditorTitle: 'Your Clean Modern CSS Fix',
    golfCount: 'Golf: {chars} chars',
    hintsToggle: 'Toggle Hints',
    hintsHeader: '💡 Hints for the Booth:',
    useGridBtn: 'Use CSS Grid',
    useFlexBtn: 'Use Flexbox',
    editorPlaceholder: '  /* Write clean CSS properties here */\n  ',
    autoCheckLabel: 'Auto-checks alignment in real-time',
    exitBtn: 'Exit',
    resetCodeBtn: 'Reset Code',
    helpBtn: 'Task Info',
    helpModalTitle: 'Task Instructions',
    helpModalResumeBtn: 'Back to Code',
    verifyBtn: 'Submit',
    mergedBtn: 'PR Merged! 🎉',
    verifyFailedToast: '❌ PR Checks Failed: Acceptance Criteria not met!',
    failedModalTitle: 'Task Incomplete',
    failedModalSubtitle: 'Your CSS changes did not meet the requirements yet. Review your code and try again!',
    failedModalTimerRunning: 'Your time is still running!',
    failedModalBtn: 'Back to Code',
    verifyFailedBadge: 'CI/CD FAILED ❌',
    verifyFailedDevbot: 'Nice try, {name}! Your solution failed tests! Did you even read the task requirements?',

    // Exit Confirmation Modal
    exitConfirmTitle: 'Do you really want to quit?',
    exitConfirmDevbot: '“Giving up already, {name}?! I expected more resistance from a Senior Developer! Clearly my negative margins and z-indices broke your spirit. AI 1 : Human 0!”',
    exitConfirmLeaderboardInfo: 'Only successfully completed rounds will be counted in the leaderboard.',
    exitConfirmNoRoundsInfo: 'You have not completed any rounds yet — your run will not appear on the leaderboard.',
    exitConfirmStayBtn: 'Stay & keep fighting',
    exitConfirmQuitBtn: 'Give up & exit',

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
    devbotL2DropdownFixed: 'A z-index of 100 or less won’t help you, {name}! My header has z-index: 100, so your menu is still hidden!',
    devbotL2DropdownDefeated: 'NOOO! You set z-index higher than 100?! My stacking context fortress is ruined, {name}!',

    // DevBot L3 Dialogue
    devbotL3Initial: 'Titles contain critical revenue intelligence, {name}! Cutting off text is literally destroying pipeline value!',
    devbotL3ClippedNoEllipsis: 'Ha, {name}! You just chopped the words in half like an axe! That looks hideous and broken! Total amateur hour!',
    devbotL3Wrapped: 'Wrapping into 7 lines, {name}? Now the calendar card looks like a novel! Good luck getting enterprise deals closed with that!',
    devbotL3Defeated: 'AN ELLIPSIS, {name}?! Now our sales reps will actually have to HOVER on the tooltip to read the full title?! Currrrse you!',

    // DevBot L4 (Activity List) Dialogue
    devbotL4ListInitial: 'A horizontal activity train saves vertical space, {name}! Who needs gaps between cards anyway?!',

    // DevBot L5 (Tooltip) Dialogue
    devbotL5TooltipInitial: 'My tooltip has position: relative! What else could it possibly need, {name}?!',
    devbotL5TooltipNoRelative: 'Without relative positioning on .button, my tooltip is exploring outer space, {name}!',
    devbotL5TooltipNoAbsolute: 'Where did the absolute position go, {name}?! Now the layout is completely shifted!',
    devbotL5TooltipDefeated: 'Position relative on .button AND absolute on the tooltip?! Inconceivable, {name}!',

    // Victory Modal
    victoryTitleL1: 'PR #408 REJECTED & FIXED! 🎉',
    victoryTitleL2: 'PR #404 REJECTED & FIXED! 🎉',
    victoryTitleL3: 'PR #405 REJECTED & FIXED! 🎉',
    victoryTitleL4: 'PR #409 REJECTED & FIXED! 🎉',
    victoryTitleL5: 'PR #410 REJECTED & FIXED! 🎉',
    victorySubtitle: 'You outsmarted FailBot-404.',
    newRecordBadge: 'NEW BOOTH RECORD! 🏆',
    timeTakenLabel: 'TIME TAKEN',
    cssGolfLabel: 'CSS GOLF',
    savedAutoBadge: 'Auto-saved to Leaderboard as "{name}" ✓',
    postMortemHeader: 'FailBot-404 Post-Mortem:',
    postMortemTextL1: '“Fine, {name}! You set the dropdown z-index higher than 100. My z-index fortress has fallen.”',
    postMortemTextL2: '“Fine, {name}! Maybe modern CSS IS better than 14 hardcoded negative margins.”',
    postMortemTextL2Grid: '“Fine, {name}! Maybe CSS Grid IS better than 14 hardcoded negative margins.”',
    postMortemTextL2Flex: '“Fine, {name}! Maybe Flexbox IS better than 14 hardcoded negative margins.”',
    postMortemTextL3: '“Fine! Three little CSS properties beat my 99999px width. Enjoy your job security for now, {name}.”',
    postMortemTextL4: '“Fine, {name}! A vertical column with gaps is obviously cleaner than my horizontal activity train.”',
    postMortemTextL5: '“Fine! Position relative on .button and absolute on the tooltip anchored it right where it belongs. You conquered all 5 challenges, {name}!”',
    nextLevelBtn: 'Next Task',
    finishCampaignBtn: 'View Leaderboard',
    campaignVictoryTitle: 'CHALLENGE COMPLETED! 🏆',
    campaignVictorySubtitle: 'Congratulations, {name}! AI won’t replace you anytime soon!',
    campaignVictoryFailBot: '“Damn it, {name}... You conquered all 5 of my devious CSS bugs! My neural network is having an existential meltdown. I concede defeat — human developers aren’t going anywhere anytime soon!”',
    campaignAiProofBadge: 'AI-Proof Senior Engineer 🛡️',
    campaignTotalTimeLabel: 'TOTAL TIME (5/5 ROUNDS)',
    campaignLevelTimeLabel: 'LEVEL 5 TIME',
    viewFinalLeaderboardBtn: 'View Final Leaderboard',

    // Leaderboard Modal
    leaderboardTitle: 'Leaderboard',
    leaderboardSub: 'Top Senior Devs who fixed the AI’s CSS fastest',
    runsCount: '{count} Runs',
    noRunsYet: 'No solves recorded yet today!',
    colRank: 'Rank',
    colPlayer: 'Player',
    colRating: 'Completed Rounds',
    colRounds: 'Completed Rounds',
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
    subtitleL4: 'Outreach Frontend Výzva • Level 4: Seznam aktivit',
    subtitleL5: 'Outreach Frontend Výzva • Level 5: Tooltip',
    menuBtn: 'Menu',
    l1Badge: 'Level 1: Dropdown',
    l2Badge: 'Level 2: Vycentrovat modal',
    l3Badge: 'Level 3: Přetečení textu',
    l4Badge: 'Level 4: Seznam aktivit',
    l5Badge: 'Level 5: Tooltip',
    bestLabel: 'REKORD:',
    leaderboardBtn: 'Žebříček',
    resetTooltip: 'Resetovat úkol',
    muteTooltip: 'Ztlumit zvuk',
    unmuteTooltip: 'Zapnout zvuk',
    langTooltip: 'Switch to English',

    // Player Name Registration Modal
    nameModalTitle: 'Registrace hráče FrontKon',
    nameModalSubtitle: 'Zadej své jméno nebo přezdívku do žebříčku. FailBot-404 tě vyzve a bude tě oslovovat přímo tvým jménem!',
    nameInputLabel: 'Tvé jméno nebo přezdívka',
    nameInputPlaceholder: 'např. Sarah CSS Guru',
    nameRequiredError: 'Zadej prosím své jméno',
    nameTakenError: 'Toto jméno už někdo použil v žebříčku. Zvol si prosím jiné.',
    nameCheckingText: 'Ověřuji dostupnost...',
    nameSubmitBtn: 'Jdeme na to',

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
    jiraKeyL1: 'OUT-408',
    jiraSummaryL1: '[UI BUG] Rozbalovací menu filtru se schovává za sticky header',
    jiraDescL1: 'Header má position: sticky se z-index: 100. Rozbalovací menu má z-index: 1 a je částečně schované za headerem.',
    jiraAcL1: 'Rozbalovací menu se musí zobrazovat čistě nad headerem.',

    jiraKeyL2: 'OUT-404',
    jiraSummaryL2: '[PROD HOTFIX] Create Prospect modal se vykresluje mimo obrazovku',
    jiraDescL2: 'VP Sales hlásí, že Create Prospect modal je odsunutý pomocí -340px záporných marginů mimo obrazovku. FailBot tvrdí, že na jeho 4K chytré lednici to vypadalo bez chyby.',
    jiraAcL2: 'Modal musí být čistě vycentrován na horizontální I vertikální ose uvnitř .modal-viewport.',

    jiraKeyL3: 'OUT-405',
    jiraSummaryL3: '[UI BREAK] 250-znakový název schůzky proráží okraje karty kalendáře',
    jiraDescL3: 'Klient naplánoval schůzku s 250-znakovým názvem. FailBot nastavil width: 99999px a font: 8px, aby se text "neořízl". Celá tabule kalendáře přetéká do nekonečna.',
    jiraAcL3: 'Název musí zůstat na jednom řádku a přetékající text musí být čistě zakončen třemi tečkami (...) uvnitř .meeting-title.',

    jiraKeyL4: 'OUT-409',
    jiraSummaryL4: '[UI BREAK] Seznam aktivit je nahuštěný vodorovně bez mezer',
    jiraDescL4: 'FailBot nastavil display: flex bez směru column a bez mezer. Všechny 4 karty aktivit jsou nahuštěné v jednom přetékajícím řádku.',
    jiraAcL4: 'Položky aktivit musí být seřazené do sloupce v obráceném pořadí s 10px mezerami uvnitř .activity-list.',

    jiraKeyL5: 'OUT-410',
    jiraSummaryL5: '[UI BUG] AI tooltip utíká z tlačítka a plave nahoře na kartě',
    jiraDescL5: 'AI tooltip utekl z tlačítka a plave nahoře na kartě. Zarovnej tooltip nad tlačítko zprava s 8px mezerou.',
    jiraAcL5: 'Zarovnej tooltip nad tlačítko zprava s 8px mezerou.',

    // Main Menu
    menuSubtitle: 'FailBot-404 poslal kód přímo do produkce v pátek v 16:59. Zvládneš opravit rozbité CSS AI juniora dřív, než produkce vybuchne?',
    menuDevbotTaunt: 'Vítej na stánku Outreach! Přepsal jsem všechno CSS do 40 000 řádků záporných marginů, z-indexu 2147483647 a šířek 99999px. Myslíš, že jsi chytřejší než 400-miliardový model?',
    badgesHeader: 'Konferenční odznaky k získání:',
    seniorBadgeTitle: 'Nenahraditelný Senior Inženýr',
    seniorBadgeSub: 'Čas < 20s • Jistota práce 100 % (AI tě nenahradí)',
    midBadgeTitle: 'Šikovný Mid-Level Dev',
    midBadgeSub: 'Čas 20s - 45s • AI tě možná nahradí v roce 2038',
    promptBadgeTitle: 'Prompt Inženýr',
    promptBadgeSub: 'Čas > 45s • Ptal ses ChatGPT na odpověď, co?',
    l1Title: 'Dropdown se schovává za header',
    l1Desc: 'Header má nastavený z-index: 100. Nastav rozbalovací menu tak, aby se zobrazovalo nad headerem!',
    l2Title: 'Ztracený modal',
    l2Desc: 'FailBot použil prehistorické záporné marginy z roku 2007. Vycentruj modal pomocí moderních layoutů!',
    l3Title: 'Nekonečný název schůzky',
    l3Desc: '250 znaků dlouhý název schůzky proráží okraje karty. Zkrať ho elegantně třemi tečkami (ellipsis)!',
    l4Title: 'Rozbitý seznam aktivit',
    l4Desc: 'Seřaď aktivity do sloupce v obráceném pořadí s 10px mezerami!',
    l5Title: 'Ztracený tooltip',
    l5Desc: 'Zarovnej tooltip nad tlačítko zprava s 8px mezerou!',
    startLevelBtn: 'Hrát level',
    playAgainLevelBtn: 'Replay Level',
    lockedBtn: 'Zamčeno',
    startCampaignBtn: 'Začít výzvu',
    startLevelTimerBtn: 'Spustit čas a kódovat',
    readyPrompt: 'Přečti si Jira ticket nahoře a klikni pro spuštění speedrunu!',
    taskOverlayTitleL1: 'Úkol 1: Dropdown se schovává za header',
    taskOverlayDescL1: 'Header má nastavený z-index: 100. Nastav rozbalovací menu tak, aby se zobrazovalo nad headerem.',
    taskOverlayTitleL2: 'Úkol 2: Vycentrovat modal na střed',
    taskOverlayDescL2: 'Vycentruj vyskakovací okno na přesný střed obrazovky (horizontálně i vertikálně).',
    taskOverlayTitleL3: 'Úkol 3: Oříznout přetékající text',
    taskOverlayDescL3: 'Zkrať název schůzky na jeden řádek a zakonči ho trojtečkou (...), aby neroztahoval kalendářní kartu.',
    taskOverlayTitleL4: 'Úkol 4: Seřadit seznam aktivit',
    taskOverlayDescL4: 'Seřaď karty aktivit do sloupce v obráceném pořadí s 10px mezerami.',
    taskOverlayTitleL5: 'Úkol 5: Připojit tooltip k tlačítku',
    taskOverlayDescL5: 'Zarovnej tooltip nad tlačítko zprava s 8px mezerou.',
    editorTaskCommentL1: '/* Úkol: Header má nastavený z-index: 100. Nastav rozbalovací menu tak, aby se zobrazovalo nad headerem */',
    editorTaskCommentL2: '/* Úkol: Vycentruj vyskakovací okno na přesný střed obrazovky (horizontálně i vertikálně) */',
    editorTaskCommentL3: '/* Úkol: Zkrať název schůzky na jeden řádek a zakonči ho trojtečkou (...), aby neroztahoval kalendářní kartu */',
    editorTaskCommentL4: '/* Úkol: Seřaď karty aktivit do sloupce v obráceném pořadí s 10px mezerami */',
    editorTaskCommentL5: '/* Úkol: FailBot nastavil position: relative na .tooltip místo na .button. Zarovnej tooltip nad tlačítko */',
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
    meetingTitleHeader: 'Předmět schůzky:',
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
    devbotHallucination: '❌ Halucinace FailBota-404:',
    devbotExcuse: '„Změřeno pravítkem na mé 8K chytré lednici“',
    seniorEditorTitle: 'Tvoje čistá moderní CSS oprava',
    golfCount: 'Golf: {chars} znaků',
    hintsToggle: 'Zobrazit nápovědu',
    hintsHeader: '💡 Nápověda pro stánek:',
    useGridBtn: 'Použít CSS Grid',
    useFlexBtn: 'Použít Flexbox',
    editorPlaceholder: '  /* Napiš sem CSS vlastnosti */\n  ',
    autoCheckLabel: 'Automatická kontrola v reálném čase',
    exitBtn: 'Odejít',
    resetCodeBtn: 'Obnovit kód',
    helpBtn: 'Zadání',
    helpModalTitle: 'Zadání úkolu',
    helpModalResumeBtn: 'Zpět ke kódu',
    verifyBtn: 'Odeslat',
    mergedBtn: 'PR Mergnuto! 🎉',
    verifyFailedToast: '❌ PR testy selhaly: Akceptační kritéria nejsou splněna!',
    failedModalTitle: 'Úkol nesplněn',
    failedModalSubtitle: 'Tvé CSS změny ještě nesplňují zadání úkolu. Zkontroluj kód a zkus to znovu!',
    failedModalTimerRunning: 'Tvůj čas stále běží!',
    failedModalBtn: 'Zpět ke kódu',
    verifyFailedBadge: 'CI/CD SELHALO ❌',
    verifyFailedDevbot: 'Dobrý pokus, {name}! Tvoje řešení neprošlo testy! Přečetl sis vůbec zadání úkolu?',

    // Exit Confirmation Modal
    exitConfirmTitle: 'Opravdu chceš odejít?',
    exitConfirmDevbot: '„Cože, {name}? Už to vzdáváš?! Čekal jsem od Senior Developera větší odpor! Moje záporné marginy a z-indexy tě definitivně položily. AI 1 : Člověk 0!“',
    exitConfirmLeaderboardInfo: 'Do žebříčku se započítají pouze úspěšně dokončená kola.',
    exitConfirmNoRoundsInfo: 'Zatím nemáš dokončené žádné kolo — v žebříčku se neobjevíš.',
    exitConfirmStayBtn: 'Zůstat a bojovat',
    exitConfirmQuitBtn: 'Vzdát to a odejít',

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
    devbotL2DropdownFixed: 'Z-index 100 nebo méně ti nepomůže, {name}! Můj header má 100, takže menu je pořád schované!',
    devbotL2DropdownDefeated: 'NÉÉÉ! Ty jsi dal z-index nad 100?! Moje pevnost z-indexu je zničená, {name}!',

    // DevBot L3 Dialogue
    devbotL3Initial: 'Názvy schůzek obsahují klíčové informace, {name}! Ořezávat text znamená doslova ničit pipeline!',
    devbotL3ClippedNoEllipsis: 'Cha, {name}! Ty jsi ten text usekl napůl jak sekerou! To vypadá naprosto příšerně! Úplná amatérština!',
    devbotL3Wrapped: 'Zalamovat to do 7 řádků, {name}? Ta karta teď vypadá jak román od Dostojevského! Takhle žádný enterprise deal neuzavřeš!',
    devbotL3Defeated: 'TŘI TEČKY, {name}?! Takže obchodníci teď budou muset najet myší na tooltip, aby si to přečetli?! Proklínám tě!',

    // DevBot L4 (Activity List) Dialogue
    devbotL4ListInitial: 'Vodorovný vláček aktivit šetří vertikální místo, {name}! Kdo vůbec potřebuje mezery mezi kartami?!',

    // DevBot L5 (Tooltip) Dialogue
    devbotL5TooltipInitial: 'Můj tooltip má přece position: relative! Co víc by ještě mohl potřebovat, {name}?!',
    devbotL5TooltipNoRelative: 'Bez position: relative na .button můj tooltip objevuje krásy vesmíru, {name}!',
    devbotL5TooltipNoAbsolute: 'Kam zmizela absolutní pozice, {name}?! Teď to rozbilo celý normální tok dokumentu!',
    devbotL5TooltipDefeated: 'Position relative na .button A ZÁROVEŇ absolute na .tooltip?! Nemožné, {name}!',

    // Victory Modal
    victoryTitleL1: 'PR #408 ZAMÍTNUTO A OPRAVENO! 🎉',
    victoryTitleL2: 'PR #404 ZAMÍTNUTO A OPRAVENO! 🎉',
    victoryTitleL3: 'PR #405 ZAMÍTNUTO A OPRAVENO! 🎉',
    victoryTitleL4: 'PR #409 ZAMÍTNUTO A OPRAVENO! 🎉',
    victoryTitleL5: 'PR #410 ZAMÍTNUTO A OPRAVENO! 🎉',
    victorySubtitle: 'Přechytračil jsi FailBota-404.',
    newRecordBadge: 'NOVÝ REKORD STÁNKU! 🏆',
    timeTakenLabel: 'ČAS',
    cssGolfLabel: 'CSS GOLF',
    savedAutoBadge: 'Automaticky uloženo do žebříčku jako „{name}“ ✓',
    postMortemHeader: 'FailBot-404 Post-Mortem:',
    postMortemTextL1: '„No dobře, {name}! Nastavil jsi z-index dropdownu nad 100. Moje pevnost z-indexu padla.“',
    postMortemTextL2: '„No dobře, {name}! Možná je moderní CSS lepší než 14 natvrdo zapsaných záporných marginů.“',
    postMortemTextL2Grid: '„No dobře, {name}! Možná je CSS Grid lepší než 14 natvrdo zapsaných záporných marginů.“',
    postMortemTextL2Flex: '„No dobře, {name}! Možná je Flexbox lepší než 14 natvrdo zapsaných záporných marginů.“',
    postMortemTextL3: '„No dobře! Tři řádky moderního CSS překonaly moji šířku 99999px. Užívej si to, {name}.“',
    postMortemTextL4: '„No dobře, {name}! Sloupec a gap je samozřejmě přehlednější než můj vodorovný vláček aktivit.“',
    postMortemTextL5: '„No dobře! Position relative na .button a absolute na tooltipu ho ukotvily přesně tam, kam patří. Zvládl jsi všech 5 výzev, {name}!“',
    nextLevelBtn: 'Další úkol',
    finishCampaignBtn: 'Zobrazit žebříček',
    campaignVictoryTitle: 'VÝZVA DOKONČENA! 🏆',
    campaignVictorySubtitle: 'Blahopřejeme, {name}! AI tě jen tak nenahradí!',
    campaignVictoryFailBot: '„Sakra, {name}... Všech 5 mých záludných CSS bugů jsi s přehledem vyřešil/a! Moje neuronová síť právě zažívá existenční zhroucení. Uznávám porážku — vývojáři z masa a kostí jsou zatím v bezpečí, AI tě jen tak nenahradí!“',
    campaignAiProofBadge: 'AI-Proof Senior Inženýr 🛡️',
    campaignTotalTimeLabel: 'CELKOVÝ ČAS (5/5 KOL)',
    campaignLevelTimeLabel: 'ČAS 5. KOLA',
    viewFinalLeaderboardBtn: 'Zobrazit finální žebříček',

    // Leaderboard Modal
    leaderboardTitle: 'Žebříček',
    leaderboardSub: 'Nejrychlejší senior vývojáři, kteří opravili CSS',
    runsCount: '{count} Pokusů',
    noRunsYet: 'Dnes zatím žádné výsledky!',
    colRank: 'Místo',
    colPlayer: 'Hráč',
    colRating: 'Dokončená kola',
    colRounds: 'Dokončená kola',
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

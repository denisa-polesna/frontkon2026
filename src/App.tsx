import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Button,
  Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import confetti from 'canvas-confetti';
import { outreachTheme } from './theme';
import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';
import { MissionBanner } from './components/MissionBanner';
import { PreviewViewport, type AlignmentStatus } from './components/PreviewViewport';
import { CodeEditor, type CodeEditorLine } from './components/CodeEditor';
import { PreviewViewportDropdown, type DropdownStatus } from './components/PreviewViewportDropdown';
import { PreviewViewportSticky, type StickyStatus } from './components/PreviewViewportSticky';
import { PreviewViewportLevel2, type OverflowStatus } from './components/PreviewViewportLevel2';
import { PreviewViewportList, type ListStatus } from './components/PreviewViewportList';
import { VictoryModal } from './components/VictoryModal';
import { FailureModal } from './components/FailureModal';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { NameRegistrationModal } from './components/NameRegistrationModal';
import {
  getStoredStats,
  saveRun,
  clearStats,
  type GameStats,
} from './utils/storage';
import { submitRemoteRun } from './utils/leaderboardApi';
import { sound } from './utils/audio';
import { getStoredLanguage, saveLanguage, translations, type Language } from './utils/i18n';

// Level 1: Dropdown se schovává za header (z-index > 100)
const DEFAULT_L1_CSS = `position: absolute;
z-index: 1;`;

// Level 2: Vycentrovat modal (Flexbox / Grid)
const DEFAULT_L2_CSS = `display: block;
margin-top: -240px;
margin-left: 20px;
float: left;`;

// Level 3: Text Overflow v kalendáři (ellipsis)
const DEFAULT_L3_CSS = `width: 99999px;
white-space: nowrap;
font-size: 8px;
color: #FF7081;`;

// Level 4: Seznam aktivit (column, gap)
const DEFAULT_L4_CSS = `display: flex;
flex-direction: row;
gap: 0px;`;

// Level 5: Sticky CTA lišta (position: sticky; bottom: 0)
const DEFAULT_L5_CSS = `position: absolute;
top: 4800px;
z-index: 2147483647;`;

export function App() {
  // Navigation: 'menu' | 'leaderboard' | 'level1' | 'level2' | 'level3' | 'level4' | 'level5'
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'leaderboard' | 'level1' | 'level2' | 'level3' | 'level4' | 'level5'>('menu');

  // Player Name State (In-Memory Session State only)
  const [playerName, setPlayerName] = useState<string>('');
  const [showNameModal, setShowNameModal] = useState<boolean>(false);

  // Language state (defaults to cz for FrontKon Prague)
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage());
  const t = translations[language];

  // Global Stats & Modals
  const [stats, setStats] = useState<GameStats>(() => getStoredStats());
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [showFailureModal, setShowFailureModal] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isNewBest, setIsNewBest] = useState<boolean>(false);
  const [failedVerify, setFailedVerify] = useState<boolean>(false);
  const [isLevelStarted, setIsLevelStarted] = useState<boolean>(false);

  // Speedrun Timer State (scoped to active level)
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const elapsedMsRef = useRef<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const startTimeRef = useRef<number | null>(null);
  const timerFrameRef = useRef<number | null>(null);

  // Mobile Swipe Carousel State
  const arenaScrollRef = useRef<HTMLDivElement | null>(null);
  const [mobileTabIndex, setMobileTabIndex] = useState<number>(0);

  const handleArenaScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.clientWidth > 0) {
      const page = Math.round(el.scrollLeft / el.clientWidth);
      if (page >= 0 && page <= 2 && page !== mobileTabIndex) {
        setMobileTabIndex(page);
      }
    }
  };

  const handleMobileTabClick = (index: number) => {
    setMobileTabIndex(index);
    if (arenaScrollRef.current) {
      arenaScrollRef.current.scrollTo({
        left: index * arenaScrollRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  // Level 1 State (Dropdown Behind Header)
  const [l1Css, setL1Css] = useState<string>(DEFAULT_L1_CSS);
  const [l1Solved, setL1Solved] = useState<boolean>(false);
  const [, setL1DropdownStatus] = useState<DropdownStatus>('hidden_behind_header');

  // Level 2 State (Center Modal)
  const [l2Css, setL2Css] = useState<string>(DEFAULT_L2_CSS);
  const [l2Solved, setL2Solved] = useState<boolean>(false);
  const [l2Distance, setL2Distance] = useState<number>(350);
  const [l2AlignmentStatus, setL2AlignmentStatus] = useState<AlignmentStatus>('off');

  // Level 3 State (Meeting Title Overflow)
  const [l3Css, setL3Css] = useState<string>(DEFAULT_L3_CSS);
  const [l3Solved, setL3Solved] = useState<boolean>(false);
  const [l3Status, setL3Status] = useState<OverflowStatus>('overflowing');

  // Level 4 State (Activity List: column, gap)
  const [l4Css, setL4Css] = useState<string>(DEFAULT_L4_CSS);
  const [l4Solved, setL4Solved] = useState<boolean>(false);
  const [, setL4ListStatus] = useState<ListStatus>('row_crammed');

  // Level 5 State (Sticky CTA Button)
  const [l5Css, setL5Css] = useState<string>(DEFAULT_L5_CSS);
  const [l5Solved, setL5Solved] = useState<boolean>(false);
  const [l5StickyStatus, setL5StickyStatus] = useState<StickyStatus>('off');

  // Active level helper
  const activeLevel: 'level1' | 'level2' | 'level3' | 'level4' | 'level5' =
    currentScreen === 'level5'
      ? 'level5'
      : currentScreen === 'level4'
      ? 'level4'
      : currentScreen === 'level3'
      ? 'level3'
      : currentScreen === 'level2'
      ? 'level2'
      : 'level1';

  const isCurrentLevelSolved =
    activeLevel === 'level1'
      ? l1Solved
      : activeLevel === 'level2'
      ? l2Solved
      : activeLevel === 'level3'
      ? l3Solved
      : activeLevel === 'level4'
      ? l4Solved
      : l5Solved;

  const getActiveUserCss = () => {
    if (activeLevel === 'level1') return l1Css;
    if (activeLevel === 'level2') return l2Css;
    if (activeLevel === 'level3') return l3Css;
    if (activeLevel === 'level4') return l4Css;
    return l5Css;
  };

  const getActiveReadOnlyLines = (): CodeEditorLine[] => {
    switch (activeLevel) {
      case 'level1':
        return [
          { text: language === 'cz' ? '/* Úkol: Nastav rozbalovací menu tak,' : '/* Task: Adjust dropdown menu so that', isComment: true },
          { text: language === 'cz' ? '   aby se zobrazovalo nad headerem */' : '   it displays above the header */', isComment: true },
          { text: '' },
          { text: '.header {' },
          { text: 'position: sticky;', indent: 1 },
          { text: 'top: 0;', indent: 1 },
          { text: 'z-index: 100;', indent: 1 },
          { text: '}' },
          { text: '' },
          { text: '.dropdown-menu {', isSelector: true },
        ];
      case 'level2':
        return [
          { text: language === 'cz' ? '/* Úkol: Vycentruj modal' : '/* Task: Center modal dialog', isComment: true },
          { text: language === 'cz' ? '   na střed obrazovky */' : '   horizontally and vertically */', isComment: true },
          { text: '' },
          { text: '.modal-viewport {', isSelector: true },
        ];
      case 'level3':
        return [
          { text: language === 'cz' ? '/* Úkol: Zkrať text na 1 řádek' : '/* Task: Truncate meeting title to 1 line', isComment: true },
          { text: language === 'cz' ? '   a přidej trojtečku */' : '   with ellipsis (...) */', isComment: true },
          { text: '' },
          { text: '.meeting-title {', isSelector: true },
        ];
      case 'level4':
        return [
          { text: language === 'cz' ? '/* Úkol: Seřaď aktivity do sloupce' : '/* Task: Stack activities in reverse', isComment: true },
          { text: language === 'cz' ? '   v obráceném pořadí s 10px mezerami */' : '   column order with 10px gaps */', isComment: true },
          { text: '' },
          { text: '.activity-list {', isSelector: true },
        ];
      case 'level5':
      default:
        return [
          { text: language === 'cz' ? '/* Úkol: Ukotvi lištu na spodní hranu' : '/* Task: Dock the action bar to bottom', isComment: true },
          { text: language === 'cz' ? '   při skrolování */' : '   while scrolling */', isComment: true },
          { text: '' },
          { text: '.deal-action-bar {', isSelector: true },
        ];
    }
  };

  const activeUserCss = getActiveUserCss();
  const activeReadOnlyLines = getActiveReadOnlyLines();
  const activeBestTime = stats.levelBestTimes[activeLevel] || null;

  // Timer loop
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - elapsedMsRef.current;

      const updateTimer = () => {
        if (startTimeRef.current !== null) {
          const current = performance.now() - startTimeRef.current;
          elapsedMsRef.current = current;
          setElapsedMs(current);
          timerFrameRef.current = requestAnimationFrame(updateTimer);
        }
      };
      timerFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      if (timerFrameRef.current) {
        cancelAnimationFrame(timerFrameRef.current);
      }
    }

    return () => {
      if (timerFrameRef.current) {
        cancelAnimationFrame(timerFrameRef.current);
      }
    };
  }, [isRunning]);

  // Level 1 (Dropdown Behind Header) check
  const handleL1DropdownChange = useCallback(
    (status: DropdownStatus, solved: boolean) => {
      setL1DropdownStatus(status);
      setL1Solved(solved);
    },
    []
  );

  // Level 2 (Center Modal) check
  const handleL2DistanceChange = useCallback(
    (dist: number, centered: boolean, status: AlignmentStatus) => {
      setL2Distance(dist);
      setL2AlignmentStatus(status);
      setL2Solved(centered);
    },
    []
  );

  // Level 3 (Meeting Title Overflow) check
  const handleL3StatusChange = useCallback(
    (status: OverflowStatus, solved: boolean) => {
      setL3Status(status);
      setL3Solved(solved);
    },
    []
  );

  // Level 4 (Activity List: column, gap) check
  const handleL4ListChange = useCallback(
    (status: ListStatus, solved: boolean) => {
      setL4ListStatus(status);
      setL4Solved(solved);
    },
    []
  );

  // Level 5 (Sticky CTA) check
  const handleL5StickyChange = useCallback(
    (status: StickyStatus, solved: boolean) => {
      setL5StickyStatus(status);
      setL5Solved(solved);
    },
    []
  );

  // Start timer on first keystroke
  const handleCssChange = (newCss: string) => {
    const isLevelSolved =
      activeLevel === 'level1'
        ? l1Solved
        : activeLevel === 'level2'
        ? l2Solved
        : activeLevel === 'level3'
        ? l3Solved
        : activeLevel === 'level4'
        ? l4Solved
        : l5Solved;

    if (!isLevelStarted) {
      setIsLevelStarted(true);
      startTimeRef.current = performance.now();
      setIsRunning(true);
    } else if (!isRunning && !isLevelSolved) {
      setIsRunning(true);
    }
    sound.playBlip();

    if (activeLevel === 'level1') {
      setL1Css(newCss);
    } else if (activeLevel === 'level2') {
      setL2Css(newCss);
    } else if (activeLevel === 'level3') {
      setL3Css(newCss);
    } else if (activeLevel === 'level4') {
      setL4Css(newCss);
    } else {
      setL5Css(newCss);
    }
  };

  // Reset challenge for active level
  const handleResetLevel = () => {
    setElapsedMs(0);
    elapsedMsRef.current = 0;
    startTimeRef.current = null;
    setIsRunning(false);
    setIsLevelStarted(false);
    setShowVictory(false);
    setFailedVerify(false);

    if (activeLevel === 'level1') {
      setL1Css(DEFAULT_L1_CSS);
      setL1Solved(false);
      setL1DropdownStatus('hidden_behind_header');
    } else if (activeLevel === 'level2') {
      setL2Css(DEFAULT_L2_CSS);
      setL2Solved(false);
      setL2AlignmentStatus('off');
    } else if (activeLevel === 'level3') {
      setL3Css(DEFAULT_L3_CSS);
      setL3Solved(false);
      setL3Status('overflowing');
    } else if (activeLevel === 'level4') {
      setL4Css(DEFAULT_L4_CSS);
      setL4Solved(false);
      setL4ListStatus('row_crammed');
    } else {
      setL5Css(DEFAULT_L5_CSS);
      setL5Solved(false);
      setL5StickyStatus('off');
    }
  };

  // Navigate to Level (shows blurred task until player hits start)
  const handleSelectLevel = (levelId: 'level1' | 'level2' | 'level3' | 'level4' | 'level5') => {
    sound.playBlip();
    setCurrentScreen(levelId);
    setElapsedMs(0);
    elapsedMsRef.current = 0;
    startTimeRef.current = null;
    setIsRunning(false);
    setIsLevelStarted(false);
    setShowVictory(false);
    setFailedVerify(false);
  };

  // Start timer and unblur the workspace
  const handleStartLevelTimer = () => {
    sound.playBlip();
    setIsLevelStarted(true);
    startTimeRef.current = performance.now();
    setIsRunning(true);
  };

  // Back to Menu
  const handleBackToMenu = () => {
    setIsRunning(false);
    setFailedVerify(false);
    setCurrentScreen('menu');
  };

  // Start Campaign: Prompt for name
  const handleStartCampaign = () => {
    sound.playBlip();
    setShowNameModal(true);
  };

  // When player registers their name
  const handleNameRegistered = (name: string) => {
    const trimmed = name?.trim();
    if (!trimmed) return;
    setPlayerName(trimmed);
    setShowNameModal(false);
    // Reset all level states and CSS so player starts completely fresh
    setL1Css(DEFAULT_L1_CSS);
    setL1Solved(false);
    setL1DropdownStatus('hidden_behind_header');
    setL2Css(DEFAULT_L2_CSS);
    setL2Solved(false);
    setL2AlignmentStatus('off');
    setL3Css(DEFAULT_L3_CSS);
    setL3Solved(false);
    setL3Status('overflowing');
    setL4Css(DEFAULT_L4_CSS);
    setL4Solved(false);
    setL4ListStatus('row_crammed');
    setL5Css(DEFAULT_L5_CSS);
    setL5Solved(false);
    setL5StickyStatus('off');
    handleSelectLevel('level1');
  };

  // User clicked "Verify & Merge PR"
  const handleSolveAttempt = () => {
    if (isCurrentLevelSolved) {
      setIsRunning(false);
      sound.playSuccess();

      confetti({
        particleCount: 150,
        spread: 95,
        origin: { y: 0.6 },
        colors: ['#00D2B4', '#5951ff', '#FFB020', '#FFFFFF'],
      });

      const currentBest = stats.levelBestTimes[activeLevel] || null;
      setIsNewBest(currentBest === null || elapsedMs < currentBest);

      // Auto-save to leaderboard immediately!
      const charCount = activeUserCss.trim().length;
      const updated = saveRun(elapsedMs, charCount, playerName || 'Senior Dev', activeLevel);
      setStats(updated);
      submitRemoteRun({
        timeMs: elapsedMs,
        charCount,
        playerTag: playerName || 'Senior Dev',
        levelId: activeLevel,
      });

      setTimeout(() => {
        setShowVictory(true);
      }, 350);
    } else {
      sound.playFail();
      setFailedVerify(true);
      setShowFailureModal(true);
      setTimeout(() => setFailedVerify(false), 3000);
    }
  };

  const handleClearLeaderboard = () => {
    const fresh = clearStats();
    setStats(fresh);
    setPlayerName('');
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
  };

  const handleToggleLanguage = () => {
    const next: Language = language === 'cz' ? 'en' : 'cz';
    setLanguage(next);
    saveLanguage(next);
    sound.playBlip();
  };

  // Helper to replace {name} with player's actual name
  const activeName = playerName || (language === 'cz' ? 'člověče' : 'human');
  const formatName = (text: string) => text.replace(/{name}/g, activeName);

  // DevBot Dialogue for Level 1 (Dropdown Behind Header)
  const getL1Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (failedVerify) {
      return { mood: 'confident', message: formatName(t.verifyFailedDevbot), badgeLabel: t.verifyFailedBadge };
    }
    if (!isLevelStarted || l1Css.trim() === DEFAULT_L1_CSS.trim()) {
      return { mood: 'confident', message: formatName(t.devbotL2DropdownInitial), badgeLabel: t.badge10x };
    }
    if (l1Css.includes('z-index') && !l1Css.includes('100')) {
      return { mood: 'confident', message: formatName(t.devbotL2DropdownFixed), badgeLabel: t.badgeHalfway };
    }
    return { mood: 'confident', message: formatName(t.devbotL2DropdownInitial), badgeLabel: t.badge10x };
  };

  // DevBot Dialogue for Level 2 (Center Modal)
  const getL2Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (failedVerify) {
      return { mood: 'confident', message: formatName(t.verifyFailedDevbot), badgeLabel: t.verifyFailedBadge };
    }
    if (!isLevelStarted || l2Css.trim() === DEFAULT_L2_CSS.trim()) {
      return { mood: 'confident', message: formatName(t.devbotInitial), badgeLabel: t.badge10x };
    }
    if (l2Css.includes('grid') || l2Css.includes('flex')) {
      return { mood: 'confused', message: formatName(t.devbotModern), badgeLabel: t.badgeOffended };
    }
    if (l2Css.includes('margin') || l2Css.includes('top:') || l2Css.includes('left:')) {
      return { mood: 'confident', message: formatName(t.devbotMargins), badgeLabel: t.badge10x };
    }
    if (l2AlignmentStatus === 'off' && l2Distance > 100) {
      return { mood: 'confused', message: formatName(t.devbotConfused), badgeLabel: t.badgeSyntax };
    }
    return { mood: 'confident', message: formatName(t.devbotInitial), badgeLabel: t.badge10x };
  };

  // DevBot Dialogue for Level 3 (Meeting Title)
  const getL3Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (failedVerify) {
      return { mood: 'confident', message: formatName(t.verifyFailedDevbot), badgeLabel: t.verifyFailedBadge };
    }
    if (!isLevelStarted || l3Css.trim() === DEFAULT_L3_CSS.trim()) {
      return { mood: 'confident', message: formatName(t.devbotL3Initial), badgeLabel: t.badge10x };
    }
    if (l3Status === 'clipped_no_ellipsis') {
      return { mood: 'confident', message: formatName(t.devbotL3ClippedNoEllipsis), badgeLabel: t.badgeHalfway };
    }
    if (l3Status === 'wrapped') {
      return { mood: 'confident', message: formatName(t.devbotL3Wrapped), badgeLabel: t.badgeHalfway };
    }
    if (l3Css.includes('font-size')) {
      return { mood: 'confident', message: formatName(t.devbotMargins), badgeLabel: t.badge10x };
    }
    return { mood: 'confident', message: formatName(t.devbotL3Initial), badgeLabel: t.badge10x };
  };

  // DevBot Dialogue for Level 4 (Activity List)
  const getL4Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (failedVerify) {
      return { mood: 'confident', message: formatName(t.verifyFailedDevbot), badgeLabel: t.verifyFailedBadge };
    }
    if (!isLevelStarted || l4Css.trim() === DEFAULT_L4_CSS.trim()) {
      return { mood: 'confident', message: formatName(t.devbotL4ListInitial), badgeLabel: t.badge10x };
    }
    return { mood: 'confident', message: formatName(t.devbotL4ListInitial), badgeLabel: t.badge10x };
  };

  // DevBot Dialogue for Level 5 (Sticky CTA)
  const getL5Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (failedVerify) {
      return { mood: 'confident', message: formatName(t.verifyFailedDevbot), badgeLabel: t.verifyFailedBadge };
    }
    if (!isLevelStarted || l5Css.trim() === DEFAULT_L5_CSS.trim()) {
      return { mood: 'confident', message: formatName(t.devbotL5StickyInitial), badgeLabel: t.badge10x };
    }
    if (l5StickyStatus === 'fixed_escaped') {
      return { mood: 'confident', message: formatName(t.devbotL5StickyFixed), badgeLabel: t.badgeHalfway };
    }
    if (l5StickyStatus === 'sticky_no_bottom') {
      return { mood: 'confident', message: formatName(t.devbotL5StickyNoBottom), badgeLabel: t.badgeHalfway };
    }
    if (l5Css.includes('z-index') || l5Css.includes('fixed')) {
      return { mood: 'confident', message: formatName(t.devbotL5StickyFixed), badgeLabel: t.badge10x };
    }
    return { mood: 'confident', message: formatName(t.devbotL5StickyInitial), badgeLabel: t.badge10x };
  };

  const getDevBotState = () => {
    if (activeLevel === 'level1') return getL1Dialogue();
    if (activeLevel === 'level2') return getL2Dialogue();
    if (activeLevel === 'level3') return getL3Dialogue();
    if (activeLevel === 'level4') return getL4Dialogue();
    return getL5Dialogue();
  };

  const devBotState = getDevBotState();

  const handleNextLevelProgression = () => {
    setShowVictory(false);
    if (activeLevel === 'level1') {
      handleSelectLevel('level2');
    } else if (activeLevel === 'level2') {
      handleSelectLevel('level3');
    } else if (activeLevel === 'level3') {
      handleSelectLevel('level4');
    } else if (activeLevel === 'level4') {
      handleSelectLevel('level5');
    } else {
      setCurrentScreen('leaderboard');
    }
  };

  return (
    <ThemeProvider theme={outreachTheme}>
      <CssBaseline />

      {currentScreen === 'menu' ? (
        <MainMenu
          stats={stats}
          onStartCampaign={handleStartCampaign}
          onOpenLeaderboard={() => setCurrentScreen('leaderboard')}
          language={language}
          onToggleLanguage={handleToggleLanguage}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          t={t}
        />
      ) : currentScreen === 'leaderboard' ? (
        <LeaderboardScreen
          runs={stats.history}
          onBack={() => setCurrentScreen('menu')}
          onStartCampaign={handleStartCampaign}
          onClearLeaderboard={handleClearLeaderboard}
          language={language}
          onToggleLanguage={handleToggleLanguage}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          t={t}
        />
      ) : (
        <Box
          sx={{
            height: '100vh',
            maxHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: '#120042',
            backgroundImage: `url("https://cdn.prod.website-files.com/696ea7504e736c595e9a2313/69e7e28ad18979a7c4351f30_Hero%20Frame.svg")`,
            backgroundPosition: '50% 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: { xs: 'cover', md: '100% auto' },
          }}
        >
          {/* Game Header */}
          <Header
            elapsedMs={elapsedMs}
            bestTimeMs={activeBestTime}
            isRunning={isRunning}
            onReset={handleResetLevel}
            onBackToMenu={handleBackToMenu}
            currentLevel={activeLevel}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            t={t}
          />

          {/* Main Content Area */}
          <Container
            maxWidth={false}
            sx={{
              maxWidth: { xs: '100%', xl: '1750px', xxl: '2350px' },
              width: '100%',
              mx: 'auto',
              flex: 1,
              minHeight: 0,
              py: { xs: 1, sm: 1.4, xxl: 2 },
              px: { xs: 1.5, sm: 2.5, xxl: 3.5 },
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1.2, xxl: 1.8 },
              overflow: 'hidden',
            }}
          >
            {/* Integrated Mission Banner: Jira Bug + DevBot Live Roast */}
            <MissionBanner
              levelId={activeLevel}
              isSolved={isCurrentLevelSolved}
              devBot={devBotState}
              t={t}
            />

            {/* Mobile View Switcher Tabs & Dots (Only visible on screens < lg) */}
            <Box
              sx={{
                display: { xs: 'flex', lg: 'none' },
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  backgroundColor: '#160844',
                  border: '1px solid rgba(179, 176, 255, 0.2)',
                  borderRadius: '8px',
                  p: '3px',
                  gap: 0.5,
                  maxWidth: '100%',
                }}
              >
                <Button
                  size="small"
                  onClick={() => handleMobileTabClick(0)}
                  startIcon={<CodeIcon sx={{ fontSize: '14px !important' }} />}
                  sx={{
                    py: '4px',
                    px: { xs: 1.4, sm: 2 },
                    fontSize: '0.74rem',
                    fontWeight: mobileTabIndex === 0 ? 700 : 500,
                    color: mobileTabIndex === 0 ? '#FFFFFF' : '#b3b0ff',
                    backgroundColor: mobileTabIndex === 0 ? '#5951ff' : 'transparent',
                    borderRadius: '6px',
                    textTransform: 'none',
                    minWidth: 0,
                    '&:hover': {
                      backgroundColor: mobileTabIndex === 0 ? '#5951ff' : 'rgba(89, 81, 255, 0.15)',
                    },
                  }}
                >
                  {t.mobileTabEditor}
                </Button>
                <Button
                  size="small"
                  onClick={() => handleMobileTabClick(1)}
                  startIcon={<VisibilityIcon sx={{ fontSize: '14px !important' }} />}
                  sx={{
                    py: '4px',
                    px: { xs: 1.4, sm: 2 },
                    fontSize: '0.74rem',
                    fontWeight: mobileTabIndex === 1 ? 700 : 500,
                    color: mobileTabIndex === 1 ? '#FFFFFF' : '#b3b0ff',
                    backgroundColor: mobileTabIndex === 1 ? '#5951ff' : 'transparent',
                    borderRadius: '6px',
                    textTransform: 'none',
                    minWidth: 0,
                    '&:hover': {
                      backgroundColor: mobileTabIndex === 1 ? '#5951ff' : 'rgba(89, 81, 255, 0.15)',
                    },
                  }}
                >
                  {t.mobileTabOutput}
                </Button>
                <Button
                  size="small"
                  onClick={() => handleMobileTabClick(2)}
                  startIcon={<TrackChangesIcon sx={{ fontSize: '14px !important' }} />}
                  sx={{
                    py: '4px',
                    px: { xs: 1.4, sm: 2 },
                    fontSize: '0.74rem',
                    fontWeight: mobileTabIndex === 2 ? 700 : 500,
                    color: mobileTabIndex === 2 ? '#FFFFFF' : '#b3b0ff',
                    backgroundColor: mobileTabIndex === 2 ? '#5951ff' : 'transparent',
                    borderRadius: '6px',
                    textTransform: 'none',
                    minWidth: 0,
                    '&:hover': {
                      backgroundColor: mobileTabIndex === 2 ? '#5951ff' : 'rgba(89, 81, 255, 0.15)',
                    },
                  }}
                >
                  {t.mobileTabTarget}
                </Button>
              </Box>

              {/* Dots indicator */}
              <Box sx={{ display: 'flex', gap: 0.8, alignItems: 'center' }}>
                {[0, 1, 2].map((idx) => (
                  <Box
                    key={idx}
                    onClick={() => handleMobileTabClick(idx)}
                    sx={{
                      width: mobileTabIndex === idx ? 18 : 6,
                      height: 6,
                      borderRadius: '3px',
                      backgroundColor: mobileTabIndex === idx ? '#5951ff' : 'rgba(179, 176, 255, 0.3)',
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* CSSBattle-style Arena: Horizontal Swipe Carousel on Mobile (< lg) | 3-Column Grid on Desktop (>= lg) */}
            <Box
              ref={arenaScrollRef}
              onScroll={handleArenaScroll}
              sx={{
                position: 'relative',
                display: { xs: 'flex', lg: 'grid' },
                flexDirection: { xs: 'row', lg: 'unset' },
                overflowX: { xs: 'auto', lg: 'hidden' },
                overflowY: 'hidden',
                scrollSnapType: { xs: 'x mandatory', lg: 'none' },
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                gridTemplateColumns: {
                  lg: '1.05fr 1fr 1fr',
                },
                gap: { xs: 0, lg: 2 },
                flex: 1,
                minHeight: 0,
                alignItems: 'stretch',
                width: '100%',
                height: '100%',
              }}
            >
              {/* Frosted Glass Blur Overlay before player hits Start */}
              {!isLevelStarted && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: -4,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(31, 31, 31, 0.92)',
                    zIndex: 99999,
                    borderRadius: 2.5,
                    border: '1px solid #2e2e2e',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                    textAlign: 'center',
                    animation: 'notificationBounce 0.3s ease-out',
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: 480,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2.2,
                      px: { xs: 2, sm: 3 },
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: '1.25rem', sm: '1.45rem' },
                          fontWeight: 800,
                          color: '#FFFFFF',
                          letterSpacing: '-0.02em',
                          textAlign: 'center',
                        }}
                      >
                        {activeLevel === 'level1'
                          ? t.taskOverlayTitleL1
                          : activeLevel === 'level2'
                          ? t.taskOverlayTitleL2
                          : activeLevel === 'level3'
                          ? t.taskOverlayTitleL3
                          : activeLevel === 'level4'
                          ? t.taskOverlayTitleL4
                          : t.taskOverlayTitleL5}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: '0.88rem', sm: '0.96rem' },
                          fontWeight: 400,
                          color: '#C4B5FD',
                          lineHeight: 1.5,
                          textAlign: 'center',
                          maxWidth: 420,
                        }}
                      >
                        {activeLevel === 'level1'
                          ? t.taskOverlayDescL1
                          : activeLevel === 'level2'
                          ? t.taskOverlayDescL2
                          : activeLevel === 'level3'
                          ? t.taskOverlayDescL3
                          : activeLevel === 'level4'
                          ? t.taskOverlayDescL4
                          : t.taskOverlayDescL5}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayArrowIcon sx={{ fontSize: '24px !important' }} />}
                      onClick={handleStartLevelTimer}
                      sx={{
                        py: { xs: 1.4, sm: 1.8 },
                        px: { xs: 3.5, sm: 5 },
                        fontSize: { xs: '1rem', sm: '1.15rem' },
                        fontWeight: 600,
                        borderRadius: '6px',
                        backgroundColor: '#5951ff',
                        color: '#FFFFFF',
                        boxShadow: 'none',
                        transition: 'background-color 0.25s ease',
                        '&:hover': {
                          backgroundColor: '#3028a1',
                          boxShadow: 'none',
                        },
                        '&:active': {
                          backgroundColor: '#030268',
                        },
                      }}
                    >
                      {t.startLevelTimerBtn}
                    </Button>
                  </Box>
                </Box>
              )}

              {/* 1. Code Editor Column / Slide */}
              <Box
                sx={{
                  flex: { xs: '0 0 100%', lg: 'unset' },
                  width: { xs: '100%', lg: 'auto' },
                  minWidth: { xs: '100%', lg: 0 },
                  height: '100%',
                  minHeight: 0,
                  scrollSnapAlign: { xs: 'start', lg: 'none' },
                  scrollSnapStop: { xs: 'always', lg: 'unset' },
                  display: 'flex',
                  flexDirection: 'column',
                  order: 1,
                  boxSizing: 'border-box',
                  isolation: 'isolate',
                }}
              >
                <CodeEditor
                  value={activeUserCss}
                  onChange={handleCssChange}
                  onSolveAttempt={handleSolveAttempt}
                  readOnlyLines={activeReadOnlyLines}
                  isSolved={isCurrentLevelSolved}
                  t={t}
                />
              </Box>

              {/* 2. Code Output Column / Slide (Center / Live Preview) */}
              <Box
                sx={{
                  flex: { xs: '0 0 100%', lg: 'unset' },
                  width: { xs: '100%', lg: 'auto' },
                  minWidth: { xs: '100%', lg: 0 },
                  height: '100%',
                  minHeight: 0,
                  scrollSnapAlign: { xs: 'start', lg: 'none' },
                  scrollSnapStop: { xs: 'always', lg: 'unset' },
                  display: 'flex',
                  flexDirection: 'column',
                  order: 2,
                  boxSizing: 'border-box',
                  isolation: 'isolate',
                }}
              >
                {activeLevel === 'level1' && (
                  <PreviewViewportDropdown
                    userCss={l1Css}
                    onStatusChange={handleL1DropdownChange}
                    isSolved={l1Solved}
                    t={t}
                  />
                )}
                {activeLevel === 'level2' && (
                  <PreviewViewport
                    userCss={l2Css}
                    onDistanceChange={handleL2DistanceChange}
                    isSolved={l2Solved}
                    t={t}
                  />
                )}
                {activeLevel === 'level3' && (
                  <PreviewViewportLevel2
                    userCss={l3Css}
                    onStatusChange={handleL3StatusChange}
                    isSolved={l3Solved}
                    t={t}
                  />
                )}
                {activeLevel === 'level4' && (
                  <PreviewViewportList
                    userCss={l4Css}
                    onStatusChange={handleL4ListChange}
                    isSolved={l4Solved}
                    t={t}
                  />
                )}
                {activeLevel === 'level5' && (
                  <PreviewViewportSticky
                    userCss={l5Css}
                    onStatusChange={handleL5StickyChange}
                    isSolved={l5Solved}
                    t={t}
                  />
                )}
              </Box>

              {/* 3. Recreate This Target Column / Slide (Right / Goal) */}
              <Box
                sx={{
                  flex: { xs: '0 0 100%', lg: 'unset' },
                  width: { xs: '100%', lg: 'auto' },
                  minWidth: { xs: '100%', lg: 0 },
                  height: '100%',
                  minHeight: 0,
                  scrollSnapAlign: { xs: 'start', lg: 'none' },
                  scrollSnapStop: { xs: 'always', lg: 'unset' },
                  display: 'flex',
                  flexDirection: 'column',
                  order: 3,
                  boxSizing: 'border-box',
                  isolation: 'isolate',
                }}
              >
                {activeLevel === 'level1' && (
                  <PreviewViewportDropdown
                    isTarget
                    t={t}
                  />
                )}
                {activeLevel === 'level2' && (
                  <PreviewViewport
                    isTarget
                    t={t}
                  />
                )}
                {activeLevel === 'level3' && (
                  <PreviewViewportLevel2
                    isTarget
                    t={t}
                  />
                )}
                {activeLevel === 'level4' && (
                  <PreviewViewportList
                    isTarget
                    t={t}
                  />
                )}
                {activeLevel === 'level5' && (
                  <PreviewViewportSticky
                    isTarget
                    t={t}
                  />
                )}
              </Box>
            </Box>
          </Container>

          {/* Victory Celebration Modal - Auto-saves to leaderboard, single next/finish button */}
          <VictoryModal
            open={showVictory}
            levelId={activeLevel}
            playerName={playerName || 'Senior Dev'}
            timeMs={elapsedMs}
            charCount={activeUserCss.trim().length}
            userCss={activeUserCss}
            isNewBest={isNewBest}
            onNextLevel={handleNextLevelProgression}
            language={language}
            t={t}
          />

          {/* Failure Feedback Modal */}
          <FailureModal
            open={showFailureModal}
            onClose={() => setShowFailureModal(false)}
            playerName={playerName}
            t={t}
          />
        </Box>
      )}

      {/* Player Name Registration Modal before starting campaign */}
      <NameRegistrationModal
        key={showNameModal ? 'modal-open' : 'modal-closed'}
        open={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSubmit={handleNameRegistered}
        t={t}
      />
    </ThemeProvider>
  );
}

export default App;

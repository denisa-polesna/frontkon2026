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
import { CodeEditor } from './components/CodeEditor';
import { PreviewViewportSticky, type StickyStatus } from './components/PreviewViewportSticky';
import { CodeEditorSticky } from './components/CodeEditorSticky';
import { PreviewViewportLevel2, type OverflowStatus } from './components/PreviewViewportLevel2';
import { CodeEditorLevel2 } from './components/CodeEditorLevel2';
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

const DEFAULT_L1_CSS = `/* DevBot-3000 hallucination */
display: block;
margin-top: -240px;
margin-left: 20px;
float: left;`;

const DEFAULT_L2_CSS = `/* DevBot-3000 hallucination */
position: absolute;
top: 4800px;
z-index: 2147483647;`;

const DEFAULT_L3_CSS = `/* DevBot-3000 hallucination */
width: 99999px;
white-space: nowrap;
font-size: 8px;
color: #FF7081;`;

export function App() {
  // Navigation: 'menu' | 'leaderboard' | 'level1' | 'level2' | 'level3'
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'leaderboard' | 'level1' | 'level2' | 'level3'>('menu');

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

  // Level 1 State (Center Modal)
  const [l1Css, setL1Css] = useState<string>(DEFAULT_L1_CSS);
  const [l1Solved, setL1Solved] = useState<boolean>(false);
  const [l1Distance, setL1Distance] = useState<number>(350);
  const [l1AlignmentStatus, setL1AlignmentStatus] = useState<AlignmentStatus>('off');

  // Level 2 State (Sticky CTA Button)
  const [l2Css, setL2Css] = useState<string>(DEFAULT_L2_CSS);
  const [l2Solved, setL2Solved] = useState<boolean>(false);
  const [l2StickyStatus, setL2StickyStatus] = useState<StickyStatus>('off');

  // Level 3 State (Meeting Title Overflow)
  const [l3Css, setL3Css] = useState<string>(DEFAULT_L3_CSS);
  const [l3Solved, setL3Solved] = useState<boolean>(false);
  const [l3Status, setL3Status] = useState<OverflowStatus>('overflowing');

  // Active level helper
  const activeLevel: 'level1' | 'level2' | 'level3' =
    currentScreen === 'level3' ? 'level3' : currentScreen === 'level2' ? 'level2' : 'level1';

  const isCurrentLevelSolved =
    activeLevel === 'level1' ? l1Solved : activeLevel === 'level2' ? l2Solved : l3Solved;

  const getActiveUserCss = () => {
    if (activeLevel === 'level1') return l1Css;
    if (activeLevel === 'level2') return l2Css;
    return l3Css;
  };

  const activeUserCss = getActiveUserCss();
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

  // Level 1 alignment check
  const handleL1DistanceChange = useCallback(
    (dist: number, centered: boolean, status: AlignmentStatus) => {
      setL1Distance(dist);
      setL1AlignmentStatus(status);
      setL1Solved(centered);
    },
    []
  );

  // Level 2 (Sticky CTA) check
  const handleL2StickyChange = useCallback(
    (status: StickyStatus, solved: boolean) => {
      setL2StickyStatus(status);
      setL2Solved(solved);
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

  // Start timer on first keystroke
  const handleCssChange = (newCss: string) => {
    const isLevelSolved =
      activeLevel === 'level1' ? l1Solved : activeLevel === 'level2' ? l2Solved : l3Solved;

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
    } else {
      setL3Css(newCss);
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
      setL1AlignmentStatus('off');
    } else if (activeLevel === 'level2') {
      setL2Css(DEFAULT_L2_CSS);
      setL2Solved(false);
      setL2StickyStatus('off');
    } else {
      setL3Css(DEFAULT_L3_CSS);
      setL3Solved(false);
      setL3Status('overflowing');
    }
  };

  // Navigate to Level (shows blurred task until player hits start)
  const handleSelectLevel = (levelId: 'level1' | 'level2' | 'level3') => {
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
    setPlayerName(name);
    setShowNameModal(false);
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

  // DevBot Dialogue for Level 1
  const getL1Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (l1Solved) {
      return { mood: 'defeated', message: formatName(t.devbotDefeated), badgeLabel: t.badgeDefeated };
    }
    if (failedVerify) {
      return { mood: 'confident', message: formatName(t.verifyFailedDevbot), badgeLabel: t.verifyFailedBadge };
    }
    // Initial state before player starts modifying CSS:
    if (!isLevelStarted || l1Css.trim() === DEFAULT_L1_CSS.trim()) {
      return { mood: 'confident', message: formatName(t.devbotInitial), badgeLabel: t.badge10x };
    }
    if (l1AlignmentStatus === 'horizontal_only') {
      return { mood: 'confident', message: formatName(t.devbotHorizontalOnly), badgeLabel: t.badgeHalfway };
    }
    if (l1AlignmentStatus === 'vertical_only') {
      return { mood: 'confident', message: formatName(t.devbotVerticalOnly), badgeLabel: t.badgeHalfway };
    }
    if (l1Distance <= 40) {
      return { mood: 'panicked', message: formatName(t.devbotPanickedClose), badgeLabel: t.badgeSweating };
    }
    if (l1Css.includes('grid') || l1Css.includes('flex')) {
      return { mood: 'confused', message: formatName(t.devbotModern), badgeLabel: t.badgeOffended };
    }
    if (l1Css.includes('margin') || l1Css.includes('top:') || l1Css.includes('left:')) {
      return { mood: 'confident', message: formatName(t.devbotMargins), badgeLabel: t.badge10x };
    }
    if (l1Css.trim().length > 0 && l1Distance > 250) {
      return { mood: 'confused', message: formatName(t.devbotConfused), badgeLabel: t.badgeSyntax };
    }
    return { mood: 'confident', message: formatName(t.devbotInitial), badgeLabel: t.badge10x };
  };

  // DevBot Dialogue for Level 2 (Sticky CTA)
  const getL2Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (l2Solved) {
      return { mood: 'defeated', message: formatName(t.devbotL2StickyDefeated), badgeLabel: t.badgeDefeated };
    }
    if (failedVerify) {
      return { mood: 'confident', message: formatName(t.verifyFailedDevbot), badgeLabel: t.verifyFailedBadge };
    }
    if (!isLevelStarted || l2Css.trim() === DEFAULT_L2_CSS.trim()) {
      return { mood: 'confident', message: formatName(t.devbotL2StickyInitial), badgeLabel: t.badge10x };
    }
    if (l2StickyStatus === 'fixed_escaped') {
      return { mood: 'confident', message: formatName(t.devbotL2StickyFixed), badgeLabel: t.badgeHalfway };
    }
    if (l2StickyStatus === 'sticky_no_bottom') {
      return { mood: 'confident', message: formatName(t.devbotL2StickyNoBottom), badgeLabel: t.badgeHalfway };
    }
    if (l2Css.includes('sticky')) {
      return { mood: 'panicked', message: formatName(t.devbotPanickedClose), badgeLabel: t.badgeSweating };
    }
    if (l2Css.includes('z-index')) {
      return { mood: 'confident', message: formatName(t.devbotL2StickyInitial), badgeLabel: t.badge10x };
    }
    return { mood: 'confident', message: formatName(t.devbotL2StickyInitial), badgeLabel: t.badge10x };
  };

  // DevBot Dialogue for Level 3 (Meeting Title)
  const getL3Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (l3Solved) {
      return { mood: 'defeated', message: formatName(t.devbotL3Defeated), badgeLabel: t.badgeDefeated };
    }
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
    if (l3Css.includes('ellipsis')) {
      return { mood: 'panicked', message: formatName(t.devbotPanickedClose), badgeLabel: t.badgeSweating };
    }
    if (l3Css.includes('font-size')) {
      return { mood: 'confident', message: formatName(t.devbotMargins), badgeLabel: t.badge10x };
    }
    return { mood: 'confident', message: formatName(t.devbotL3Initial), badgeLabel: t.badge10x };
  };

  const getDevBotState = () => {
    if (activeLevel === 'level1') return getL1Dialogue();
    if (activeLevel === 'level2') return getL2Dialogue();
    return getL3Dialogue();
  };

  const devBotState = getDevBotState();

  const handleNextLevelProgression = () => {
    setShowVictory(false);
    if (activeLevel === 'level1') {
      handleSelectLevel('level2');
    } else if (activeLevel === 'level2') {
      handleSelectLevel('level3');
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
            maxWidth="xl"
            sx={{
              flex: 1,
              minHeight: 0,
              py: { xs: 1, sm: 1.4 },
              px: { xs: 1.5, sm: 2.5 },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.2,
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
                    backgroundColor: 'rgba(18, 0, 68, 0.85)',
                    zIndex: 20,
                    borderRadius: 2.5,
                    border: '1px solid rgba(179, 176, 255, 0.25)',
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
                      maxWidth: 440,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '1.05rem', sm: '1.25rem' },
                        fontWeight: 800,
                        color: '#FFFFFF',
                        letterSpacing: '-0.01em',
                        textAlign: 'center',
                      }}
                    >
                      {activeLevel === 'level1'
                        ? (language === 'cz' ? 'Úkol 1: Vycentrovat modal' : 'Task 1: Center Modal')
                        : activeLevel === 'level2'
                        ? (language === 'cz' ? 'Úkol 2: Sticky CTA' : 'Task 2: Sticky CTA')
                        : (language === 'cz' ? 'Úkol 3: Text Overflow' : 'Task 3: Text Overflow')}
                    </Typography>

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
                }}
              >
                {activeLevel === 'level1' && (
                  <CodeEditor
                    value={l1Css}
                    onChange={handleCssChange}
                    isSolved={l1Solved}
                    onSolveAttempt={handleSolveAttempt}
                    t={t}
                  />
                )}
                {activeLevel === 'level2' && (
                  <CodeEditorSticky
                    value={l2Css}
                    onChange={handleCssChange}
                    isSolved={l2Solved}
                    onSolveAttempt={handleSolveAttempt}
                    t={t}
                  />
                )}
                {activeLevel === 'level3' && (
                  <CodeEditorLevel2
                    value={l3Css}
                    onChange={handleCssChange}
                    isSolved={l3Solved}
                    onSolveAttempt={handleSolveAttempt}
                    t={t}
                  />
                )}
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
                }}
              >
                {activeLevel === 'level1' && (
                  <PreviewViewport
                    userCss={l1Css}
                    onDistanceChange={handleL1DistanceChange}
                    isSolved={l1Solved}
                    t={t}
                  />
                )}
                {activeLevel === 'level2' && (
                  <PreviewViewportSticky
                    userCss={l2Css}
                    onStatusChange={handleL2StickyChange}
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
                }}
              >
                {activeLevel === 'level1' && (
                  <PreviewViewport
                    isTarget
                    t={t}
                  />
                )}
                {activeLevel === 'level2' && (
                  <PreviewViewportSticky
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
        open={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSubmit={handleNameRegistered}
        t={t}
      />
    </ThemeProvider>
  );
}

export default App;

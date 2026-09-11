import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
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
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { NameRegistrationModal } from './components/NameRegistrationModal';
import {
  getStoredStats,
  saveRun,
  clearStats,
  getStoredPlayerName,
  saveStoredPlayerName,
  type GameStats,
} from './utils/storage';
import { submitRemoteRun } from './utils/leaderboardApi';
import { sound } from './utils/audio';
import { getStoredLanguage, saveLanguage, translations, type Language } from './utils/i18n';

export function App() {
  // Navigation: 'menu' | 'leaderboard' | 'level1' | 'level2' | 'level3'
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'leaderboard' | 'level1' | 'level2' | 'level3'>('menu');

  // Player Name State
  const [playerName, setPlayerName] = useState<string>(() => getStoredPlayerName());
  const [showNameModal, setShowNameModal] = useState<boolean>(false);

  // Language state (defaults to cz for FrontKon Prague)
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage());
  const t = translations[language];

  // Global Stats & Modals
  const [stats, setStats] = useState<GameStats>(() => getStoredStats());
  const [showVictory, setShowVictory] = useState<boolean>(false);
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

  // Mobile View Switcher: 'both' (split) | 'code' | 'preview'
  const [mobileView, setMobileView] = useState<'both' | 'code' | 'preview'>('both');

  // Level 1 State (Center Modal)
  const [l1Css, setL1Css] = useState<string>('');
  const [l1Solved, setL1Solved] = useState<boolean>(false);
  const [l1Distance, setL1Distance] = useState<number>(350);
  const [l1AlignmentStatus, setL1AlignmentStatus] = useState<AlignmentStatus>('off');

  // Level 2 State (Sticky CTA Button)
  const [l2Css, setL2Css] = useState<string>('');
  const [l2Solved, setL2Solved] = useState<boolean>(false);
  const [l2StickyStatus, setL2StickyStatus] = useState<StickyStatus>('off');

  // Level 3 State (Meeting Title Overflow)
  const [l3Css, setL3Css] = useState<string>('');
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

  // Level 1 alignment check (auto-saves on victory!)
  const handleL1DistanceChange = useCallback(
    (dist: number, centered: boolean, status: AlignmentStatus) => {
      setL1Distance(dist);
      setL1AlignmentStatus(status);

      if (centered && !l1Solved) {
        setL1Solved(true);
        setIsRunning(false);
        sound.playSuccess();

        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#00D2B4', '#6E3FF3', '#FFB020', '#FFFFFF'],
        });

        const currentBest = stats.levelBestTimes['level1'] || null;
        setIsNewBest(currentBest === null || elapsedMs < currentBest);

        // Auto-save to leaderboard immediately!
        const charCount = l1Css.trim().length;
        const updated = saveRun(elapsedMs, charCount, playerName || 'Senior Dev', 'level1');
        setStats(updated);
        submitRemoteRun({ timeMs: elapsedMs, charCount, playerTag: playerName || 'Senior Dev', levelId: 'level1' });

        setTimeout(() => {
          setShowVictory(true);
        }, 350);
      }
    },
    [l1Solved, stats.levelBestTimes, elapsedMs, l1Css, playerName]
  );

  // Level 2 (Sticky CTA) check (auto-saves on victory!)
  const handleL2StickyChange = useCallback(
    (status: StickyStatus, solved: boolean) => {
      setL2StickyStatus(status);

      if (solved && !l2Solved) {
        setL2Solved(true);
        setIsRunning(false);
        sound.playSuccess();

        confetti({
          particleCount: 150,
          spread: 95,
          origin: { y: 0.6 },
          colors: ['#00D2B4', '#6E3FF3', '#FFB020', '#FFFFFF'],
        });

        const currentBest = stats.levelBestTimes['level2'] || null;
        setIsNewBest(currentBest === null || elapsedMs < currentBest);

        // Auto-save to leaderboard immediately!
        const charCount = l2Css.trim().length;
        const updated = saveRun(elapsedMs, charCount, playerName || 'Senior Dev', 'level2');
        setStats(updated);
        submitRemoteRun({ timeMs: elapsedMs, charCount, playerTag: playerName || 'Senior Dev', levelId: 'level2' });

        setTimeout(() => {
          setShowVictory(true);
        }, 350);
      }
    },
    [l2Solved, stats.levelBestTimes, elapsedMs, l2Css, playerName]
  );

  // Level 3 (Meeting Title Overflow) check (auto-saves on victory!)
  const handleL3StatusChange = useCallback(
    (status: OverflowStatus, solved: boolean) => {
      setL3Status(status);

      if (solved && !l3Solved) {
        setL3Solved(true);
        setIsRunning(false);
        sound.playSuccess();

        confetti({
          particleCount: 170,
          spread: 110,
          origin: { y: 0.6 },
          colors: ['#00D2B4', '#6E3FF3', '#FFD166', '#FFFFFF'],
        });

        const currentBest = stats.levelBestTimes['level3'] || null;
        setIsNewBest(currentBest === null || elapsedMs < currentBest);

        // Auto-save to leaderboard immediately!
        const charCount = l3Css.trim().length;
        const updated = saveRun(elapsedMs, charCount, playerName || 'Senior Dev', 'level3');
        setStats(updated);
        submitRemoteRun({ timeMs: elapsedMs, charCount, playerTag: playerName || 'Senior Dev', levelId: 'level3' });

        setTimeout(() => {
          setShowVictory(true);
        }, 350);
      }
    },
    [l3Solved, stats.levelBestTimes, elapsedMs, l3Css, playerName]
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
      setL1Css('');
      setL1Solved(false);
      setL1AlignmentStatus('off');
    } else if (activeLevel === 'level2') {
      setL2Css('');
      setL2Solved(false);
      setL2StickyStatus('off');
    } else {
      setL3Css('');
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

  // Start Campaign: Prompt for name if not set yet!
  const handleStartCampaign = () => {
    sound.playBlip();
    if (!playerName || playerName.trim() === '') {
      setShowNameModal(true);
    } else {
      handleSelectLevel('level1');
    }
  };

  // When player registers their name
  const handleNameRegistered = (name: string) => {
    setPlayerName(name);
    saveStoredPlayerName(name);
    setShowNameModal(false);
    handleSelectLevel('level1');
  };

  // User clicked "Verify & Merge PR"
  const handleSolveAttempt = () => {
    if (isCurrentLevelSolved) {
      sound.playSuccess();
      setShowVictory(true);
    } else {
      sound.playFail();
      setFailedVerify(true);
      setTimeout(() => setFailedVerify(false), 3500);
    }
  };

  const handleClearLeaderboard = () => {
    const fresh = clearStats();
    setStats(fresh);
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
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
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
              py: { xs: 1.2, sm: 2 },
              px: { xs: 1.5, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1.2, sm: 1.8 },
            }}
          >
            {/* Integrated Mission Banner: Jira Bug + DevBot Live Roast */}
            <MissionBanner
              levelId={activeLevel}
              isSolved={isCurrentLevelSolved}
              devBot={devBotState}
              t={t}
            />

            {/* Mobile View Switcher (Only visible on screens < md) */}
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
              }}
            >
              <ToggleButtonGroup
                value={mobileView}
                exclusive
                onChange={(_, val) => val && setMobileView(val)}
                size="small"
                sx={{
                  backgroundColor: '#160844',
                  border: '1px solid rgba(179, 176, 255, 0.2)',
                  borderRadius: 2,
                  '& .MuiToggleButton-root': {
                    py: '3px',
                    px: 1.5,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#b3b0ff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: '#5951ff',
                      color: '#FFF',
                      '&:hover': { backgroundColor: '#433adb' },
                    },
                  },
                }}
              >
                <ToggleButton value="both">
                  <ViewSidebarIcon sx={{ fontSize: 13 }} />
                  <span>Split</span>
                </ToggleButton>
                <ToggleButton value="code">
                  <CodeIcon sx={{ fontSize: 13 }} />
                  <span>Editor</span>
                </ToggleButton>
                <ToggleButton value="preview">
                  <VisibilityIcon sx={{ fontSize: 13 }} />
                  <span>Preview</span>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Split Screen: Live Preview (Left) & Code Editor (Right) */}
            <Box
              sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1.25fr 1fr' },
                gap: { xs: 1.5, sm: 2.5 },
                flex: 1,
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

                    <Typography variant="body2" sx={{ color: '#C4B5FD', fontWeight: 600, fontSize: '0.85rem' }}>
                      {t.readyPrompt}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Viewport Column */}
              <Box
                sx={{
                  display: {
                    xs: mobileView === 'code' ? 'none' : 'flex',
                    md: 'flex',
                  },
                  flexDirection: 'column',
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

              {/* Code Editor Column */}
              <Box
                sx={{
                  display: {
                    xs: mobileView === 'preview' ? 'none' : 'flex',
                    md: 'flex',
                  },
                  flexDirection: 'column',
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
        </Box>
      )}

      {/* Player Name Registration Modal before starting campaign */}
      <NameRegistrationModal
        open={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSubmit={handleNameRegistered}
        initialName={playerName}
        t={t}
      />
    </ThemeProvider>
  );
}

export default App;

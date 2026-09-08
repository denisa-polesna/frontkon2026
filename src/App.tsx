import { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeProvider, CssBaseline, Box, Container, Button, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import confetti from 'canvas-confetti';
import { outreachTheme } from './theme';
import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';
import { JiraTicketBanner } from './components/JiraTicketBanner';
import { PreviewViewport, type AlignmentStatus } from './components/PreviewViewport';
import { CodeEditor } from './components/CodeEditor';
import { PreviewViewportSticky, type StickyStatus } from './components/PreviewViewportSticky';
import { CodeEditorSticky } from './components/CodeEditorSticky';
import { PreviewViewportLevel2, type OverflowStatus } from './components/PreviewViewportLevel2';
import { CodeEditorLevel2 } from './components/CodeEditorLevel2';
import { DevBotAvatar } from './components/DevBotAvatar';
import { VictoryModal } from './components/VictoryModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { getStoredStats, saveRun, clearStats, type GameStats } from './utils/storage';
import { sound } from './utils/audio';
import { getStoredLanguage, saveLanguage, translations, type Language } from './utils/i18n';

export function App() {
  // Navigation: 'menu' | 'level1' | 'level2' | 'level3'
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'level1' | 'level2' | 'level3'>('menu');

  // Language state (defaults to cz for FrontKon Prague)
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage());
  const t = translations[language];

  // Global Stats & Modals
  const [stats, setStats] = useState<GameStats>(() => getStoredStats());
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
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

  // Level 1 alignment check
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

        setTimeout(() => {
          setShowVictory(true);
        }, 350);
      }
    },
    [l1Solved, stats.levelBestTimes, elapsedMs]
  );

  // Level 2 (Sticky CTA) check
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

        setTimeout(() => {
          setShowVictory(true);
        }, 350);
      }
    },
    [l2Solved, stats.levelBestTimes, elapsedMs]
  );

  // Level 3 (Meeting Title Overflow) check
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

        setTimeout(() => {
          setShowVictory(true);
        }, 350);
      }
    },
    [l3Solved, stats.levelBestTimes, elapsedMs]
  );

  // Start timer on first keystroke
  const handleCssChange = (newCss: string) => {
    const isLevelSolved =
      activeLevel === 'level1' ? l1Solved : activeLevel === 'level2' ? l2Solved : l3Solved;

    if (!isRunning && !isLevelSolved) {
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

  // Save victory to booth leaderboard
  const handleSaveVictory = (playerName: string) => {
    const charCount = activeUserCss.trim().length;
    const updated = saveRun(elapsedMs, charCount, playerName, activeLevel);
    setStats(updated);
    setShowVictory(false);

    // If final level (Level 3), return to Main Menu to show the leaderboard!
    if (activeLevel === 'level3') {
      setCurrentScreen('menu');
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

  // DevBot Dialogue for Level 1
  const getL1Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (l1Solved) {
      return { mood: 'defeated', message: t.devbotDefeated, badgeLabel: t.badgeDefeated };
    }
    if (failedVerify) {
      return { mood: 'confident', message: t.verifyFailedDevbot, badgeLabel: t.verifyFailedBadge };
    }
    if (l1AlignmentStatus === 'horizontal_only') {
      return { mood: 'confident', message: t.devbotHorizontalOnly, badgeLabel: t.badgeHalfway };
    }
    if (l1AlignmentStatus === 'vertical_only') {
      return { mood: 'confident', message: t.devbotVerticalOnly, badgeLabel: t.badgeHalfway };
    }
    if (l1Distance <= 40) {
      return { mood: 'panicked', message: t.devbotPanickedClose, badgeLabel: t.badgeSweating };
    }
    if (l1Css.includes('grid') || l1Css.includes('flex')) {
      return { mood: 'confused', message: t.devbotModern, badgeLabel: t.badgeOffended };
    }
    if (l1Css.includes('margin') || l1Css.includes('top:') || l1Css.includes('left:')) {
      return { mood: 'confident', message: t.devbotMargins, badgeLabel: t.badge10x };
    }
    if (l1Css.trim().length > 0 && l1Distance > 250) {
      return { mood: 'confused', message: t.devbotConfused, badgeLabel: t.badgeSyntax };
    }
    return { mood: 'confident', message: t.devbotInitial, badgeLabel: t.badge10x };
  };

  // DevBot Dialogue for Level 2 (Sticky CTA)
  const getL2Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (l2Solved) {
      return { mood: 'defeated', message: t.devbotL2StickyDefeated, badgeLabel: t.badgeDefeated };
    }
    if (failedVerify) {
      return { mood: 'confident', message: t.verifyFailedDevbot, badgeLabel: t.verifyFailedBadge };
    }
    if (l2StickyStatus === 'fixed_escaped') {
      return { mood: 'confident', message: t.devbotL2StickyFixed, badgeLabel: t.badgeHalfway };
    }
    if (l2StickyStatus === 'sticky_no_bottom') {
      return { mood: 'confident', message: t.devbotL2StickyNoBottom, badgeLabel: t.badgeHalfway };
    }
    if (l2Css.includes('sticky')) {
      return { mood: 'panicked', message: t.devbotPanickedClose, badgeLabel: t.badgeSweating };
    }
    if (l2Css.includes('z-index')) {
      return { mood: 'confident', message: t.devbotL2StickyInitial, badgeLabel: t.badge10x };
    }
    return { mood: 'confident', message: t.devbotL2StickyInitial, badgeLabel: t.badge10x };
  };

  // DevBot Dialogue for Level 3 (Meeting Title)
  const getL3Dialogue = (): {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  } => {
    if (l3Solved) {
      return { mood: 'defeated', message: t.devbotL3Defeated, badgeLabel: t.badgeDefeated };
    }
    if (failedVerify) {
      return { mood: 'confident', message: t.verifyFailedDevbot, badgeLabel: t.verifyFailedBadge };
    }
    if (l3Status === 'clipped_no_ellipsis') {
      return { mood: 'confident', message: t.devbotL3ClippedNoEllipsis, badgeLabel: t.badgeHalfway };
    }
    if (l3Status === 'wrapped') {
      return { mood: 'confident', message: t.devbotL3Wrapped, badgeLabel: t.badgeHalfway };
    }
    if (l3Css.includes('ellipsis')) {
      return { mood: 'panicked', message: t.devbotPanickedClose, badgeLabel: t.badgeSweating };
    }
    if (l3Css.includes('font-size')) {
      return { mood: 'confident', message: t.devbotMargins, badgeLabel: t.badge10x };
    }
    return { mood: 'confident', message: t.devbotL3Initial, badgeLabel: t.badge10x };
  };

  const getDevBotState = () => {
    if (activeLevel === 'level1') return getL1Dialogue();
    if (activeLevel === 'level2') return getL2Dialogue();
    return getL3Dialogue();
  };

  const devBotState = getDevBotState();

  const getNextLevelTarget = (): 'level2' | 'level3' | undefined => {
    if (activeLevel === 'level1') return 'level2';
    if (activeLevel === 'level2') return 'level3';
    return undefined;
  };

  return (
    <ThemeProvider theme={outreachTheme}>
      <CssBaseline />

      {currentScreen === 'menu' ? (
        <MainMenu
          stats={stats}
          onStartCampaign={() => handleSelectLevel('level1')}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
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
            backgroundColor: '#090B14',
          }}
        >
          {/* Game Header (No Leaderboard button here - only in Main Menu!) */}
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
              py: 2,
              px: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.8,
            }}
          >
            {/* Jira Ticket Bug Report Banner */}
            <JiraTicketBanner
              levelId={activeLevel}
              isSolved={isCurrentLevelSolved}
              t={t}
            />

            {/* DevBot Realtime Commentary Bubble placed directly under Jira Ticket */}
            <DevBotAvatar
              mood={devBotState.mood}
              message={devBotState.message}
              badgeLabel={devBotState.badgeLabel}
            />

            {/* Split Screen: Live Preview (Left) & Code Editor (Right) */}
            <Box
              sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1.25fr 1fr' },
                gap: 2.5,
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
                    backgroundColor: 'rgba(9, 11, 20, 0.75)',
                    zIndex: 20,
                    borderRadius: 2.5,
                    border: '1px solid #232845',
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
                      startIcon={<PlayArrowIcon sx={{ fontSize: '30px !important' }} />}
                      onClick={handleStartLevelTimer}
                      sx={{
                        py: 2,
                        px: { xs: 4, sm: 6 },
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        borderRadius: 3.5,
                        background: 'linear-gradient(135deg, #6E3FF3 0%, #00D2B4 100%)',
                        color: '#FFFFFF',
                        boxShadow: '0 0 40px rgba(110, 63, 243, 0.6), 0 10px 30px rgba(0, 0, 0, 0.7)',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          transform: 'scale(1.04)',
                          boxShadow: '0 0 60px rgba(0, 210, 180, 0.8), 0 14px 40px rgba(0, 0, 0, 0.8)',
                        },
                      }}
                    >
                      {t.startLevelTimerBtn}
                    </Button>

                    <Typography variant="body2" sx={{ color: '#C4B5FD', fontWeight: 600, fontSize: '0.88rem' }}>
                      {t.readyPrompt}
                    </Typography>
                  </Box>
                </Box>
              )}
              {activeLevel === 'level1' && (
                <>
                  <PreviewViewport
                    userCss={l1Css}
                    onDistanceChange={handleL1DistanceChange}
                    isSolved={l1Solved}
                    t={t}
                  />
                  <CodeEditor
                    value={l1Css}
                    onChange={handleCssChange}
                    isSolved={l1Solved}
                    onSolveAttempt={handleSolveAttempt}
                    t={t}
                  />
                </>
              )}

              {activeLevel === 'level2' && (
                <>
                  <PreviewViewportSticky
                    userCss={l2Css}
                    onStatusChange={handleL2StickyChange}
                    isSolved={l2Solved}
                    t={t}
                  />
                  <CodeEditorSticky
                    value={l2Css}
                    onChange={handleCssChange}
                    isSolved={l2Solved}
                    onSolveAttempt={handleSolveAttempt}
                    t={t}
                  />
                </>
              )}

              {activeLevel === 'level3' && (
                <>
                  <PreviewViewportLevel2
                    userCss={l3Css}
                    onStatusChange={handleL3StatusChange}
                    isSolved={l3Solved}
                    t={t}
                  />
                  <CodeEditorLevel2
                    value={l3Css}
                    onChange={handleCssChange}
                    isSolved={l3Solved}
                    onSolveAttempt={handleSolveAttempt}
                    t={t}
                  />
                </>
              )}
            </Box>
          </Container>

          {/* Victory Celebration Modal */}
          <VictoryModal
            open={showVictory}
            levelId={activeLevel}
            timeMs={elapsedMs}
            charCount={activeUserCss.trim().length}
            isNewBest={isNewBest}
            onSaveAndClose={handleSaveVictory}
            onOpenLeaderboard={handleBackToMenu}
            onNextLevel={
              getNextLevelTarget()
                ? () => handleSelectLevel(getNextLevelTarget()!)
                : undefined
            }
            onBackToMenu={handleBackToMenu}
            language={language}
            t={t}
          />
        </Box>
      )}

      {/* Global Leaderboard Modal (Accessible from Main Menu) */}
      <LeaderboardModal
        open={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        runs={stats.history}
        onClearLeaderboard={handleClearLeaderboard}
        t={t}
      />
    </ThemeProvider>
  );
}

export default App;

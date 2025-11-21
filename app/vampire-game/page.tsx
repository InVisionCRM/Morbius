"use client";

import { useEffect, useState } from "react";

type PuzzleConfig = {
  prompt: string;
  ritual: string;
  data: string[];
  acceptedAnswers: string[];
  hint: string;
  timeLimit: number;
  inputLabel: string;
};

type Level = {
  id: string;
  title: string;
  difficulty: "Novice" | "Stalker" | "Primordial" | "Eclipse";
  objective: string;
  challenge: string;
  requirement: string;
  reward: string;
  gradient: string;
  accent: string;
  glyph: string;
  puzzle: PuzzleConfig;
};

const normalizeAnswer = (value: string) =>
  value.replace(/[^a-z0-9]/gi, "").toUpperCase();

const levels: Level[] = [
  {
    id: "blood-echo",
    title: "Level I · Blood Echo",
    difficulty: "Novice",
    objective: "Tune the cryptic radio to identify the heartbeat that doesn’t belong.",
    challenge: "A waveform visualization pulses in 8-beat phrases. Decode the repeated timing error.",
    requirement: "Call out the faulty beat before the vitae meter empties.",
    reward: "Win the Echo Pin that unlocks later clues.",
    gradient: "from-red-500/50 via-red-900/90 to-black",
    accent: "text-red-300",
    glyph: "♱",
    puzzle: {
      prompt:
        "The recorder captured eight beats. Exactly one beat spikes (♪) instead of staying steady (♩). Provide the position (1-8) of the anomaly.",
      ritual: "Beat map · |1♩|2♩|3♩|4♪|5♩|6♩|7♩|8♩|",
      data: [
        "1 ▪ 72 bpm",
        "2 ▪ 72 bpm",
        "3 ▪ 72 bpm",
        "4 △ 79 bpm ← phase error",
        "5 ▪ 72 bpm",
        "6 ▪ 72 bpm",
        "7 ▪ 72 bpm",
        "8 ▪ 72 bpm",
      ],
      acceptedAnswers: ["4", "FOUR", "BEAT4"],
      hint: "Only one glyph changes from a square beat (♩) to a triangle (♪)—count carefully.",
      timeLimit: 45,
      inputLabel: "Enter beat number",
    },
  },
  {
    id: "umbra-lattice",
    title: "Level II · Umbra Lattice",
    difficulty: "Stalker",
    objective: "Navigate a rotating runic lattice that masks the true path.",
    challenge: "Every rotation reveals a subset of runes; only prime-numbered positions can be stepped on.",
    requirement: "Solve three consecutive lattice routes without stepping on a trap glyph.",
    reward: "Gain the Veil Sigil granting shadow stamina.",
    gradient: "from-purple-500/40 via-indigo-900/90 to-black",
    accent: "text-purple-200",
    glyph: "✦",
    puzzle: {
      prompt:
        "A runic stream spins past you: Φ R A Λ V Σ E. Walk only on prime positions (2,3,5,7) and read the letters in order to form the passphrase.",
      ritual: "Positions → Letters",
      data: [
        "1 · Φ",
        "2 · R",
        "3 · A",
        "4 · Λ",
        "5 · V",
        "6 · Σ",
        "7 · E",
      ],
      acceptedAnswers: ["RAVE"],
      hint: "Prime positions under 8 are 2, 3, 5, and 7. Read the letters in that order.",
      timeLimit: 60,
      inputLabel: "Type the passphrase",
    },
  },
  {
    id: "nocturne-lock",
    title: "Level III · Nocturne Lock",
    difficulty: "Primordial",
    objective: "Crack a triple-disc cipher lock before dawn breaks.",
    challenge: "Match constellations, Latin phrases, and pulse frequencies simultaneously.",
    requirement: "Align all three discs within 90 seconds using slider controls and auditory feedback.",
    reward: "Receive the Eclipse Dial, enabling access to the final chamber.",
    gradient: "from-blue-500/30 via-black to-black",
    accent: "text-blue-200",
    glyph: "☽",
    puzzle: {
      prompt:
        "The outer ring shows Y · F · N · O. Align the inner disc so that you subtract offsets (3,1,5,3) from each letter’s alphabet index. The resulting letters spell the lock’s key—what is it?",
      ritual: "Y(25)−3 · F(6)−1 · N(14)−5 · O(15)−3",
      data: ["Y − 3 → ?", "F − 1 → ?", "N − 5 → ?", "O − 3 → ?"],
      acceptedAnswers: ["VEIL"],
      hint: "Convert each letter to numbers, subtract the offsets, then convert back to letters.",
      timeLimit: 75,
      inputLabel: "Enter the four-letter key",
    },
  },
  {
    id: "sanguine-paradox",
    title: "Level IV · Sanguine Paradox",
    difficulty: "Eclipse",
    objective: "Survive a branching narrative puzzle where each choice drains or replenishes vitae.",
    challenge: "Combine previous artifacts to forge blood keys while a timer mirrors your pulse.",
    requirement: "Maintain control and decode the symbolic riddles before the timer zeroes.",
    reward: "Ascend as the Midnight Regent—unlocks the prestige leaderboard.",
    gradient: "from-rose-600/40 via-black to-black",
    accent: "text-rose-200",
    glyph: "✥",
    puzzle: {
      prompt:
        "Prime-bound artifacts sit on a dais. Activate every artifact with a prime vitae score under 30, sort them from weakest to strongest, and read their initials to learn your coronation title.",
      ritual: "Vitae Ledger (prime values)",
      data: [
        "Reliquary · 11",
        "Eclipse Chalice · 13",
        "Grimoire · 17",
        "Ember Sigil · 19",
        "Nightglass · 23",
        "Throne Shard · 29",
      ],
      acceptedAnswers: ["REGENT"],
      hint: "Order the artifacts by vitae and read the initials—no math beyond sorting.",
      timeLimit: 90,
      inputLabel: "Type the coronation title",
    },
  },
];

const coreSystems = [
  {
    title: "Reaction Layers",
    text: "Auditory cues, heartbeat vibrations, and color flashes test precision timing under pressure.",
  },
  {
    title: "Cognitive Wheels",
    text: "Rotating cipher discs and sliding glyphs reward pattern recognition at speed.",
  },
  {
    title: "Shadow Economy",
    text: "Players juggle vitae, focus, and time simultaneously—every decision is deterministic.",
  },
];

export default function VampireMysteryGamePage() {
  const [activeLevelIndex, setActiveLevelIndex] = useState(0);
  const [maxUnlockedIndex, setMaxUnlockedIndex] = useState(0);
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [gameState, setGameState] = useState<
    "idle" | "running" | "success" | "failure" | "complete"
  >("idle");
  const [timeLeft, setTimeLeft] = useState(levels[0].puzzle.timeLimit);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);

  const level = levels[activeLevelIndex];
  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const progressPercent = (completedCount / levels.length) * 100;
  const isFinalLevel = activeLevelIndex === levels.length - 1;

  const focusLevel = (index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), levels.length - 1);
    const nextLevel = levels[nextIndex];
    setActiveLevelIndex(nextIndex);
    setTimeLeft(nextLevel.puzzle.timeLimit);
    setInputValue("");
    setFeedback("");
    setAttempts(0);
    setHintVisible(false);
    setGameState("idle");
  };

  useEffect(() => {
    if (gameState !== "running") return;
    if (timeLeft <= 0) return;
    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("failure");
          setFeedback("The ritual collapsed. Retry the trial.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  const startTrial = () => {
    if (gameState === "running") return;
    setTimeLeft(level.puzzle.timeLimit);
    setInputValue("");
    setFeedback("Timer engaged. Decode quickly.");
    setAttempts(0);
    setHintVisible(false);
    setGameState("running");
  };

  const handleSubmit = () => {
    if (gameState !== "running") return;
    const normalized = normalizeAnswer(inputValue);
    const success = level.puzzle.acceptedAnswers.some(
      (answer) => normalizeAnswer(answer) === normalized,
    );
    setAttempts((prev) => prev + 1);

    if (success) {
      const earned = Math.max(25, 150 + timeLeft * 5 - attempts * 5);
      setScore((prev) => prev + earned);
      setCompletedMap((prev) => ({ ...prev, [level.id]: true }));
      if (isFinalLevel) {
        setGameState("complete");
        setFeedback("You’ve ascended as the Midnight Regent.");
      } else {
        setGameState("success");
        setFeedback("Glyphs obeyed. Advance deeper.");
        setMaxUnlockedIndex((prev) => Math.max(prev, activeLevelIndex + 1));
      }
    } else {
      setFeedback("The wards reject that answer. Adjust your approach.");
    }
  };

  const handleAdvance = () => {
    if (isFinalLevel) {
      setGameState("complete");
      return;
    }
    focusLevel(activeLevelIndex + 1);
  };

  const handleRetry = () => {
    setTimeLeft(level.puzzle.timeLimit);
    setInputValue("");
    setFeedback("Recalibrate and try again.");
    setAttempts(0);
    setHintVisible(false);
    setGameState("idle");
  };

  const handleSurrender = () => {
    if (gameState !== "running") return;
    setGameState("failure");
    setFeedback("You released the ward. The chamber resets.");
  };

  const resetRun = () => {
    setMaxUnlockedIndex(0);
    setCompletedMap({});
    setScore(0);
    focusLevel(0);
  };

  return (
    <main className="bg-black text-white">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(55,0,10,0.75),_rgba(0,0,0,0.95))]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 mix-blend-screen" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.6em] text-red-400">Vampire Mystery Trial</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Nightbound: A Skill-Based Puzzle Descent
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
            Descend through four handcrafted arenas where logic, timing, and intuition are the only weapons.
            Every mechanic is deterministic—perfect for nightly tournaments, speedruns, or broadcast events.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.4em] text-gray-400">
            <span>Skill-Based</span>
            <span>·</span>
            <span>No RNG</span>
            <span>·</span>
            <span>Puzzle Speedruns Welcome</span>
          </div>
          <button
            onClick={resetRun}
            className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-purple-800 rounded-full text-sm font-semibold tracking-[0.3em]"
          >
            Begin Blood Rite
          </button>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(17,0,25,0.8),_rgba(0,0,0,0.95))]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-red-400">Skill Ladder</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Choose Your Trial</h2>
              <p className="text-gray-300 mt-3 max-w-2xl">
                Levels unlock sequentially. Clear a puzzle to reveal the next one, keep the timer alive, and preserve your score multiplier.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
                Progress {completedCount}/{levels.length}
              </p>
              <div className="w-64 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">Score: {score}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {levels.map((lvl, index) => {
              const isUnlocked = index <= maxUnlockedIndex;
              const isCompleted = completedMap[lvl.id];
              const isActive = index === activeLevelIndex;
              const isSelectable = gameState !== "running" && (isUnlocked || isCompleted);
              return (
                <button
                  key={lvl.id}
                  onClick={() => {
                    if (!isSelectable) return;
                    focusLevel(index);
                  }}
                  disabled={!isSelectable}
                  className={`text-left rounded-3xl border border-white/10 p-6 transition-all ${
                    isActive ? "bg-white/10 shadow-[0_0_40px_rgba(255,0,255,0.15)]" : "bg-white/5 hover:bg-white/10"
                  } ${!isSelectable && !isActive ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-2xl ${lvl.accent}`}>{lvl.glyph}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/70">{lvl.difficulty}</span>
                  </div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-400">{lvl.title}</p>
                  <p className="text-lg font-semibold text-white mt-2">{lvl.objective}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
                    {isCompleted && <span className="text-emerald-300">Cleared</span>}
                    {!isCompleted && isUnlocked && <span className="text-yellow-200">Ready</span>}
                    {!isUnlocked && !isCompleted && <span className="text-gray-500">Locked</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative mt-10 rounded-[36px] overflow-hidden border border-white/10">
            <div className={`absolute inset-0 bg-gradient-to-br ${level.gradient}`} />
            <div className="relative z-10 grid md:grid-cols-2 gap-10 p-8">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">{level.title}</p>
                <h3 className="text-3xl font-black">{level.challenge}</h3>
                <p className="text-gray-100">{level.requirement}</p>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/70 mb-2">Objective</p>
                  <p className="text-lg text-white">{level.objective}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/70 mb-2">Reward</p>
                  <p className="text-lg text-emerald-200">{level.reward}</p>
                </div>
                <button className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/50 text-xs uppercase tracking-[0.4em] hover:bg-white/10">
                  Load Prototype
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-[1.15fr_minmax(0,0.85fr)]">
            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Active Trial</p>
                  <p className="text-lg font-semibold text-white">{level.title}</p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Time</p>
                    <p className="text-2xl font-black">{timeLeft}s</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Score</p>
                    <p className="text-2xl font-black">{score}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Attempts</p>
                    <p className="text-2xl font-black">{attempts}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-base md:text-lg text-white">{level.puzzle.prompt}</p>
                <p className="text-sm text-gray-400 mt-1">{level.puzzle.ritual}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm font-mono text-red-100">
                {level.puzzle.data.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  {level.puzzle.inputLabel}
                </label>
                <input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  disabled={gameState !== "running"}
                  className="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder={gameState === "running" ? "Enter answer..." : "Start the trial to input"}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={startTrial}
                  disabled={gameState === "running"}
                  className="px-5 py-2 rounded-full border border-white/40 text-xs uppercase tracking-[0.4em] hover:bg-white/10 disabled:opacity-40"
                >
                  Start Trial
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={gameState !== "running"}
                  className="px-5 py-2 rounded-full border border-emerald-300 text-xs uppercase tracking-[0.4em] text-emerald-200 hover:bg-emerald-400/10 disabled:opacity-30"
                >
                  Submit Answer
                </button>
                <button
                  onClick={handleSurrender}
                  disabled={gameState !== "running"}
                  className="px-5 py-2 rounded-full border border-red-400 text-xs uppercase tracking-[0.4em] text-red-200 hover:bg-red-500/10 disabled:opacity-30"
                >
                  Surrender
                </button>
                <button
                  onClick={() => setHintVisible((prev) => !prev)}
                  className="px-5 py-2 rounded-full border border-white/20 text-xs uppercase tracking-[0.4em] hover:bg-white/10"
                >
                  {hintVisible ? "Hide Hint" : "Reveal Hint"}
                </button>
              </div>

              <div className="text-sm text-gray-200 min-h-[2rem]">{feedback}</div>

              {gameState === "success" && (
                <button
                  onClick={handleAdvance}
                  className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-purple-600 px-5 py-3 text-sm font-semibold tracking-[0.4em]"
                >
                  Advance to {levels[activeLevelIndex + 1]?.title ?? "Final Coronation"}
                </button>
              )}

              {gameState === "failure" && (
                <button
                  onClick={handleRetry}
                  className="w-full rounded-2xl border border-yellow-400 px-5 py-3 text-sm font-semibold tracking-[0.4em]"
                >
                  Retry Level
                </button>
              )}

              {gameState === "complete" && (
                <div className="rounded-2xl border border-emerald-400 bg-emerald-500/10 px-5 py-4 text-center space-y-3">
                  <p className="text-lg font-semibold text-emerald-200">
                    Midnight Regent crowned. Final score: {score}
                  </p>
                  <button
                    onClick={resetRun}
                    className="rounded-full border border-white/40 px-4 py-2 text-xs uppercase tracking-[0.4em]"
                  >
                    Reset Run
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 space-y-5">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Ritual Notes</p>
              <p className="text-sm text-gray-200">{level.challenge}</p>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-2">Hint</p>
                {hintVisible ? (
                  <p className="text-sm text-amber-200">{level.puzzle.hint}</p>
                ) : (
                  <p className="text-sm text-gray-500">Reveal the hint if the chamber refuses to open.</p>
                )}
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-2">Reward Reminder</p>
                <p className="text-sm text-emerald-200">{level.reward}</p>
              </div>
              <button
                onClick={resetRun}
                className="w-full rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.4em] hover:bg-white/10"
              >
                Restart Entire Descent
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(10,10,30,0.9),_rgba(0,0,0,0.95))]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-12">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.5em] text-purple-300">Core Systems</p>
            <h2 className="text-3xl md:text-4xl font-black">How the Engine Tests Skill</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Every module is deterministic and scoreboard-friendly. Mix and match these systems to build weekly tournaments
              or plug the puzzles into your stream overlay.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreSystems.map((system) => (
              <div key={system.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
                <p className="text-sm uppercase tracking-[0.4em] text-gray-400">{system.title}</p>
                <p className="text-gray-100 text-base">{system.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

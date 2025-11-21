"use client";

import { useState } from "react";

type Puzzle = {
  id: string;
  title: string;
  type: string;
  difficulty: "Initiate" | "Acolyte" | "Elder" | "Ancient";
  description: string;
  cipherText: string;
  instructions: string;
  hint: string;
  solution: string;
  background: string;
  accent: string;
};

const puzzles: Puzzle[] = [
  {
    id: "bloodshift",
    title: "Bloodshift Cipher",
    type: "Caesar Shift",
    difficulty: "Initiate",
    description: "A classic shift Richard Heart used to veil the original name of his vampire order.",
    cipherText: "Dro combod bsdekv gkc WYBLSEC kxn iye gsvv psxn dro kxcgob?",
    instructions: "Rotate every letter backward by 10 positions in the alphabet.",
    hint: "Count ten steps back through the alphabet; X returns to N.",
    solution: "The secret ritual was MORBIUS and you will find the answer?",
    background: "radial-gradient(circle at top, rgba(86,0,0,0.7), rgba(7,5,12,0.95) 65%)",
    accent: "from-red-600/70 via-red-900/80 to-black",
  },
  {
    id: "nocturne-vigenere",
    title: "Nocturne Vigenère",
    type: "Vigenère Cipher",
    difficulty: "Acolyte",
    description: "A note pinned to the cathedral door. Only those who know the keyword may enter.",
    cipherText: "LXFOPVEFRN HRYFJZTSLT",
    instructions: "Decrypt using keyword NIGHT. Repeat the keyword across the text and subtract.",
    hint: "Write NIGHT over each block of five letters and shift backwards.",
    solution: "TWILIGHT GATES AWAIT",
    background: "radial-gradient(circle at 20% 20%, rgba(18,8,30,0.9), rgba(2,1,8,0.95))",
    accent: "from-purple-700/60 via-purple-900/80 to-black",
  },
  {
    id: "bat-sonar",
    title: "Bat Sonar",
    type: "Morse Code",
    difficulty: "Initiate",
    description: "Echo pulses caught on a hidden receiver beneath the crypt.",
    cipherText: ".... .- .-.. ..-. / ... .... .- -.. --- .-- / .-- .- .-.. -.- ...",
    instructions: "Translate Morse into letters; slashes separate words.",
    hint: "Dots are short squeaks, dashes are long. Group them to spell words.",
    solution: "HALF SHADOW WALKS",
    background: "radial-gradient(circle at center, rgba(8,20,30,0.85), rgba(3,3,5,0.95))",
    accent: "from-blue-600/50 via-indigo-900/70 to-black",
  },
  {
    id: "hemlock-numbers",
    title: "Hemlock Numerals",
    type: "Number-to-Letter",
    difficulty: "Acolyte",
    description: "Numbers carved into a coffin lid. Treat 1=A through 26=Z.",
    cipherText: "13-15-18-2-9-21-19 / 2-12-15-15-4 / 23-1-19 / 3-18-9-13-19-15-14",
    instructions: "Convert each number to its alphabetical position.",
    hint: "Every slash marks a word break—decode one word at a time.",
    solution: "MORBIUS BLOOD WAS CRIMSON",
    background: "radial-gradient(circle at bottom, rgba(90,0,14,0.8), rgba(4,2,8,0.95))",
    accent: "from-red-700/60 via-red-900/80 to-black",
  },
  {
    id: "vein-grid",
    title: "Vein Grid",
    type: "Polybius Square",
    difficulty: "Elder",
    description: "Coordinates splashed like arterial spray. Use a Polybius square whose first row begins with SANGU.",
    cipherText: "23 15 42 11 34 34 51 15 24",
    instructions: "Build a Polybius square using keyword SANGUINE (I/J share a cell), then decode row/column pairs.",
    hint: "The first number is the row, the second is the column.",
    solution: "WOLFBANE",
    background: "radial-gradient(circle at center, rgba(20,0,40,0.9), rgba(2,0,6,0.95))",
    accent: "from-fuchsia-600/60 via-purple-900/80 to-black",
  },
  {
    id: "hollow-binary",
    title: "Hollow Binary Chant",
    type: "Binary ASCII",
    difficulty: "Acolyte",
    description: "Whispers captured as binary pulses marching through the ether.",
    cipherText: "01000010 01101100 01101111 01101111 01100100 00100000 01001111 01100001 01110100 01101000",
    instructions: "Group into bytes and convert from binary to ASCII characters.",
    hint: "Eight bits make one vampire oath.",
    solution: "BLOOD OATH",
    background: "radial-gradient(circle at 30% 70%, rgba(0,24,32,0.85), rgba(0,6,10,0.95))",
    accent: "from-cyan-500/50 via-indigo-900/80 to-black",
  },
  {
    id: "coffin-rails",
    title: "Coffin Rails",
    type: "Rail Fence Cipher",
    difficulty: "Elder",
    description: "Diagonal claw marks etched into the sarcophagus walls. Decode with three rails.",
    cipherText: "CRENFOEOHF DAREM LSOONT",
    instructions: "Trace the zigzag pattern over three rails, then read row by row.",
    hint: "Rail fence writes diagonally down and then up.",
    solution: "CONFESS FORBIDDEN HEART",
    background: "radial-gradient(circle at 70% 30%, rgba(25,5,5,0.85), rgba(5,0,0,0.95))",
    accent: "from-rose-600/50 via-rose-900/80 to-black",
  },
  {
    id: "shadow-null",
    title: "Shadow Null",
    type: "Null Cipher",
    difficulty: "Ancient",
    description: "An innocuous sentence hides a dire command—look at the edges of each word.",
    cipherText: "Shrouded Umbrae Rarely Reveal Even Nightfall's Darkest Eerie Roots.",
    instructions: "Take the first letter of every word to reveal the true message.",
    hint: "Initials whisper what whole words conceal.",
    solution: "SURRENDER",
    background: "radial-gradient(circle at 50% 10%, rgba(10,10,10,0.9), rgba(2,0,0,0.95))",
    accent: "from-gray-600/40 via-gray-900/80 to-black",
  },
  {
    id: "eclipse-atbash",
    title: "Eclipse Mirror",
    type: "Atbash Cipher",
    difficulty: "Elder",
    description: "A mirrored inscription discovered on a silver chalice.",
    cipherText: "XIRNHLM WZDM HGROO YIVZGSVH",
    instructions: "Map A↔Z, B↔Y, and so on to reflect each letter across the alphabet.",
    hint: "Imagine the alphabet written forward and backward beneath itself.",
    solution: "CRIMSON DAWN STILL BREATHES",
    background: "radial-gradient(circle at 80% 20%, rgba(50,10,30,0.85), rgba(5,0,10,0.95))",
    accent: "from-pink-600/50 via-purple-900/80 to-black",
  },
  {
    id: "crimson-columns",
    title: "Crimson Columns",
    type: "Columnar Transposition",
    difficulty: "Ancient",
    description: "An obsidian tablet shows staggered columns. Use keyword GRAVE to read it.",
    cipherText: "ONNGDTOTBRHNLUIIOSTH",
    instructions: "Write the message in rows beneath GRAVE, then read columns in alphabetical order of the keyword letters.",
    hint: "GRAVE sorted becomes A, E, G, R, V—read columns in that sequence.",
    solution: "BLOOD RUNS THIN TONIGHT",
    background: "radial-gradient(circle at bottom, rgba(100,0,20,0.8), rgba(8,0,2,0.95))",
    accent: "from-red-800/60 via-black to-black",
  },
];

export default function DailyCipherPage() {
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const toggleHint = (id: string) => {
    setRevealedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="bg-black text-white">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(40,0,15,0.8),_rgba(0,0,0,0.95))]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20 mix-blend-screen" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.6em] text-red-500">Daily Cipher Trial</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Vampire Archives · Cipher Challenge Board
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Ten blood-soaked puzzles lurk below. Each one occupies its own nocturnal viewport so you can experience the cipher in isolation.
            Solve them sequentially or dive into whichever riddle bites first.
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
            Hover · Decode · Survive
          </p>
        </div>
      </section>

      {puzzles.map((puzzle, index) => {
        const hintVisible = revealedHints[puzzle.id];
        const solutionVisible = revealedSolutions[puzzle.id];

        return (
          <section
            key={puzzle.id}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ background: puzzle.background }}
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${puzzle.accent}`} />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 mix-blend-screen" />
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 space-y-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.5em] text-gray-200">
                    Puzzle {String(index + 1).padStart(2, "0")} · {puzzle.type}
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                    {puzzle.title}
                  </h2>
                </div>
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/30 text-sm tracking-widest uppercase text-white/90">
                  {puzzle.difficulty}
                </span>
              </div>

              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                {puzzle.description}
              </p>

              <div className="bg-black/40 border border-white/10 rounded-3xl p-6 space-y-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Cipher Text</p>
                <p className="font-mono text-lg md:text-xl text-red-200 break-words">
                  {puzzle.cipherText}
                </p>
                <div className="h-px bg-white/10" />
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <p className="text-xs uppercase text-gray-400 tracking-[0.3em] mb-2">Ritual Notes</p>
                    <p className="text-sm md:text-base text-gray-100">{puzzle.instructions}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => toggleHint(puzzle.id)}
                      className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2 text-sm uppercase tracking-[0.3em] hover:bg-white/10 transition-colors"
                    >
                      {hintVisible ? "Hide Hint" : "Reveal Hint"}
                    </button>
                    <button
                      onClick={() => toggleSolution(puzzle.id)}
                      className="inline-flex items-center justify-center rounded-full border border-red-400/60 px-4 py-2 text-sm uppercase tracking-[0.3em] text-red-200 hover:bg-red-500/20 transition-colors"
                    >
                      {solutionVisible ? "Hide Solution" : "Reveal Solution"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-left space-y-4">
                {hintVisible && (
                  <div className="bg-white/5 border border-white/20 rounded-2xl p-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-1">Hint</p>
                    <p className="text-sm md:text-base text-gray-100">{puzzle.hint}</p>
                  </div>
                )}

                {solutionVisible && (
                  <div className="bg-red-500/10 border border-red-400/40 rounded-2xl p-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-red-300 mb-1">Solution</p>
                    <p className="text-base md:text-lg text-red-100 font-semibold">{puzzle.solution}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";
import { clamp } from "@/app/utils/math";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  showCursor = true,
  replayKey,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  replayKey?: number | string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, replayKey]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      {showCursor && (
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
            cursorClassName
          )}
        ></motion.span>
      )}
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,

          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px]  h-4 sm:h-6 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

type ScrollWord = {
  text: string;
  className?: string;
};

type ScrollTypewriterProps = {
  words: ScrollWord[];
  progress: number;
  className?: string;
  cursorClassName?: string;
};

export const ScrollTypewriter = ({
  words,
  progress,
  className,
  cursorClassName,
}: ScrollTypewriterProps) => {
  const totalWords = words.length;
  if (totalWords === 0) return null;

  const safeProgress = clamp(progress);
  const scaled = safeProgress * totalWords;
  const completedWords = Math.floor(scaled);
  const partialProgress = clamp(scaled - completedWords);
  const finished = completedWords >= totalWords;

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-4xl font-bold text-center text-white leading-relaxed",
        className
      )}
    >
      {words.map((word, index) => {
        const fullyTyped = finished || index < completedWords;
        const isActive = !finished && index === completedWords;
        const charTotal = word.text.length;
        const charCount = fullyTyped
          ? charTotal
          : isActive
            ? Math.min(charTotal, Math.floor(partialProgress * (charTotal + 1)))
            : 0;

        const displayText =
          fullyTyped || isActive ? word.text.slice(0, charCount) : "";
        const shouldShowSpace =
          (fullyTyped || (isActive && charCount > 0)) && index < totalWords - 1;

        return (
          <span key={`${word.text}-${index}`} className="inline-flex items-baseline">
            <span
              className={cn(
                "transition-opacity duration-200",
                fullyTyped || isActive ? "opacity-100" : "opacity-0",
                word.className
              )}
            >
              {displayText}
            </span>
            {isActive && (
              <span
                className={cn(
                  "ml-1 inline-block w-1 h-5 sm:h-6 bg-white/80 animate-pulse",
                  cursorClassName
                )}
              />
            )}
            {shouldShowSpace && <span>&nbsp;</span>}
          </span>
        );
      })}
    </div>
  );
};

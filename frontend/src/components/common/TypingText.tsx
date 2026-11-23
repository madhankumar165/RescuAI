import React, { useEffect, useState } from 'react';

interface TypingTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
  className = '',
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse font-light text-cyan-400">|</span>
    </span>
  );
};

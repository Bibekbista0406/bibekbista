import React, { useState, useEffect } from 'react';

interface TerminalIntroProps {
  onFinished: () => void;
}

const lines = [
  'Booting BibekOS v2.0.24...',
  'Connecting to neural interface...',
  'Calibrating holographic emitters...',
  'Loading portfolio modules:',
  '> Projects.dll',
  '> Skills.bin',
  '> Services.module',
  'Decompiling creativity matrix...',
  'AI Assistant core online.',
  'System ready. Welcome.',
];

const TerminalIntro: React.FC<TerminalIntroProps> = ({ onFinished }) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Disable scrolling while intro is active
    document.body.style.overflow = 'hidden';

    const lineTimeouts: ReturnType<typeof setTimeout>[] = [];
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    lines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
      }, index * 150 + Math.random() * 100);
      lineTimeouts.push(timeout);
    });

    const finishTimeout = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        document.body.style.overflow = ''; // Re-enable scrolling
        onFinished();
      }, 500); // Wait for fade-out animation
    }, lines.length * 150 + 1000); // Wait a bit after last line

    return () => {
      lineTimeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
      clearInterval(cursorInterval);
      document.body.style.overflow = ''; // Ensure scrolling is re-enabled on unmount
    };
  }, [onFinished]);

  return (
    <div className={`fixed inset-0 bg-slate-900 flex justify-center items-center z-[100] transition-opacity duration-500 ${fadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="font-mono text-sm md:text-base text-green-400 p-8 w-full max-w-3xl">
        {visibleLines.map((line, index) => (
          <p key={index} className="whitespace-pre-wrap">{line}</p>
        ))}
        {showCursor && !fadingOut && <span className="w-2 h-4 bg-green-400 inline-block align-middle animate-ping ml-2"></span>}
      </div>
    </div>
  );
};

export default TerminalIntro;
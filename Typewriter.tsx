
import React, { useState, useEffect, useCallback } from 'react';

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 2000,
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingTimeout, setTypingTimeout] = useState(typingSpeed);

  const handleTyping = useCallback(() => {
    const i = loopNum % texts.length;
    const fullText = texts[i];

    if (isDeleting) {
      setText(fullText.substring(0, text.length - 1));
    } else {
      setText(fullText.substring(0, text.length + 1));
    }

    setTypingTimeout(isDeleting ? deletingSpeed : typingSpeed);

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  }, [isDeleting, text, texts, loopNum, delay, deletingSpeed, typingSpeed]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, typingTimeout);
    return () => clearTimeout(timer);
  }, [text, handleTyping, typingTimeout]);

  return (
    <span>
      {text}
      <span className="animate-ping">|</span>
    </span>
  );
};

export default Typewriter;
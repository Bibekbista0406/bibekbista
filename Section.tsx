import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${className}`}
    >
      {title && (
        <div className="text-center mb-12 scroll-reveal-item">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-sky-500"></span>
          </h2>
        </div>
      )}
      <div>
        {children}
      </div>
    </section>
  );
};

export default Section;

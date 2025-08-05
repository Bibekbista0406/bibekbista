import React, { useState, useEffect } from 'react';
import { BIBEK_INFO, PROJECTS, SKILLS, SERVICES, TESTIMONIALS, FORMSPREE_URL } from './constants';
import Typewriter from './components/Typewriter';
import ProjectCard from './components/ProjectCard';
import SkillBadge from './components/SkillBadge';
import Section from './components/Section';
import { ChatIcon, DownloadIcon, MailIcon, QuoteIcon } from './components/icons/Icons';
import ChatAssistant from './components/ChatAssistant';
import TerminalIntro from './components/TerminalIntro';

const profilePic = "https://avatars.githubusercontent.com/u/108912758?v=4";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  const apiKeyExists = !!process.env.API_KEY;

  const handleIntroFinish = () => {
    setIntroFinished(true);
    setTimeout(() => setShowMainContent(true), 100);
  };

  useEffect(() => {
    const handleScrollAnimations = () => {
        const revealItems = document.querySelectorAll('.scroll-reveal-item');
        const windowHeight = window.innerHeight;

        revealItems.forEach(item => {
            const elementTop = item.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                (item as HTMLElement).classList.add('is-visible');
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Trigger on load

    return () => window.removeEventListener('scroll', handleScrollAnimations);
  }, [showMainContent]);


  return (
    <div className="relative min-h-screen bg-slate-900 overflow-x-hidden">
      {!introFinished && <TerminalIntro onFinished={handleIntroFinish} />}

      {showMainContent && (
        <div className="animate-fade-in-main">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-600/20 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <main className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
            {/* Header */}
            <header className="py-6 flex justify-between items-center">
              <h1 className="font-orbitron text-xl md:text-2xl font-bold text-white tracking-widest">
                <a href="#">BIBEK BISTA</a>
              </h1>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#about" className="hover:text-sky-400 transition-colors">About</a>
                <a href="#projects" className="hover:text-sky-400 transition-colors">Projects</a>
                <a href="#skills" className="hover:text-sky-400 transition-colors">Skills</a>
                <a href="#contact" className="hover:text-sky-400 transition-colors">Contact</a>
              </nav>
            </header>

            {/* Hero Section */}
            <section id="hero" className="min-h-[85vh] grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 flex justify-center items-center perspective-container animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                      <div className="absolute inset-0 bg-sky-500/80 rounded-full blur-2xl animate-pulse-slow"></div>
                      <div className="relative w-full h-full rounded-full bg-slate-800 border-2 border-sky-400 overflow-hidden shadow-2xl shadow-sky-500/20 tilt-effect">
                          <img src={profilePic} alt="Bibek Bista" className="w-full h-full object-cover" />
                      </div>
                  </div>
              </div>
              <div className="md:col-span-3 text-center md:text-left">
                  <p className="text-sky-400 text-lg animate-fade-in" style={{ animationDelay: '300ms' }}>Hello, I am</p>
                  <h2 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-white my-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
                    {BIBEK_INFO.name}
                  </h2>
                  <div className="font-orbitron text-2xl md:text-4xl lg:text-5xl font-semibold text-slate-400 h-16 md:h-20 animate-fade-in" style={{ animationDelay: '500ms' }}>
                    <Typewriter texts={[
                        "a Full Stack Developer.",
                        "a UI/UX Designer.",
                        "a Beginner Ethical Hacker.",
                        "a Video Editor.",
                        "a Calisthenics Athlete."
                      ]} />
                  </div>
                  <p className="max-w-xl mt-4 text-slate-400 mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: '600ms' }}>{BIBEK_INFO.school} | {BIBEK_INFO.location}</p>
                  <div className="mt-8 flex gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '700ms' }}>
                    <a href={BIBEK_INFO.resumeUrl} download="Bibek_Bista_Resume.pdf" className="btn-glow flex items-center gap-2 bg-sky-500 text-white font-bold py-3 px-6 rounded-md hover:bg-sky-600 transition-all duration-300">
                      <DownloadIcon />
                      Download CV
                    </a>
                    <a href="#contact" className="btn-glow flex items-center gap-2 bg-slate-700/50 border border-slate-600 text-white font-bold py-3 px-6 rounded-md hover:bg-slate-700 transition-all duration-300">
                      <MailIcon />
                      Contact Me
                    </a>
                  </div>
              </div>
            </section>

            {/* About Me Section */}
            <Section id="about" title="About Me">
              <div className="grid md:grid-cols-5 gap-10 items-center">
                <div className="md:col-span-3 scroll-reveal-item">
                  <p className="text-lg leading-relaxed text-slate-300">{BIBEK_INFO.bio}</p>
                </div>
                <div className="md:col-span-2 flex justify-center perspective-container scroll-reveal-item" style={{ transitionDelay: '200ms' }}>
                  <div className="w-64 h-64 rounded-full bg-slate-800 border-2 border-sky-500 overflow-hidden shadow-2xl shadow-sky-500/20 tilt-effect">
                    <img src={profilePic} alt="Bibek Bista" className="w-full h-full object-cover"/>
                  </div>
                </div>
              </div>
            </Section>

            {/* Projects Section */}
            <Section id="projects" title="My Projects">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
                {PROJECTS.map((project, index) => (
                  <div key={project.title} className="scroll-reveal-item" style={{ transitionDelay: `${index * 100}ms` }}>
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </Section>
            
            {/* Services Section */}
            <Section id="services" title="What I Offer">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
                    {SERVICES.map((service, index) => (
                        <div key={index} className="glassmorphic p-6 rounded-lg border border-slate-700/50 hover:border-sky-400 transition-all duration-300 transform hover:-translate-y-2 tilt-effect scroll-reveal-item" style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="mb-4">{service.icon}</div>
                            <h3 className="font-orbitron text-xl font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-slate-400">{service.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Skills Section */}
            <Section id="skills" title="My Skills">
              <div className="flex flex-wrap justify-center gap-4">
                {SKILLS.map((skill, index) => (
                  <div key={skill.name} className="scroll-reveal-item" style={{ transitionDelay: `${index * 50}ms` }}>
                    <SkillBadge skill={skill} />
                  </div>
                ))}
              </div>
            </Section>

            {/* Testimonials Section */}
            <Section id="testimonials" title="Testimonials">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
                    {TESTIMONIALS.map((testimonial, index) => (
                         <div key={index} className="glassmorphic p-6 rounded-lg flex flex-col tilt-effect scroll-reveal-item" style={{ transitionDelay: `${index * 100}ms` }}>
                            <QuoteIcon className="w-8 h-8 text-sky-400/50 mb-4"/>
                            <p className="text-slate-300 italic flex-grow">"{testimonial.quote}"</p>
                            <div className="mt-4 text-right">
                                <p className="font-bold text-white">{testimonial.author}</p>
                                <p className="text-sm text-slate-400">{testimonial.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Contact Section */}
            <Section id="contact" title="Get In Touch">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-lg mb-6 scroll-reveal-item">I'm currently available for freelance work and new opportunities. If you have a project in mind or just want to say hello, feel free to reach out!</p>
                    <form action={FORMSPREE_URL} method="POST" className="space-y-6 text-left scroll-reveal-item" style={{ transitionDelay: '200ms' }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
                            <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
                        </div>
                        <input type="text" name="subject" placeholder="Subject" required className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
                        <textarea name="message" placeholder="Your Message" rows={5} required className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"></textarea>
                        <div className="text-center">
                            <button type="submit" className="btn-glow w-full md:w-auto bg-sky-500 text-white font-bold py-3 px-10 rounded-md hover:bg-sky-600 transition-all duration-300">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </Section>

            {/* Footer */}
            <footer className="text-center py-8 border-t border-slate-800">
                <p>&copy; {new Date().getFullYear()} Bibek Bista. All rights reserved.</p>
                <p className="text-slate-500">Designed & Built by Bibek Bista with <span className="text-red-500">&hearts;</span> and code.</p>
            </footer>
          </main>

          {/* AI Chat Assistant FAB */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="btn-glow fixed bottom-6 right-6 bg-sky-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-sky-600 transition-all duration-300 z-50"
            aria-label="Open AI Chat Assistant"
          >
            <ChatIcon className="w-8 h-8" />
          </button>

          {isChatOpen && (
            <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} apiKeyExists={apiKeyExists} />
          )}
        </div>
      )}
    </div>
  );
}

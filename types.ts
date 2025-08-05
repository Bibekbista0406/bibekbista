export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveDemo: string;
  github?: string;
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
}

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
    quote: string;
    author: string;
    company: string;
}

export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  author: MessageAuthor;
  text: string;
}
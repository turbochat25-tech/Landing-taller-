export interface AppDemo {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  color: string;
  gradient: string;
  features: string[];
  ctaText: string;
  demoUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

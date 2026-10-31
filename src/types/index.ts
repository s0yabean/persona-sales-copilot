export type PersonalityType = 'Knight' | 'Explorer' | 'Healer' | 'Wizard';
export type SalesStage = 'Not Approached' | 'Opening Appointment' | 'Closing Appointment' | 'Done Deal';

export interface Client {
  id: number;
  name: string;
  personality: PersonalityType;
  company: string;
  email: string;
  industry: string;
  revenue: string;
  lastContact: string;
  age: number;
  location: string;
  yearsInIndustry: number;
  employeeCount: string;
  decisionMaker: boolean;
}

export interface PersonalityTrait {
  description: string;
  salesApproach: string;
  communicationStyle: string;
  painPoints: string[];
}

export interface AdTemplate {
  image: string;
  headline: string;
  copy: string;
  cta: string;
}

interface SocialPost {
  content: string;
  image?: string;
  hashtags: string[];
}

interface Tweet {
  content: string;
  hashtags: string[];
}

export interface MarketingContent {
  brochures: Array<{
    image: string;
    title: string;
    description: string;
    keywords: string[];
  }>;
  facebook: Array<{
    image: string;
    headline: string;
    copy: string;
    cta: string;
  }>;
  social: {
    linkedin: SocialPost[];
    tweets: Tweet[];
  };
}

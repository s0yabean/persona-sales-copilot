import { PersonalityTrait } from '../types';

export const personalityTraits: Record<string, PersonalityTrait> = {
  Knight: {
    description: "Direct decision-makers focused on results and efficiency",
    salesApproach: "Be direct, focus on ROI and concrete outcomes",
    communicationStyle: "Brief, clear, and results-oriented",
    painPoints: ["Time waste", "Inefficiency", "Lack of clear metrics"]
  },
  Explorer: {
    description: "Innovation-focused risk-takers who value creativity",
    salesApproach: "Emphasize innovation and unique solutions",
    communicationStyle: "Enthusiastic, forward-thinking, and imaginative",
    painPoints: ["Status quo", "Rigid systems", "Limited growth potential"]
  },
  Healer: {
    description: "Relationship-focused problem solvers who prioritize harmony",
    salesApproach: "Build trust and focus on long-term relationships",
    communicationStyle: "Empathetic, supportive, and collaborative",
    painPoints: ["Conflict", "Lack of support", "Poor team dynamics"]
  },
  Wizard: {
    description: "Analytical and detail-oriented strategic thinkers",
    salesApproach: "Provide detailed analysis and comprehensive data",
    communicationStyle: "Logical, thorough, and systematic",
    painPoints: ["Lack of data", "Superficial analysis", "Uncertainty"]
  }
};
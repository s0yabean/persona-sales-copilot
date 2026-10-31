import { PersonalityType } from '../types';

interface Product {
  name: string;
  description: string;
  estimatedPremium: string;
}

export const personalityProducts: Record<PersonalityType, Product> = {
  Knight: {
    name: "Protection Plan",
    description: "A premium whole life insurance plan designed for high-net-worth individuals seeking maximum coverage and wealth accumulation. Features accelerated wealth growth and exclusive privileges.",
    estimatedPremium: "$2,500 - $5,000 monthly"
  },
  Explorer: {
    name: "FlexiWealth",
    description: "A flexible investment-linked plan that combines insurance protection with dynamic investment opportunities. Perfect for those who want to actively manage their portfolio.",
    estimatedPremium: "$1,500 - $3,000 monthly"
  },
  Healer: {
    name: "LegacyShield",
    description: "A legacy-focused universal life plan with guaranteed inheritance features and family protection benefits. Ideal for creating lasting financial security for loved ones.",
    estimatedPremium: "$2,000 - $4,000 monthly"
  },
  Wizard: {
    name: "Summit Elite",
    description: "A sophisticated insurance solution that offers market-linked returns with downside protection. Features advanced analytics and customizable allocation strategies.",
    estimatedPremium: "$3,000 - $6,000 monthly"
  }
};
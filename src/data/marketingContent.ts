import { PersonalityType } from '../types';

interface BrochureItem {
  image: string;
  title: string;
  description: string;
  keywords: string[];
}

interface FacebookAd {
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

interface SocialContent {
  linkedin: SocialPost[];
  tweets: { content: string; hashtags: string[] }[];
}

interface MarketingContent {
  brochures: BrochureItem[];
  facebook: FacebookAd[];
  social: SocialContent;
}

export const getMarketingContent = (personality: PersonalityType): MarketingContent => {
  const content: Record<PersonalityType, MarketingContent> = {
    Knight: {
      brochures: [
        {
          image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1000",
          title: "Premium Protection Plan",
          description: "Premium protection strategies for high-achieving professionals",
          keywords: ["Wealth Protection", "Legacy Planning", "Premium Coverage"]
        },
        {
          image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000",
          title: "Savings / Wealth Accumulation",
          description: "Executive-class financial solutions for tomorrow's leaders",
          keywords: ["Executive Benefits", "Wealth Growth", "Strategic Planning"]
        },
        {
          image: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?auto=format&fit=crop&q=80&w=1000",
          title: "Protection Plan",
          description: "Comprehensive coverage for those who lead by example",
          keywords: ["Risk Management", "Asset Protection", "Wealth Preservation"]
        },
        {
          image: "https://images.unsplash.com/photo-1529636444744-adffc9135a5e?auto=format&fit=crop&q=80&w=1000",
          title: "Retirement Planning",
          description: "Premium wealth solutions for industry leaders",
          keywords: ["Leadership", "Elite Benefits", "Premium Protection"]
        }
      ],
      facebook: [
        {
          image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?auto=format&fit=crop&q=80&w=1000",
          headline: "Protect What You've Built",
          copy: "As a true protector, you understand the value of safeguarding what matters most. Our premium solutions help you protect and provide, always.",
          cta: "Secure Your Legacy"
        },
        {
          image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=1000",
          headline: "Your Family's Guardian",
          copy: "Stand strong as your family's protector. Our comprehensive solutions help you provide the security they deserve, today and always.",
          cta: "Protect Your Family"
        },
        {
          image: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&q=80&w=1000",
          headline: "A Legacy of Protection",
          copy: "For those who take pride in protecting and providing. Build a lasting legacy of security for generations to come.",
          cta: "Start Your Legacy"
        }
      ],
      social: {
        linkedin: [{
          content: "Your family's security isn't just a goal—it's a responsibility. Our premium solutions ensure you can protect and provide for those who matter most.\n\nSpeak with our advisors about building your legacy of protection.",
          image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&q=80&w=1000",
          hashtags: ["FamilyProtection", "FinancialSecurity", "ProtectAndProvide"]
        },
        {
          content: "True strength lies in protecting what you've built. Discover how our comprehensive solutions can help you safeguard your family's future and create a lasting legacy.",
          image: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?auto=format&fit=crop&q=80&w=1000",
          hashtags: ["FamilyFirst", "ProtectWhatMatters", "SecureTheFuture"]
        }],
        tweets: [{
          content: "Leaders protect what matters. Our premium solutions help you secure your legacy while building wealth. 💪",
          hashtags: ["WealthProtection", "Leadership"]
        }, {
          content: "Success is about more than just growth—it's about protecting what you've built. Let's secure your future together. 🏆",
          hashtags: ["FinancialSuccess", "WealthManagement"]
        }]
      }
    },
    Explorer: {
      brochures: [
        {
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=1000",
          title: "FlexiWealth",
          description: "Innovative wealth solutions for the adventurous investor",
          keywords: ["Innovation", "Growth", "Opportunity"]
        },
        {
          image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1000",
          title: "Savings / Wealth Accumulation",
          description: "Flexible financial strategies for dynamic professionals",
          keywords: ["Flexibility", "Adventure", "Discovery"]
        },
        {
          image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=1000",
          title: "Protection Plan",
          description: "Dynamic protection plans for those who seek more",
          keywords: ["Exploration", "Freedom", "Growth"]
        },
        {
          image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=1000",
          title: "Retirement Planning",
          description: "Innovative investment solutions for tomorrow's opportunities",
          keywords: ["Innovation", "Future-Ready", "Growth Potential"]
        }
      ],
      facebook: [
        {
          image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=1000",
          headline: "Life Is Your Greatest Adventure",
          copy: "Embrace every opportunity life offers! Our flexible solutions adapt to your adventurous spirit, because life is meant to be lived to the fullest.",
          cta: "Start Your Journey"
        },
        {
          image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1000",
          headline: "Chase Your Dreams",
          copy: "Life is an adventure waiting to be discovered. Our dynamic protection keeps up with your bold spirit and ambitious dreams.",
          cta: "Explore More"
        },
        {
          image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1000",
          headline: "Adventure Awaits",
          copy: "For the adventurous soul who sees life as an endless journey of possibilities. Live it fully, we've got you covered!",
          cta: "Begin Adventure"
        }
      ],
      social: {
        linkedin: [{
          content: "Life's greatest moments happen when you dare to explore! Our flexible solutions ensure you can chase your dreams while keeping your future secure.\n\nDiscover how we can protect your journey of adventure.",
          image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1000",
          hashtags: ["LiveLife", "AdventureTime", "ExploreMore"]
        },
        {
          content: "Every adventure needs a safety net. Our dynamic protection solutions adapt to your adventurous lifestyle, giving you the freedom to explore life's possibilities.",
          image: "https://images.unsplash.com/photo-1533619043865-1c2e2f32ff2f?auto=format&fit=crop&q=80&w=1000",
          hashtags: ["LifeIsAnAdventure", "ExplorerSpirit", "FreedomToExplore"]
        }],
        tweets: [{
          content: "Ready to explore new financial horizons? Our innovative solutions help you grow while staying protected. 🚀",
          hashtags: ["Innovation", "WealthGrowth"]
        }, {
          content: "Your journey to financial success should be as dynamic as you are. Let's chart your course together. ⭐",
          hashtags: ["FinancialFreedom", "WealthJourney"]
        }]
      }
    },
    Healer: {
      brochures: [
        {
          image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000",
          title: "LegacyShield",
          description: "Thoughtful financial solutions for caring professionals",
          keywords: ["Care", "Growth", "Support"]
        },
        {
          image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1000",
          title: "Protection Plan",
          description: "Holistic protection for you and your loved ones",
          keywords: ["Family", "Security", "Peace of Mind"]
        },
        {
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000",
          title: "Retirement Planning",
          description: "Legacy planning for those who care deeply",
          keywords: ["Legacy", "Impact", "Community"]
        },
        {
          image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1000",
          title: "Savings / Wealth Accumulation",
          description: "Creating lasting impact through thoughtful planning",
          keywords: ["Community", "Impact", "Sustainability"]
        }
      ],
      facebook: [
        {
          image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1000",
          headline: "Make a Lasting Difference",
          copy: "Your compassion changes lives. Our thoughtful solutions help you continue making a difference while securing your own future.",
          cta: "Create Impact"
        },
        {
          image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1000",
          headline: "Care That Counts",
          copy: "For those who dedicate their lives to helping others. Make a difference in their lives while protecting your own journey of care.",
          cta: "Start Caring"
        },
        {
          image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1000",
          headline: "Nurture Your Impact",
          copy: "Your heart for helping others deserves protection too. Let us help you continue making a difference while securing your future.",
          cta: "Nurture Growth"
        }
      ],
      social: {
        linkedin: [{
          content: "Making a difference starts with having the right support. Our thoughtful solutions help you continue your mission of care while securing your own journey.\n\nLearn how we can help you make an even bigger impact.",
          image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&q=80&w=1000",
          hashtags: ["MakeADifference", "CommunityImpact", "GivingBack"]
        },
        {
          content: "Your compassion changes lives. Let us help you protect your ability to care for others while building a sustainable future for yourself.",
          image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000",
          hashtags: ["CaringHeart", "CommunityService", "MakingADifference"]
        }],
        tweets: [{
          content: "Care for others starts with caring for yourself. Let us help protect your financial wellbeing. 💙",
          hashtags: ["FinancialCare", "Protection"]
        }, {
          content: "Your impact matters. Our solutions help you continue making a difference while securing your future. ✨",
          hashtags: ["WealthCare", "Impact"]
        }]
      }
    },
    Wizard: {
      brochures: [
        {
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
          title: "Premium Protection Plan",
          description: "Premium protection strategies for high-achieving professionals",
          keywords: ["Wealth Protection", "Legacy Planning", "Premium Coverage"]
        },
        {
          image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000",
          title: "Savings / Wealth Accumulation",
          description: "Executive-class financial solutions for tomorrow's leaders",
          keywords: ["Executive Benefits", "Wealth Growth", "Strategic Planning"]
        },
        {
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000",
          title: "Protection Plan",
          description: "Comprehensive coverage for those who lead by example",
          keywords: ["Risk Management", "Asset Protection", "Wealth Preservation"]
        },
        {
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
          title: "Retirement Planning",
          description: "Premium wealth solutions for industry leaders",
          keywords: ["Leadership", "Elite Benefits", "Premium Protection"]
        }
      ],
      facebook: [
        {
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
          headline: "Experience World-Class Excellence",
          copy: "Join an elite circle of visionaries who demand nothing but the best. Our prestigious solutions match your pursuit of excellence.",
          cta: "Claim Excellence"
        },
        {
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
          headline: "Mastery in Protection",
          copy: "For those who appreciate world-class prestige. Experience financial solutions crafted with the precision and excellence you deserve.",
          cta: "Master Your Future"
        },
        {
          image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000",
          headline: "Elite Financial Artistry",
          copy: "Where innovation meets prestige. Discover protection solutions that reflect your commitment to excellence and world-class standards.",
          cta: "Join the Elite"
        }
      ],
      social: {
        linkedin: [{
          content: "Excellence is not just a goal—it's a standard. Our prestigious solutions are crafted for those who demand world-class performance in every aspect of their lives.\n\nDiscover the art of financial mastery.",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
          hashtags: ["Excellence", "WorldClass", "FinancialMastery"]
        },
        {
          content: "Where precision meets prestige. Our sophisticated solutions are designed for those who understand that true excellence requires both innovation and expertise.",
          image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1000",
          hashtags: ["Prestige", "Innovation", "Excellence"]
        }],
        tweets: [{
          content: "Precision in wealth management matters. Our data-driven solutions help you achieve financial excellence. 📊",
          hashtags: ["WealthMastery", "Excellence"]
        }, {
          content: "Strategic wealth protection backed by advanced analytics. Because your success deserves nothing less. 💫",
          hashtags: ["FinancialStrategy", "WealthScience"]
        }]
      }
    }
  };

  return content[personality];
};
import { AdTemplate } from '../types';

export const getAdTemplates = (personality: string): AdTemplate[] => {
  const templates: Record<string, AdTemplate[]> = {
    Knight: [
      {
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1000",
        headline: "Drive Results. Not Excuses.",
        copy: "Tired of inefficient business solutions? Leaders trust us for decisive results. Cut through the noise and maximize your ROI today.",
        cta: "Get Started Now"
      },
      {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
        headline: "Time is Money. Save Both.",
        copy: "Strategic decision-makers choose our solution for 35% faster implementation and measurable outcomes. See the numbers that matter.",
        cta: "View ROI Calculator"
      },
      {
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000",
        headline: "Leaders Act. Others Wait.",
        copy: "Join industry leaders who've achieved 10x growth with our proven solutions. Clear metrics, real results.",
        cta: "Book Demo"
      }
    ],
    Explorer: [
      {
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
        headline: "Break New Ground",
        copy: "Discover innovative solutions that push boundaries. Be the first to leverage next-gen technology in your industry.",
        cta: "Explore Innovation"
      },
      {
        image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1000",
        headline: "Future-Proof Your Business",
        copy: "Stay ahead of the curve with cutting-edge solutions. Transform your industry's landscape today.",
        cta: "See the Future"
      },
      {
        image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000",
        headline: "Innovate or Get Left Behind",
        copy: "Join the innovation revolution. Our platform helps visionaries like you reshape the future.",
        cta: "Start Innovating"
      }
    ],
    Healer: [
      {
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1000",
        headline: "Build Lasting Relationships",
        copy: "Create meaningful connections with your customers. Our solution helps you understand and serve them better.",
        cta: "Start Connecting"
      },
      {
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000",
        headline: "Empower Your Community",
        copy: "Transform how you support your customers. Build trust and loyalty through meaningful engagement.",
        cta: "Learn More"
      },
      {
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1000",
        headline: "Care Made Simple",
        copy: "Streamline your customer care process while maintaining that personal touch. Because every interaction matters.",
        cta: "See How"
      }
    ],
    Wizard: [
      {
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1000",
        headline: "Data-Driven Excellence",
        copy: "Harness the power of advanced analytics. Make informed decisions based on comprehensive data insights.",
        cta: "Analyze Now"
      },
      {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
        headline: "Master Your Metrics",
        copy: "Deep dive into your performance metrics. Uncover patterns and optimize your strategy with precision.",
        cta: "Get Insights"
      },
      {
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
        headline: "Analytics at Scale",
        copy: "Transform complex data into actionable insights. Make strategic decisions with confidence.",
        cta: "Start Analysis"
      }
    ]
  };

  return templates[personality] || templates.Knight;
};
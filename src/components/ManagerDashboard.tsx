import { useState } from 'react';

interface PersonalityMetrics {
  total: number;
  meetings: number;
  closed: number;
}

interface RMStats {
  id: number;
  name: string;
  personality: 'Knight' | 'Explorer' | 'Healer' | 'Wizard';
  metrics: {
    knight: PersonalityMetrics;
    explorer: PersonalityMetrics;
    healer: PersonalityMetrics;
    wizard: PersonalityMetrics;
  };
  redFlags: string[];
  strengths: string[];
}

// SYNTHETIC DATA: fictional relationship managers with invented pipeline numbers.
const rmData: RMStats[] = [
  {
    id: 1,
    name: "RM Alder Finch",
    personality: 'Knight',
    metrics: {
      knight: { total: 120, meetings: 78, closed: 39 },
      explorer: { total: 80, meetings: 32, closed: 8 },
      healer: { total: 60, meetings: 21, closed: 2 },
      wizard: { total: 40, meetings: 14, closed: 1 }
    },
    redFlags: [
      "Low conversion rate with non-Knight clients (<25%)",
      "Poor performance with Wizard clients (7% close rate)",
      "Healer client engagement needs improvement (35% meeting rate)"
    ],
    strengths: [
      "Strong Knight client performance (65% meeting rate, 50% close rate)",
      "Good Explorer client engagement (40% meeting rate)",
      "Efficient management of large Knight portfolio",
      "Clear strength in direct communication style"
    ]
  },
  {
    id: 2,
    name: "RM Briar Cole",
    personality: 'Explorer',
    metrics: {
      knight: { total: 70, meetings: 49, closed: 6 },
      explorer: { total: 130, meetings: 60, closed: 46 },
      healer: { total: 50, meetings: 35, closed: 4 },
      wizard: { total: 45, meetings: 16, closed: 2 }
    },
    redFlags: [
      "Low conversion with Knight clients (12% of meetings)",
      "Weak performance with Wizard types (12.5% close rate)",
      "Meeting efficiency needs improvement outside Explorer segment"
    ],
    strengths: [
      "Excellent Explorer client management (77% close rate)",
      "Strong overall meeting scheduling ability",
      "Good portfolio size with Explorer clients (130)",
      "Effective at converting Explorer meetings to clients"
    ]
  },
  {
    id: 3,
    name: "RM Cyrus Dane",
    personality: 'Healer',
    metrics: {
      knight: { total: 85, meetings: 16, closed: 2 },
      explorer: { total: 55, meetings: 22, closed: 4 },
      healer: { total: 110, meetings: 98, closed: 49 },
      wizard: { total: 95, meetings: 12, closed: 2 }
    },
    redFlags: [
      "Low conversion with non-Healer clients (only 8 closed from 50 meetings)",
      "Meeting rate with Knight/Wizard clients below 20%",
      "Large untapped potential in Knight portfolio (85 clients, only 16 meetings)",
      "Consider redistributing non-Healer clients to better-matched RMs"
    ],
    strengths: [
      "Outstanding performance with Healer clients (89% meeting rate)",
      "Strong close rate with Healer clients (50% of meetings)",
      "Efficiently manages large Healer portfolio (110 clients)",
      "Shows excellent potential to scale Healer client base"
    ]
  },
  {
    id: 4,
    name: "RM Della Frost",
    personality: 'Wizard',
    metrics: {
      knight: { total: 21, meetings: 14, closed: 2 },
      explorer: { total: 25, meetings: 10, closed: 3 },
      healer: { total: 34, meetings: 15, closed: 4 },
      wizard: { total: 164, meetings: 94, closed: 47 }
    },
    redFlags: [
      "Heavy reliance on Wizard clients (164 out of 244 total clients)",
      "Low close rates with non-Wizard clients (15% average)",
      "Could benefit from more balanced client portfolio"
    ],
    strengths: [
      "Excellent Wizard client conversion rate (50% of meetings)",
      "Strong meeting rate with Wizard clients (57%)",
      "Proven ability to manage large specialized portfolio",
      "Good at complex case management"
    ]
  },
  {
    id: 5,
    name: "RM Emery Gale",
    personality: 'Knight',
    metrics: {
      knight: { total: 100, meetings: 77, closed: 39 },
      explorer: { total: 42, meetings: 28, closed: 7 },
      healer: { total: 38, meetings: 14, closed: 2 },
      wizard: { total: 120, meetings: 40, closed: 20 }
    },
    redFlags: [
      "Low engagement with Healer clients (37% meeting rate, 14% close rate)",
      "Underperforming with Explorer clients (25% close rate)",
      "Large Wizard portfolio with moderate performance (33% meeting rate)",
      "Could improve non-Knight conversion rates"
    ],
    strengths: [
      "Strong Knight client metrics (77% meeting rate, 51% close rate)",
      "Good Wizard client close rate (50% of meetings)",
      "Effective at managing large client portfolios",
      "Balanced performance between Knight and Wizard segments"
    ]
  },
  {
    id: 6,
    name: "RM Flynn Harte",
    personality: 'Explorer',
    metrics: {
      knight: { total: 50, meetings: 18, closed: 4 },
      explorer: { total: 125, meetings: 87, closed: 44 },
      healer: { total: 45, meetings: 16, closed: 3 },
      wizard: { total: 55, meetings: 19, closed: 4 }
    },
    redFlags: [
      "Low meeting rates with non-Explorer clients (<40%)",
      "Poor conversion outside Explorer segment (<22%)",
      "Needs more balanced client engagement approach"
    ],
    strengths: [
      "Excellent Explorer metrics (70% meeting rate, 51% close rate)",
      "Strong management of large Explorer portfolio",
      "Consistent performance with primary client type",
      "Good at maintaining Explorer client relationships"
    ]
  },
  {
    id: 7,
    name: "RM Greer Ives",
    personality: 'Healer',
    metrics: {
      knight: { total: 65, meetings: 39, closed: 12 },
      explorer: { total: 82, meetings: 42, closed: 13 },
      healer: { total: 75, meetings: 53, closed: 21 },
      wizard: { total: 60, meetings: 36, closed: 11 }
    },
    redFlags: [
      "Close rates consistently below 35% across all types",
      "High meeting count (170) but low conversion (57 closed)",
      "Healer portfolio underperforming compared to peers",
      "Time management concerns with high meeting volume"
    ],
    strengths: [
      "Consistent meeting rates across all personality types",
      "Good at initial client engagement (60%+ meeting rate)",
      "Well-balanced portfolio distribution",
      "Strong potential for improvement with focused training"
    ]
  },
  {
    id: 8,
    name: "RM Hollis Jett",
    personality: 'Wizard',
    metrics: {
      knight: { total: 45, meetings: 16, closed: 3 },
      explorer: { total: 50, meetings: 18, closed: 4 },
      healer: { total: 40, meetings: 14, closed: 2 },
      wizard: { total: 140, meetings: 98, closed: 49 }
    },
    redFlags: [
      "Very low engagement with non-Wizard clients (<40% meeting rate)",
      "Poor conversion rates outside Wizard segment (<20%)",
      "Significant imbalance in portfolio distribution"
    ],
    strengths: [
      "High meeting rate with Wizard clients (70%)",
      "Strong close rate on Wizard meetings (50%)",
      "Excellent performance with technical clients",
      "Clear specialization benefits with Wizard type"
    ]
  },
  {
    id: 9,
    name: "RM Indra Kane",
    personality: 'Explorer',
    metrics: {
      knight: { total: 55, meetings: 19, closed: 4 },
      explorer: { total: 120, meetings: 84, closed: 42 },
      healer: { total: 45, meetings: 16, closed: 3 },
      wizard: { total: 50, meetings: 18, closed: 4 }
    },
    redFlags: [
      "Low engagement with non-Explorer clients (<40% meeting rate)",
      "Poor conversion rates outside Explorer segment (<21%)",
      "Needs to improve cross-personality communication"
    ],
    strengths: [
      "Strong Explorer performance (70% meeting rate, 50% close rate)",
      "Effective management of Explorer portfolio",
      "Consistent results with target segment",
      "Good at building Explorer client relationships"
    ]
  },
  {
    id: 10,
    name: "RM Juno Lark",
    personality: 'Knight',
    metrics: {
      knight: { total: 115, meetings: 80, closed: 40 },
      explorer: { total: 65, meetings: 23, closed: 5 },
      healer: { total: 45, meetings: 16, closed: 3 },
      wizard: { total: 50, meetings: 18, closed: 4 }
    },
    redFlags: [
      "Low performance with non-Knight clients (<22% close rate)",
      "Poor engagement with Healer types (36% meeting rate)",
      "Needs to improve versatility across client types",
      "Consider redistributing non-Knight clients"
    ],
    strengths: [
      "Excellent Knight client metrics (70% meeting rate, 50% close rate)",
      "Strong management of large Knight portfolio",
      "Efficient conversion of Knight client meetings",
      "Clear strength in primary client segment"
    ]
  }
];

const PersonalityMetricCard = ({ 
  type, 
  metrics, 
  color,
  maxClients,
  isRMType,
  rmFirstName
}: { 
  type: string; 
  metrics: PersonalityMetrics; 
  color: string;
  maxClients: number;
  isRMType: boolean;
  rmFirstName: string;
}) => {
  const meetingRate = (metrics.meetings / metrics.total) * 100;
  const closeRate = (metrics.closed / metrics.meetings) * 100;
  
  // Calculate size ratio for the chart container with maximum limit
  const sizeRatio = 0.6 + (0.8 * metrics.total / maxClients);
  const containerSize = Math.min(Math.round(sizeRatio * 180), 220); // Added maximum size of 160px

  return (
    <div className={`p-6 rounded-lg shadow-sm flex flex-col ${
      isRMType ? 'bg-purple-50 border-2 border-purple-300' : 'bg-white'
    }`} style={{ width: '100%', height: '350px' }}>
      <div className="flex items-center gap-2 mb-4">
        <h3 className={`font-medium ${isRMType ? 'text-purple-700' : 'text-gray-800'}`}>
          {type} Clients
        </h3>
        {isRMType && (
          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-medium">
            {rmFirstName[0]}
          </div>
        )}
      </div>

      {/* Chart container with fixed height */}
      <div className="h-[180px] flex items-center justify-center">
        <div className="relative" style={{ width: containerSize, height: containerSize }}>
          {/* Outer ring - Meeting Rate */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                ${color.replace('0.8', '0.4')} ${meetingRate}%,
                rgba(229, 231, 235, 0.2) ${meetingRate}% 100%
              )`,
              transform: 'rotate(-90deg)'
            }}
          >
            {/* White center to create ring effect for outer circle */}
            <div 
              className="absolute rounded-full bg-white"
              style={{ inset: '10%' }}
            />
          </div>
          
          {/* Inner ring - Close Rate */}
          <div 
            className="absolute rounded-full"
            style={{
              inset: '10%',
              background: `conic-gradient(
                ${color.replace('0.8', '1')} ${closeRate * (meetingRate/100)}%,
                rgba(229, 231, 235, 0.1) ${closeRate * (meetingRate/100)}% 100%
              )`,
              transform: 'rotate(-90deg)'
            }}
          >
            {/* White center to create ring effect for inner circle */}
            <div 
              className="absolute rounded-full bg-white"
              style={{ inset: '20%' }}
            />
          </div>
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <p className="text-3xl font-bold text-gray-800">{metrics.total}</p>
            <p className="text-sm text-gray-500">clients</p>
          </div>
        </div>
      </div>

      {/* Legend below chart with fixed positioning */}
      <div className="mt-auto space-y-2 w-full">
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-600 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color.replace('0.8', '0.4') }}></span>
            Meet Rate:
          </span>
          <div>
            <span className="font-medium">{Math.round(meetingRate)}%</span>
            <span className="text-sm text-gray-500 ml-1">({metrics.meetings}/{metrics.total})</span>
          </div>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-600 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color.replace('0.8', '1') }}></span>
            Close Rate:
          </span>
          <div>
            <span className="font-medium">{Math.round(closeRate)}%</span>
            <span className="text-sm text-gray-500 ml-1">({metrics.closed}/{metrics.meetings})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ManagerDashboard() {
  const [selectedRM, setSelectedRM] = useState(rmData[0]);

  // Calculate maxClients from the selected RM's metrics
  const maxClients = Math.max(
    selectedRM.metrics.knight.total,
    selectedRM.metrics.explorer.total,
    selectedRM.metrics.healer.total,
    selectedRM.metrics.wizard.total
  );

  return (
    <div className="space-y-6">
      {/* RM Selector */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <select 
          className="w-full p-2 border rounded-md"
          onChange={(e) => setSelectedRM(rmData.find(rm => rm.id === Number(e.target.value)) || rmData[0])}
        >
          {rmData.map(rm => (
            <option key={rm.id} value={rm.id}>{rm.name}</option>
          ))}
        </select>
      </div>

      {/* Personality Type Metrics */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        <PersonalityMetricCard 
          type="Knight" 
          metrics={selectedRM.metrics.knight}
          color="rgba(234, 179, 8, 0.8)"
          maxClients={maxClients}
          isRMType={selectedRM.personality === 'Knight'}
          rmFirstName={selectedRM.name.split(' ')[1]}
        />
        <PersonalityMetricCard 
          type="Explorer" 
          metrics={selectedRM.metrics.explorer}
          color="rgba(59, 130, 246, 0.8)"
          maxClients={maxClients}
          isRMType={selectedRM.personality === 'Explorer'}
          rmFirstName={selectedRM.name.split(' ')[1]}
        />
        <PersonalityMetricCard 
          type="Healer" 
          metrics={selectedRM.metrics.healer}
          color="rgba(34, 197, 94, 0.8)"
          maxClients={maxClients}
          isRMType={selectedRM.personality === 'Healer'}
          rmFirstName={selectedRM.name.split(' ')[1]}
        />
        <PersonalityMetricCard 
          type="Wizard" 
          metrics={selectedRM.metrics.wizard}
          color="rgba(239, 68, 68, 0.8)"
          maxClients={maxClients}
          isRMType={selectedRM.personality === 'Wizard'}
          rmFirstName={selectedRM.name.split(' ')[1]}
        />
      </div>

      {/* Manager Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-medium text-gray-800 mb-4">Manager Recommendations</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-indigo-600 mb-2">Coaching Points</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {selectedRM.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-red-600 mb-2">Areas for Improvement</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {selectedRM.redFlags.map((flag, index) => (
                <li key={index}>{flag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
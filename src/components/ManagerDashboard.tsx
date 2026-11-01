import { useState } from 'react';
import { funnelRates } from '../lib/persona';
import { PersonalityMetrics, rmData } from '../data/rmStats';

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
  const { meetingRate, closeRate, closedRate } = funnelRates(metrics);
  
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
                ${color.replace('0.8', '1')} ${closedRate}%,
                rgba(229, 231, 235, 0.1) ${closedRate}% 100%
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
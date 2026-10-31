import { useState } from 'react';
import { Client } from '../types';
import { personalityTraits } from '../data/personalityTraits';
import { personalityProducts } from '../data/products';
import { FileText, Users, Megaphone, X } from 'lucide-react';
import FacebookAdsModal from './FacebookAdsModal';
import FiscalReportModal from './FiscalReportModal';
import RoleplayModal from './RoleplayModal';
import Avatar from './Avatar';

interface ClientDetailsProps {
  client: Client;
  onClose: () => void;
}

export default function ClientDetails({ client, onClose }: ClientDetailsProps) {
  const [showAdsModal, setShowAdsModal] = useState(false);
  const [showFiscalModal, setShowFiscalModal] = useState(false);
  const [showRoleplayModal, setShowRoleplayModal] = useState(false);
  const trait = personalityTraits[client.personality];

  const features = [
    {
      title: "Roleplay Practice Session",
      icon: Users,
      description: `Practice your pitch to our bots that mimics ${client.name}`,
      action: () => setShowRoleplayModal(true)
    },
    {
      title: "Generate Fiscal Report",
      icon: FileText,
      description: `Personal report for ${client.name} to build rapport in meetings`,
      action: () => setShowFiscalModal(true)
    },
    {
      title: "Client Engagement",
      icon: Megaphone,
      description: `Personalized digital messages for ${client.name}`,
      action: () => setShowAdsModal(true)
    }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className={`rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
          client.personality === 'Knight' ? 'bg-yellow-100' :
          client.personality === 'Explorer' ? 'bg-blue-100' :
          client.personality === 'Healer' ? 'bg-green-100' :
          'bg-red-100'
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <Avatar name={client.name} personality={client.personality} size="lg" />
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-800">{client.name}</h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border border-gray-900 ${
                      client.personality === 'Knight' ? 'bg-yellow-100 text-yellow-800' :
                      client.personality === 'Explorer' ? 'bg-blue-100 text-blue-800' :
                      client.personality === 'Healer' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {client.personality}
                    </span>
                  </div>
                  <p className="text-gray-700">{client.company}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${
                  client.personality === 'Knight' ? 'hover:bg-yellow-200' :
                  client.personality === 'Explorer' ? 'hover:bg-blue-200' :
                  client.personality === 'Healer' ? 'hover:bg-green-200' :
                  'hover:bg-red-200'
                }`}
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-lg mb-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3">Client Demographics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700">Age: {client.age}</p>
                    <p className="text-gray-700">Location: {client.location}</p>
                    <p className="text-gray-700">Industry: {client.industry}</p>
                  </div>
                  <div>
                    <p className="text-gray-700">Years in Industry: {client.yearsInIndustry}</p>
                    <p className="text-gray-700">Employee Count: {client.employeeCount}</p>
                    <p className="text-gray-700">Decision Maker: {client.decisionMaker ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-lg mb-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3">Recommended Product</h3>
                <div className="space-y-3">
                  <h4 className="font-medium text-indigo-600">
                    {personalityProducts[client.personality].name}
                  </h4>
                  <p className="text-gray-700">
                    {personalityProducts[client.personality].description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Estimated Premium:</span>
                    <span className="text-gray-700">{personalityProducts[client.personality].estimatedPremium}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={feature.action}
                    className={`p-4 rounded-lg transition-all text-left bg-white bg-opacity-80 shadow-md hover:shadow-xl border-2 ${
                      client.personality === 'Knight' ? 'border-yellow-400 hover:bg-yellow-50' :
                      client.personality === 'Explorer' ? 'border-blue-400 hover:bg-blue-50' :
                      client.personality === 'Healer' ? 'border-green-400 hover:bg-green-50' :
                      'border-red-400 hover:bg-red-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <feature.icon className={`w-6 h-6 ${
                        client.personality === 'Knight' ? 'text-yellow-600' :
                        client.personality === 'Explorer' ? 'text-blue-600' :
                        client.personality === 'Healer' ? 'text-green-600' :
                        'text-red-600'
                      }`} />
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-gray-700">{feature.description}</p>
                  </button>
                ))}
              </div>

              <div className="bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Personality Profile: {client.personality}</h3>
                <p className="text-gray-700 mb-2">{trait.description}</p>
                <h4 className="font-medium text-gray-800 mb-1">Recommended Approach:</h4>
                <p className="text-gray-700 mb-2">{trait.salesApproach}</p>
                <h4 className="font-medium text-gray-800 mb-1">Key Pain Points:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {trait.painPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAdsModal && (
        <FacebookAdsModal client={client} onClose={() => setShowAdsModal(false)} />
      )}
      {showFiscalModal && (
        <FiscalReportModal client={client} onClose={() => setShowFiscalModal(false)} />
      )}
      {showRoleplayModal && (
        <RoleplayModal client={client} onClose={() => setShowRoleplayModal(false)} />
      )}
    </>
  );
}
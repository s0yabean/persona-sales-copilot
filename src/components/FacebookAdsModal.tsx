import { useState } from 'react';
import { X, Layout, MessageCircle, Mail } from 'lucide-react';
import { Client } from '../types';
import { getMarketingContent } from '../data/marketingContent';

interface FacebookAdsModalProps {
  client: Client;
  onClose: () => void;
}

type TabType = 'brochures' | 'whatsapp' | 'social';

export default function FacebookAdsModal({ client, onClose }: FacebookAdsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('brochures');
  const content = getMarketingContent(client.personality);

  const tabs = [
    { id: 'brochures' as TabType, label: 'High Impact Visuals', icon: Layout },
    { id: 'whatsapp' as TabType, label: 'WhatsApp Messaging', icon: MessageCircle },
    { id: 'social' as TabType, label: 'Email Messaging', icon: Mail }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Personalized Messages for {client.name}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <div className="border-b">
              <div className="flex space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {activeTab === 'brochures' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {content.brochures.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border flex flex-col">
                      <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                      <div className="p-3 flex-1">
                        <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {item.keywords.map((keyword, idx) => (
                            <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 border-t flex justify-end mt-auto">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                          <Layout className="w-4 h-4" />
                          Use Template
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="space-y-8">
                {content.facebook.map((message, index) => (
                  <div key={index} className="bg-[#efeae2] rounded-lg overflow-hidden">
                    <div className="bg-[#075e54] text-white px-4 py-2 flex items-center gap-3">
                      <img
                        src="/persona-icon.svg"
                        alt="Example Bank"
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">Relationship Manager</h3>
                        <p className="text-xs opacity-80">online</p>
                      </div>
                    </div>
                    
                    <div className="p-4 min-h-[200px]">
                      <div className="flex justify-end">
                        <div className="bg-[#dcf8c6] text-[#303030] p-2 rounded-lg max-w-[80%] shadow-sm relative message-tail-right">
                          {message.image && (
                            <div className="mb-2 rounded-lg overflow-hidden">
                              <img 
                                src={message.image} 
                                alt="" 
                                className="w-full"
                              />
                            </div>
                          )}
                          <p className="text-sm mb-1 whitespace-pre-line">
                            {message.copy}
                            {'\n\n'}
                            Would you like to book a call to discuss this further?
                          </p>
                          <div className="flex justify-end items-center gap-1">
                            <span className="text-[11px] text-[#667781]">12:30 PM</span>
                            <span className="text-[11px] text-[#53bdeb]">✓✓</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#075e54] px-4 py-3 flex justify-end">
                      <button className="bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#1ea952] transition-colors flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Send Message Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-6">
                {content.social.linkedin.map((email, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border">
                    <div className="bg-gray-50 border-b px-4 py-3">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src="/persona-icon.svg"
                          alt="Example Bank"
                          className="w-8 h-8 rounded-full border border-gray-200"
                        />
                        <div>
                          <p className="font-medium text-gray-800">Relationship Manager</p>
                          <p className="text-sm text-gray-500">rm@example.com</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">To: {client.email}</p>
                        <p className="font-medium text-gray-800">
                          {client.personality === 'Knight' && "Your Financial Protection Strategy - Next Steps"}
                          {client.personality === 'Explorer' && "Discover Innovative Financial Solutions Tailored for You"}
                          {client.personality === 'Healer' && "Creating Lasting Impact Together - Your Financial Journey"}
                          {client.personality === 'Wizard' && "Strategic Financial Analysis and Opportunities"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="prose max-w-none">
                        <p className="text-gray-700 mb-4">Dear {client.name},</p>
                        <div className="whitespace-pre-wrap text-gray-700 mb-4">
                          {email.content}
                        </div>
                        {email.image && (
                          <img src={email.image} alt="" className="w-full rounded-lg mb-4" />
                        )}
                        <div className="text-gray-700">
                          <p>Best regards,</p>
                          <p>Your Relationship Manager</p>
                          <div className="mt-4 pt-4 border-t">
                            <img
                              src="/persona-icon.svg"
                              alt="Example Bank"
                              className="h-8 mb-2"
                            />
                            <p className="text-sm text-gray-600">Example Bank (fictional)</p>
                            <p className="text-sm text-gray-600">Contact: +00 0000 0000 (placeholder)</p>
                            <p className="text-xs text-gray-500 mt-2">
                              This email is confidential and intended solely for the recipient.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Template {index + 1} of {content.social.linkedin.length}
                      </div>
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Send Email Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Client, PersonalityType, SalesStage } from '../types';
import { ThreeDots } from "react-loader-spinner";
import {prompts} from '../constants/prompts'
import ReactMarkdown from 'react-markdown';


interface RoleplayModalProps {
  client: Client;
  onClose: () => void;
}

interface MessageType {
  text: string;
  isClient: boolean;
}

export default function RoleplayModal({ client, onClose }: RoleplayModalProps) {
  const [stage, setStage] = useState<SalesStage>('Not Approached');
  const [messages, setMessages] = useState<MessageType[]>([]);
  
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  
  const getPrompt = (personality : PersonalityType, stage : SalesStage) =>{
    return prompts[personality].salestype[stage];
  }
  
  const salesCyclePrompt = getPrompt(client.personality, stage);
  const personalityPrompt = prompts[client.personality].prompt;
  
  const mainPrompts = `You are a client that is helping a salesperson practice his pitch. This is your personality: ${personalityPrompt}. This is the current sales cycle: ${salesCyclePrompt}`
  
  const [conversationMessage, setConversationMessage] = useState<{ role: string; content: string }[]>([
    { role: 'system', content: mainPrompts },
  ]);
  
  const fetchApiResponse = async () => {
    try {
    setLoading(true);
      
      const updatedConversation = [
        ...conversationMessage,
        { role: 'user', content: newMessage }
      ];

      setConversationMessage(updatedConversation);      
  
      // Goes to the local server route (server/chatRoute.ts), which holds any LLM key.
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedConversation, persona: client.personality }),
      });
      if (!res.ok) throw new Error(`Chat route returned ${res.status}`);
      const result = { data: await res.json() };

      setTimeout(()=> {
        setMessages((prev: MessageType[]) => [
          ...prev,
          { text: result.data.response, isClient: true }
        ]);
        setConversationMessage((prevMessage) => [...prevMessage, {'role' : 'assistant', content : result.data.response}
        ])
        setLoading(false);
      }, 1000);

    } catch (err) {
      console.error("Error fetching response from API:", err);
      setLoading(false);
    }
  };
  

  const handleStageChange = (newStage: SalesStage) => {
    setStage(newStage);
    setHasStartedChat(false);
    setMessages([]);
    
    // Reset conversation with new stage prompt
    const newSalesCyclePrompt = getPrompt(client.personality, newStage);
    const newMainPrompt = `You are a client that is helping a salesperson practice his pitch. This is your personality: ${personalityPrompt}. This is the current sales cycle: ${newSalesCyclePrompt}`;
    
    setConversationMessage([
      { role: 'system', content: newMainPrompt }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setHasStartedChat(true);
    setMessages((prev: MessageType[]) => [...prev, { text: newMessage, isClient: false }]);
    fetchApiResponse();
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh]">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Roleplay with Chatbots</h2>
                <p className="text-gray-600 text-sm">{client.company}</p>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="mt-4">
              <select
                value={stage}
                onChange={(e) => handleStageChange(e.target.value as SalesStage)}
                className="w-full p-2 border rounded-md"
              >
                <option value="Not Approached">Not Approached</option>
                <option value="Opening Appointment">Opening Appointment</option>
                <option value="Closing Appointment">Closing Appointment</option>
                <option value="Done Deal">Done Deal</option>
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!hasStartedChat ? (
              <div className="text-center text-gray-500 mt-8">
                <p>Start the conversation by sending a message to the client</p>
                <p className="text-sm mt-2">💬 Type your message below and press send</p>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isClient ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isClient
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <ThreeDots
                      height="30"
                      width="30"
                      radius="3"
                      color="#4B5563"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-md"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
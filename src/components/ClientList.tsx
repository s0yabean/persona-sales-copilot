import { useState } from 'react';
import { Client } from '../types';
import { clients } from '../data/clients';
import { Users, Filter } from 'lucide-react';
import Avatar from './Avatar';
import { PERSONALITIES, PersonalityFilter, filterClients } from '../lib/persona';

interface ClientListProps {
  onClientSelect: (client: Client) => void;
}

export default function ClientList({ onClientSelect }: ClientListProps) {
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityFilter>('All');
  
  const filteredClients = filterClients(clients, selectedPersonality);

  const personalities: PersonalityFilter[] = ['All', ...PERSONALITIES];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select 
            value={selectedPersonality}
            onChange={(e) => setSelectedPersonality(e.target.value as PersonalityFilter)}
            className="border rounded-md px-3 py-1.5 text-gray-700 focus:ring-2 focus:ring-indigo-500"
          >
            {personalities.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map(client => (
          <div
            key={client.id}
            onClick={() => onClientSelect(client)}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer bg-gray-50 hover:bg-white"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={client.name} personality={client.personality} />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{client.name}</h3>
                <p className="text-gray-600 text-sm">{client.company}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">{client.industry}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                client.personality === 'Knight' ? 'bg-yellow-100 text-yellow-800' :
                client.personality === 'Explorer' ? 'bg-blue-100 text-blue-800' :
                client.personality === 'Healer' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {client.personality}
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-2">Last Contact: {client.lastContact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
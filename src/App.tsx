import { useState } from 'react';
import ClientList from './components/ClientList';
import ClientDetails from './components/ClientDetails';
import ManagerDashboard from './components/ManagerDashboard';
import { Client } from './types';

function App() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [currentView, setCurrentView] = useState<'rm' | 'manager'>('rm');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src="/persona-icon.svg"
                alt=""
                className="h-10 w-auto"
              />
              <h1 className="text-2xl font-bold text-gray-900">Persona Sales Copilot</h1>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Demo · synthetic data
              </span>
            </div>
            <nav className="flex gap-4">
              <button
                onClick={() => setCurrentView('rm')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'rm'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                RM View
              </button>
              <button
                onClick={() => setCurrentView('manager')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'manager'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Manager View
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {currentView === 'rm' ? (
          <>
            <ClientList onClientSelect={setSelectedClient} />
            {selectedClient && (
              <ClientDetails 
                client={selectedClient} 
                onClose={() => setSelectedClient(null)} 
              />
            )}
          </>
        ) : (
          <ManagerDashboard />
        )}
      </main>
    </div>
  );
}

export default App;
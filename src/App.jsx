import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './components/Layout/DashboardLayout';
import CreateIntentForm from './components/Dashboard/CreateIntentForm';
import OrderBookTable from './components/Dashboard/OrderBookTable';
import ComplianceAdmin from './components/Dashboard/ComplianceAdmin';
import { Web3Provider } from './context/Web3Context';

function App() {
  const [activeView, setActiveView] = useState('book');

  return (
    <Web3Provider>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#1f2937',
          color: '#f3f4f6',
          border: '1px solid #374151',
        }
      }} />
      <DashboardLayout activeView={activeView} setActiveView={setActiveView}>
        {activeView === 'book' && <OrderBookTable />}
        {activeView === 'create' && <CreateIntentForm />}
        {activeView === 'admin' && <ComplianceAdmin />}
      </DashboardLayout>
    </Web3Provider>
  );
}

export default App;

import React, { useState } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import CreateIntentForm from './components/Dashboard/CreateIntentForm';
import OrderBookTable from './components/Dashboard/OrderBookTable';
import ComplianceAdmin from './components/Dashboard/ComplianceAdmin';

function App() {
  const [activeView, setActiveView] = useState('book');

  return (
    <DashboardLayout activeView={activeView} setActiveView={setActiveView}>
      {activeView === 'book' && <OrderBookTable />}
      {activeView === 'create' && <CreateIntentForm />}
      {activeView === 'admin' && <ComplianceAdmin />}
    </DashboardLayout>
  );
}

export default App;

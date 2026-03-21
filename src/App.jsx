import React, { useState } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import CreateIntentForm from './components/Dashboard/CreateIntentForm';
import OrderBookTable from './components/Dashboard/OrderBookTable';

function App() {
  const [activeView, setActiveView] = useState('create');

  return (
    <DashboardLayout activeView={activeView} setActiveView={setActiveView}>
      {activeView === 'create' ? <CreateIntentForm /> : <OrderBookTable />}
    </DashboardLayout>
  );
}

export default App;

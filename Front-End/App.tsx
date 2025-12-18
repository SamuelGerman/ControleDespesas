import React, { useState } from 'react';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import PeoplePage from './pages/PeoplePage';
import CategoriesPage from './pages/CategoriesPage';
import TransactionsPage from './pages/TransactionsPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'people': return <PeoplePage />;
      case 'categories': return <CategoriesPage />;
      case 'transactions': return <TransactionsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
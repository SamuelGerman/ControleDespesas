import React from 'react';
import { LayoutDashboard, Users, Tags, Receipt, Wallet } from 'lucide-react';

interface LayoutProps {
  content: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}
// Componente de Layout que inclui um menu lateral e uma área de conteúdo principal,
// renderizados de acordo com a página ativa (content é o componente que será renderizado na seção do conteudo principal) e permite navegação entre páginas.
const Layout: React.FC<LayoutProps> = ({ content, activePage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transações', icon: Receipt },
    { id: 'people', label: 'Pessoas', icon: Users },
    { id: 'categories', label: 'Categorias', icon: Tags },
  ];

  const currentPageLabel = menuItems.find(m => m.id === activePage)?.label;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Menu lateral */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
            <Wallet size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Controle de Gastos</h1>
          </div>
        </div>
        {/* Construção dos itens do menu lateral com .map */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <div className="bg-slate-900 rounded-xl p-4 text-white">
            <p className="text-xs text-slate-400 mb-1">Status do Sistema</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-8 justify-between sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-slate-800">{currentPageLabel}</h2>
          <div className="text-sm text-slate-500">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {content} {/* Conteúdo principal renderizado aqui  */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
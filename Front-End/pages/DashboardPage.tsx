import React, { useEffect, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Person, Category, Transaction, TransactionType } from '../types';
import { api } from '../services/apiService';
import { ArrowUpCircle, ArrowDownCircle, DollarSign, RefreshCw, AlertTriangle } from 'lucide-react';

// Página de Dashboard que exibe uma visão geral das finanças, incluindo totais e gráficos.
// Usa useStates para armazenar pessoas e transações, e useEffect para carregar dados da API ao montar o componente.
// Utiliza useMemo para calcular totais e dados do gráfico somente quando necessário.
// Utiliza Recharts para renderizar gráficos de barras.
const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [people, transactions] = await Promise.all([api.people.list(), api.transactions.list()]);
      setPeople(people);
      setTransactions(transactions);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Cálculos
  const totals = useMemo(() => {
    const income = transactions.filter(t => t.type === TransactionType.INCOME).reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((acc, t) => acc + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const personChartData = useMemo(() => {
    return people.map(p => {
      const pTrans = transactions.filter(t => t.personId === p.id);
      const income = pTrans.filter(t => t.type === TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);
      const expense = pTrans.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0);
      return { name: p.name, Receitas: income, Despesas: expense };
    });
  }, [people, transactions]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  if (loading) return <div className="flex h-full items-center justify-center text-slate-400 gap-2"><RefreshCw className="animate-spin" /> Carregando dados...</div>;
  if (error) return (
    <div className="flex flex-col h-full items-center justify-center gap-4">
      <div className="bg-red-50 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3 border border-red-100">
        <AlertTriangle /> <span>{error}</span>
      </div>
      <button onClick={loadData} className="text-brand-600 hover:underline">Tentar novamente</button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Totais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-slate-500 font-medium text-sm mb-1">Receita Total</p>
            <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(totals.income)}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
            <ArrowUpCircle size={24} />
          </div>  
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-slate-500 font-medium text-sm mb-1">Despesa Total</p>
            <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(totals.expense)}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition">
            <ArrowDownCircle size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-slate-500 font-medium text-sm mb-1">Saldo Líquido</p>
            <h3 className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-brand-600' : 'text-rose-600'}`}>{formatCurrency(totals.balance)}</h3>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition ${totals.balance >= 0 ? 'bg-brand-50 text-brand-600' : 'bg-rose-50 text-rose-600'}`}>
            <DollarSign size={24} />
          </div>
        </div>
      </div>

      {/* Gráfico de Balanço Financeiro por Pessoa */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Balanço Financeiro por Pessoa</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={personChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(v) => `R$ ${v}`} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(val: number) => formatCurrency(val)}
              />
              <Bar dataKey="Receitas" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
              <Bar dataKey="Despesas" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
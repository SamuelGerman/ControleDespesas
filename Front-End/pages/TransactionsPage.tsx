import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, TransactionType, Category, Person, CategoryPurpose } from '../types';
import { api } from '../services/apiService';
import { Plus, Filter, AlertCircle, Trash2 } from 'lucide-react';

// Página para gerenciar transações financeiras, permitindo criação e listagem de transações existentes.
// UseStates para armazenar transações, pessoas, categorias e campos do formulário.
// Chama o serviço de API para listar e criar transações, além de listar pessoas e categorias.
// Regras de negócio para validação de idade da pessoa ao selecionar tipo de transação.
const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [personId, setPersonId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const refreshData = async () => {
    try {
      const [transactions, people, categories] = await Promise.all([api.transactions.list(), api.people.list(), api.categories.list()]);
      setTransactions(transactions.reverse());
      setPeople(people);
      setCategories(categories);
    } catch (e) { setErrorMsg("Erro ao carregar dados."); } finally { setLoading(false); }
  };

  useEffect(() => { refreshData(); }, []);

  const selectedPerson = people.find(p => p.id === personId);
  const isMinor = selectedPerson ? selectedPerson.age < 18 : false;

  const handleTypeChange = (newType: TransactionType) => {
    if (isMinor && newType === TransactionType.INCOME) {
      setErrorMsg(`Atenção: ${selectedPerson?.name} é menor de idade e não pode registrar receitas.`);
      return;
    }
    setErrorMsg('');
    setType(newType);
    setCategoryId('');
  };

  const handlePersonChange = (id: string) => {
    setPersonId(id);
    const p = people.find(x => x.id === id);
    if (p && p.age < 18 && type === TransactionType.INCOME) {
      setType(TransactionType.EXPENSE);
      setErrorMsg("Menores de idade só podem cadastrar despesas.");
    } else {
      setErrorMsg('');
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.filter(c => c.purpose === CategoryPurpose.BOTH || c.purpose === (type as unknown as CategoryPurpose));
  }, [categories, type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personId || !categoryId || !amount || !desc) return;
    try {
      await api.transactions.create({
        description: desc,
        amount: parseFloat(amount),
        type,
        personId,
        categoryId,
        date: new Date().toISOString()
      });
      setDesc(''); setAmount(''); setCategoryId('');
      refreshData();
    } catch (e: any) { setErrorMsg(e.message); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Plus className="text-brand-600" size={20} /> Nova Transação
          </h3>
          
          {errorMsg && (
            <div className="mb-4 p-3 bg-amber-50 text-amber-700 text-sm rounded-lg flex gap-2 border border-amber-100">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Pessoa</label>
              <select value={personId} onChange={(e) => handlePersonChange(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition" required>
                <option value="">Selecione...</option>
                {people.map(p => <option key={p.id} value={p.id}>{p.name} ({p.age} anos)</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Tipo</label>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button type="button" onClick={() => handleTypeChange(TransactionType.EXPENSE)} className={`flex-1 py-2 text-sm font-medium rounded-md transition ${type === TransactionType.EXPENSE ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'}`}>Despesa</button>
                <button type="button" onClick={() => handleTypeChange(TransactionType.INCOME)} disabled={isMinor} className={`flex-1 py-2 text-sm font-medium rounded-md transition ${type === TransactionType.INCOME ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'} ${isMinor ? 'opacity-50 cursor-not-allowed' : ''}`}>Receita</button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Categoria</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} disabled={!personId} className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition disabled:opacity-50" required>
                <option value="">Selecione...</option>
                {filteredCategories.map(c => <option key={c.id} value={c.id}>{c.description}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Descrição</label>
              <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition" placeholder="Ex: Compras no mercado" required />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Valor (R$)</label>
              <input type="number" step="0.01" min="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition" placeholder="0,00" required />
            </div>

            <button type="submit" className="w-full py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition shadow-lg shadow-brand-200">
              Salvar Registro
            </button>
          </form>
        </div>
      </div>

      {/* Listagem de transações */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-700">Histórico Recente</h3>
            <div className="text-xs text-slate-500 flex items-center gap-1"><Filter size={14}/> {transactions.length} registros</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">Data</th>
                  <th className="px-6 py-4 text-left font-medium">Descrição</th>
                  <th className="px-6 py-4 text-left font-medium">Categoria</th>
                  <th className="px-6 py-4 text-right font-medium">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 transition group">
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{t.description}</div>
                      <div className="text-xs text-slate-400">{people.find(p => p.id === t.personId)?.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        {categories.find(c => c.id === t.categoryId)?.description}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${t.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === TransactionType.EXPENSE ? '- ' : '+ '}
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount)}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Nenhuma transação registrada.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TransactionsPage;
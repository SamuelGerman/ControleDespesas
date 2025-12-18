import React, { useState, useEffect } from 'react';
import { Category, CategoryPurpose } from '../types';
import { api } from '../services/apiService';
import { Tags, PlusCircle } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [desc, setDesc] = useState('');
  const [purpose, setPurpose] = useState<CategoryPurpose>(CategoryPurpose.EXPENSE);

  const refresh = async () => {
    const data = await api.categories.list();
    setCategories(data);
  };

  useEffect(() => { refresh(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc) return;
    try {
      await api.categories.create({ description: desc, purpose });
      setDesc('');
      refresh();
    } catch (e: any) { alert(e.message); }
  };

  const getPurposeBadge = (p: CategoryPurpose) => {
    const styles = {
      [CategoryPurpose.EXPENSE]: 'bg-rose-100 text-rose-700',
      [CategoryPurpose.INCOME]: 'bg-emerald-100 text-emerald-700',
      [CategoryPurpose.BOTH]: 'bg-blue-100 text-blue-700',
    };
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${styles[p]}`}>{p}</span>;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Tags className="text-brand-600" /> Nova Categoria
        </h3>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Descrição</label>
            <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition" placeholder="Ex: Educação, Lazer, Salário..." required />
          </div>
          <div className="w-48">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Tipo</label>
            <select value={purpose} onChange={e => setPurpose(e.target.value as CategoryPurpose)} className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none bg-white">
              <option value={CategoryPurpose.EXPENSE}>Despesa</option>
              <option value={CategoryPurpose.INCOME}>Receita</option>
              <option value={CategoryPurpose.BOTH}>Ambos</option>
            </select>
          </div>
          <button className="px-8 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition shadow-lg shadow-brand-200">
            Salvar
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 bg-slate-50/50 border-b border-slate-100">
          <h3 className="font-bold text-slate-700">Categorias Disponíveis</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 border-b border-slate-100 bg-white">
            <tr>
              <th className="px-6 py-4 font-medium">Nome</th>
              <th className="px-6 py-4 font-medium">Finalidade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-800">{cat.description}</td>
                <td className="px-6 py-4">{getPurposeBadge(cat.purpose)}</td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={2} className="px-6 py-8 text-center text-slate-400">Nenhuma categoria cadastrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CategoriesPage;
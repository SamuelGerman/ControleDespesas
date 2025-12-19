import React, { useState, useEffect } from 'react';
import { Person } from '../types';
import { api } from '../services/apiService';
import { User, Trash2, PlusCircle, Baby } from 'lucide-react';

// Página para gerenciar pessoas, permitindo criação e listagem de membros existentes.
// UseStates para armazenar pessoas, nome e idade do novo membro.
// Chama o serviço de API para listar, criar e deletar pessoas.
const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const refresh = async () => {
    const data = await api.people.list();
    setPeople(data);
  };

  useEffect(() => { refresh(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;
    if (parseInt(age) <= 0) return;
    try {
      await api.people.create({ name, age: parseInt(age) });
      setName(''); 
      setAge('');
       refresh();
    } catch (e: any) { alert(e.message); }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja realmente remover? Esta ação não pode ser desfeita.")) {
      await api.people.delete(id);
      refresh();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Form */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <PlusCircle className="text-brand-600" /> Cadastrar Membro
        </h3>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Nome</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition" placeholder="Ex: Maria Oliveira" required />
          </div>
          <div className="w-32">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Idade</label>
            <input
              type="number" min="1" value={age} onChange={e => setAge(e.target.value)} className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition" placeholder="0" required
              onInvalid={e =>
                e.target.setCustomValidity("A idade deve ser um número positivo")
              }
              onInput={e => e.target.setCustomValidity("")}
            />
          </div>
          <button className="px-8 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition shadow-lg shadow-brand-200">
            Adicionar
          </button>
        </form>
      </div>

      {/* Pessoas cadastradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {people.map(person => (
          <div key={person.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-brand-200 transition">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${person.age < 18 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
                {person.age < 18 ? <Baby /> : <User />}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{person.name}</h4>
                <p className="text-sm text-slate-500">{person.age} anos {person.age < 18 && <span className="text-amber-600 font-medium text-xs ml-1">• Menor</span>}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(person.id)} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {people.length === 0 && <div className="col-span-full text-center py-10 text-slate-400">Nenhuma pessoa cadastrada.</div>}
      </div>
    </div>
  );
};
export default PeoplePage;
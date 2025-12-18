import { Person, Category, Transaction } from '../types';

const API_BASE_URL = '/api'; 

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Erro ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail || errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    if (response.status === 204) return {} as T;
    return response.json();
  } catch (error: any) {
    console.error(`API Error on ${endpoint}:`, error);
    throw new Error(error.message || "Falha na comunicação com o servidor.");
  }
}

export const api = {
  people: {
    list: () => request<Person[]>('/people'),
    create: (data: Omit<Person, 'id'>) => request<Person>('/people', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/people/${id}`, { method: 'DELETE' })
  },
  categories: {
    list: () => request<Category[]>('/categories'),
    create: (data: Omit<Category, 'id'>) => request<Category>('/categories', { method: 'POST', body: JSON.stringify(data) })
  },
  transactions: {
    list: () => request<Transaction[]>('/transactions'),
    create: (data: Omit<Transaction, 'id'>) => request<Transaction>('/transactions', { method: 'POST', body: JSON.stringify(data) })
  }
};
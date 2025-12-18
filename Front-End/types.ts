export enum TransactionType {
  EXPENSE = 'Despesa',
  INCOME = 'Receita'
}

export enum CategoryPurpose {
  EXPENSE = 'Despesa',
  INCOME = 'Receita',
  BOTH = 'Ambas'
}

export interface Person {
  id: string;
  name: string;
  age: number;
}

export interface Category {
  id: string;
  description: string;
  purpose: CategoryPurpose;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  personId: string;
  date: string;
}

export interface Expense {
  id: string;
  amount: number;
  date: string;
  category: string;
  merchant?: string;
  notes?: string;
  type: 'manual' | 'ocr';
  createdAt: string;
}

export interface MonthlyStats {
  totalSpent: number;
  expenseCount: number;
  topCategory: string;
  averagePerDay: number;
}

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Other',
];

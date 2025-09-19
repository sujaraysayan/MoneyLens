
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { Expense } from '../types/expense';
import Icon from './Icon';

interface ExpenseCardProps {
  expense: Expense;
  onDelete?: (id: string) => void;
}

export default function ExpenseCard({ expense, onDelete }: ExpenseCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <View style={[commonStyles.card, styles.card]}>
      <View style={commonStyles.row}>
        <View style={styles.leftContent}>
          <Text style={styles.merchant}>{expense.merchant || 'Manual Entry'}</Text>
          <Text style={styles.category}>{expense.category}</Text>
          <Text style={styles.date}>{formatDate(expense.date)}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.amount}>{formatAmount(expense.amount)}</Text>
          {onDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(expense.id)}
            >
              <Icon name="trash" size={16} color={colors.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {expense.notes && (
        <Text style={styles.notes}>{expense.notes}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  merchant: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  deleteButton: {
    padding: 4,
  },
  notes: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
});

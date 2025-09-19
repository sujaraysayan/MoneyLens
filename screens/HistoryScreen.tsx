
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../styles/commonStyles';
import { useExpenses } from '../hooks/useExpenses';
import { EXPENSE_CATEGORIES } from '../types/expense';
import ExpenseCard from '../components/ExpenseCard';
import Icon from '../components/Icon';

export default function HistoryScreen() {
  const { expenses, deleteExpense } = useExpenses();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const categories = ['All', ...EXPENSE_CATEGORIES];

  const filteredExpenses = expenses
    .filter(expense => selectedCategory === 'All' || expense.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

  const handleDeleteExpense = (id: string) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteExpense(id)
        },
      ]
    );
  };

  const getTotalAmount = () => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <View style={styles.header}>
          <Text style={commonStyles.title}>Expense History</Text>
          <Text style={commonStyles.textSecondary}>
            {filteredExpenses.length} expenses • ${getTotalAmount().toFixed(2)}
          </Text>
        </View>

        <View style={styles.filters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilter}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterButton,
                  selectedCategory === category && styles.filterButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedCategory === category && styles.filterTextActive
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSortBy(sortBy === 'date' ? 'amount' : 'date')}
          >
            <Icon 
              name={sortBy === 'date' ? 'calendar' : 'cash'} 
              size={16} 
              color={colors.primary} 
            />
            <Text style={styles.sortText}>
              {sortBy === 'date' ? 'Date' : 'Amount'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.expensesList}>
          {filteredExpenses.length === 0 ? (
            <View style={[commonStyles.card, commonStyles.center, styles.emptyState]}>
              <Icon name="receipt" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No expenses found</Text>
              <Text style={commonStyles.textSecondary}>
                {selectedCategory === 'All' 
                  ? 'Add some expenses to see them here'
                  : `No expenses in ${selectedCategory} category`
                }
              </Text>
            </View>
          ) : (
            filteredExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onDelete={handleDeleteExpense}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
  },
  filters: {
    marginBottom: 20,
  },
  categoryFilter: {
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.text,
  },
  filterTextActive: {
    color: colors.white,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.accent,
    borderRadius: 16,
  },
  sortText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  expensesList: {
    flex: 1,
    marginBottom: 100,
  },
  emptyState: {
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
});

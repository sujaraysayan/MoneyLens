
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../styles/commonStyles';
import { useExpenses } from '../hooks/useExpenses';
import StatsCard from '../components/StatsCard';
import ExpenseCard from '../components/ExpenseCard';
import Icon from '../components/Icon';

interface HomeScreenProps {
  onAddExpense: () => void;
}

export default function HomeScreen({ onAddExpense }: HomeScreenProps) {
  const { getCurrentMonthExpenses, getMonthlyStats } = useExpenses();
  
  const monthlyExpenses = getCurrentMonthExpenses();
  const stats = getMonthlyStats();
  const recentExpenses = monthlyExpenses.slice(0, 5);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={commonStyles.title}>Monthly Tracker</Text>
          <Text style={commonStyles.textSecondary}>
            Track your spending with ease
          </Text>
        </View>

        <StatsCard stats={stats} />

        <View style={styles.section}>
          <View style={commonStyles.row}>
            <Text style={commonStyles.subtitle}>Recent Expenses</Text>
            <TouchableOpacity onPress={onAddExpense}>
              <Icon name="add-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {recentExpenses.length === 0 ? (
            <View style={[commonStyles.card, commonStyles.center, styles.emptyState]}>
              <Icon name="receipt" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No expenses yet</Text>
              <Text style={commonStyles.textSecondary}>
                Add your first expense to get started
              </Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={onAddExpense}
              >
                <Text style={styles.addButtonText}>Add Expense</Text>
              </TouchableOpacity>
            </View>
          ) : (
            recentExpenses.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
  },
  section: {
    marginTop: 20,
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
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

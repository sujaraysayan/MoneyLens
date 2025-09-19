
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../styles/commonStyles';
import { useExpenses } from '../hooks/useExpenses';
import Icon from '../components/Icon';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const { expenses } = useExpenses();

  const getCurrentMonthExpenses = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  };

  const getExpensesByCategory = () => {
    const currentMonthExpenses = getCurrentMonthExpenses();
    const categoryTotals: { [key: string]: number } = {};
    
    currentMonthExpenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });
    
    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getTotalSpent = () => {
    return getCurrentMonthExpenses().reduce((total, expense) => total + expense.amount, 0);
  };

  const getAverageDaily = () => {
    const currentMonthExpenses = getCurrentMonthExpenses();
    const daysInMonth = new Date().getDate();
    const total = getTotalSpent();
    return daysInMonth > 0 ? total / daysInMonth : 0;
  };

  const categoryData = getExpensesByCategory();
  const totalSpent = getTotalSpent();
  const averageDaily = getAverageDaily();

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      'Food & Dining': 'restaurant',
      'Transportation': 'car',
      'Shopping': 'bag',
      'Entertainment': 'game-controller',
      'Bills & Utilities': 'receipt',
      'Healthcare': 'medical',
      'Education': 'school',
      'Travel': 'airplane',
      'Other': 'ellipsis-horizontal',
    };
    return iconMap[category] || 'ellipsis-horizontal';
  };

  const getCategoryColor = (index: number) => {
    const colorPalette = [
      colors.primary,
      colors.success,
      colors.warning,
      colors.error,
      '#8B5CF6',
      '#F59E0B',
      '#EF4444',
      '#10B981',
      '#6B7280',
    ];
    return colorPalette[index % colorPalette.length];
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={commonStyles.title}>Analytics</Text>
          <Text style={commonStyles.textSecondary}>
            Your spending insights for this month
          </Text>
        </View>

        {expenses.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="analytics" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>No Data Yet</Text>
            <Text style={styles.emptyDescription}>
              Start adding expenses to see your spending analytics
            </Text>
          </View>
        ) : (
          <>
            {/* Summary Cards */}
            <View style={styles.summaryContainer}>
              <View style={styles.summaryCard}>
                <Icon name="wallet" size={24} color={colors.primary} />
                <Text style={styles.summaryAmount}>
                  ${totalSpent.toFixed(2)}
                </Text>
                <Text style={styles.summaryLabel}>Total Spent</Text>
              </View>
              
              <View style={styles.summaryCard}>
                <Icon name="calendar" size={24} color={colors.success} />
                <Text style={styles.summaryAmount}>
                  ${averageDaily.toFixed(2)}
                </Text>
                <Text style={styles.summaryLabel}>Daily Average</Text>
              </View>
            </View>

            {/* Category Breakdown */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Spending by Category</Text>
              
              {categoryData.length > 0 ? (
                <View style={commonStyles.card}>
                  {categoryData.map((item, index) => {
                    const percentage = totalSpent > 0 ? (item.amount / totalSpent) * 100 : 0;
                    const color = getCategoryColor(index);
                    
                    return (
                      <View key={item.category} style={styles.categoryItem}>
                        <View style={styles.categoryHeader}>
                          <View style={styles.categoryLeft}>
                            <View style={[styles.categoryIcon, { backgroundColor: color + '20' }]}>
                              <Icon 
                                name={getCategoryIcon(item.category)} 
                                size={16} 
                                color={color} 
                              />
                            </View>
                            <View>
                              <Text style={styles.categoryName}>{item.category}</Text>
                              <Text style={styles.categoryPercentage}>
                                {percentage.toFixed(1)}% of total
                              </Text>
                            </View>
                          </View>
                          <Text style={styles.categoryAmount}>
                            ${item.amount.toFixed(2)}
                          </Text>
                        </View>
                        
                        <View style={styles.progressBar}>
                          <View 
                            style={[
                              styles.progressFill, 
                              { 
                                width: `${percentage}%`, 
                                backgroundColor: color 
                              }
                            ]} 
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View style={commonStyles.card}>
                  <Text style={styles.noDataText}>
                    No expenses recorded for this month
                  </Text>
                </View>
              )}
            </View>

            {/* Quick Stats */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Stats</Text>
              <View style={commonStyles.card}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Total Transactions</Text>
                  <Text style={styles.statValue}>{getCurrentMonthExpenses().length}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Categories Used</Text>
                  <Text style={styles.statValue}>{categoryData.length}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Highest Expense</Text>
                  <Text style={styles.statValue}>
                    ${Math.max(...getCurrentMonthExpenses().map(e => e.amount), 0).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  categoryItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  categoryPercentage: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  noDataText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
    paddingVertical: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { MonthlyStats } from '../types/expense';

interface StatsCardProps {
  stats: MonthlyStats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const getCurrentMonth = () => {
    return new Date().toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <View style={[commonStyles.card, styles.card]}>
      <Text style={styles.title}>{getCurrentMonth()} Summary</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatAmount(stats.totalSpent)}</Text>
          <Text style={styles.statLabel}>Total Spent</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.expenseCount}</Text>
          <Text style={styles.statLabel}>Transactions</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatAmount(stats.averagePerDay)}</Text>
          <Text style={styles.statLabel}>Daily Average</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.topCategory}</Text>
          <Text style={styles.statLabel}>Top Category</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

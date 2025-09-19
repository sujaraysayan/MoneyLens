
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';

export default function SettingsScreen() {
  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your expenses. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('monthly_expenses');
              Alert.alert('Success', 'All data has been cleared.');
            } catch (error) {
              console.log('Error clearing data:', error);
              Alert.alert('Error', 'Failed to clear data.');
            }
          },
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Data export feature will be available in a future update. For now, your data is safely stored on your device.',
      [{ text: 'OK' }]
    );
  };

  const handleBackup = () => {
    Alert.alert(
      'Cloud Backup',
      'Cloud backup feature will be available in a future update. Currently, data is stored locally on your device.',
      [{ text: 'OK' }]
    );
  };

  const settingsOptions = [
    {
      id: 'export',
      title: 'Export Data',
      description: 'Export your expenses to CSV',
      icon: 'download' as const,
      onPress: handleExportData,
    },
    {
      id: 'backup',
      title: 'Cloud Backup',
      description: 'Sync data across devices',
      icon: 'cloud-upload' as const,
      onPress: handleBackup,
    },
    {
      id: 'clear',
      title: 'Clear All Data',
      description: 'Delete all expenses permanently',
      icon: 'trash' as const,
      onPress: handleClearData,
      destructive: true,
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={commonStyles.title}>Settings</Text>
          <Text style={commonStyles.textSecondary}>
            Manage your app preferences
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                option.destructive && styles.destructiveCard
              ]}
              onPress={option.onPress}
            >
              <View style={styles.optionLeft}>
                <View style={[
                  styles.optionIcon,
                  option.destructive && styles.destructiveIcon
                ]}>
                  <Icon
                    name={option.icon}
                    size={20}
                    color={option.destructive ? colors.error : colors.primary}
                  />
                </View>
                <View style={styles.optionText}>
                  <Text style={[
                    styles.optionTitle,
                    option.destructive && styles.destructiveText
                  ]}>
                    {option.title}
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    {option.description}
                  </Text>
                </View>
              </View>
              <Icon
                name="chevron-forward"
                size={16}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={commonStyles.card}>
            <Text style={styles.aboutTitle}>Monthly Spend Tracker</Text>
            <Text style={commonStyles.textSecondary}>Version 1.0.0</Text>
            <Text style={[commonStyles.textSecondary, styles.aboutDescription]}>
              Track your monthly expenses with ease. Scan receipts using OCR technology 
              or add expenses manually. All data is stored securely on your device.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={commonStyles.card}>
            <View style={styles.featureList}>
              <View style={styles.feature}>
                <Icon name="camera" size={16} color={colors.primary} />
                <Text style={styles.featureText}>OCR Receipt Scanning</Text>
              </View>
              <View style={styles.feature}>
                <Icon name="create" size={16} color={colors.primary} />
                <Text style={styles.featureText}>Manual Expense Entry</Text>
              </View>
              <View style={styles.feature}>
                <Icon name="analytics" size={16} color={colors.primary} />
                <Text style={styles.featureText}>Monthly Statistics</Text>
              </View>
              <View style={styles.feature}>
                <Icon name="phone-portrait" size={16} color={colors.primary} />
                <Text style={styles.featureText}>Local Data Storage</Text>
              </View>
            </View>
          </View>
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
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  destructiveCard: {
    borderColor: colors.error + '20',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destructiveIcon: {
    backgroundColor: colors.error + '20',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  destructiveText: {
    color: colors.error,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  aboutDescription: {
    marginTop: 12,
    lineHeight: 20,
  },
  featureList: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
  },
});

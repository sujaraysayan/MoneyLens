
import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/commonStyles';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import HistoryScreen from '../screens/HistoryScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabBar from '../components/TabBar';

export default function MainScreen() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  if (loading) {
    return (
      <SafeAreaView style={[commonStyles.container, commonStyles.center]}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        {/* Loading screen could be added here */}
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <LoginScreen />
      </>
    );
  }

  const handleTabPress = (tab: string) => {
    console.log('Tab pressed:', tab);
    setActiveTab(tab);
  };

  const handleAddExpense = () => {
    console.log('Add expense pressed');
    setActiveTab('add');
  };

  const handleBackToHome = () => {
    console.log('Back to home pressed');
    setActiveTab('home');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onAddExpense={handleAddExpense} />;
      case 'add':
        return <AddExpenseScreen onBack={handleBackToHome} />;
      case 'history':
        return <HistoryScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'profile':
        return <ProfileScreen onBack={handleBackToHome} />;
      default:
        return <HomeScreen onAddExpense={handleAddExpense} />;
    }
  };

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={commonStyles.container} edges={['top']}>
        <View style={commonStyles.container}>
          {renderScreen()}
        </View>
        {/* Only show tab bar when not on add expense screen */}
        {activeTab !== 'add' && (
          <SafeAreaView edges={['bottom']}>
            <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
          </SafeAreaView>
        )}
      </SafeAreaView>
    </View>
  );
}


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import { useExpenses } from '../hooks/useExpenses';
import AddExpenseForm from '../components/AddExpenseForm';
import OCRCamera from '../components/OCRCamera';
import { processReceiptImage } from '../utils/ocrService';
import Icon from '../components/Icon';

interface AddExpenseScreenProps {
  onBack: () => void;
}

export default function AddExpenseScreen({ onBack }: AddExpenseScreenProps) {
  const { addExpense } = useExpenses();
  const [showCamera, setShowCamera] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [ocrData, setOcrData] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  const handleManualAdd = () => {
    console.log('Manual add pressed');
    setShowForm(true);
  };

  const handleOCRAdd = () => {
    console.log('OCR add pressed');
    setShowCamera(true);
  };

  const handleImageCaptured = async (imageUri: string) => {
    console.log('Image captured:', imageUri);
    setShowCamera(false);
    setProcessing(true);
    
    try {
      const result = await processReceiptImage(imageUri);
      
      if (result.success) {
        setOcrData({
          amount: result.amount?.toString() || '',
          merchant: result.merchant || '',
          date: result.date || new Date().toISOString().split('T')[0],
        });
        setShowForm(true);
      } else {
        Alert.alert(
          'OCR Failed', 
          'Could not extract data from the image. Please try again or add manually.',
          [
            { text: 'Try Again', onPress: () => setShowCamera(true) },
            { text: 'Add Manually', onPress: handleManualAdd },
          ]
        );
      }
    } catch (error) {
      console.log('OCR error:', error);
      Alert.alert('Error', 'Failed to process image. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleFormSubmit = async (expenseData: any) => {
    console.log('Form submitted:', expenseData);
    try {
      await addExpense(expenseData);
      Alert.alert('Success', 'Expense added successfully!');
      setShowForm(false);
      setOcrData(null);
      onBack();
    } catch (error) {
      console.log('Error adding expense:', error);
      Alert.alert('Error', 'Failed to add expense. Please try again.');
    }
  };

  const handleCloseForm = () => {
    console.log('Form closed');
    setShowForm(false);
    setOcrData(null);
  };

  if (showCamera) {
    return (
      <OCRCamera
        onImageCaptured={handleImageCaptured}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  if (processing) {
    return (
      <SafeAreaView style={[commonStyles.container, commonStyles.center]}>
        <Icon name="camera" size={48} color={colors.primary} />
        <Text style={styles.processingText}>Processing receipt...</Text>
        <Text style={commonStyles.textSecondary}>
          Extracting transaction details
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container} edges={['top', 'left', 'right']}>
      <View style={commonStyles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={commonStyles.subtitle}>Add Expense</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.options}>
          <TouchableOpacity style={styles.optionCard} onPress={handleOCRAdd}>
            <View style={styles.optionIcon}>
              <Icon name="camera" size={32} color={colors.primary} />
            </View>
            <Text style={styles.optionTitle}>Scan Receipt</Text>
            <Text style={styles.optionDescription}>
              Take a photo of your receipt and we&apos;ll extract the details automatically
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} onPress={handleManualAdd}>
            <View style={styles.optionIcon}>
              <Icon name="create" size={32} color={colors.primary} />
            </View>
            <Text style={styles.optionTitle}>Manual Entry</Text>
            <Text style={styles.optionDescription}>
              Enter expense details manually for cash payments or other transactions
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Full screen modal for the form */}
      <Modal
        visible={showForm}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleCloseForm}
      >
        <SafeAreaView style={commonStyles.container} edges={['top', 'left', 'right', 'bottom']}>
          <AddExpenseForm
            onSubmit={handleFormSubmit}
            initialData={ocrData}
            onClose={handleCloseForm}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  options: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  optionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  processingText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
});

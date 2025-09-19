
// Mock OCR service since vision-camera-ocr might not work in all environments
// In a real app, you would integrate with Google Vision API, AWS Textract, or similar

export interface OCRResult {
  amount?: number;
  merchant?: string;
  date?: string;
  success: boolean;
  rawText: string;
}

export const processReceiptImage = async (imageUri: string): Promise<OCRResult> => {
  try {
    console.log('Processing receipt image:', imageUri);
    
    // Simulate OCR processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock OCR results - in a real app, this would call an actual OCR service
    const mockResults = [
      {
        amount: 45.67,
        merchant: 'Starbucks Coffee',
        date: new Date().toISOString().split('T')[0],
        success: true,
        rawText: 'STARBUCKS COFFEE\nTotal: $45.67\nDate: ' + new Date().toLocaleDateString(),
      },
      {
        amount: 123.45,
        merchant: 'Target Store',
        date: new Date().toISOString().split('T')[0],
        success: true,
        rawText: 'TARGET\nSubtotal: $123.45\nDate: ' + new Date().toLocaleDateString(),
      },
      {
        amount: 28.99,
        merchant: 'McDonald\'s',
        date: new Date().toISOString().split('T')[0],
        success: true,
        rawText: 'McDonald\'s\nTotal: $28.99\nDate: ' + new Date().toLocaleDateString(),
      },
      {
        amount: 89.50,
        merchant: 'Whole Foods Market',
        date: new Date().toISOString().split('T')[0],
        success: true,
        rawText: 'WHOLE FOODS MARKET\nTotal: $89.50\nDate: ' + new Date().toLocaleDateString(),
      },
      {
        amount: 15.75,
        merchant: 'Subway',
        date: new Date().toISOString().split('T')[0],
        success: true,
        rawText: 'SUBWAY\nTotal: $15.75\nDate: ' + new Date().toLocaleDateString(),
      },
    ];
    
    // Return a random mock result
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    console.log('OCR processed successfully:', randomResult);
    
    return randomResult;
  } catch (error) {
    console.log('OCR processing error:', error);
    return {
      success: false,
      rawText: 'Failed to process image: ' + (error as Error).message,
    };
  }
};

// Helper function to extract amount from text
export const extractAmountFromText = (text: string): number | undefined => {
  const amountRegex = /\$?(\d+\.?\d*)/g;
  const matches = text.match(amountRegex);
  if (matches && matches.length > 0) {
    const amount = parseFloat(matches[matches.length - 1].replace('$', ''));
    return isNaN(amount) ? undefined : amount;
  }
  return undefined;
};

// Helper function to extract merchant name from text
export const extractMerchantFromText = (text: string): string | undefined => {
  const lines = text.split('\n');
  // Usually the merchant name is in the first few lines
  for (let i = 0; i < Math.min(3, lines.length); i++) {
    const line = lines[i].trim();
    if (line.length > 2 && !line.includes('$') && !line.match(/\d{2}\/\d{2}/)) {
      return line;
    }
  }
  return undefined;
};

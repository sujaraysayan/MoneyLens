# 💰 MoneyLens

MoneyLens is a cross-platform mobile app (Android & iOS) built with **React Native + TypeScript** to help you track your monthly spending.  
It can automatically read spending data from **bank slips (via OCR)** and also lets you add expenses **manually** when you pay by bill or cash.

---

## ✨ Features

- 📸 **Auto Expense Capture**
  - Upload or take a photo of a bank slip.
  - OCR (Optical Character Recognition) extracts transaction details (date, amount, merchant).
  - Auto-adds expenses to your monthly spend list.

- ✍️ **Manual Expense Entry**
  - Add spending manually (amount, date, category, notes).
  - Perfect for bills, transfers, or cash payments.

- 📊 **Dashboard & Reports**
  - See your monthly spending summary.
  - Browse history of all expenses.
  - Filter by date or category.

- ☁️ **Data Storage**
  - Stores data locally.
  - (Optional) Can be extended to sync with cloud for backup.

- 🎨 **Modern UI**
  - Clean and simple interface.
  - Easy navigation tabs: *Home (Dashboard), Add Expense, History, Settings*.

---

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev/) (TypeScript)
- [Expo](https://expo.dev/) (with EAS build support)
- OCR Integration (e.g., Google ML Kit / Tesseract — to extract text from slips)
- Context API for state management
- ESLint + Prettier for code style

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sujaraysayan/MoneyLens.git
cd MoneyLens

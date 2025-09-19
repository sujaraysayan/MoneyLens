# 💰 MoneyLens

MoneyLens is a cross-platform mobile app (Android & iOS) built with **React Native + TypeScript** that helps you manage and track your monthly spending.

It allows you to **automatically extract expenses from bank slips using OCR** and also add expenses **manually** for bills, transfers, or cash payments. The app provides a clean dashboard to visualize your spending and stay in control of your budget.

---

## ✨ Features

* 📸 **Auto Expense Capture**

  * Upload or take a photo of a bank slip.
  * OCR (Optical Character Recognition) extracts transaction details (date, amount, merchant).
  * Automatically adds the transaction to your monthly expenses.

* ✍️ **Manual Expense Entry**

  * Add spending manually (amount, date, category, notes).
  * Flexible for bills, QR payments, or cash.

* 📊 **Dashboard & Reports**

  * View monthly spending summaries.
  * Track daily expenses with charts and lists.
  * Filter expenses by category and date.

* ☁️ **Data Storage**

  * Save expenses locally on device.
  * (Optional) Extend with cloud sync for backup and multi-device support.

* 🎨 **Modern UI**

  * Simple and intuitive design.
  * Easy navigation with tabs:

    * **Home (Dashboard)**
    * **Add Expense**
    * **History**
    * **Settings**

---

## 🛠 Tech Stack

* [React Native](https://reactnative.dev/) with **TypeScript**
* [Expo](https://expo.dev/) (EAS build support)
* OCR Integration (Google ML Kit / Tesseract)
* Context API for state management
* ESLint + Prettier for linting and formatting

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* [Node.js LTS](https://nodejs.org/)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Expo CLI](https://docs.expo.dev/get-started/installation/)
* Android Studio (for Android emulator) or Xcode (for iOS simulator, Mac only)

---

### 1. Clone the repository

```bash
git clone https://github.com/sujaraysayan/MoneyLens.git
cd MoneyLens
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npx expo start
```

### 4. Run on device/emulator

* 📱 Install **Expo Go** on your iOS/Android phone and scan the QR code.
* ▶️ Or run directly:

  ```bash
  npx expo run:android
  npx expo run:ios
  ```

---

## 📂 Project Structure

```
MoneyLens/
│── app.json             # Expo app configuration
│── babel.config.js      # Babel setup
│── metro.config.js      # Metro bundler setup
│── tsconfig.json        # TypeScript configuration
│── package.json         # Dependencies & scripts
│
├── /screens             # App screens (Dashboard, Add Expense, History, Settings)
├── /components          # Reusable UI components
├── /contexts            # React contexts for global state
├── /hooks               # Custom hooks
├── /utils               # Utility functions (OCR, formatting, etc.)
├── /types               # TypeScript types
└── /styles              # Centralized styles
```

---

## 📱 Usage Flow

1. **Capture Bank Slip** → Take/upload photo of slip → OCR extracts details → Expense saved automatically.
2. **Add Expense Manually** → Input amount, category, date, notes → Save to list.
3. **Dashboard** → View total monthly spend + category breakdown.
4. **History** → Browse and filter past transactions.

---

## 🖼 Screenshots (Coming Soon)

* Dashboard summary view
* OCR slip capture flow
* Manual expense entry form
* Expense history list

---

## 🤝 Contributing

Contributions are welcome!
Here’s how you can help:

1. Fork the repo
2. Create a new feature branch:

   ```bash
   git checkout -b feature/my-new-feature
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:

   ```bash
   git push origin feature/my-new-feature
   ```
5. Open a Pull Request 🎉

---

## 📄 License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

Developed by [Sujaray Sayan](https://github.com/sujaraysayan) 🚀

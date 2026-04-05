# 💸 ExpenseChat.ai — AI-Powered Expense Tracker

ExpenseChat.ai is a modern finance dashboard that simplifies expense tracking using an **AI chatbot interface**. Instead of manually filling forms, users can simply type their expenses in natural language, and the system automatically records them.

The core idea is to make personal finance management **fast, intuitive, and conversational**.

---

## 🚀 Overview of Approach

Most expense tracking apps rely on manual data entry, which creates friction and reduces consistency in usage.

In ExpenseChat.ai, the approach is different:

### 🧠 AI-First Interaction

Instead of forms, users interact with the system like a chat:

> “Spent 200 on food”
> “Received 5000 salary”

The system:

1. Sends user input to a backend AI parser
2. Extracts structured data:

   * Amount
   * Category
   * Type (income/expense)
3. Converts it into a valid transaction object
4. Updates the dashboard instantly

---

### ⚙️ Why This Approach Works

* Reduces manual effort
* Improves speed of data entry
* Feels natural and user-friendly
* Encourages consistent usage

This makes expense tracking **effortless and engaging**, rather than repetitive.

---

## ✨ Features

### 🤖 AI Chatbot (Core Feature)

* Add transactions using natural language
* Smart parsing of user input
* Real-time transaction creation
* Suggestion prompts for better UX

---

### 📊 Smart Dashboard

* Total Balance, Income, and Expenses overview
* Spending breakdown visualization
* Category-wise expense insights

---

### 🧾 Transaction Management

* View all transactions
* Filter by category and type
* Export data as CSV
* Delete transactions easily

---

### 🎨 Premium UI/UX

* Clean, modern fintech-style interface
* Dark mode (default) + Light mode support
* Smooth animations and responsive layout

---

## 🛠 Tech Stack

### Frontend

* **React.js (Vite)** — Fast and modern UI framework
* **Tailwind CSS** — Utility-first styling for rapid UI development
* **Context API** — Global state management for transactions, filters, and theme

---

### Backend (AI Processing)

* **Node.js + Express** — Handles chatbot requests
* **Custom NLP Parsing Logic** — Converts natural language into structured transaction data

---

### Utilities

* CSV Export functionality
* Helper functions for formatting currency, date, and categories

---

## ⚙️ How to Run the App

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/expensechat-ai.git
cd expensechat-ai
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Start the frontend

```bash
npm run dev
```

---

### 4️⃣ Start the AI backend (chat server)

```bash
cd backend
node server.js
```

---

### 5️⃣ Open in browser

```
http://localhost:5173
```

---

## 🧠 AI Chatbot Explained

The chatbot is the most unique feature of ExpenseChat.ai.

Example:

```
"Spent 500 on shopping"
```

### What happens internally:

* Input is sent to backend
* Parsed into structured JSON
* Transaction is created automatically
* UI updates instantly

### Result:

* No forms
* No manual effort
* Just chat → done ✅

---

## 🔮 Future Improvements

* Voice-based expense entry
* Smart budgeting insights
* Bank integration APIs
* Predictive analytics

---

## 👨‍💻 Author

**Pradeep Singh**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

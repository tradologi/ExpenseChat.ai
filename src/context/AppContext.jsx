import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { transactions as initialTransactions, currentUser } from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [user, setUser] = useState(currentUser);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");

  // ✅ DEFAULT DARK
  const [theme, setTheme] = useState("dark");

  // ✅ APPLY THEME TO HTML (MAIN FIX)
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ LOAD SAVED THEME
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // 🌙 TOGGLE
  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // 👤 ROLE
  const toggleRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === "admin" ? "viewer" : "admin"
    }));
  };

  // 💰 CALCULATIONS
  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const balance = useMemo(
    () => totalIncome - totalExpenses,
    [totalIncome, totalExpenses]
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchCategory = filterCategory === "All" || t.category === filterCategory;
      const matchType = filterType === "All" || t.type === filterType;
      return matchCategory && matchType;
    });
  }, [transactions, filterCategory, filterType]);

  const spendingByCategory = useMemo(() => {
    return transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
  }, [transactions]);

  const addTransaction = (newTx) => {
    setTransactions(prev => [
      {
        ...newTx,
        id: prev.length > 0 ? Math.max(...prev.map(tx => tx.id)) + 1 : 1,
      },
      ...prev,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        transactions,
        filteredTransactions,
        totalIncome,
        totalExpenses,
        balance,
        spendingByCategory,
        filterCategory,
        filterType,
        setFilterCategory,
        setFilterType,
        addTransaction,
        deleteTransaction,
        theme,
        toggleTheme,
        toggleRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
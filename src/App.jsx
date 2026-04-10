import { useState } from "react";
import ChatBot from "./components/chat/ChatBot";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/layout/Navbar";
import SummarySection from "./components/summary/SummarySection";
import AddTransaction from "./components/transactions/AddTransaction";
import SpendingChart from "./components/charts/SpendingChart";
import ActivitySection from "./components/dashboard/ActivitySection";
import InsightsSection from "./components/insights/InsightsSection";
import CategoryBreakdown from "./components/dashboard/CategoryBreakdown";
import useScrollReveal from "./hooks/useScrollReveal";
import TransactionList from "./components/transactions/TransactionList";

const Dashboard = () => {
  useScrollReveal();

  const [showTransactions, setShowTransactions] = useState(false);

  return (
    <div className="min-h-screen text-gray-200 flex flex-col">

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8 flex-1 w-full">

        
        <div className="relative text-center py-8">

  
  <div className="absolute inset-0 flex justify-center">
    <div className="w-[420px] h-[200px] bg-emerald-500/10 blur-[110px] rounded-full"></div>
  </div>

  <div className="relative flex flex-col items-center">

    
    <p className="text-xs md:text-sm text-gray-400 tracking-widest uppercase mb-2">
    Welcome to ExpenseChat.ai
    </p>

    
    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
      <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 bg-clip-text text-transparent">
        Smarter Spending Starts Here
      </span>
    </h1>

    
    <p className="text-gray-400 mt-3 text-sm md:text-base">
      AI-powered financial dashboard ⚡
    </p>

  </div>

</div>
        <SummarySection />

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpendingChart />
          <ActivitySection setShowTransactions={setShowTransactions} />
        </div>

        <AddTransaction />

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryBreakdown />
          <InsightsSection />
        </div>

        
        {showTransactions && (
          <TransactionList setShowTransactions={setShowTransactions} />
        )}

      </main>

      <ChatBot />

      <footer className="text-center py-6 border-t border-white/10 text-gray-500 text-sm">
        © {new Date().getFullYear()} ExpenseChat.ai • AI Finance Dashboard
      </footer>

    </div>
  );
};

const App = () => (
  <AppProvider>
    <Dashboard />
  </AppProvider>
);

export default App;

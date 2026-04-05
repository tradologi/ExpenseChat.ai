import { useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import TransactionFilter from "./TransactionFilter";
import {
  formatCurrency,
  formatDate,
  getCategoryIcon,
  exportToCSV,
} from "../../utils/helpers.jsx";

const TransactionList = ({ setShowTransactions }) => {
  const { filteredTransactions, transactions, deleteTransaction } = useApp();

  // 🔥 AUTO SCROLL REF
  const sectionRef = useRef(null);

  useEffect(() => {
    // slight delay = smoother + ensures render complete
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  // ✅ DATA
  const data = transactions && transactions.length > 0 ? transactions : [];

  return (
    <div
      ref={sectionRef} // 🔥 IMPORTANT
      className="glass-card p-6 relative overflow-hidden"
    >

      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent blur-2xl"></div>

      <div className="relative">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-white">
              Transactions
            </h2>

            <button
              onClick={() => setShowTransactions(false)}
              className="text-xs px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded"
            >
              ← Back
            </button>

            <button
              onClick={() => exportToCSV(data)}
              className="text-xs px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded"
            >
              Export
            </button>
          </div>

          <TransactionFilter />
        </div>

        {/* LIST */}
        {data.length === 0 ? (
          <div className="text-center py-10 text-red-400">
            ❌ No transactions exist — add one first
          </div>
        ) : (
          <div className="space-y-3">

            {data.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-xl">
                    {getCategoryIcon(tx.category)}
                  </div>

                  <div>
                    <p className="text-sm text-white">
                      {tx.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(tx.date)} · {tx.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm ${
                      tx.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </span>

                  <button
                    onClick={() => deleteTransaction(tx.id)}
                    className="text-red-400"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
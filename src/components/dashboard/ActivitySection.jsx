import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/helpers.jsx";

const ActivitySection = ({ setShowTransactions }) => {
  const { transactions, setFilterCategory, setFilterType } = useApp();

  return (
    <div className="glass-card p-6 h-full flex flex-col relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent blur-2xl"></div>

      <div className="relative flex flex-col h-full">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-white">
            Recent Activity
          </h2>

          {/* ✅ FIXED BUTTON */}
          <button
            onClick={() => {
              setShowTransactions(true);
              setFilterCategory("All");
              setFilterType("All");
            }}
            className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
          >
            View All →
          </button>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto">

          {transactions.slice(0, 6).map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5"
            >
              <div>
                <p className="text-sm text-white">{tx.description}</p>
                <p className="text-xs text-gray-400">{tx.category}</p>
              </div>

              <span
                className={`text-sm font-semibold ${
                  tx.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
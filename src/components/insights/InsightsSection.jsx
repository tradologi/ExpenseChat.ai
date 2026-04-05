import { useApp } from "../../context/AppContext";

const InsightsSection = () => {
  const { transactions, totalIncome, totalExpenses } = useApp();

  const savings =
    totalIncome > 0
      ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
      : 0;

  return (
    <div className="glass-card p-6 h-full scroll-right relative overflow-hidden">

      {/* 🔥 SAME GLOW AS CATEGORY */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent blur-2xl"></div>

      <div className="relative flex flex-col h-full">

        {/* HEADER */}
        <h2 className="text-lg font-semibold text-white mb-5">
          ✨ Insights
        </h2>

        {/* CONTENT */}
        <div className="space-y-4 flex-1">

          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-sm">
            🍔 Zomato got ₹980 from you across 4 orders 👀
          </div>

          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm">
            📊 Your biggest spending is Shopping
          </div>

          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm">
            💰 You saved {savings}% this month — great job 🎉
          </div>

        </div>

      </div>
    </div>
  );
};

export default InsightsSection;
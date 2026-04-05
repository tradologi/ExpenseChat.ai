import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/helpers.jsx";

const CategoryBreakdown = () => {
  const { transactions } = useApp();

  // calculate totals
  const categoryMap = {};

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      categoryMap[tx.category] =
        (categoryMap[tx.category] || 0) + tx.amount;
    }
  });

  const data = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="glass-card p-6 scroll-left">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-white">
          Spending by Category
        </h2>

        <span className="text-xs text-gray-400">
          {data.length} categories
        </span>
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {data.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(1);

          return (
            <div key={item.name}>

              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">
                  {index + 1}. {item.name}
                </span>

                <span className="text-gray-400">
                  {percent}%{" "}
                  <span className="text-white font-medium ml-2">
                    {formatCurrency(item.value)}
                  </span>
                </span>
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                  style={{ width: `${percent}%` }}
                />
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default CategoryBreakdown;
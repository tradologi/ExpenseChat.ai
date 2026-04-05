import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useApp } from "../../context/AppContext";
import { getCategoryColor } from "../../utils/helpers.jsx";

/* 🔥 PREMIUM TOOLTIP (UNCHANGED) */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B1220]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.2)] rounded-xl p-3">
        <p className="text-xs text-gray-400 mb-1">{payload[0].name}</p>
        <p className="text-lg font-semibold text-blue-400">
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

/* ✅ CLEAN COLOR PALETTE (NEW — DOES NOT TOUCH EXISTING HELPERS) */
const getCleanColor = (category) => {
  const map = {
    Food: "#0f766e",
    Shopping: "#0ea5e9",
    Beauty: "#22c55e",
    Transport: "#1e3a8a",
    Entertainment: "#14b8a6",
    Income: "#4ade80",
  };
  return map[category] || "#94a3b8";
};

const SpendingChart = () => {
  const { spendingByCategory, totalExpenses } = useApp();

  const data = Object.entries(spendingByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) return null;

  return (
    <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-6 w-full flex flex-col h-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">
          Spending Breakdown
        </h2>

        <span className="text-xs font-medium bg-[#111827] border border-white/10 text-gray-400 px-3 py-1 rounded-full">
          This Month
        </span>
      </div>

      {/* CHART */}
      <div className="flex-1 relative flex items-center justify-center -mt-4">
        
        {/* CENTER TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-5">
          <span className="text-xs text-gray-500">
            Total Spent
          </span>

          <span className="text-xl font-semibold text-white">
            ₹{totalExpenses.toLocaleString("en-IN")}
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}   // thinner donut
              outerRadius={95}
              paddingAngle={2}
              dataKey="value"
              stroke="#0B1220"   // clean separators
              strokeWidth={3}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={getCleanColor(entry.name)}
                  style={{
                    filter: "drop-shadow(0px 6px 12px rgba(0,0,0,0.25))"
                  }}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

            <Legend
              iconType="circle"
              wrapperStyle={{
                fontSize: "12px",
                color: "#9CA3AF"
              }}
              verticalAlign="bottom"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;
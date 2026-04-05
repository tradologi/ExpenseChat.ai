import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/helpers.jsx";
import { CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";

const SummarySection = () => {
  const { balance, totalIncome, totalExpenses } = useApp();

  const cards = [
    {
      title: "Total Balance",
      value: balance,
      icon: <CreditCard size={20} strokeWidth={1.5} />,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
      glow: "rgba(139,92,246,0.5)",
    },
    {
      title: "Income",
      value: totalIncome,
      icon: <ArrowUpRight size={20} strokeWidth={1.5} />,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
      glow: "rgba(34,197,94,0.5)",
    },
    {
      title: "Expenses",
      value: totalExpenses,
      icon: <ArrowDownRight size={20} strokeWidth={1.5} />,
      iconColor: "text-rose-400",
      iconBg: "bg-rose-500/10",
      glow: "rgba(244,63,94,0.5)",
    },
  ];

  const getSubtext = (title, value) => {
    if (title === "Income") {
      return { text: "Income looking good", color: "text-green-400", arrow: "↑" };
    }
    if (title === "Expenses") {
      return {
        text: value > totalIncome * 0.7 ? "Spending high" : "Spending controlled",
        color: "text-red-400",
        arrow: "↓",
      };
    }
    return { text: "Balance stable", color: "text-blue-400", arrow: "→" };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="relative group p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-transparent hover:from-purple-500/40 transition-all duration-300"
        >
          {/* OUTER GLOW */}
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-300"
            style={{ background: card.glow }}
          />

          {/* INNER CARD */}
          <div
            className="relative rounded-2xl p-10 min-h-[200px] border border-white/10 backdrop-blur-xl"
            style={{
              background: `
                radial-gradient(circle at 80% 20%, ${card.glow}, transparent 40%),
                linear-gradient(135deg, #0B1220 0%, #0F1A2E 60%, #071020 100%)
              `,
            }}
          >
            {/* GRAPH LINE */}
            <svg
              className="absolute top-6 right-6 w-24 h-12 opacity-20"
              viewBox="0 0 100 40"
              fill="none"
            >
              <path
                d="M5 30 C20 20, 35 25, 50 15 S80 10, 95 5"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: card.glow }}
              />
            </svg>

            {/* CONTENT */}
            <div className="flex flex-col gap-4 h-full">

              {/* 🎨 NEW ICON STYLE */}
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${card.iconBg} ${card.iconColor}`}>
                {card.icon}
              </div>

              {/* TEXT */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {formatCurrency(card.value)}
                </h2>

                <p className="text-sm text-gray-400 mt-1 font-medium">
                  {card.title}
                </p>

                {/* SUBTEXT */}
                {(() => {
                  const sub = getSubtext(card.title, card.value);
                  return (
                    <div className={`flex items-center gap-2 mt-2 text-sm ${sub.color}`}>
                      <span className="text-xs">{sub.arrow}</span>
                      <span>{sub.text}</span>
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummarySection;
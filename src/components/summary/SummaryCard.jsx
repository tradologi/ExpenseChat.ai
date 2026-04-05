import { formatCurrency } from "../../utils/helpers.jsx";

const SummaryCard = ({ title, amount, icon, color }) => {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_40%),linear-gradient(135deg,#0B1220_0%,#0F1A2E_60%,#071020_100%)] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl p-7 min-h-[110px] flex items-center gap-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      
      {/* 🌟 GLOW */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />

      {/* ✨ SUBTLE OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* ICON */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${color} shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-white/10`}>
        {icon}
      </div>

      {/* TEXT */}
      <div>
        <p className="text-sm text-gray-400 font-medium">
          {title}
        </p>

        <p className="text-2xl font-semibold text-white mt-0.5">
          {formatCurrency(amount)}
        </p>
      </div>

    </div>
  );
};

export default SummaryCard;
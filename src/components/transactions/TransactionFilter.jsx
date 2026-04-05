import { useApp } from "../../context/AppContext";

const categories = ["All", "Food", "Shopping", "Beauty", "Transport", "Entertainment"];
const types = ["All", "income", "expense"];

const TransactionFilter = () => {
  const { filterCategory, filterType, setFilterCategory, setFilterType } = useApp();

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${filterCategory === cat
              ? "bg-purple-500 text-white shadow-md shadow-purple-500/20"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block" />

      {/* Type filter */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg px-3 py-1.5 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200"
      >
        {types.map((t) => (
          <option key={t} value={t}>{t === "All" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}</option>
        ))}
      </select>
    </div>
  );
};

export default TransactionFilter;
import { useState } from "react";
import { useApp } from "../../context/AppContext";

const categories = ["Food", "Shopping", "Beauty", "Transport", "Entertainment"];

const AddTransaction = () => {
  const { user, addTransaction } = useApp();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: "",
  });
  const [error, setError] = useState("");

  if (user.role !== "admin") return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.date) {
      setError("Please fill all fields.");
      return;
    }

    addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      description: "",
      amount: "",
      category: "Food",
      type: "expense",
      date: "",
    });

    setError("");
    setOpen(false);
  };

  return (
    <div className="w-full relative">

      {/* 🔥 BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-300"
      >
        + Add Transaction
      </button>

      {/* 💎 MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* CARD */}
          <div className="relative w-full max-w-lg bg-[#0B1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.2)] p-6 animate-[fadeIn_0.3s_ease]">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-white">
                Add Transaction
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✖
              </button>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* INPUT */}
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="premium-input col-span-2"
              />

              <input
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount (₹)"
                type="number"
                className="premium-input"
              />

              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                type="date"
                className="premium-input"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="premium-input"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="premium-input"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

            </div>

            {/* ACTION */}
            <button
              onClick={handleSubmit}
              className="mt-5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-2.5 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              Save Transaction
            </button>

            {/* ERROR */}
            {error && (
              <p className="text-red-400 text-sm mt-3">{error}</p>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
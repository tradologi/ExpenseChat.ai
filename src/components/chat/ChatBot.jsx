import { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";

const ChatBot = () => {
  const { addTransaction, transactions } = useApp();

  const [messages, setMessages] = useState([
    { text: "Hey 👋 Tell me your expense 💸", sender: "bot" },
    { text: "I track your spending and give smart insights 💡", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef(null);
  const bottomRef = useRef(null);

  // 🔥 auto open
  useEffect(() => {
    setTimeout(() => setIsOpen(true), 800);
  }, []);

  // 🔥 auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🎤 VOICE INPUT
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice not supported 😅");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };

    recognitionRef.current = recognition;
  };

  // 🧠 AI INSIGHTS
  useEffect(() => {
    if (transactions.length < 3) return;

    const categoryMap = {};
    let total = 0;

    transactions.forEach(tx => {
      if (tx.type === "expense") {
        total += tx.amount;
        categoryMap[tx.category] =
          (categoryMap[tx.category] || 0) + tx.amount;
      }
    });

    const categories = Object.keys(categoryMap);
    if (categories.length === 0) return;

    const topCategory = categories.reduce((a, b) =>
      categoryMap[a] > categoryMap[b] ? a : b
    );

    const today = new Date();
    const day = today.getDate();
    const predicted = Math.round((total / day) * 30);

    const topSpend = categoryMap[topCategory];

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: `📊 Most of your money goes to ${topCategory}`, sender: "bot" },
        { text: `📈 At this rate, you'll spend ~₹${predicted} this month`, sender: "bot" },
        ...(topSpend > total * 0.4
          ? [{ text: `⚠️ You're overspending on ${topCategory}`, sender: "bot" }]
          : [])
      ]);
    }, 1500);

  }, [transactions]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMsg })
      });

      const data = await res.json();

      let parsed;

      try {
        const clean = data.reply
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        parsed = JSON.parse(clean);

        parsed.category =
          parsed.category.charAt(0).toUpperCase() +
          parsed.category.slice(1);

      } catch {
        setMessages(prev => [
          ...prev,
          { text: "Try: spent 200 on food 😅", sender: "bot" }
        ]);
        setLoading(false);
        return;
      }

      addTransaction({
        ...parsed,
        date: new Date().toISOString().split("T")[0]
      });

      // ✅ MAIN RESPONSE
      setMessages(prev => [
        ...prev,
        {
          text: `Added ₹${parsed.amount} to ${parsed.category} ✅`,
          sender: "bot"
        }
      ]);

      // 🔥 SMART FOLLOW-UP
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: "Want insights on your spending? 📊",
            sender: "bot"
          }
        ]);
      }, 1200);

    } catch {
      setMessages(prev => [
        ...prev,
        { text: "Server error 😅", sender: "bot" }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* 🤖 FLOATING AI BUTTON (INSANE VERSION) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">

          {/* 🔥 TEXT */}
          <span className="text-xs text-purple-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full animate-bounce">
            Ask AI 💬
          </span>

          {/* BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-[2px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"
          >

            {/* glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-70"></div>

            {/* core */}
            <div className="relative bg-[#030712] p-4 rounded-full flex items-center justify-center group">

              {/* inner orb */}
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-ping"></div>

              {/* hover ring */}
              <div className="absolute inset-0 rounded-full border border-white/10 group-hover:scale-110 transition"></div>

            </div>
          </button>
        </div>
      )}

      {/* 💬 CHAT WINDOW */}
      <div
        className={`fixed bottom-6 right-6 w-80 transition-all duration-500 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-[1px] rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">

          <div className="bg-[#0B1220]/95 backdrop-blur-xl rounded-2xl p-4 flex flex-col">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold text-white">
                🤖 Expense AI
              </h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✖
              </button>
            </div>

            {/* MESSAGES */}
            <div className="h-52 overflow-y-auto mb-3 space-y-2">

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={msg.sender === "user" ? "text-right" : "text-left"}
                >
                  <p
                    className={`inline-block px-3 py-2 rounded-xl text-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "bg-white/5 border border-white/10 text-gray-300"
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}

              {/* 🔥 TYPING DOTS */}
              {loading && (
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></span>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="flex gap-2">
              <input
                className="flex-1 border border-white/10 p-2 rounded-lg text-sm bg-[#111827] text-white placeholder-gray-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or speak..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />

              {/* 🎤 VOICE */}
              <button
                onClick={startListening}
                className="px-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
              >
                🎤
              </button>
            </div>

            {/* SEND */}
            <button
              onClick={handleSend}
              className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm hover:opacity-90 transition"
            >
              Send
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
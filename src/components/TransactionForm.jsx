import { useState } from "react";

function TransactionForm({ addTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount) return;

    const newTransaction = {
      id: crypto.randomUUID(),
      title,
      amount: Number(amount),
      type,
    };

    addTransaction(newTransaction);

    setTitle("");
    setAmount("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Tytuł"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Kwota"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Wydatek</option>
        <option value="income">Przychód</option>
      </select>

      <button>Dodaj</button>
    </form>
  );
}

export default TransactionForm;
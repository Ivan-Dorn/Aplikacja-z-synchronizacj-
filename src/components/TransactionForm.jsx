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
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button>Add</button>
    </form>
  );
}

export default TransactionForm;
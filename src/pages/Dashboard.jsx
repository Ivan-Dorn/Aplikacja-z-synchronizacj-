import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const data = localStorage.getItem("fintrack");
    if (data) setTransactions(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("fintrack", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const addTransaction = (transaction) => {
    setTransactions([
      { ...transaction, synced: false },
      ...transactions,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="container">
      <div className={`status ${isOnline ? "online" : "offline"}`}>
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </div>

      <h1>Panel Finansowy</h1>

      <div className="cards">
        <div className="card income">
          <h3>Przychody</h3>
          <p>{income} PLN</p>
        </div>

        <div className="card expense">
          <h3>Wydatki</h3>
          <p>{expense} PLN</p>
        </div>

        <div className="card balance">
          <h3>Saldo</h3>
          <p>{balance} PLN</p>
        </div>
      </div>

      <TransactionForm addTransaction={addTransaction} />

      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
}

export default Dashboard;
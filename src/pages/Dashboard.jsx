import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // LOAD
  useEffect(() => {
    const data = localStorage.getItem("fintrack");
    if (data) setTransactions(JSON.parse(data));
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("fintrack", JSON.stringify(transactions));
  }, [transactions]);

  // ONLINE / OFFLINE
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

  // ADD
  const addTransaction = (transaction) => {
    setTransactions([
      { ...transaction, synced: false },
      ...transactions,
    ]);
  };

  // DELETE
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

      {/* STATUS */}
      <div className={`status ${isOnline ? "online" : "offline"}`}>
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </div>

      <h1>Financial Dashboard</h1>

      <div className="cards">
        <div className="card income">
          <h3>Income</h3>
          <p>{income} PLN</p>
        </div>

        <div className="card expense">
          <h3>Expenses</h3>
          <p>{expense} PLN</p>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
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
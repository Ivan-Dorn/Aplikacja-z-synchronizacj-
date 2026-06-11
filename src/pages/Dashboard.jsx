import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("fintrack");
    if (data) setTransactions(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("fintrack", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="container">
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
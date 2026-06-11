function Dashboard() {
  return (
    <div className="container">
      <h1>Financial Dashboard</h1>

      <div className="cards">
        <div className="card income">
          <h3>Income</h3>
          <p>0 PLN</p>
        </div>

        <div className="card expense">
          <h3>Expenses</h3>
          <p>0 PLN</p>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
          <p>0 PLN</p>
        </div>
      </div>

      <div className="panel">
        <h2>Transactions</h2>
        <p className="empty">No transactions yet</p>
      </div>
    </div>
  );
}

export default Dashboard;
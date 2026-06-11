function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div className="list">
      <h2>Transactions</h2>

      {transactions.length === 0 && (
        <p className="empty">No transactions yet</p>
      )}

      {transactions.map((t) => (
        <div key={t.id} className={`item ${t.type}`}>
          <div>
            <h4>{t.title}</h4>
            <p>{t.type}</p>
          </div>

          <div className="right">
            <span>{t.amount} PLN</span>

            <button onClick={() => deleteTransaction(t.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
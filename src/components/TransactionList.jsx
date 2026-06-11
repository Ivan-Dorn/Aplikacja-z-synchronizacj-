function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div className="list">
      <h2>Transakcje</h2>

      {transactions.length === 0 && (
        <p className="empty">Brak transakcji</p>
      )}

      {transactions.map((t) => (
        <div key={t.id} className={`item ${t.type}`}>
          <div>
            <h4>{t.title}</h4>
            <p>{t.type === "income" ? "Przychód" : "Wydatek"}</p>
          </div>

          <div className="right">
            <span>{t.amount} PLN</span>

            <button onClick={() => deleteTransaction(t.id)}>
              Usuń
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
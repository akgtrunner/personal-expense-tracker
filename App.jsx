import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  const addExpense = () => {
    if (!title || !amount) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
      },
    ]);

    setTitle("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((item) => item.category === filter);

  const totalAmount = filteredExpenses.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <>
      <style>{`
        body {
          background: #f4f6f8;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 450px;
          margin: 40px auto;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        input, select {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
        }
        button {
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .add-btn {
          background: #4caf50;
          color: white;
          width: 100%;
        }
        .expense-list {
          list-style: none;
          padding: 0;
        }
        .expense-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          margin-bottom: 6px;
          background: #f1f1f1;
          border-radius: 5px;
        }
        .delete-btn {
          background: red;
          color: white;
        }
        .total {
          text-align: center;
          margin-top: 15px;
          font-weight: bold;
        }
      `}</style>

      <div className="container">
        <h2>💸 Personal Expense Tracker</h2>

        {/* Add Expense */}
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <button className="add-btn" onClick={addExpense}>
          Add Expense
        </button>

        <hr />

        {/* Filter */}
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        {/* Expense List */}
        <ul className="expense-list">
          {filteredExpenses.length === 0 && (
            <p style={{ textAlign: "center" }}>No expenses yet</p>
          )}

          {filteredExpenses.map((item) => (
            <li key={item.id} className="expense-item">
              <span>
                {item.title} – ₹{item.amount} ({item.category})
              </span>
              <button
                className="delete-btn"
                onClick={() => deleteExpense(item.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        <div className="total">Total Spent: ₹{totalAmount}</div>
      </div>
    </>
  );
}

export default App;
App.jsx

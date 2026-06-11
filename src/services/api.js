import axios from "axios";

const API = "http://localhost:3001";

export const syncTransactions = async (transactions) => {
  return await axios.post(`${API}/sync`, {
    items: transactions,
  });
};
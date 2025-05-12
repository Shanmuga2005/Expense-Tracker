// Selecting DOM elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Load transactions from localStorage or initialize empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add new transaction
function addTransaction(e) {
  e.preventDefault();

  const description = text.value.trim();
  const value = amount.value.trim();

  if (description === '' || value === '') {
    alert('Please enter a description and amount');
    return;
  }

  const transaction = {
    id: generateID(),
    text: description,
    amount: +value
  };

  transactions.push(transaction);
  updateLocalStorage();
  addTransactionDOM(transaction);
  updateValues();

  // Clear input fields
  text.value = '';
  amount.value = '';
}

// Generate a unique ID
function generateID() {
  return Date.now();
}

// Add transaction to the DOM
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Apply class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">❌</button>
  `;

  list.appendChild(item);
}

// Update balance, income, and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);
  const expense = amounts
    .filter(amount => amount < 0)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);

  balance.textContent = `$${total}`;
  money_plus.textContent = `+$${income}`;
  money_minus.textContent = `-$${Math.abs(expense)}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

// Save to localStorage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize the app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Event listener
form.addEventListener('submit', addTransaction);

// Initial load
init();


  
   



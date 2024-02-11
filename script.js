document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');
  const totalExpenseDisplay = document.getElementById('totalExpense');

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  function displayExpenses() {
      expenseList.innerHTML = '';
      let totalExpense = 0;
      expenses.forEach((expense, index) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${expense.name}</td>
              <td>${expense.amount}</td>
              <td>
                  <button class="edit-button" onclick="editExpense(${index})">Edit</button>
                  <button class="delete-button" onclick="deleteExpense(${index})">Delete</button>
              </td>
          `;
          expenseList.appendChild(tr);
          totalExpense += parseFloat(expense.amount);
      });
      totalExpenseDisplay.textContent = `Total Expense: Rs ${totalExpense.toFixed(2)}`;
  }

  displayExpenses();

  expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('expenseName').value;
      const amount = parseFloat(document.getElementById('expenseAmount').value);
      if (name && amount) {
          expenses.push({ name, amount });
          localStorage.setItem('expenses', JSON.stringify(expenses));
          displayExpenses();
          expenseForm.reset();
      } else {
          alert('Please Enter Expense Name and Amount.');
      }
  });

  window.editExpense = function(index) {
      const newName = prompt('Enter New Expense Name:');
      if (newName === null) {
          return; 
      }

      const newAmountInput = prompt('Enter New Amount:');
      if (newAmountInput === null) {
          return; 
      }

      const newAmount = parseFloat(newAmountInput);
      if (!isNaN(newAmount)) {
          expenses[index].name = newName;
          expenses[index].amount = newAmount;
          localStorage.setItem('expenses', JSON.stringify(expenses));
          displayExpenses();
      } else {
          alert('Invalid amount. Please enter a valid number.');
      }
  };

  window.deleteExpense = function(index) {
      if (confirm('Are you sure you want to delete this expense?')) {
          expenses.splice(index, 1);
          localStorage.setItem('expenses', JSON.stringify(expenses));
          displayExpenses();
      }
  };
});

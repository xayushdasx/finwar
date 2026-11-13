// GLOBAL VARIABLE to hold all customers
let allCustomers = [];

// FORM SUBMIT — ADD CUSTOMER
document.getElementById("customerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    fullName: document.getElementById("fullName").value,
    customerType: document.getElementById("customerType").value,
    dob: document.getElementById("dob").value,
    status: document.getElementById("status").value,
    contactNumber: document.getElementById("contactNumber").value,
    email: document.getElementById("email").value,
    countryOfOrigin: document.getElementById("countryOfOrigin").value,
    effectiveDate: document.getElementById("effectiveDate").value,
  };

  fetch("http://localhost:8080/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Customer added!");
      document.getElementById("customerForm").reset();
      loadCustomers(); // refresh list
    });
});

// GET ALL CUSTOMERS
function loadCustomers() {
  fetch("http://localhost:8080/api/customers")
    .then((res) => res.json())
    .then((data) => {
      allCustomers = data; // store in global
      renderCustomers(allCustomers); // show all
    });
}

// RENDER LIST TO HTML
function renderCustomers(data) {
  const list = document.getElementById("customerList");
  list.innerHTML = "";

  data.forEach((c) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center glass px-4 py-2 rounded";

    li.innerHTML = `
      <div>
        <strong>${c.fullName}</strong><br>
        <span class="text-sm text-gray-300">${c.email}</span>
      </div>
      <button onclick="deleteCustomer(${c.id})" class="text-red-400 hover:text-red-600 font-bold text-sm">🗑 Delete</button>
    `;

    list.appendChild(li);
  });
}

// DELETE BY ID
function deleteCustomer(id) {
  fetch(`http://localhost:8080/api/customers/${id}`, {
    method: "DELETE",
  }).then(() => loadCustomers());
}

// FILTER FUNCTION
function filterCustomers() {
  const filter = document.getElementById("searchInput").value.toLowerCase();

  const filtered = allCustomers.filter(customer =>
    customer.fullName.toLowerCase().includes(filter) ||
    customer.email.toLowerCase().includes(filter)
  );

  renderCustomers(filtered);
}

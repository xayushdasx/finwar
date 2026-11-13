let allContacts = [];

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    customerId: document.getElementById("customerId").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    email: document.getElementById("email").value
  };

  fetch("http://localhost:8080/api/customer-contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Contact saved!");
      document.getElementById("contactForm").reset();
      loadContacts();
    });
});

function loadContacts() {
  fetch("http://localhost:8080/api/customer-contacts")
    .then((res) => res.json())
    .then((data) => {
      allContacts = data;
      renderContactList(data);
    });
}

function renderContactList(data) {
  const list = document.getElementById("contactList");
  list.innerHTML = "";

  data.forEach((c) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center glass px-4 py-2 rounded";

    li.innerHTML = `
      <div>
        <strong>${c.phoneNumber}</strong><br>
        <span class="text-sm text-gray-300">${c.email}</span>
      </div>
      <button onclick="deleteContact(${c.id})" class="text-red-400 hover:text-red-600 font-bold text-sm">🗑 Delete</button>
    `;

    list.appendChild(li);
  });
}

function deleteContact(id) {
  fetch(`http://localhost:8080/api/customer-contacts/${id}`, {
    method: "DELETE",
  }).then(() => loadContacts());
}

function filterContacts() {
  const filter = document.getElementById("searchContact").value.toLowerCase();

  const filtered = allContacts.filter(c =>
    (c.phoneNumber && c.phoneNumber.toLowerCase().includes(filter)) ||
    (c.email && c.email.toLowerCase().includes(filter))
  );

  renderContactList(filtered);
}

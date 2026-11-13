let allNames = [];

document.getElementById("nameForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    customerId: document.getElementById("customerId").value,
    firstName: document.getElementById("firstName").value,
    middleName: document.getElementById("middleName").value,
    lastName: document.getElementById("lastName").value
  };

  fetch("http://localhost:8080/api/customer-names", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Name saved!");
      document.getElementById("nameForm").reset();
      loadNames();
    });
});

function loadNames() {
  fetch("http://localhost:8080/api/customer-names")
    .then((res) => res.json())
    .then((data) => {
      allNames = data;
      renderNameList(data);
    });
}

function renderNameList(data) {
  const list = document.getElementById("nameList");
  list.innerHTML = "";

  data.forEach((n) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center glass px-4 py-2 rounded";

    li.innerHTML = `
      <div>
        <strong>${n.firstName} ${n.middleName || ""} ${n.lastName}</strong><br>
        <span class="text-sm text-gray-300">ID: ${n.customerId}</span>
      </div>
      <button onclick="deleteName(${n.id})" class="text-red-400 hover:text-red-600 font-bold text-sm">🗑 Delete</button>
    `;

    list.appendChild(li);
  });
}

function deleteName(id) {
  fetch(`http://localhost:8080/api/customer-names/${id}`, {
    method: "DELETE",
  }).then(() => loadNames());
}

function filterNames() {
  const filter = document.getElementById("searchName").value.toLowerCase();
  const filtered = allNames.filter(n =>
    (n.firstName && n.firstName.toLowerCase().includes(filter)) ||
    (n.lastName && n.lastName.toLowerCase().includes(filter))
  );
  renderNameList(filtered);
}

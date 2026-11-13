let allProofs = [];

document.getElementById("proofForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    customerId: document.getElementById("customerId").value,
    proofType: document.getElementById("proofType").value,
    proofNumber: document.getElementById("proofNumber").value
  };

  fetch("http://localhost:8080/api/customer-proofs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Proof saved!");
      document.getElementById("proofForm").reset();
      loadProofs();
    });
});

function loadProofs() {
  fetch("http://localhost:8080/api/customer-proofs")
    .then((res) => res.json())
    .then((data) => {
      allProofs = data;
      renderProofList(data);
    });
}

function renderProofList(data) {
  const list = document.getElementById("proofList");
  list.innerHTML = "";

  data.forEach((p) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center glass px-4 py-2 rounded";

    li.innerHTML = `
      <div>
        <strong>${p.proofType}</strong><br>
        <span class="text-sm text-gray-300">#${p.proofNumber} | ID: ${p.customerId}</span>
      </div>
      <button onclick="deleteProof(${p.id})" class="text-red-400 hover:text-red-600 font-bold text-sm">🗑 Delete</button>
    `;

    list.appendChild(li);
  });
}

function deleteProof(id) {
  fetch(`http://localhost:8080/api/customer-proofs/${id}`, {
    method: "DELETE",
  }).then(() => loadProofs());
}

function filterProofs() {
  const filter = document.getElementById("searchProof").value.toLowerCase();
  const filtered = allProofs.filter(p =>
    (p.proofType && p.proofType.toLowerCase().includes(filter)) ||
    (p.proofNumber && p.proofNumber.toLowerCase().includes(filter))
  );
  renderProofList(filtered);
}

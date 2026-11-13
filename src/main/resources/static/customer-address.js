// Store all addresses in memory for filtering
let allAddresses = [];

// Add event listener to form submission
document.getElementById("addressForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  // Show loading state on button
  const submitButton = this.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Saving...';
  submitButton.disabled = true;

  // Collect form data
  const data = {
    customerId: document.getElementById("customerId").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    country: document.getElementById("country").value,
    pinCode: document.getElementById("pinCode").value
  };

  // Send data to API
  fetch("http://localhost:8080/api/customer-addresses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Show success notification
      showNotification('Address saved successfully!', 'success');
      document.getElementById("addressForm").reset();
      loadAddresses();
    })
    .catch(error => {
      // Show error notification
      showNotification('Error saving address. Please try again.', 'error');
      console.error('Error:', error);
    })
    .finally(() => {
      // Reset button state
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    });
});

// Load all addresses from the server
function loadAddresses() {
  const addressList = document.getElementById("addressList");
  addressList.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-blue-400 text-2xl"></i><p class="mt-2 text-gray-400">Loading addresses...</p></div>';

  fetch("http://localhost:8080/api/customer-addresses")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      allAddresses = data;
      renderAddressList(data);
    })
    .catch(error => {
      addressList.innerHTML = '<div class="text-center py-8 text-red-400"><i class="fas fa-exclamation-circle text-2xl mb-2"></i><p>Could not load addresses. Please try again.</p></div>';
      console.error('Error:', error);
    });
}

// Render the address list with provided data
function renderAddressList(data) {
  const list = document.getElementById("addressList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = '<div class="text-center py-8 text-gray-400"><i class="fas fa-map-marker-slash text-2xl mb-2"></i><p>No addresses found</p></div>';
    return;
  }

  data.forEach((address) => {
    const li = document.createElement("li");
    li.className = "neo-card p-4 address-item";

    // Format address details with better structure
    li.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-semibold text-blue-300">${address.customerId || 'N/A'}</h3>
          <p class="text-gray-300">${address.city || ''}, ${address.state || ''} ${address.pinCode || ''}</p>
          <p class="text-gray-400 text-sm">${address.country || ''}</p>
        </div>
        <div class="flex space-x-2">
          <button onclick="editAddress('${address.id}')" class="text-blue-400 hover:text-blue-300 transition p-1">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="confirmDelete('${address.id}')" class="text-red-400 hover:text-red-300 transition p-1">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;

    list.appendChild(li);
  });
}

// Confirm before deleting an address
function confirmDelete(id) {
  if (confirm("Are you sure you want to delete this address?")) {
    deleteAddress(id);
  }
}

// Delete an address by ID
function deleteAddress(id) {
  fetch(`http://localhost:8080/api/customer-addresses/${id}`, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response;
    })
    .then(() => {
      showNotification('Address deleted successfully!', 'success');
      loadAddresses();
    })
    .catch(error => {
      showNotification('Error deleting address. Please try again.', 'error');
      console.error('Error:', error);
    });
}

// Edit address (placeholder - to be implemented)
function editAddress(id) {
  // Find the address in the allAddresses array
  const address = allAddresses.find(a => a.id === id);
  if (address) {
    // Populate the form with the address details
    document.getElementById("customerId").value = address.customerId || '';
    document.getElementById("city").value = address.city || '';
    document.getElementById("state").value = address.state || '';
    document.getElementById("country").value = address.country || '';
    document.getElementById("pinCode").value = address.pinCode || '';
    
    // Scroll to the form
    document.getElementById("addressForm").scrollIntoView({ behavior: 'smooth' });
    
    // Show a notification
    showNotification('Address loaded for editing. Update the details and save.', 'info');
  }
}

// Filter addresses based on search input
function filterAddresses() {
  const filter = document.getElementById("searchAddress").value.toLowerCase();
  
  if (filter.trim() === '') {
    renderAddressList(allAddresses);
    return;
  }

  const filtered = allAddresses.filter(a => 
    (a.city && a.city.toLowerCase().includes(filter)) || 
    (a.pinCode && a.pinCode.toLowerCase().includes(filter)) ||
    (a.state && a.state.toLowerCase().includes(filter)) ||
    (a.country && a.country.toLowerCase().includes(filter))
  );

  renderAddressList(filtered);
  
  // Update the results count
  const resultsCount = document.createElement('div');
  resultsCount.className = 'text-xs text-gray-400 mt-2 text-center';
  resultsCount.textContent = `Found ${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;
  document.getElementById("addressList").appendChild(resultsCount);
}

// Show notification message
function showNotification(message, type = 'info') {
  // Create notification element if it doesn't exist
  let notification = document.getElementById('notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = 'fixed top-4 right-4 z-50 transition-all transform translate-x-full opacity-0';
    document.body.appendChild(notification);
  }

  // Set the notification content and style based on type
  let bgColor, icon;
  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      icon = 'fa-check-circle';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      icon = 'fa-exclamation-circle';
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-500';
      icon = 'fa-info-circle';
      break;
  }

  notification.className = `fixed top-4 right-4 z-50 ${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center transition-all transform translate-x-0 opacity-100`;
  notification.innerHTML = `
    <i class="fas ${icon} mr-2"></i>
    <span>${message}</span>
  `;

  // Show and then hide the notification
  setTimeout(() => {
    notification.className = `fixed top-4 right-4 z-50 ${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center transition-all transform translate-x-full opacity-0`;
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize the address list when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for the search input
  document.getElementById("searchAddress").addEventListener("input", filterAddresses);
  
  // Set focus to the customer ID field
  document.getElementById("customerId").focus();
});
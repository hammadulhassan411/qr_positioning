let inventory = []; // store all scanned items

function handleScannedData(data) {
  try {
    const item = JSON.parse(data);

    // Display item info
    document.getElementById("name").textContent = "Name: " + item.name;
    document.getElementById("store").textContent = "In store: " + (item.in_store ? "Yes" : "No");
    document.getElementById("price").textContent = "Price: €" + item.price;

    // Add item to inventory
    inventory.push(item);
    updateInventoryList();

  } catch (e) {
    alert("Invalid QR code data. Must be JSON.");
  }
}

function updateInventoryList() {
  const list = document.getElementById("inventory");
  list.innerHTML = ""; // clear old list

  inventory.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.name} — €${item.price} — In store: ${item.in_store}`;
    list.appendChild(li);
  });
}

document.getElementById("scanBtn").addEventListener("click", () => {
  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: 250
    },
    (decodedText) => {
      handleScannedData(decodedText);
      html5QrCode.stop();
    },
    (errorMessage) => {}
  );
});

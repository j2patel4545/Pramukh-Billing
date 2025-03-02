const { ipcRenderer } = require('electron');

const items = [
    { name: "Manchurian", fullPrice: 90, halfPrice: 70 },
    { name: "Burger", fullPrice: 100, halfPrice: 70 },
    { name: "Pasta", fullPrice: 150, halfPrice: 90 },
    { name: "Sandwich", fullPrice: 80, halfPrice: 50 },
    { name: "French Fries", fullPrice: 120, halfPrice: 80 },
    { name: "Mojito", fullPrice: 90, halfPrice: 60 },
    { name: "Ice Cream", fullPrice: 110, halfPrice: 70 },
    { name: "Coffee", fullPrice: 70, halfPrice: 50 },
    { name: "Tea", fullPrice: 50, halfPrice: 30 },
    { name: "Brownie", fullPrice: 130, halfPrice: 90 }
];

let selectedItems = [];

function renderItems(query = "") {
    const itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = "";

    items.forEach((item, index) => {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
            const div = document.createElement("div");
            div.classList.add("item");
            div.innerHTML = `
                <input type="checkbox" id="item${index}" onchange="toggleItem(${index})">
                <label for="item${index}">${item.name} - ₹${item.fullPrice}  / ₹${item.halfPrice} </label>
                <select id="portion${index}" onchange="updatePortion(${index})" disabled>
                    <option value="full">Full</option>
                    <option value="half">Half</option>
                </select><br>
                <button onclick="updateQuantity(${index}, -1)" disabled class="minus bg-gray-700 px-2">➖</button>
                <span id="qty${index}" class="text-lg px-3">1</span>
                <button onclick="updateQuantity(${index}, 1)" disabled class="plus bg-gray-700 px-2">➕</button>
            `;
            itemsList.appendChild(div);
        }
    });
}

function searchItems() {
    const query = document.getElementById("searchBox").value;
    renderItems(query);
}

function toggleItem(index) {
    const checkbox = document.getElementById(`item${index}`);
    const portionSelect = document.getElementById(`portion${index}`);
    const minusBtn = document.querySelectorAll(".minus")[index];
    const plusBtn = document.querySelectorAll(".plus")[index];

    if (checkbox.checked) {
        selectedItems.push({ ...items[index], quantity: 1, portion: "full" });
        portionSelect.disabled = false;
        minusBtn.disabled = false;
        plusBtn.disabled = false;
    } else {
        selectedItems = selectedItems.filter(item => item.name !== items[index].name);
        portionSelect.disabled = true;
        minusBtn.disabled = true;
        plusBtn.disabled = true;
    }
    updateBill();
}

function updatePortion(index) {
    selectedItems.forEach(item => {
        if (item.name === items[index].name) {
            item.portion = document.getElementById(`portion${index}`).value;
        }
    });
    updateBill();
}

function updateQuantity(index, change) {
    selectedItems.forEach(item => {
        if (item.name === items[index].name) {
            item.quantity = Math.max(1, item.quantity + change);
            document.getElementById(`qty${index}`).textContent = item.quantity;
        }
    });
    updateBill();
}

function removeItem(index) {
    selectedItems.splice(index, 1);
    updateBill();
}

function resetBill() {
    selectedItems = [];
    updateBill();
    renderItems();
}

function updateBill() {
    let total = 0;
    const billPreview = document.getElementById("billPreview");
    billPreview.innerHTML = "";

    selectedItems.forEach((item, index) => {
        let price = item.portion === "full" ? item.fullPrice : item.halfPrice;
        total += price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("border", "p-2", "rounded-lg", "bg-gray-700", "flex", "justify-between");
        itemDiv.innerHTML = `<span>${item.name} (${item.portion}) x${item.quantity}</span>
            <span>₹${price * item.quantity} <button class="text-red-500" onclick="removeItem(${index})">❌</button></span>`;
        billPreview.appendChild(itemDiv);
    });

    document.getElementById("total").textContent = total;
}

function printBill() {
    if (selectedItems.length === 0) {
        alert("No items selected!");
        return;
    }

    let bill = {
        items: selectedItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            portion: item.portion,
            price: item.portion === "full" ? item.fullPrice : item.halfPrice,
            total: (item.portion === "full" ? item.fullPrice : item.halfPrice) * item.quantity
        })),
        total: document.getElementById("total").textContent
    };

    ipcRenderer.send('print-bill', bill);
}

renderItems();

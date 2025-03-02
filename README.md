# 🍽️ Pramukh Restaurant Billing

Pramukh Restaurant Billing is a **desktop application** built with **Electron.js, Tailwind CSS, and MongoDB**. It allows restaurant owners to **manage billing, print invoices, and save bills** to a database.

## 🚀 Features

- 🛒 **Item Selection with Variants**: Select items with full or half portions.
- ➕➖ **Quantity Adjustment**: Increase or decrease item quantity.
- 🗑️ **Remove Items & Reset Bill**: Modify or clear the bill before printing.
- 🖨️ **Print Bill**: Print the bill using any connected printer.
- 💾 **Save Bills in MongoDB**: Automatically store each bill for future reference.
- 🔍 **Live Search**: Quickly find menu items.
- ✨ **Modern UI with Glassmorphism**: Beautiful, responsive, and user-friendly design.

## 🛠️ Installation

### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/pramukh-restaurant-billing.git
cd pramukh-restaurant-billing
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Run the Application**
```sh
npm start
```

## 🖥️ Build for Production

To package the app as a **desktop application** with an icon:
```sh
npm run make
```
This will generate a **.deb file** for Ubuntu.

## 🔌 Connecting to MongoDB

This project uses **MongoDB Atlas**. Update the connection string in `main.js`:
```js
const uri = "mongodb+srv://your-username:your-password@cluster.mongodb.net/?retryWrites=true&w=majority";
```

## 🖨️ Printing Bills

Ensure your printer is connected and recognized by Ubuntu. To list available printers:
```sh
lpstat -p -d
```
By default, the system print dialog will appear when printing. To enable silent printing, update `main.js`:
```js
const options = { silent: true, printBackground: true };
mainWindow.webContents.print(options);
```

## 📂 Project Structure
```
📦 pramukh-restaurant-billing
 ┣ 📜 main.js         # Electron main process (handles printing & MongoDB)
 ┣ 📜 renderer.js     # Frontend logic (handles UI interactions & item selection)
 ┣ 📜 index.html      # UI layout with Tailwind CSS
 ┣ 📜 package.json    # Project dependencies & scripts
 ┣ 📜 README.md       # Project documentation
```

## 🤝 Contributing

1. Fork the project.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

## 📜 License
This project is licensed under the **MIT License**.

## 💌 Contact
For any issues or feature requests, feel free to reach out at **your-email@example.com** or open an issue on GitHub.

---
Made with ❤️ by **Jetal**


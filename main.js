const { app, BrowserWindow, ipcMain } = require('electron');
const { MongoClient } = require('mongodb');
const path = require('path');

let mainWindow;

const uri = "mongodb+srv://j2patel4545:32193219j@cluster0.oe8uz52.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Pramukh";
const client = new MongoClient(uri);
const dbName = "restaurantBilling";

async function saveBillToDB(bill) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("bills");

        bill.date = new Date().toISOString();
        await collection.insertOne(bill);

        console.log("Bill saved to MongoDB:", bill);
    } catch (err) {
        console.error("Error saving bill to MongoDB:", err);
    } finally {
        await client.close();
    }
}

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 700,
        webPreferences: { nodeIntegration: true, contextIsolation: false }
    });

    mainWindow.loadFile('index.html');

    ipcMain.on('print-bill', async (event, bill) => {
        await saveBillToDB(bill);
        mainWindow.webContents.print();
    });

    app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindow = new BrowserWindow({ width: 500, height: 700, webPreferences: { nodeIntegration: true, contextIsolation: false } });
            mainWindow.loadFile('index.html');
        }
    });
});

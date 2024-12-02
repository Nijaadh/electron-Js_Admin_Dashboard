const axios = require('axios');
const { app, BrowserWindow, ipcMain, session, net } = require('electron');
const path = require('path');
const baseUrl = "https://c1.abisystems.net/bonita";

let mainWindow;

async function clearCacheAndCreateWindow() {
    // Clear cache programmatically
    await session.defaultSession.clearCache();
    createWindow();
}

function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        frame: true,
        backgroundColor: '#282c34',
        titleBarOverlay: {
            color: '#191c24',
            symbolColor: '#ffffff'
        },
        icon: path.join(__dirname, 'img', 'zonoc_logo_red.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            webSecurity: true,
            autoFillEnabled: false,
            enableRemoteModule: false,
            // devTools: process.env.NODE_ENV === 'development',
            devTools: true,  // Explicitly enable DevTools
            contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;",
            partition: 'persist:main',
            diskCache: false
        }
    });

    // Add this after window creation
mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(false);
});

    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile('components/login_component/login.html');
}

// Window control handlers
ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});

ipcMain.on('toggle-fullscreen', () => {
    const isFullscreen = mainWindow.isFullScreen();
    mainWindow.setFullScreen(!isFullscreen);
    mainWindow.webContents.send('fullscreen-change', !isFullscreen);
});

ipcMain.on('close-window', () => {
    mainWindow.close();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        clearCacheAndCreateWindow();
    }
});

// API Handlers
ipcMain.handle('login', async (event, loginUrl) => {
    try {
        const response = await axios.get(loginUrl, {
            maxRedirects: 0,
            validateStatus: function (status) {
                return status >= 200 && status < 303;
            }
        });
        return {
            success: true,
            status: response.status,
            cookies: response.headers['set-cookie']
        };
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                status: error.response.status,
                message: error.message
            };
        }
        throw error;
    }
});

ipcMain.handle('fetchTasks', async (event, url, token) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Cookie': token ? token.join('; ') : '',
                'Content-Type': 'application/json'
            }
        });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
});

ipcMain.handle('fetchTaskDetails', async (event, url, token) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Cookie': token ? token.join('; ') : '',
                'Content-Type': 'application/json'
            }
        });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
});

ipcMain.handle('fetchImage', async (event, imageUrl, token) => {
    try {
        const apiToken = token.find(t => t.includes('X-Bonita-API-Token'))
            .split('=')[1]
            .split(';')[0];

        const response = await fetch(imageUrl, {
            headers: {
                'X-Bonita-API-Token': apiToken,
                'Cookie': token.join('; ')
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');

        return {
            success: true,
            imageData: base64Image
        };
    } catch (error) {
        console.error('Image fetch error:', error);
        return {
            success: false,
            error: error.message
        };
    }
});

ipcMain.handle('updateTask', async (event, url, token, data) => {
    try {
        const response = await axios.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': token.join('; '),
                'X-Bonita-API-Token': token.find(t => t.includes('X-Bonita-API-Token')).split('=')[1].split(';')[0]
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('updateSupplier', async (event, url, token, data) => {
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': token.join('; '),
                'X-Bonita-API-Token': token.find(t => t.includes('X-Bonita-API-Token')).split('=')[1].split(';')[0]
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// Initialize app
app.whenReady().then(async () => {
    app.setPath('userData', path.join(app.getPath('temp'), app.getName()));
    await clearCacheAndCreateWindow();
});

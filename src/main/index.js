import { app, BrowserWindow, Menu } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`
global._winURL = winURL;

function createWindow() {
    /**
     * Initial window options123sfdsfsdsdf
     */
    Menu.setApplicationMenu(null)
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        title: "mock",
        width: 1000
    })
    console.log("******",winURL)
    mainWindow.loadURL(winURL)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    mainWindow.on('page-title-updated', (event) => {
        event.preventDefault()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
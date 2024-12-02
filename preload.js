
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    toggleFullScreen: () => ipcRenderer.send('toggle-fullscreen'),
    onFullscreenChange: (callback) => ipcRenderer.on('fullscreen-change', callback),
    login: (url) => ipcRenderer.invoke('login', url),
    fetchTasks: (url, token) => ipcRenderer.invoke('fetchTasks', url, token),
    fetchTaskDetails: (url, token) => ipcRenderer.invoke('fetchTaskDetails', url, token),
    fetchImage: (url, token) => ipcRenderer.invoke('fetchImage', url, token),
    updateTask: (url, token, data) => ipcRenderer.invoke('updateTask', url, token, data),
    updateSupplier: (url, token, data) => ipcRenderer.invoke('updateSupplier', url, token, data)
})



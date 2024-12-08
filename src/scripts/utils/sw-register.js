import * as WorkboxWindow from "workbox-window"
import CONFIG from "../globals/config"

const swRegister = async () => {
	if(CONFIG.NODE_ENV !== "production") return
	if (!("serviceWorker" in navigator)) {
		console.log("Service Worker not supported in the browser")
		return
	}

	const wb = new WorkboxWindow.Workbox("/sw.bundle.js")
	try {
		await wb.register()
		console.log("Service worker registered")
	} catch (error) {
		console.log("Failed to register service worker", error)
	}
}

export default swRegister

import { Toaster } from "@/components/ui/sonner"
import { getAnalytics } from "firebase/analytics"
import { initializeApp, type FirebaseOptions } from "firebase/app"
import ReactDOM from "react-dom/client"
import { App } from "./App.tsx"
import { ThemeProvider } from "./components/ui/theme-provider.tsx"
import "./index.css"
import { Synchronizer } from "@/components/Synchronizer.tsx"

const firebaseConfig: FirebaseOptions = {
	apiKey: "AIzaSyDXU843EYCM4-lvHpMXKEElOJq06hwsbhM",
	authDomain: "chat-app-ea293.firebaseapp.com",
	databaseURL:
		"https://chat-app-ea293-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "chat-app-ea293",
	storageBucket: "chat-app-ea293.appspot.com",
	messagingSenderId: "375856468870",
	appId: "1:375856468870:web:d51376a88020c32ae55207",
	measurementId: "G-PBV4ZSTH1H",
}

const app = initializeApp(firebaseConfig)
getAnalytics(app)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
		<App />
		<Toaster />
		<Synchronizer />
	</ThemeProvider>,
)

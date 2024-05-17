import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Forgot from './pages/auth/Forgot'
import Reset from './pages/auth/Reset'
import Sidebar from './components/sidebar/Sidebar'
import Layout from './components/layout/Layout'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/logowanie'
					element={<Login />}
				/>
				<Route
					path='/rejestracja'
					element={<Register />}
				/>
				<Route
					path='/odzyskaj-haslo'
					element={<Forgot />}
				/>
				<Route
					path='/zresetuj-haslo/:resetToken'
					element={<Reset />}
				/>

				<Route
					path='/dashboard'
					element={
						<Sidebar>
							<Layout>
								<Dashboard/>
							</Layout>
						</Sidebar>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
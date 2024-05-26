import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Forgot from './pages/auth/Forgot'
import Reset from './pages/auth/Reset'
import Sidebar from './components/sidebar/Sidebar'
import Layout from './components/layout/Layout'
import Dashboard from './pages/dashboard/Dashboard'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getLoginStatus } from './services/authService'
import { SET_LOGIN } from './redux/features/auth/authSlice'
import AddProduct from './pages/addProduct/AddProduct'
import ProductDetail from './components/product/productDetail/ProductDetail'
import EditProduct from './pages/editProduct/EditProduct'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import Contact from './pages/contact/Contact'

axios.defaults.withCredentials = true

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		async function loginStatus() {
			const status = await getLoginStatus()
			dispatch(SET_LOGIN(status))
		}
		loginStatus()
	}, [dispatch])

	return (
		<BrowserRouter>
			<ToastContainer />
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
								<Dashboard />
							</Layout>
						</Sidebar>
					}
				/>

				<Route
					path='/dodaj-produkt'
					element={
						<Sidebar>
							<Layout>
								<AddProduct />
							</Layout>
						</Sidebar>
					}
				/>

				<Route
					path='/produkt/:id'
					element={
						<Sidebar>
							<Layout>
								<ProductDetail />
							</Layout>
						</Sidebar>
					}
				/>

				<Route
					path='/edytuj-produkt/:id'
					element={
						<Sidebar>
							<Layout>
								<EditProduct />
							</Layout>
						</Sidebar>
					}
				/>

				<Route
					path='/profil'
					element={
						<Sidebar>
							<Layout>
								<Profile />
							</Layout>
						</Sidebar>
					}
				/>
				<Route
					path='/edytuj-profil'
					element={
						<Sidebar>
							<Layout>
								<EditProfile />
							</Layout>
						</Sidebar>
					}
				/>
				<Route
					path='/kontakt'
					element={
						<Sidebar>
							<Layout>
								<Contact />
							</Layout>
						</Sidebar>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App

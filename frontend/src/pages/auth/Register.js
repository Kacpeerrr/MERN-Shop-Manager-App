import React, { useState } from 'react'
import styles from './auth.module.scss'
import { TiUserAddOutline } from 'react-icons/ti'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validateEmail, registerUser, validatePassword } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice"
import Loader from '../../components/loader/Loader'

const initialState = {
	name: '',
	email: '',
	password: '',
	password2: '',
}

const Register = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setformData] = useState(initialState)
	const { name, email, password, password2 } = formData

	const handleInputChange = e => {
		const { name, value } = e.target
		setformData({ ...formData, [name]: value })
	}

	const register = async e => {
		e.preventDefault()

		if (!name || !email || !password) {
			return toast.error('Wszystkie pola wymagane')
		}

		if (!validateEmail(email)) {
			return toast.error('Podaj poprawny email')
		}

		if (!validatePassword(password)) {
			return toast.error('Hasło musi posiadać: 6 znaków, cyfrę, dużą i małą literę')
		}

		if (password !== password2) {
			return toast.error('Hasła nie pasują do siebie')
		}

		const userData = {
			name,
			email,
			password,
		}
		setIsLoading(true)
		try {
			const data = await registerUser(userData)
			await dispatch(SET_LOGIN(true))
			await dispatch(SET_NAME(data.name))
			navigate("/dashboard")
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}

	return (
		<div className={`container ${styles.auth}`}>
			{isLoading && <Loader/>}
			<Card>
				<div className={styles.form}>
					<div className='--flex-center'>
						<TiUserAddOutline
							size={35}
							color='#999'
						/>
					</div>
					<h2>Rejestracja</h2>
					<form onSubmit={register}>
						<input
							type='text'
							placeholder='Nazwa użytkownika'
							required
							name='name'
							value={name}
							onChange={handleInputChange}
						/>
						<input
							type='email'
							placeholder='Email'
							required
							name='email'
							value={email}
							onChange={handleInputChange}
						/>
						<input
							type='password'
							placeholder='Hasło'
							required
							name='password'
							value={password}
							onChange={handleInputChange}
						/>
						<input
							type='password'
							placeholder='Powtórz hasło'
							required
							name='password2'
							value={password2}
							onChange={handleInputChange}
						/>
						<button
							type='submit'
							className='--btn --btn-primary --btn-block'>
							Zarejestruj się
						</button>
						<span className={styles.register}>
							<Link to='/'>Home</Link>
							<p>&nbsp; Masz już konto? &nbsp;</p>
							<Link to='/logowanie'>Zaloguj się</Link>
						</span>
					</form>
				</div>
			</Card>
		</div>
	)
}

export default Register

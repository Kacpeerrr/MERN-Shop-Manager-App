import React, { useState } from 'react'
import styles from './auth.module.scss'
import { MdPassword } from 'react-icons/md'
import Card from '../../components/card/Card'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetPassword, validatePassword } from '../../services/authService'

const initialState = {
	password: '',
	password2: '',
}

const Reset = () => {
	const [formData, setformData] = useState(initialState)
	const { password, password2 } = formData
	const navigate = useNavigate()

	const { resetToken } = useParams()

	const handleInputChange = e => {
		const { name, value } = e.target
		setformData({ ...formData, [name]: value })
	}

	const reset = async e => {
		e.preventDefault()

		if (!validatePassword(password)) {
			return toast.error('Hasło musi posiadać: 6 znaków, cyfrę, dużą i małą literę')
		}

		if (password !== password2) {
			return toast.error('Hasła nie pasują do siebie')
		}

		const userData = {
			password,
			password2,
		}

		try {
			const data = await resetPassword(userData, resetToken)
			toast.success(data.message)
			navigate("/logowanie")
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<div className={`container ${styles.auth}`}>
			<Card>
				<div className={styles.form}>
					<div className='--flex-center'>
						<MdPassword
							size={35}
							color='#999'
						/>
					</div>
					<h2>Zresetuj hasło</h2>
					<form onSubmit={reset}>
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
							Zresetuj hasło
						</button>
						<div className={styles.links}>
							<p>
								<Link to='/'>- Home</Link>
							</p>
							<p>
								<Link to='/logowanie'>- Zaloguj się</Link>
							</p>
						</div>
					</form>
				</div>
			</Card>
		</div>
	)
}

export default Reset

import React from 'react'
import styles from './auth.module.scss'
import { BiLogIn } from 'react-icons/bi'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Login = () => {
	return (
		<div className={`container ${styles.auth}`}>
			<Card>
				<div className={styles.form}>
					<div className='--flex-center'>
						<BiLogIn
							size={35}
							color='#999'
						/>
					</div>
					<h2>Logowanie</h2>
					<form>
						<input
							type='email'
							placeholder='Email'
							required
							name='email'
						/>
						<input
							type='password'
							placeholder='Hasło'
							required
							name='password'
						/>
						<button
							type='submit'
							className='--btn --btn-primary --btn-block'>
							Zaloguj się
						</button>
						<Link to='/odzyskaj-haslo'>Przypomnij hasło</Link>
						<span className={styles.register}>
							<Link to='/'>Home</Link>
							<p>&nbsp; Nie masz konta? &nbsp;</p>
							<Link to='/rejestracja'>Zarejestruj się</Link>
						</span>
					</form>
				</div>
			</Card>
		</div>
	)
}

export default Login

import React from 'react'
import styles from './auth.module.scss'
import { MdPassword } from 'react-icons/md'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Reset = () => {
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
					<form>
						<input
							type='password'
							placeholder='Hasło'
							required
							name='password'
						/>
						<input
							type='password'
							placeholder='Powtórz hasło'
							required
							name='password'
						/>
						<button
							type='submit'
							className='--btn --btn-primary --btn-block'>
							Zrezestuj hasło
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

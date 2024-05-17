import React from 'react'
import { RiProductHuntLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import './Home.scss'
import heroImg from "../../assets/inv-img.png"

const Home = () => {
	return (
		<div className='home'>
			<nav className='container --flex-between'>
				<div className='logo'>
					<RiProductHuntLine size={35} />
				</div>
				<ul className='home-links'>
					<li>
						<Link to='/rejestracja'>Rejestracja</Link>
					</li>
					<li>
						<button className='--btn --btn-primary'>
							<Link to='/logowanie'>Logowanie</Link>
						</button>
					</li>
					<li>
						<button className='--btn --btn-primary'>
							<Link to='/dashboard'>Dashboard</Link>
						</button>
					</li>
				</ul>
			</nav>
			{/* HERO SECTION */}
			<section className='container hero'>
				<div className='hero-text'>
					<h2>Rozwiązanie do zarządzania sklepem</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, distinctio porro? Quia dolor consequatur
						suscipit officiis ut, aliquid deserunt iusto.
					</p>
					<div className='hero-buttons'>
						<button className='--btn --btn-secondary'>
							<Link to='/dashboard'>Darmowa wersja próbna - 1 miesiąc </Link>
						</button>
					</div>
					<div className="--flex-start">
						<NumberText num="10" text="Sklepów"/>
						<NumberText num="10 000" text="Aktywnych użytkowników"/>
						<NumberText num="100+" text="Partnerów"/>
					</div>
				</div>
				<div className='hero-image'>
					<img src={heroImg} alt="screenshot app"/>
				</div>
			</section>
		</div>
	)
}

const NumberText = ({ num, text }) => {
	return (
		<div className='--mr'>
			<h3 className='--color-white'>{num}</h3>
			<p className='--color-white'>{text}</p>
		</div>
	)
}

export default Home

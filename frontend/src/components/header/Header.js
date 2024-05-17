import React from 'react'

const Header = () => {
	return (
        <div className='--pad header'>
            <div className="--flex-between">
                <h3>
                    <span className='--fw-thin'>Witaj,</span>
                    <span className='--color-danger'>Kacper</span>
                </h3>
                <button className="--btn --btn-danger">
                    Wyloguj
                </button>
            </div>
            <hr/>
        </div>
    )
}

export default Header

const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	//Validation
	if (!name || !email || !password) {
		res.status(400)
		throw new Error('Wypełnij wszystkie wymagane pola')
	}
	if (password.length < 6) {
		res.status(400)
		throw new Error('Hasło musi posiadać 6 znaków')
	}

	//Check if user email already exists
	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('Użytkownik o takim mailu już istnieje')
	}


	// Create new user
	const user = await User.create({
		name,
		email,
		password,
	})

	if (user) {
		const { _id, name, email, photo, phone, bio } = user
		res.status(201).json({
			_id,
			name,
			email,
			photo,
			phone,
			bio,
		})
	} else {
		res.status(400)
		throw new Error('Niepoprawne dane użytkownika')
	}
})

module.exports = {
	registerUser,
}

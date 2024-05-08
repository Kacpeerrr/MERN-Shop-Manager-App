const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const { fileSizeFormatter } = require('../utils/fileUpload')

//Create Product
const createProduct = asyncHandler(async (req, res) => {
	const { name, sku, category, quantity, price, description } = req.body

	// Validation
	if (!name || !category || !quantity || !price || !description) {
		res.status(400)
		throw new Error('Uzupełnij wszystkie pola')
	}

	// Handle image upload
	let fileData = {}
	if (req.file) {
		fileData = {
			fileName: req.file.originalname,
			filePath: req.file.path,
			fileType: req.file.mimetype,
			fileSize: fileSizeFormatter(req.file.size, 2),
		}
	}

	// Create product
	const product = await Product.create({
		user: req.user.id,
		name,
		sku,
		category,
		quantity,
		price,
		description,
		image: fileData,
	})
	res.status(201).json(product)
})

// Get all products
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({ user: req.user.id }).sort('-createdAt')
	res.status(200).json(products)
})

// Get single product
const getProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	// if product doesn't exist
	if (!product) {
		res.status(404)
		throw new Error('Product nie istnieje')
	}
	//match product to user
	if (product.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('Użytkownik bez autoryzacji do produktu')
	}
	res.status(200).json(product)
})

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	// if product doesn't exist
	if (!product) {
		res.status(404)
		throw new Error('Product nie istnieje')
	}
	//match product to user
	if (product.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('Użytkownik bez autoryzacji do produktu')
	}
	await product.deleteOne()
	res.status(200).json({ message: 'Produkt usunięty' })
})

// Update product
const updateProduct = asyncHandler(async (req, res) => {
	const { name, category, quantity, price, description } = req.body
	const { id } = req.params

	const product = await Product.findById(id)

	// if product doesn't exist
	if (!product) {
		res.status(404)
		throw new Error('Product nie istnieje')
	}

	//match product to user
	if (product.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('Użytkownik bez autoryzacji do produktu')
	}

	// Handle image upload
	let fileData = {}
	if (req.file) {
		fileData = {
			fileName: req.file.originalname,
			filePath: req.file.path,
			fileType: req.file.mimetype,
			fileSize: fileSizeFormatter(req.file.size, 2),
		}
	}

	//Update product
	const updatedProduct = await Product.findByIdAndUpdate(
		{ _id: id },
		{
			name,
			category,
			quantity,
			price,
			description,
			image: Object.keys(fileData).length === 0 ? product?.image : fileData,
		},
		{
			new: true,
			runValidators: true,
		}
	)
	res.status(200).json(updatedProduct)
})

module.exports = {
	createProduct,
	getProducts,
	getProduct,
	deleteProduct,
	updateProduct,
}

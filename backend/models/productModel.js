const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: [true, 'Dodaj nazwę'],
			trim: true,
		},
		sku: {
			type: String,
			required: true,
			default: 'SKU',
			trim: true,
		},
		category: {
			type: String,
			required: [true, 'Dodaj kategorię'],
			trim: true,
		},
		quantity: {
			type: String,
			required: [true, 'Dodaj ilość'],
			trim: true,
		},
		price: {
			type: String,
			required: [true, 'Dodaj cenę'],
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'Dodaj opis'],
			trim: true,
		},
		image: {
			type: Object,
			default: {},
		},
	},
	{
		timestamps: true,
	}
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product

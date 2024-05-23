import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './ProductForm.scss'
import Card from '../../card/Card'

const ProductForm = ({
	product,
	productImage,
	imagePreview,
	description,
	setDescription,
	handleInputChange,
	handleImageChange,
	saveProduct,
}) => {
	return (
		<div className='add-product'>
			<Card cardClass={'card'}>
				<form onSubmit={saveProduct}>
					<Card cardClass={'group'}>
						<label>Zdjęcie Produktu</label>
						<code className='--color-dark'>Wspierane Formaty: jpg, jpeg, png</code>
						<input
							type='file'
							name='image'
							onChange={e => handleImageChange(e)}></input>
						{imagePreview != null ? (
							<div className='image-preview'>
								<img
									src={imagePreview}
									alt='Zdjęcie produktu'
								/>
							</div>
						) : (
							<p>Brak ustawionego zdjęcia dla tego produktu</p>
						)}
					</Card>

					<label>Nazwa Produktu:</label>
					<input
						type='text'
						placeholder='Nazwa produktu'
						name='name'
						value={product?.name}
						onChange={handleInputChange}
					/>

					<label>Kategoria Produktu</label>
					<input
						type='text'
						placeholder='Kategoria Produktu'
						name='category'
						value={product?.category}
						onChange={handleInputChange}
					/>

					<label>Cena Produktu</label>
					<input
						type='text'
						placeholder='Cena Produktu'
						name='price'
						value={product?.price}
						onChange={handleInputChange}
					/>

					<label>Ilość Produktu</label>
					<input
						type='text'
						placeholder='Ilość Produktu'
						name='quantity'
						value={product?.quantity}
						onChange={handleInputChange}
					/>

					<label>Opis Produktu</label>
					<ReactQuill
						theme='snow'
						value={description}
						onChange={setDescription}
						modules={ProductForm.modules}
						formats={ProductForm.formats}
					/>
					<div className='--my'>
						<button
							type='submit'
							className='--btn --btn-primary'>
							Zapisz Produkt
						</button>
					</div>
				</form>
			</Card>
		</div>
	)
}

ProductForm.modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ align: [] }],
		[{ color: [] }, { background: [] }],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		['clean'],
	],
}
ProductForm.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'color',
	'background',
	'list',
	'bullet',
	'indent',
	'link',
	'video',
	'image',
	'code-block',
	'align',
]

export default ProductForm

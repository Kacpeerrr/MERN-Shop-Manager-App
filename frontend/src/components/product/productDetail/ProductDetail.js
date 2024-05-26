import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice'
import { getProduct } from '../../../redux/features/product/productSlice'
import Card from '../../card/Card'
import { SpinnerImg } from '../../loader/Loader'
import './ProductDetail.scss'
import DOMPurify from 'dompurify'

const ProductDetail = () => {
	useRedirectLoggedOutUser('/logowanie')
	const dispatch = useDispatch()

	const { id } = useParams()

	const isLoggedIn = useSelector(selectIsLoggedIn)
	const { product, isLoading, isError, message } = useSelector(state => state.product)

	const stockStatus = quantity => {
		if (quantity > 0) {
			return <span className='--color-success'>W magazynie</span>
		}
		return <span className='--color-danger'>Brak w magazynie</span>
	}

	useEffect(() => {
		if (isLoggedIn === true) {
			dispatch(getProduct(id))
		}

		if (isError) {
			console.log(message)
		}
	}, [isLoggedIn, isError, message, dispatch])

	return (
		<div className='product-detail'>
			<h3 className='--mt'>Szczegóły produktu</h3>
			<Card cardClass='card'>
				{isLoading && <SpinnerImg />}
				{product && (
					<div className='detail'>
						<Card cardClass='group'>
							{product?.image ? (
								<div>
									<img
										src={product.image.filePath}
										alt={product.image.fileName}
									/>
								</div>
							) : (
								<p>Brak zdjęcia dla tego produktu</p>
							)}
						</Card>
						<h4>Dostępność produktu: {stockStatus(product.quantity)}</h4>
						<hr />
						<h4>
							<span className='badge'>Nazwa </span> &nbsp; {product.name}
						</h4>
						<p>
							<b>&rarr; SKU : </b> {product.sku}
						</p>
						<p>
							<b>&rarr; Kategoria : </b> {product.category}
						</p>
						<p>
							<b>&rarr; Cena : </b>
							{product.price} {' PLN'}
						</p>
						<p>
							<b>&rarr; Ilość w magazynie : </b> {product.quantity}
						</p>
						<p>
							<b>&rarr; Całkowita wartość : </b>
							{product.price * product.quantity}
							{' PLN'}
						</p>
						<hr />
						<p>
							<b>&rarr; Opis : </b>{' '}
						</p>
						<div
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(product.description),
							}}></div>
						<hr />
						<code className='--color-dark'>Stworzony: {product.createdAt.toLocaleString('en-US')}</code>
						<br />
						<code className='--color-dark'>Zaktualizowany: {product.updatedAt.toLocaleString('en-US')}</code>
					</div>
				)}
			</Card>
		</div>
	)
}

export default ProductDetail

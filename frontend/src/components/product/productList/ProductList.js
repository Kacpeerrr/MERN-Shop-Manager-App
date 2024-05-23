import React, { useEffect, useState } from 'react'
import './productList.scss'
import { SpinnerImg } from '../../loader/Loader'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from 'react-icons/ai'
import Search from '../../search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/product/filterSlice'
import ReactPaginate from 'react-paginate'

const ProductList = ({ products, isLoading }) => {
	const [search, setSearch] = useState('')
	const filteredProducts = useSelector(selectFilteredProducts)

	const dispatch = useDispatch()

	const shortenText = (text, n) => {
		if (text.length > n) {
			const shortenedText = text.substring(0, n).concat('...')
			return shortenedText
		}
		return text
	}

	// Start pagination
	const [currentItems, setCurrentItems] = useState([])
	const [pageCount, setPageCount] = useState(0)
	const [itemOffset, setItemOffset] = useState(0)
	const itemsPerPage = 2

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage

		setCurrentItems(filteredProducts.slice(itemOffset, endOffset))
		setPageCount(Math.ceil(filteredProducts.length / itemsPerPage))
	}, [itemOffset, itemsPerPage, filteredProducts])

	const handlePageClick = event => {
		const newOffset = (event.selected * itemsPerPage) % filteredProducts.length
		setItemOffset(newOffset)
	}
	// End pagination

	useEffect(() => {
		dispatch(FILTER_PRODUCTS({ products, search }))
	}, [products, search, dispatch])

	return (
		<div className='product-list'>
			<hr />
			<div className='table'>
				<div className='--flex-between --flex-dir-column'>
					<span>
						<h3>Pozycje sklepu</h3>
					</span>
					<span>
						<Search
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</span>
				</div>
				{isLoading && <SpinnerImg />}
				<div className='table'>
					{!isLoading && products.length === 0 ? (
						<p>-- Produkt nie istnieje. Dodaj produkt.</p>
					) : (
						<table>
							<thead>
								<tr>
									<th>Numer</th>
									<th>Nazwa</th>
									<th>Kategoria</th>
									<th>Cena</th>
									<th>Ilość</th>
									<th>Wartość</th>
									<th>Akcja</th>
								</tr>
							</thead>
							<tbody>
								{currentItems.map((product, index) => {
									const { _id, name, category, price, quantity } = product
									return (
										<tr key={_id}>
											<td>{index + 1}</td>
											<td>{shortenText(name, 16)}</td>
											<td>{category}</td>
											<td>
												{price} {'PLN'}
											</td>
											<td>{quantity}</td>
											<td>
												{price * quantity} {'PLN'}
											</td>
											<td className='icons'>
												<AiOutlineEye
													size={25}
													color={'purple'}
												/>
												<FaEdit
													size={20}
													color={'green'}
												/>
												<FaTrashAlt
													size={20}
													color={'red'}
												/>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					)}
				</div>
				<ReactPaginate
					breakLabel='...'
					nextLabel='Następna >'
					onPageChange={handlePageClick}
					pageRangeDisplayed={2}
					pageCount={pageCount}
					previousLabel='< Poprzednia'
					renderOnZeroPageCount={null}
					containerClassName='pagination'
					pageLinkClassName='page-num'
					previousLinkClassName='page-num'
					nextLinkClassName='page-num'
					activeLinkClassName='activePage'
				/>
			</div>
		</div>
	)
}

export default ProductList

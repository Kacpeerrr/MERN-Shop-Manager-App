import React from 'react'
import './productList.scss'
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

const ProductList = ({ products, isLoading }) => {
    const shortenText = (text, n) => {
        if(text.length > n) {
            const shortenedText = text.substring(0, n).concat("...")
            return shortenedText
        }
        return text
    }
	return (
		<div className='product-list'>
			<hr />
			<div className='table'>
				<div className='--flex-between --flex-dir-column'>
					<span>
						<h3>Pozycje sklepu</h3>
					</span>
                    <span>
                        <h3>Wyszukiwany produkt</h3>
                    </span>
				</div>
                {isLoading && <SpinnerImg/>}
                <div className="table">
                    {!isLoading && products.length === 0 ? (
                        <p>-- Produkt nie istnieje. Dodaj produkt.</p>
                    ): (
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
                                {
                                    products.map((product, index) => {
                                        const {_id, name, category, price, quantity} = product
                                        return (
                                            <tr key={_id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {shortenText(name, 16)}
                                                </td>
                                                <td>{category}</td>
                                                <td>{price} {"PLN"}</td>
                                                <td>{quantity}</td>
                                                <td>{price * quantity} {"PLN"}</td>
                                                <td className='icons'>
                                                        <AiOutlineEye size={25} color={"purple"}/>
                                                        <FaEdit  size={20} color={"green"}/>
                                                        <FaTrashAlt size={20} color={"red"}/>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )}
                </div>
			</div>
		</div>
	)
}

export default ProductList

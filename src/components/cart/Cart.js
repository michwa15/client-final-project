import React, { useState, useEffect } from 'react';
import { getShoesByUser, removeFromUserCart } from '../../api/products';
import { isAuthenticated } from '../../helpers/auth';
import './Cart.css';

export const Cart = () => {

    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        getCartProducts();
    }, []);

    const getCartProducts = async () => {
        try {
            const user = await isAuthenticated();
            const response = await getShoesByUser(user);
            const { cartShoes } = response.data;
            setShoes(cartShoes);
        } catch (err) {
            console.log('Error with getting cart items');
        }
    }

    const handleRemoveFromCart = async (shoe) => {
        try {
            const user = await isAuthenticated();
            const data = {user, shoe};
            const response = await removeFromUserCart(data);
            const { updatedCart } = response.data;
            setShoes(updatedCart);
        } catch (err) {
            console.log('Error with removing cart item');
            // navigate('/not-found');
        }
    }

    const renderCard = (shoe) => (
        <div className="card" style={{'width':'400px'}} key={shoe._id}>
            <img className="card-img-top" src={shoe.media.smallImageUrl} alt="Card img" />
            <div className="card-body">
                <h4 className="card-title">{shoe.shoe}</h4>
                <p className="card-text">{shoe.title}</p>
                <div className='card-footer'>
                    <button className='remove-from-cart' onClick={() => handleRemoveFromCart(shoe)}>Remove from cart</button>
                    <strong className='price'>{shoe.retailPrice}$</strong>
                </div>
            </div>
        </div>
    )

    return (
        <div className='products-page'>
            <div className='card-deck'>
                {shoes.length ? shoes.map(shoe => renderCard(shoe)) : <h2>You don't have items in the cart, go back to products and add !</h2>}
            </div>
        </div>
    )
}

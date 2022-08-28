import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../helpers/auth';
import { addToUserCart } from '../../../api/products';
import './Card.css';

export const Card = ({ shoe }) => {
    const navigate = useNavigate();

    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const handleAddToCart = async (shoe) => {
        const user = isAuthenticated();
        if (!user) {
            navigate('/sign-in');
            return;
        }
        const data = { shoe, user };
        try {
            await addToUserCart(data);
            setIsAddedToCart(true);
            setTimeout(() => {
                setIsAddedToCart(false);
            }, 1500);
        } catch (err) {
            console.log(err.response.data.errorMessage);
        }
    }

    return (
        <div className="card" style={{ 'width': '400px' }} key={shoe._id}>
            <img className="card-img-top" src={shoe.media.smallImageUrl} alt="Card img" />
            <div className="card-body">
                <h4 className="card-title">{shoe.shoe}</h4>
                <p className="card-text">{shoe.title}</p>
                <div className='card-footer'>
                    <div className='add-to-cart-wrapper'>
                        <button className='add-to-cart' onClick={() => handleAddToCart(shoe)}>Add to cart</button>
                        {isAddedToCart && <p>Successfully added ✅</p>}
                    </div>
                    <strong className='price'>{shoe.retailPrice}$</strong>
                </div>
            </div>
        </div>
    )
}

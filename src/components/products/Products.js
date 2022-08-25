import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getShoes, addToUserCart, getShoesByName } from '../../api/products';
import { isAuthenticated } from '../../helpers/auth';
import './Products.css';

export const Products = () => {
    const navigate = useNavigate();

    const [shoes, setShoes] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await getShoes();
            const { shoes } = response.data;
            setShoes(shoes);
        } catch (err) {
            console.log('Error with getting items');
        }
    }

    const handleAddToCart = async (shoe) => {
        const user = isAuthenticated();
        if (!user) {
            navigate('/sign-in');
            return;
        }
        const data = { shoe, user };
        try {
            await addToUserCart(data);
        } catch (err) {
            console.log(err.response.data.errorMessage);
        }
    }

    const handleSearch = async (newValue) => {
        const response = await getShoesByName(newValue);
        const {shoesBySearch} = response.data;
        setShoes(shoesBySearch);
    }

    const handleChangeSearch = async (e) => {
        setSearchValue(e.target.value);
        handleSearch(e.target.value);
    }

    const renderCard = (shoe) => (
        <div className="card" style={{ 'width': '400px' }} key={shoe._id}>
            <img className="card-img-top" src={shoe.media.smallImageUrl} alt="Card img" />
            <div className="card-body">
                <h4 className="card-title">{shoe.shoe}</h4>
                <p className="card-text">{shoe.title}</p>
                <div className='card-footer'>
                    <button className='add-to-cart' onClick={() => handleAddToCart(shoe)}>Add to cart</button>
                    <strong className='price'>{shoe.retailPrice}$</strong>
                </div>
            </div>
        </div>
    )

    const renderSearch = () => (
        <div className='search-wrapper'>
            <input type="search" className="search-input" placeholder='Search by name' value={searchValue} name="search" onChange={handleChangeSearch} />
            <i className="fa fa-search search-icon" onClick={handleSearch}></i>
        </div>
    )
        
    return (
        <div className='products-page'>
            {renderSearch()}
            <div className='card-deck'>
                {shoes.map(shoe => renderCard(shoe))}
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { getShoes, getShoesByName } from '../../api/products';
import { Card } from './card/Card';
import './Products.css';

export const Products = () => {

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

    const handleSearch = async (newValue) => {
        const response = await getShoesByName(newValue);
        const {shoesBySearch} = response.data;
        setShoes(shoesBySearch);
    }

    const handleChangeSearch = async (e) => {
        setSearchValue(e.target.value);
        handleSearch(e.target.value);
    }

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
                {shoes.map(shoe => <Card key={shoe._id} shoe={shoe} />)}
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { getShoes } from '../../api/products';
import { Card } from './card/Card';
import './Products.css';

export const Products = () => {

    const [allShoes, setAllShoes] = useState([]);
    const [shoesToDisplay, setShoesToDisplay] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await getShoes();
            const { shoes } = response.data;
            setAllShoes(shoes);
            setShoesToDisplay(shoes);
        } catch (err) {
            console.log('Error with getting items');
        }
    }

    const handleSearch = async (newValue) => {
        const updatedShoes = allShoes.filter(shoe => shoe.shoe.toLowerCase().includes(newValue));
        setShoesToDisplay(updatedShoes);
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
                {shoesToDisplay.map(shoe => <Card key={shoe._id} shoe={shoe} />)}
            </div>
        </div>
    )
}

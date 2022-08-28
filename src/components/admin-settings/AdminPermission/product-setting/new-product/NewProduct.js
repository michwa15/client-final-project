import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addShoe } from '../../../../../api/admin';

import './NewProduct.css';

export const NewProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: ''
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault ();
        try {
            const {title, description, url} = formData;
            const data = {title, description, url};
            await addShoe(data);
            navigate('/admin-settings');
        } catch (err) {
            console.log("Can't add a new item");
        }
    }

    return (
        <div className='new-product-page'>
            <form onSubmit={handleSubmit}>
                <h3 className='title'>Add new Shoe</h3>
                <div className="input-container">
                    <label>Shoe's Name</label>
                    <input type="text" name="title" value={formData.title} placeholder="Enter shoe's name" onChange={handleInputChange} autoComplete="off" required />
                </div>
                <div className="input-container">
                    <label>Shoe's Description</label>
                    <input type="text" name="description" value={formData.description} placeholder="Enter shoe's description" onChange={handleInputChange} required />
                </div>
                <div className="input-container">
                    <label>Shoe's image Url</label>
                    <input type="text" name="url" value={formData.url} placeholder="Enter shoe's image url" onChange={handleInputChange} required />
                </div>
               
                <div className="button-container">
                    <input type="submit" value="Add Shoe to Collection" />
                </div>
            </form>
        </div>
    )
}

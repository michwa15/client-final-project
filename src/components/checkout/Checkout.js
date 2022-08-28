import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { purchase } from '../../api/checkout';
import { getShoesByUser } from '../../api/products';
import { isAuthenticated } from '../../helpers/auth';
import './Checkout.css';

export const Checkout = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [formData, setFormData] = useState({
        firstname: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cardname: '',
        cardnumber: '',
        expmonth: '',
        expyear: '',
        cvv: ''
    })

    useEffect(() => {
        getCartProducts();
    }, []);

    const getCartProducts = async () => {
        try {
            const user = await isAuthenticated();
            const response = await getShoesByUser(user);
            const { cartShoes } = response.data;
            const totalPrice = cartShoes.reduce((prevSum, currItem) => {
                const sum = prevSum + currItem.retailPrice;
                return sum;
            }, 0);
            setItems(cartShoes);
            setTotal(totalPrice);
            setUser(user);
        } catch (err) {
            console.log('Error with getting cart items');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(Object.values(formData).some(key => !key)){
            window.confirm('please fill all values in order to checkout');
            return;
        } else{
            const data = {
                user,
                shoes: items,
                totalPrice: total,
                itemsCount: items.length
            }
            await purchase(data);
            navigate('/checkout/complete');
        }
    }

    return (
        <div className='checkout-page'>
            <div className="row">
                <div className="col-75">
                    <div className='container'>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-50">
                                    <h3>Billing Address</h3>
                                    <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                                    <input type="text" id="fname" value={formData.firstname} onChange={handleInputChange} name="firstname" placeholder="John M. Doe" />
                                    <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                                    <input type="text" id="email" value={formData.email} onChange={handleInputChange} name="email" placeholder="john@example.com" />
                                    <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                                    <input type="text" id="adr" value={formData.address} onChange={handleInputChange} name="address" placeholder="542 W. 15th Street" />
                                    <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                                    <input type="text" id="city" value={formData.city} onChange={handleInputChange} name="city" placeholder="New York" />

                                    <div className="row">
                                        <div className="col-50">
                                            <label htmlFor="state">State</label>
                                            <input type="text" id="state" value={formData.state} onChange={handleInputChange} name="state" placeholder="NY" />
                                        </div>
                                        <div className="col-50">
                                            <label htmlFor="zip">Zip</label>
                                            <input type="text" id="zip" value={formData.zip} onChange={handleInputChange} name="zip" placeholder="10001" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-50">
                                    <label htmlFor="fname">Accepted Cards</label>
                                    <h3>Payment</h3>
                                    <div className="icon-container">
                                        <i className="fa fa-cc-visa" style={{ color: "navy" }}></i>
                                        <i className="fa fa-cc-amex" style={{ color: "blue" }}></i>
                                        <i className="fa fa-cc-mastercard" style={{ color: "red" }}></i>
                                        <i className="fa fa-cc-discover" style={{ color: "orange" }}></i>
                                    </div>
                                    <label htmlFor="cname">Name on Card</label>
                                    <input type="text" id="cname" value={formData.cardname} onChange={handleInputChange} name="cardname" placeholder="John More Doe" />
                                    <label htmlFor="ccnum">Credit card number</label>
                                    <input type="text" id="ccnum" value={formData.cardnumber} onChange={handleInputChange} name="cardnumber" placeholder="1111-2222-3333-4444" />
                                    <label htmlFor="expmonth">Exp Month</label>
                                    <input type="text" id="expmonth" value={formData.expmonth} onChange={handleInputChange} name="expmonth" placeholder="September" />

                                    <div className="row">
                                        <div className="col-50">
                                            <label htmlFor="expyear">Exp Year</label>
                                            <input type="text" id="expyear" value={formData.expyear} onChange={handleInputChange} name="expyear" placeholder="2018" />
                                        </div>
                                        <div className="col-50">
                                            <label htmlFor="cvv">CVV</label>
                                            <input type="text" id="cvv" value={formData.cvv} onChange={handleInputChange} name="cvv" placeholder="352" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label className='checkbox-wrapper'>
                                <input type="checkbox" name="sameadr"/>
                                <p>Shipping address same as billing</p>
                            </label>
                            <input type="submit" value="Continue to checkout" className="btn" />
                        </form>
                    </div>
                </div>
                <div className="col-25">
                    <div className="container">
                        <h4>Cart
                            <span className="price" style={{color: "black"}}>
                                <i className="fa fa-shopping-cart pr-1"></i>
                                <b>{items.length}</b>
                            </span>
                        </h4>
                        {items.map(item => (
                            <p key={item._id} style={{color: "#2196F3"}}>{item.shoe}<span className="price">{`${item.retailPrice}$`}</span></p>

                        ))}
                        <hr />
                        <p>Total <span className="price" style={{ color: "black" }}><b>{total}</b></span></p>
                    </div>
                </div>
            </div>
        </div>
    )
};

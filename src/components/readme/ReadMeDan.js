import React from 'react';
import Faq from 'react-faq-component';

import './ReadMe.css';

const data = {
    title: "README PAGE - DAN MANOR",
    rows: [
        {
            title: "Store name",
            content: "Shoez"
        },
        {
            title: "What are you selling?",
            content: "Here you can find all kinds and styles of your favorite shoes."
        },
        {
            title: "What additional page(s) did you add? How to operate it?",
            content: (
                <p>We added the following pages: <br /> 
                    <strong>1. THANK YOU FOR YOUR PURCHASE</strong> - after a customer made a purchase, he will be transformed to a new page where we're appreciating his time.
                    in order to get to this page please following the next order of actions: go to "Products" page (you can find it in the navbar) -{'>'} there, please add one item 
                    at least to your cart -{'>'} now, on the top right part of the screen you can find the profile settings, please click on it and click again on "checkout". 
                    Now, fill all the necessary parts and click "continue to checkout". You should be navigated to the relevant page.<br/>
                    <strong>2. ABOUT US</strong> - when clicking on "ABOUT US" in the navbar, you will find an interesting information about the guys that owns the store, and by chance,
                    they also programmed this website :{')'} <br/>
                    <strong>3. FIND US</strong>- when clicking on "FIND US" in the navbar, you will find all the relevant information about the store opening hours, address and phone
                    number. Moreover, in this page you have the option to keep your phone number and to wait for us to contact you as soon as possible.<br />
                    <strong>4. REVIEWS</strong>- when clicking on "REVIEWS" in the navbar, you can find a lot of relevant reviwes that our customers chose to share with the world. There, 
                    you can gain information about your items, about our policy and about our way of operating. I'm highly reccomend you to check out this page before you're ordering your new purchase.
                </p> )
        },
        {
            title: "What was hard to do?",
            content: "It was very tough to manage all the states of the app. A lot of timelines that should happen if something else happened. I recived help from Michael and studied a lot by myself. I didn't have the opportunity to do something in this scale before, and I'm grateful for that. I'm sure this kind of projects are pushing us to be our best."
        },
        {
            title: "Who is your partner? Name and id. What did you do? What did your partner do?",
            content: "My partner for this project was Michael Wachsman, id: 315529487. We did everything together. Both of us haven't done this before and thus we decided to progress together and tackle our obstacles together."   
        },
        {
            title: "Specify all the different routes your app supports",
            content: (
                <p>
                    * Home - '/'<br />
                    * About us - '/about'<br />
                    * Find us - '/find-us'<br/>
                    * Readme(Michael) - '/reademe/michael'<br/>
                    * Readme(Dan) - '/reademe/dan'<br/>
                    * Products - '/products'<br />
                    * Login - '/sign-in'<br />
                    * Register - '/register'<br />
                    * Admin (visible only for admin) - '/admin-settings'<br />
                    * Add new item - '/admin/add'<br />
                    * My Cart - '/cart'<br />
                    * Checkout - '/checkout'<br />
                    * Thank you - '/checkout/complete'<br />
                    * Reviews - '/reviews'
                </p>
            )
        }]
}

export const ReadMeDan = () => {
    return (
        <div className='readme-page'>
            <Faq data={data} />
        </div>
    )
}

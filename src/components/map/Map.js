import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/auth';
import storeLocation from '../../photos/5d2be940-fabd-4a20-9426-24c15fdcf833.jpg';

import './Map.css';

export const Map = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/sign-in');
        }
    }, [navigate])

    return (
        <div className='map-page'>
            <img className='store-location' src={storeLocation} alt='store-location' />
            <div className='contact-details'>
                <div className='hours-number'>
                    <div className='first-child'><h4><strong>Adress:</strong></h4><p>Dizengoff St 146, Tel Aviv</p></div>
                    <div><h4><strong>Number:</strong></h4><p>054429933012</p></div>
                </div>
                <div className='hours-number'>
                    <div className='first-child'>
                        <h4><strong>Hours: </strong></h4>
                        <p>
                            <div className='day-times'>
                                <div className='day'>Sunday</div>
                                <div className='time'>10am–7pm</div>
                            </div>
                            <div className='day-times'>
                                <div className='day'>Monday</div>
                                <div className='time'>10am–7pm</div>
                            </div>
                            <div className='day-times'>
                                <div className='day'>Tuesday</div>
                                <div className='time'>10am–7pm</div>
                            </div>
                            <div className='day-times'>
                                <div className='day'>Wednesday</div>
                                <div className='time'>10am–7pm</div>
                            </div>
                            <div className='day-times'>
                                <div className='day'>Thursday</div>
                                <div className='time'>10am–7pm</div>
                            </div>
                            <div className='day-times'>
                                <div className='day'>Friday</div>
                                <div className='time'>10am–3pm</div>
                            </div>
                            <div className='day-times'>
                                <div className='day'>Saturday</div>
                                <div className='time'>Closed</div>
                            </div>
                        </p>
                    </div>
                    <div className='callback'>
                        <form>
                            <label htmlFor="phoneNumber">
                                <h4><strong>Leave your phone number and we will call you back</strong></h4>
                            </label>
                            <input placeholder="Enter phone number" name="phoneNumber" />
                            <input className='send-number-button' type='submit' value='send' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

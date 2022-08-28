import React from 'react';
import Avatar from '@mui/material/Avatar';
import michaelPhoto from '../../photos/13A14DF7-B06C-4688-BBF5-09D2339F8F22.jpg';

import './About.css';

export const About = () => {
    return (
        <div className='about-us-page'>
            <img className='image-header' src='https://cdn.fleetfeet.com/assets/Gaviota-3-HOKA-Pair.png/dynamic:1-aspect:2.4-fit:cover-strategy:entropy/Gaviota-3-HOKA-Pair--1440.jpg' alt='shoes' />
            <h2 className='about-us-title'>Meet Our Team</h2>
            <div className='our-team'>
                <div className='single-team-player'>
                    <Avatar
                        alt="Michael"
                        src={michaelPhoto}
                        sx={{ width: 200, height: 200 }}
                    />
                    <div className='about-me'>
                        Hello my name is Michael Wachsman. I just finished my BA in computer science
                        and entrepreneurship. I borned and raised in Tel Aviv and as a sports fan I like to
                        play almost every sport that includes ball with it. I can guarantee that one of the
                        most important things when playing is the shoes you wear. That's where the idea came from-
                        to open our shoes store.
                    </div>
                </div>
                <div className='single-team-player'>
                    <Avatar
                        alt="Michael"
                        src={michaelPhoto}
                        sx={{ width: 200, height: 200 }}
                    />
                    <div className='about-me'>
                        Hello my name is Dan. i'm 22 years old from Tel Aviv. I'm a
                        second year computer science student and as a sport and
                        healthy lifestyle fan it seemed to me necessary to find a
                        solution to the difficulty of finding your perfect sports shoes.
                    </div>
                </div>
            </div>
        </div>
    )
}

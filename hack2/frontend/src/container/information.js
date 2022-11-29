/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {
        return (
            <>
                {
                    tags.map((tag) => (
                        <div className="tag" key={tag}>{tag}</div>
                    ))
                }
            </>
        )
    }

    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <>
                <div className="tag" key='price'>{priceText}</div>
            </>
        )
    }

    const getBusiness = (time) => {
        const schedule = [[], [], [], [], [], [], []]
        let week = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun']
        // console.log(typeof time.All === 'undefined');
        if (typeof time.All === 'undefined') {
            Object.keys(time).forEach(ele => {
                switch(ele) {
                    case 'Mon': 
                        schedule[0] = ['Mon', time[ele]]
                        break;
                    case 'Tue':
                        schedule[1] = ['Tue', time[ele]]
                        break;
                    case 'Wed':
                        schedule[2] = ['Wed', time[ele]] 
                        break;
                    case 'Thr':
                        schedule[3] = ['Thr', time[ele]]
                        break;
                    case 'Fri':
                        schedule[4] = ['Fri', time[ele]] 
                        break;
                    case 'Sat': 
                        schedule[5] = ['Sat', time[ele]]
                        break;
                    case 'Sun': 
                        schedule[6] = ['Sun', time[ele]]
                        break;
                }
                
                
            });
            // console.log('asdfdfd')
            for (let index = 0; index < 7; index++) {
                if (schedule[index].length === 0)
                    schedule[index] = [week[index], 'Closed']
            }    
        } else {
            for (let i = 1; i <= 7; i++) {
                switch(i) {
                    case 1: 
                        schedule[0] = ['Mon', time.All]
                        break;
                    case 2:
                        schedule[1] = ['Tue', time.All]
                        break;
                    case 3:
                        schedule[2] = ['Wed', time.All] 
                        break;
                    case 4:
                        schedule[3] = ['Thr', time.All] 
                        break;
                    case 5:
                        schedule[4] = ['Fri', time.All] 
                        break;
                    case 6: 
                        schedule[5] = ['Sat', time.All]
                        break;
                    case 7: 
                        schedule[6] = ['Sun', time.All]
                        break;
                }
            }
            
        }
        // console.log(schedule)

        return (
            <div className='businessTime'>
                {
                    schedule.map((item, i) => (
                        <div className="singleDay" key={i}>
                            <div className="day">{item[0]}</div>
                            <div className="time">{item[1]}</div>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information
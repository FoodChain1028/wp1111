/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {
        // TODO Part I-3-b: get information of restaurants from DB
    }

    useEffect(() => {
        getRestaurant()
        console.log(state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy)
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }

    const resBlock = ({id, key, src, name, price, distance, description}) => (
        <div className="resBlock" id={id} key={key}>
            <div className="resImgContainer">
                <img src={src} className="resImg" />
            </div>
            <div className="resInfo">
                <div className="title">
                    <p className="name">{name}</p>
                    <p className="price">{price}</p>
                    <p className="distance">{distance}</p>
                </div>
                <p className="description">{description}</p>
            </div>
        </div>
    )

    return (

        <div className='searchPageContainer'>
            {
                restaurants.map((item) => (
                    // TODO Part I-2: search page front-end
                    <resBlock id={item.id} />
                ))
            }
        </div>
    )
}
export default SearchPage
// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy    = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 

    let arr = []
    let price = []
    let meal = []
    let type = []
    let search

    if (!priceFilter) price = []
    else price = priceFilter
    if (!mealFilter) meal = []
    else meal = mealFilter
    if (!typeFilter) type = []
    else type = typeFilter
    
    // console.log('priceFilter: ', priceFilter);
    // console.log('mealFilter: ', mealFilter);
    // console.log('typeFilter: ', typeFilter);
    // console.log(sortBy)
    // console.log(mealFilter, typeFilter)

    let i = 0
    for (i; i < price.length; i++) {
        if (price[i] === '$')
            price[i] = 1
        else if (price[i] === '$$')
            price[i] = 2
        else if (price[i] === '$$$')
            price[i] = 3
    }

    console.log(price);
    let input = []
    console.log('====', price, meal, type)

    
    if (price.length !== 0) 
        input.push({price: {$in: price}})
    if (meal.length !== 0) 
        input.push({tag: {$in: meal}})
    if (type.length !== 0) 
        input.push({tag: {$in: type}})

    let flag = true
    if (price.length === 0 && meal.length === 0 && type.length === 0) 
        flag = false
    // TODO Part I-3-a: find the information to all restaurants
    if (flag) { 
        console.log('NOT Empty!!')
        Info.find({$and: input}).sort(`${sortBy}`).exec((err, data)=>{
            if (err) {
                console.log('DB Get Error' + err)
                res.status(403).send({
                    message: 'error',
                    contents: err
                })
            }
            else {
                // console.log(data);
                res.status(200).send({
                    message: 'success',
                    contents: data
                })
                
            }
        });
    } else {
        console.log('Empty!!')
        Info.find().sort(`${sortBy}`).exec((err, data)=>{
            if (err) {
                // console.log('DB Get Error' + err)
                res.status(403).send({
                    message: 'error',
                    contents: err
                })
            }
            else {
                // console.log(data);
                res.status(200).send({
                    message: 'success',
                    contents: data
                })
                
            }
        });
    }
    
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/
    Info.find({id: id}).exec((err, data) => {
        if (err) {
            console.log('DB Get Error' + err)
            res.status(403).send({
                message: 'error',
                contents: err
            })
        }
        else {
            // console.log(data);
            res.status(200).send({
                message: 'success',
                contents: data
            })
        }
    })
    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests

}
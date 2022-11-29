// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from '../models/comment'

exports.GetCommentsByRestaurantId = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.restaurantId
    /****************************************/
    // TODO Part III-3-a: find all comments to a restaurant
    Comment.find({restaurantId: id}).exec((err, data) => {
        if (err) {
            // console.log('DB Get Error' + err)
            res.status(403).send({
                message: 'error',
                contents: []
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
    //    contents: the data to be sent
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
}

exports.CreateComment = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body
    /****************************************/
    console.log(body)
    const newComment = await new Comment({
        restaurantId: body.restaurantId,
        name: body.name,
        rating: body.rating,
        content: body.content
    });
    res.json({message: 'success'})
    return newComment.save()


    // TODO Part III-3-b: create a new comment to a restaurant
}

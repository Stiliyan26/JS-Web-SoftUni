//TODO replace with actual service
const postService = require('../services/post');

//TODO change property name to match collection
function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        
        if (populate){
            //TODO change trip to actual collection
            res.locals.post = await postService.getPostAndPopulate(id);
        } else {
            res.locals.post = await postService.getPostById(id);
        }
        
        next();
    };
}

module.exports = preload;
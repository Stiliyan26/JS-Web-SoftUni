//TODO replace with actual service
const tripService = {};

//TODO change property name to match collection
function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        
        if (populate){
            //TODO change trip to actual collection
            //res.locals.trip = await tripService.getTripAndPopulate(id);
        } else {
            //res.locals.trip = await tripService.getTripById(id);
        }
        
        next();
    };
}

module.exports = preload;
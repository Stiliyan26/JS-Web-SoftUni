module.exports = {
    get(req, res) {
        res.render('create');
    },
    async post(req, res) {
        
        const car = {
            name: req.body.name,
            description: req.body.description,
            imageURL: req.body.imageUrl || undefined,
            price: Number(req.body.price),
            owner: req.session.user.id
        }
        try {
            await req.storage.createCar(car);
            res.redirect('/');
        }
        catch(err){
            console.log('Error creating car.');
            res.redirect('/create');
        }
    }
}
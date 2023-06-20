const Publication = require('../models/Publication');
const User = require('../models/User');

async function createPublication(publication) {
    const result = new Publication(publication);
    await result.save();
};

async function getAllPublications() {
    return Publication.find({}).lean();
};

async function getPublicationById(id) {
    return await Publication.findById(id).lean();
};

async function getPublicationByIdAndGetAuthor(id) {
    return await Publication.findById(id).populate('author').lean();
};

async function updatePublicationById(publicationId, publication) {
    const result = await Publication.findById(publicationId);

    result.title = publication.title;
    result.paintTehn = publication.paintTehn;
    result.artPicture = publication.artPicture;
    result.certificate = publication.certificate;

    await result.save();
};

async function publicationByUser(userId) {
    return await Publication.find({ author: userId }).lean();
};

async function deleteById(id) {
    await Publication.findByIdAndDelete(id);
}

async function sharePost(publicationId, userId) {
    const publication = await Publication.findById(publicationId);

    if (publication.usersShared.includes(userId)) {
        throw new Error('User already shared the publication');
    }

    publication.usersShared.push(userId);
    await publication.save();

    const user = await User.findById(userId);
    if (!user.publications.includes(publicationId)){
        user.publications.push(publicationId);
        await user.save();
    }
};

async function getUserById(id){
    return await User.findById(id).populate('publications').lean();;
}

module.exports = {
    createPublication,
    getAllPublications,
    getPublicationById,
    updatePublicationById,
    getPublicationByIdAndGetAuthor,
    deleteById,
    sharePost,
    publicationByUser,
    getUserById
};

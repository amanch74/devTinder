const adminAuth = (req,res,next) => {
    const token = "xyz"
    const isAdminAuthorised = token === "xyz";

    if(!isAdminAuthorised){
        res.status(401).send("Unauthorized user");
    }
    else{
        next();
    }
}

const userAuth = (req,res,next) => {
    const token = "rejnnkrnn"
    const isUserAuthorised = token === "xyz";

    if(!isUserAuthorised){
        res.status(401).send("Unauthorized user");
    }
    else{
        next();
    }
}
module.exports = {
    adminAuth,
    userAuth
}
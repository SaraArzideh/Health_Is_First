const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.userId = decoded.id; // the decoded JWT has an id field
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({"Message":"Forbidden"});
	}
	Session.findOne({"token":req.headers.token}).then(function(session) {
		if(!session) {
			return res.status(403).json({"Message":"Forbidden"});
		}
		let now = Date.now();
		if(now > session.ttl) {
			Session.deleteOne({"_id":session._id}).then(function() {
				return res.status(403).json({"Message":"Forbidden"})
			}).catch(function(error) {
				console.log("Failed to remove session. Reason",error);
				return res.status(403).json({"Message":"Forbidden"})
			})
		} else {
			session.ttl = now + time_to_live_diff;
			req.session = {};
			req.session.user = session.user;
			session.save().then(function() {
				return next();
			}).catch(function(error) {
				console.log("Failed to resave session. Reason",error);
				return next();
			})
		}
	}).catch(function(error){
		console.log("Failed to find session. Reason",error);
		return res.status(403).json({"Message":"Forbidden"})
	})
}

module.exports ={
	authMiddleware,
	isUserLogged
};
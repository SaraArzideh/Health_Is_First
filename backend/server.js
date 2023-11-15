require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const dietRoute = require('./routes/dietRoute');
const weightRoute = require('./routes/weightRoute');
const activityRoute = require ('./routes/activityRoute');
const userRoute= require ('./routes/userRoute');
const authMiddleware = require('./middleware/authMiddleware');

const User = require('./models/user')
const Session = require('./models/session');

let app = express();
let PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(cors({
	origin: 'http://localhost:3000'    // Allow this origin to access the API
}));
app.use(express.json());
app.use(bodyParser.json());

//Authentication route
app.use('/', userRoute);

// MongoDB Connection Setup
const mongo_url= process.env.MONGODB_URL;
const mongo_user= process.env.MONGODB_USER;
const mongo_password= process.env.MONGODB_PASSWORD;

const mongoURI="mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/?retryWrites=true&w=majority"
console.log(mongoURI);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=>console.log("Connected to Mongo Atlas"))
.catch(error=> console.log ("Failed to connect to Mongo Aatlas. Reason ", error));

//LOGIN DATABASE
const time_to_live_diff = 3600000;


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

//LOGIN API
app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log(err);
			return res.status(500).json({"Message":"Internal server error"})
		}
		let user = new User({
			username:req.body.username,
			password:hash
		})
		user.save().then(function(user) {
			return res.status(201).json({"Message":"Register success"})
		}).catch(function(err) {
			if(err.code === 11000) {
				return res.status(409).json({"Message":"Username already in use"})
			}
			return res.status(500).json({"Message":"Internal Server Error"})
		})
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	User.findOne({"username":req.body.username}).then(function(user) {
		if(!user) {
			return res.status(401).json({"Message":"Unauthorized"});
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				console.log(err);
				return res.status(500).json({"Message":"Internal server error"});
			}
			if(!success) {
				return res.status(401).json({"Message":"Unauthorized"});
			}
			//let token = createToken();
			let now = Date.now();
			let session = new Session({
				"token":token,
				"user":req.body.username,
				"ttl":now+time_to_live_diff
			})
			session.save().then(function() {
				return res.status(200).json({"token":token});
			}).catch(function(error) {
				console.log(error);
				return res.status(500).json({"Message":"Internal Server Error"});
			});
		})
	}).catch(function(error) {
		console.log(error);
		return res.status(500).json({"Message":"Internal Server Error"})
	})
})

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({"Message":"Not found"});
	}
	Session.deleteOne({"token":req.headers.token}).then(function() {
		return res.status(200).json({"Message":"Logged out"})
	}).catch(function(error) {
		console.log("Failed to remove session in logout. Reason",error);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

// Protected Routes
app.use('/diet',isUserLogged, dietRoute);
app.use('/weight',isUserLogged, weightRoute);
app.use('/activity',isUserLogged, activityRoute);
app.use('/profile',isUserLogged, userRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

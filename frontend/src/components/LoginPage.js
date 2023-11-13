import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { loginUser, signupUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';

const LoginPage = (props) => {
	
	const [formData,setformData] = useState({
		email: "",
		username:"",
		password:"",
		age:"",
		height: "",
        currentWeight: "",
        activityGoal: "",
		gender: "male",
		activityLevel: "low-active",
		exceptionalSituation: "false"
	})
	const dispatch= useDispatch();
	const navigate= useNavigate();

	const onChange = (event) => {
		setformData({...formData, [event.target.name]: event.target.type==='checkbox' ? event.target.checked : event.target.value});
	};
	
	const onSubmit = async (event) => {
		event.preventDefault();
		console.log ("submitting form data",formData); // Debug log

		if(formData.username.length < 4 || formData.password.length < 8) {
			props.setError("Username must be atleast 4 and password 8 characters long");
			return;
		}
		let user = {
			...formData
		}

		console.log("Attempting to register/login with user: ", user)// Debug log

		if(event.target.name === "register") {
			console.log("Registering user"); // Debug log
			dispatch (signupUser(formData));
			navigate('/'); // Redirect to home on successful registration
		} else {
			console.log("Logging in user"); // Debug log
			dispatch(loginUser(formData));
			navigate('/'); // Redirect to home on successful login
		}
	}
	
	return(
		<div style={{
			"width":"40%",
			"margin":"auto"
		}}>
			<form className="mb-5">
				<h2>{props.isSignUp ? "Tell Us a Bit and Let's Get Moving!" : "Login and Continue Your Journey!"}</h2>
				<div className="form-group">
					<label htmlFor="email" className="form-label">Email</label>
					<input type="email"
						id="email"
						name="email"
						className="form-control"
						onChange={onChange}
						value={formData.email}/>
				</div>
				<div className="form-group">
					<label htmlFor="username" className="form-label">Username</label>
					<input type="text"
						id="username"
						name="username"
						className="form-control"
						onChange={onChange}
						value={formData.username}/>
				</div>
				<div className="form-group">
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password"
						id="password"
						name="password"
						className="form-control"
						onChange={onChange}
						value={formData.password}/>
				</div>
				{props.isSignUp && (
                    <div className="additional-details">
						<div className="form-row">
							<div className="form-group col-md-4">
								<label htmlFor="age" className="form-label">Age (years)</label>
								<input type="text"
									id="age"
									name="age"
									className="form-control"
									onChange={onChange}
									value={formData.age} />
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="height" className="form-label">Height (Centimeters)</label>
								<input type="text"
									id="height"
									name="height"
									className="form-control"
									onChange={onChange}
									value={formData.height} />
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="currentWeight" className="form-label">Current Weight (Kg)</label>
								<input type="text"
									id="currentWeight"
									name="currentWeight"
									className="form-control"
									onChange={onChange}
									value={formData.currentWeight} />
							</div>
							</div>

						<div className="form-row">

						<div className="form-group col-md-6">
								<label htmlFor="gender">Gender</label>
								<select id="gender" name="gender" onChange={onChange}>
									<option className='option' value="male">Male</option>
									<option className='option' value="female">Female</option>
									<option className='option' value="nonbinary">Non-binary</option>
								</select>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="activityLevel">Life-Style</label>
								<select id="activityLevel" name="activityLevel" onChange={onChange}>
									<option className='option' value="low-active">Low-Active</option>
									<option className='option' value="moderate-active">Moderate-Active</option>
									<option className='option' value="active">Active</option>
								</select>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="targetActivity" className="form-label">Target Activity (minutes/day)</label>
							<input type="text"
								id="activityGoal"
								name="activityGoal"
								className="form-control"
								onChange={onChange}
								value={formData.activityGoal} />
						</div>
						<div className="form-group">
							<div className="checkbox-custom">
								<input 
									type="checkbox"
									id="exceptionalSituation"
									name="exceptionalSituation"
									checked = {formData.exceptionalSituation}
									onChange={onChange} />
								<label htmlFor="exceptionalSituation">I don't have a special circumstance (e.g., pregnancy, disease).</label>							</div>
						</div>
                    </div>
                )}
				<div>
					{props.isSignUp ? (
					<button onClick={onSubmit} style={{marginRight:5}} name="register" className="btn">Sign Up</button>
					) : (
					<button onClick={onSubmit} style={{marginLeft:5}} name="login" className="btn">Login</button>
					)}
				</div>
			</form>
		</div>
	)
}

export default LoginPage;
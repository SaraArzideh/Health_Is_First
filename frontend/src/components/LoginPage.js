import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { loginUser, signupUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';

const LoginPage = (props) => {
	
	const [state,setState] = useState({
		email: "",
		username:"",
		password:"",
		age:"",
		height: "",
        currentWeight: "",
        activityGoal: "",
        dietGoal: ""
	})
	const dispatch= useDispatch();
	const navigate= useNavigate();

	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		console.log ("submit button clicked with values",state); // Debug log

		if(state.username.length < 4 || state.password.length < 8) {
			props.setError("Username must be atleast 4 and password 8 characters long");
			return;
		}
		let user = {
			...state
		}

		console.log("Attempting to register/login with user: ", user)// Debug log

		if(event.target.name === "register") {
			console.log("Registering user"); // Debug log
			dispatch (signupUser(user));
			navigate('/'); // Redirect to home on successful registration
		} else {
			console.log("Logging in user"); // Debug log
			dispatch(loginUser(user));
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
						value={state.email}/>
				</div>
				<div className="form-group">
					<label htmlFor="username" className="form-label">Username</label>
					<input type="text"
						id="username"
						name="username"
						className="form-control"
						onChange={onChange}
						value={state.username}/>
				</div>
				<div className="form-group">
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password"
						id="password"
						name="password"
						className="form-control"
						onChange={onChange}
						value={state.password}/>
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
									value={state.age} />
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="height" className="form-label">Height (Centimeters)</label>
								<input type="text"
									id="height"
									name="height"
									className="form-control"
									onChange={onChange}
									value={state.height} />
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="currentWeight" className="form-label">Current Weight (Kg)</label>
								<input type="text"
									id="currentWeight"
									name="currentWeight"
									className="form-control"
									onChange={onChange}
									value={state.currentWeight} />
							</div>
							</div>

						<div className="form-row">

							<div className="form-group">
								<label htmlFor="gender">Gender</label>
								<select id="gender" name="gender" onChange={onChange}>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="nonbinary">Non-binary</option>
								</select>
								</div>
								<div className="form-group">
								<label htmlFor="lifestyle">Lifestyle</label>
								<select id="lifestyle" name="lifestyle" onChange={onChange}>
									<option value="low-active">Low-Active</option>
									<option value="moderate-active">Moderate-Active</option>
									<option value="active">Active</option>
								</select>
								</div>
								<div className="form-group">
								<label htmlFor="exceptional">Exceptional Situation</label>
								<input type="checkbox" id="exceptional" name="exceptional" onChange={onChange} />
								</div>
						</div>
						<div className="form-group">
							<label htmlFor="targetActivity" className="form-label">Target Activity (minutes/day)</label>
							<input type="text"
								id="activityGoal"
								name="activityGoal"
								className="form-control"
								onChange={onChange}
								value={state.activityGoal} />
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
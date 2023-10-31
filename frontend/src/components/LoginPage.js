import {useState} from 'react';
import * as d3 from 'd3';

const LoginPage = (props) => {
	
	const [state,setState] = useState({
		email: "",
		username:"",
		password:"",
		age:"",
		height: "",
        currentWeight: "",
        targetActivity: "",
        targetCalories: ""
	})
	
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
		if(state.username.length < 4 || state.password.length < 8) {
			props.setError("Username must be atleast 4 and password 8 characters long");
			return;
		}
		let user = {
			...state
		}
		if(event.target.name === "register") {
			props.register(user);
		} else {
			props.login(user);
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
								<label htmlFor="height" className="form-label">Height (meter)</label>
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
						<div className="form-group">
							<label htmlFor="targetActivity" className="form-label">Target Activity (minutes/day)</label>
							<input type="text"
								id="targetActivity"
								name="targetActivity"
								className="form-control"
								onChange={onChange}
								value={state.targetActivity} />
						</div>
						<div className="form-group">
							<label htmlFor="targetCalories" className="form-label">Target Consuming Calories (Calories/day)</label>
							<input type="text"
								id="targetCalories"
								name="targetCalories"
								className="form-control"
								onChange={onChange}
								value={state.targetCalories} />
						</div>
                    </div>
                )}
				<div>
					{props.isSignUp ? (
					<button onClick={onSubmit} style={{marginRight:5}} name="register" className="btn btn-secondary">Sign Up</button>
					) : (
					<button onClick={onSubmit} style={{marginLeft:5}} name="login" className="btn btn-secondary">Login</button>
					)}
				</div>
			</form>
		</div>
	)
}

export default LoginPage;
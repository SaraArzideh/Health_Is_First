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
				<label htmlFor="email" className="form-label">Email</label>
				<input type="email"
						id="email"
						name="email"
						className="form-control"
						onChange={onChange}
						value={state.email}/>
				<label htmlFor="username" className="form-label">Username</label>
				<input type="text"
						id="username"
						name="username"
						className="form-control"
						onChange={onChange}
						value={state.username}/>
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password"
						id="password"
						name="password"
						className="form-control"
						onChange={onChange}
						value={state.password}/>
{props.isSignUp && (
                    <>
                        <label htmlFor="height" className="form-label">Height</label>
                        <input type="text"
                            id="height"
                            name="height"
                            className="form-control"
                            onChange={onChange}
                            value={state.height} />

                        <label htmlFor="currentWeight" className="form-label">Current Weight</label>
                        <input type="text"
                            id="currentWeight"
                            name="currentWeight"
                            className="form-control"
                            onChange={onChange}
                            value={state.currentWeight} />

                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="text"
                            id="age"
                            name="age"
                            className="form-control"
                            onChange={onChange}
                            value={state.age} />

                        <label htmlFor="targetActivity" className="form-label">Target Activity (minutes/day)</label>
                        <input type="text"
                            id="targetActivity"
                            name="targetActivity"
                            className="form-control"
                            onChange={onChange}
                            value={state.targetActivity} />

                        <label htmlFor="targetCalories" className="form-label">Target Consuming Calories (Calories/day)</label>
                        <input type="text"
                            id="targetCalories"
                            name="targetCalories"
                            className="form-control"
                            onChange={onChange}
                            value={state.targetCalories} />
                    </>
                )}

                {props.isSignUp ? (
				<button onClick={onSubmit} style={{marginRight:5}} name="register" className="btn btn-secondary">Register</button>
				) : (
				<button onClick={onSubmit} style={{marginLeft:5}} name="login" className="btn btn-secondary">Login</button>
				)}
			</form>
		</div>
	)
}

export default LoginPage;
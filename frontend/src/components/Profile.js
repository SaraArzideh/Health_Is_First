import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../actions/userAction'; 

const Profile = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.auth ) || {};
    const [username, setUsername] = useState(userInfo.user.username ||'');
    const [email, setEmail] = useState(userInfo.user.email || '');
    const [height, setHeight] = useState(userInfo.user.height || '');
    const [currentWeight, setCurrentWeight] = useState(userInfo.user.currentWeight ||'');
    const [age, setAge] = useState(userInfo.user.age ||'');
    const [activityGoal, setActivityGoal] = useState(userInfo?.activityGoal ||'');
    const [exceptionalSituation, setExceptionalSituation] = useState(userInfo.exceptionalSituation ||'');
    const [gender, setGender] = useState(userInfo.user.gender ||'');
    const [activityLevel, setActivityLevel] = useState(userInfo.activityLevel ||'');


    useEffect(() => {
      if (userInfo) {
        setUsername(userInfo.user.username || '');
        setEmail(userInfo.user.email || '');
        setHeight(userInfo.user.height || '');
        setCurrentWeight(userInfo.user.currentWeight || '');
        setAge(userInfo.user.age);
        setActivityGoal(userInfo.user.activityGoal || '');
        setExceptionalSituation(userInfo.user.exceptionalSituation || '');
        setGender(userInfo.user.gender);
        setActivityLevel(userInfo.user.activityLevel || '');
      }
    }, [userInfo]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(updateUser({ username, email, height, currentWeight, age, activityGoal, exceptionalSituation, gender, activityLevel}));
    };

    // For select inputs
    const handleSelectChange = (event) => {
      const { name, value } = event.target;
      if (name === 'gender') {
        setGender(value);
      } else if (name === 'activityLevel') {
        setActivityLevel(value);
      }
    };

    // For the checkbox
    const handleCheckboxChange = (event) => {
      setExceptionalSituation(event.target.checked);
    };

    return (
      <div className="profile-page">
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>

            <div className="form-group">
            <label htmlFor="email">Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
            <label htmlFor="height">Height (Centimeters):</label>              
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>

            <div className="form-group">
            <label htmlFor="currentWeight">Your Current Weight (Kg):</label>              
              <input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} />
            </div>

            <div className="form-group">
            <label htmlFor="age">Age (years):</label>              
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>

            <div className="form-group">
            <label htmlFor="activityGoal">Today Activity Target(minutes):</label>
              <input type="number" value={activityGoal} onChange={(e) => setActivityGoal(e.target.value)} />
            </div>

            <div className="form-group">
            <label htmlFor="gender">Gender:</label>  
              <select id="gender" name="gender" onChange={handleSelectChange}>
                <option className='option' value="male">Male</option>
                <option className='option' value="female">Female</option>
                <option className='option' value="nonbinary">Non-binary</option>
							</select>
            </div>

            <div className="form-group">
            <label htmlFor="activityLevel">Life-Style:</label>  
              <select id="activityLevel" name="activityLevel" onChange={handleSelectChange}>
                <option className='option' value="low-active">Low-Active</option>
                <option className='option' value="moderate-active">Moderate-Active</option>
                <option className='option' value="active">Active</option>
              </select>
            </div>

            <div className="form-group checkbox-group">
            <label htmlFor="exceptionalSituation">I don't have a special circumstance (e.g., pregnancy, disease).</label>                
              <input 
                type="checkbox"
                id="exceptionalSituation"
                name="exceptionalSituation"
                checked = {userInfo.user.exceptionalSituation}
                onChange={handleCheckboxChange} />
            </div>
            <button type="submit">Update Profile</button>
          </form>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    );
  };
  
  export default Profile;
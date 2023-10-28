import React from 'react';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Your Fitness Journey Starts Here</h1>

      <section className="set-goals">
        <h2>Set Goals Section</h2>
        <input placeholder="Activity Goal" />
        <input placeholder="Diet Goal" />
      </section>
      <section className="achievements">
        <h2>Achievements Section</h2>
        {/* achievement visualization components here */}
      </section>
      <button><a href="/dashboard" className='button primary'>Go to Dashboard</a></button>
    </div>
  );
}

export default HomePage;
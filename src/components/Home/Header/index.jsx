import React from 'react';
import './styles.css';

const Header = () => {
  const greetUser = () => {
    const currentHour = new Date().getHours();

    let greeting;
    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning!";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon!";
    } else if (currentHour >= 18 && currentHour < 24) {
      greeting = "Good evening!";
    } else {
      greeting = "Hello!";
    }

    return greeting;
  };

  return (
    <header className='home-header'>
      <h2>Welcome to </h2> {/* Updated line */}
      <h1>
        <span>“</span>Mind 🏄🏻‍♀️ Waves <span>”</span>
      </h1>
      <p>
        {greetUser()} Awesome place to make oneself <br /> productive and entertained through
        daily updates.
      </p>
    </header>
  );
};

export default Header;
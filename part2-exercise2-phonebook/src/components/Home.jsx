import React from 'react';

const Home = ({ person, handleRemovePerson }) => {
    return (
        <div>
            <p>{person?.name}, {person?.number}</p>
            <div>
                <button onClick={() => handleRemovePerson(person?.id)}>Delete</button>{' '}
            </div>
        </div>
    );
}

export default Home;
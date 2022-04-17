import React from 'react';

const Filter = (props) => {
    return <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
}

export default Filter;
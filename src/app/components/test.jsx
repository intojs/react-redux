import React from 'react';

export default class Test extends React.Component {
    render() {
        return  (
            <div>
                <div className="test"></div>
                <p ref={() => {
                    console.log('hey');
                }}>Hello world</p>
            </div>      
        ); 
    }
}
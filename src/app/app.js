import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

var div = document.querySelector('.scene-container')
if (div == null) {
    div = document.createElement('div');
    document.body.appendChild(div);
}
ReactDOM.render(<Root/>, div);
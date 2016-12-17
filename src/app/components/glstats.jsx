import React from 'react';
import Stats from 'stats.js'

/* React wrapper for Threejs framerate counter library */
class GLStats extends React.Component{
    constructor(props){
        super(props);
        this.stats = new Stats();
        this.doUpdate = true;
        //this.displayName = 'Stats';
    }

    componentDidMount(){
        this.update.call(this);
    }

    componentWillUnmount(){
        this.doUpdate = false;
    }

    update(){
        this.stats.update();
        if(this.doUpdate){
            requestAnimationFrame(() => this.update());
        }
    }

    render(){
        document.body.appendChild(this.stats.domElement);
        return false;
    }
}
export default GLStats;

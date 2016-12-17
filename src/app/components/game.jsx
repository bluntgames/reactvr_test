import React, { Component, PropTypes, } from 'react';
import React3 from 'react-three-renderer';
import { Vector3, Euler, Geometry, DoubleSide, } from 'three';

import Cube from './cube';
import Camera from './camera';

/**
 * Main display for the game. Only view code!!
 */
export default class Game extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        cameraPosition: PropTypes.instanceOf( Vector3 ).isRequired,
    };

    componentDidMount() {
        //TODO: need to manage the dynamic geometry and custom THREE.js types somewhow... 
        // manually add to the heirachy for now...
        this.refs.group.add(this.props.geometry);
    }

    componentWillUnmount() {
        this.refs.group.remove(this.props.geometry);
    }

    render() {
        const {
            width, height, cameraPosition, cubeState, geometry
        } = this.props;

        return (
        <React3
            mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
            width={width}
            height={height}
            antialias
            //autoRender={this.state.autoRender}
        >        
            <scene>
                <Camera
                    aspect={width / height}
                    position={cameraPosition}
                />
                <Cube
                    size={50}
                    position={cubeState.cubePosition}
                    rotation={cubeState.cubeRotation}
                />
                <group ref='group'/>
            </scene>
        </React3>);
    }
}
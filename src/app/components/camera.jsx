import React, { Component, PropTypes, } from 'react';
import { Vector3, } from 'three';

/**
 * functional stateless component because it's so simple
 **/
const Camera = ({ position, aspect }) =>
    <perspectiveCamera
        name="camera"
        fov={75}
        aspect={aspect}
        near={0.1}
        far={1000}
        position={position}
    />;

Camera.propTypes = {
    position: PropTypes.instanceOf( Vector3 ).isRequired,
    aspect: PropTypes.number.isRequired,
}

export default Camera;
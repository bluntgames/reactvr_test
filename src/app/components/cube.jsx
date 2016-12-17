import React, { Component, PropTypes, } from 'react';
import { Euler, Vector3, } from 'three';

/**
 * functional stateless component because it's so simple
 **/
const Cube = ({ size, position, rotation }) =>
    <group
        position={ position }
        rotation={ rotation }
    >
        <mesh>
            <boxGeometry
                width={size}
                height={size}
                depth={size}
            />
            <meshBasicMaterial
                color={0x00ff00}
            />
        </mesh>
    </group>;

Cube.propTypes = {
    size: PropTypes.number.isRequired,
    position: PropTypes.instanceOf( Vector3 ).isRequired,
    rotation: PropTypes.instanceOf( Euler ).isRequired
}

export default Cube;
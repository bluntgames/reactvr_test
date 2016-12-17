import THREE, { Vector3, Euler, } from 'three';

const rotationSpeed = 1;

/**
 * We can manage our game state in a series of small, easy to reason about
 * functions
 **/
export default function cubeRotationReducer( oldState, deltaTime ) {
    // Merge the old state with the updated properties
    return {
        ...oldState,
        cubeRotation: new THREE.Euler(
            oldState.cubeRotation.x + rotationSpeed * deltaTime,
            oldState.cubeRotation.y + rotationSpeed * deltaTime,
            0
        )
    };
}
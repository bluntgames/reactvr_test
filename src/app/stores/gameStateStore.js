import THREE from 'three';
import EventEmitter from 'events';
//import ActionTypes from '../constants';
import AppDispatcher from '../appDispatcher';
//import Globals from '../globals';
import cubeRotationReducer from '../reducers/cubeRotationReducer';

let CHANGE_EVENT = 'change';

class GameStateStore extends EventEmitter {
    constructor () {
        super();

        this.cubeState = {
            cubePosition: new THREE.Vector3(0, 0, 0),
            cubeRotation: new THREE.Euler()
        };

        //this.cameraPosition = new THREE.Vector3(0, 0, 5);
        this.cameraPosition = new THREE.Vector3(0, 100, 400);

        AppDispatcher.register((action) => {
             //this.handle(action);
            console.log('TODO: handle: ' + action);
        });
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    update( dTime ) {
        const oldState = this.cubeState;
        // Apply our reducer functions to the "game state", which for this
        // example is held in local container state. It could be moved into
        // a redux/flux store and udpated once per game loop.

        //TODO: use the event handler?
        const newState = cubeRotationReducer( oldState, dTime );
        this.cubeState = newState;

        //this.setState( newState );
        this.emitChange();
    }

    getState() {
        let cameraPosition = this.cameraPosition;
        let cubeState = this.cubeState;

        let state = {
            cubeState: cubeState,
            cameraPosition : cameraPosition
        };
        return state;
    }
}

export default new GameStateStore();

import THREE from 'three';
import EventEmitter from 'events';
//TODO: some event defines..
//import ActionTypes from '../constants';
import AppDispatcher from '../appDispatcher';
//import Globals from '../globals';

let CHANGE_EVENT = 'change';

class AppSettingsStore extends EventEmitter {
    constructor () {
        super();
        this.autoRender = false;
        AppDispatcher.register((action) => {
            this.handle(action);
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

    getSettings() {
        let settings = {
            autoRender: this.autoRender
        };
        return settings;
    }

    handle(action) {
        switch(action.type) {
            // case ActionTypes.CHANGE_RENDER_METHOD:
            //     this.autoRender = !this.autoRender;
            //     this.emitChange();
            //     break;
            default:
                // do nothing
        }
    }
}
export default new AppSettingsStore();

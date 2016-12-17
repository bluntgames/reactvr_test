import React from 'react';
import GLStats from './glstats';
import AppSettingsStore from '../stores/appSettingsStore';
//import GameController from './gameController';

class Root extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = AppSettingsStore.getSettings();
        this.onChangeListener = this.onChange.bind(this);
    }
    componentDidMount() {
        AppSettingsStore.addChangeListener(this.onChangeListener);
        //window.addEventListener('resize', this.onChangeListener);
        //this.scene3d = this.refs.scene3d;
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        AppSettingsStore.removeChangeListener(this.onChangeListener);
        //window.removeEventListener('resize', this.onChangeListener);
    }

    onChange(){
        let state = AppSettingsStore.getSettings();
        this.setState(state);
    }
    //
    // <Controls
    // autoRender={this.state.autoRender}
    // />
    //<GameController />

    render() {
        return (
            <div>
                
                <GLStats />
            </div>
        )
    }
}
export default Root;

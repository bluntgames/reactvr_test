import React, { Component, } from 'react';
import THREE, { Vector3 } from 'three';
import autobind from 'autobind-decorator';
import Game from './game';
import GameStateStore from '../stores/gameStateStore';
//import './Game.scss';
import Path from 'path';

//TODO: can we do this sort of export override without using require???
var spine = require("exports?spine!../../lib/spine-threejs");
var lastFrameTime = Date.now() / 1000;

/**
 * Main game wrapper. Contains game loop and updates everything.
 * This controller holds the game logic, but not the view code
 */
export default class GameController extends Component {

    constructor() {
        super();
        this.mounted = false;
        this.state = GameStateStore.getState();

        //this.onChangeListener = this.onChange.bind(this);
        //TODO: check this autobind thingy works...
        //this.onChangeListener = this.onChange;
    }

    // @autobind
    // onChange(){
    //     let state = GameStateStore.getState();
    //     this.setState(state);
    // }

    //TODO: asset management
    loadSpineModel(fullPath) {
        //TODO: path resolution checks
        this.assetManager.loadText('assets/' + fullPath + '.json');
        this.assetManager.loadText('assets/' + fullPath + '.atlas');
        this.assetManager.loadTexture('assets/' + fullPath + '.png');

        var parsedPath = Path.parse(fullPath);
        console.log('model name = ' + parsedPath.name);
        console.log('model base = ' + parsedPath.dir);

        return {
            name: parsedPath.name,
            fullPath: fullPath,
            basePath: parsedPath.dir
        };
    }

    componentDidMount() {
        // Track if we're mounted so game loop doesn't tick after unmount
        this.mounted = true;

        //GameStateStore.addChangeListener(this.onChangeListener);
        //this.scene3d = this.refs.scene3d;

        // Expose the global THREE object for use in debugging console
        //window.THREE = THREE;

        // Load the geometry in didMount, which is only executed server side.
        // Note we can pass our JSON file paths to webpack!
        // loadModel( require( '../../assets/sitepoint-robot.json' ) ).then( geometry =>
        //     this.setState({ geometry })
        // );


        this.assetManager = new spine.threejs.AssetManager();

        this.spineModel = this.loadSpineModel('raptor/raptor');
        //this.spineModel = this.loadSpineModel('raptor');
        //this.spineModel = this.loadSpineModel('spineboy/spineboy');

        //this.spineModel.testAnimation = 'run';
        //this.spineModel.testAnimation = 'idle';
        //this.spineModel.testAnimation = 'walk';
        //this.spineModel.testAnimation = 'jump';
        this.spineModel.testAnimation = 'Jump';

        //this.spineModel = this.loadSpineModel('spineboy/spineboy');
        //this.spineModel.testAnimation = 'run';

        // Start the game loop when this component loads
        this.requestGameLoop();
    }

    componentWillUnmount() {
        this.mounted = false;
        this.cancelGameLoop();
    }

    // We autobind methods using this decorator to get hot reloading
    @autobind
    requestGameLoop() {
        this.reqAnimId = window.requestAnimationFrame( this.gameLoop );
    }

    @autobind
    cancelGameLoop() {
        window.cancelAnimationFrame( this.reqAnimId );
    }

    lastFrameTimeMs = 0;
    loaded = false;

    @autobind
    loadSkeleton (name, scale) {

        var manager = this.assetManager;

        var atlasPath = "assets/" + name + ".atlas";
        console.log('load atlas from: ' + atlasPath);
        var basePath = this.spineModel.basePath;


        // Load the texture atlas using name.atlas and name.png from the AssetManager.
        // The function passed to TextureAtlas is used to resolve relative paths.
        //this.atlas = new spine.TextureAtlas(this.assetManager.get("assets/" + name + ".atlas"),
        this.atlas = new spine.TextureAtlas(this.assetManager.get(atlasPath),
            function(path) {
                //return this.assetManager.get("assets/" + path);
                //return manager.get("assets/" + path);


                var filePath = 'assets' + Path.resolve(basePath, path);

                console.log('texture file path: ' + filePath);

                return manager.get(filePath);
                //return manager.get("assets/" + path);
            }
        );
        // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
        var atlasLoader = new spine.AtlasAttachmentLoader(this.atlas);
        // Create a SkeletonJson instance for parsing the .json file.
        var skeletonJson = new spine.SkeletonJson(atlasLoader);

        // Set the scale to apply during parsing, parse the file, and create a new skeleton.
        skeletonJson.scale = scale;
        var skeletonData = skeletonJson.readSkeletonData(this.assetManager.get("assets/" + name + ".json"));
        return skeletonData;
    }

    // Our game loop, which is managed as the window's requestAnimationFrame
    // callback
    @autobind
    gameLoop( time ) {
        if( !this.mounted ) {
            return;
        }

        if (!this.loaded) {
            if (this.assetManager.isLoadingComplete()) {
                this.loaded = true;
                var assetManager = this.assetManager;

                // Add a box to the scene to which we attach the skeleton mesh

                //TODO: remove this...
                this.geometry = new THREE.BoxGeometry(1, 1, 1);
                this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false});
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                // Load the texture atlas using name.atlas and name.png from the AssetManager.
                // The function passed to TextureAtlas is used to resolve relative paths.

                var atlasName = 'assets/' + this.spineModel.fullPath + '.atlas';
                console.log('atlasname = ' + atlasName);

                var basePath = this.spineModel.basePath;

                this.atlas = new spine.TextureAtlas(this.assetManager.get(atlasName), function(path) {
                    console.log('loaded...' + path);
                    console.log('loaded...' + basePath);

                    var texturePath = 'assets' + Path.resolve(basePath, path);
                    console.log('final = ' + texturePath);
                    var texture = assetManager.get(texturePath);
                    console.log(texture);
                    return texture;

                        //return assetManager.get(texturePath);
                        //return assetManager.get("assets/" +  basePath + "/" + path);
                });

                this.skeletonData = this.loadSkeleton(this.spineModel.fullPath, 0.4);
                // Create a SkeletonMesh from the data and attach it to the scene
                this.skeletonMesh = new spine.threejs.SkeletonMesh(this.skeletonData);
                //this.skeletonMesh.state.setAnimation(0, "walk", true);
                this.skeletonMesh.state.setAnimation(0, this.spineModel.testAnimation, true);
                this.mesh.add(this.skeletonMesh);

            } else {
                console.log('..not loaded yet...');
                this.requestGameLoop();
                return;
            }
        }

        var now = Date.now() / 1000;
	    let delta = now - lastFrameTime;
	    lastFrameTime = now;

        GameStateStore.update( delta );

        //TODO: move into proper resource management...
        this.skeletonMesh.update(delta);

        let state = GameStateStore.getState();
        state.geometry = this.skeletonMesh;
        this.setState(state);
        this.requestGameLoop();
    }

    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const {
            cubeState, cameraPosition, geometry
        } = this.state;

        return (
            <div>
                {geometry ? 
                <Game
                    width={ width }
                    height={ height }
                    cameraPosition={ cameraPosition }
                    cubeState={ cubeState }
                    geometry={geometry}
                />
                : 'loading'
                }
            </div>);
    }
}
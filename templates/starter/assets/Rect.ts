import {Color, Component, GraphicsEngine, link, prop, QuadElement} from "typesprite";

/**
 * A Rectangle component.
 *
 * It creates a visual object (QuadElement) and ads it to the scene
 * (GraphicsEngine.gameLayer).
 *
 * It defines 3 properties tha
 *
 * Learn more: https://typespritejs.dev/start/components.html
 */
export class Rect extends Component {

    /**
     * A reference to a component of another (static) entity.
     * This assumes that the component 'GraphicsEngine' only exists
     * once in world.edf.
     */
    @link('GraphicsEngine:typesprite')
    private gfx:GraphicsEngine;

    /**
     * A property of type color with the default value of `#f00`.
     *
     * It can be overwritten in 'world.edf'
     */
    @prop('color', '#f00')
    private color:Color

    @prop('number', 100)
    private startX:number;

    @prop('number', 100)
    private startY:number;

    public quad:QuadElement;

    onInit() {
        const rect = new QuadElement(100, 80);
        rect.setColor(this.color);
        rect.x = this.startX;
        rect.y = this.startY;
        this.quad = rect;
    }

    onActivate() {
        // this adds the object to the game layer
        this.gfx.gameLayer.addChild(this.quad);
    }

    onDeactivate() {
        this.gfx.gameLayer.removeChild(this.quad);
    }
}
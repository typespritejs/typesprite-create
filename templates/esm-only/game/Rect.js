import {QuadElement, Color, Component, GraphicsEngine} from './typespritejs.js'

/**
 * A Rectangle component.
 *
 * It creates a visual object (QuadElement) and adds it to the scene
 * (GraphicsEngine.gameLayer).
 *
 * It defines 3 properties that can be overwritten in world.edf
 *
 * NOTE: this is the "vanilla approach". Keep in mind that
 * most docs will only cover this use case.
 *
 * See all classes: http://typespritejs.dev/api/modules.html
 */
export class Rect extends Component {

    /**
     * Here we expose the component's properties,
     * dependencies and resources.
     */
    static requires = {
        props: {
            color: ["color", "#f00"],
            startX: ["number", 100],
            startY: ["number", 100],
        }
    }

    onInit() {
        /** this is like @link() */
        const gfx = this.world.statics["$GraphicsEngine:typesprite"];
        this.gfx = gfx;
        this.color = this.entity.props.color;
        this.startX = this.entity.props.startX;
        this.startY = this.entity.props.startY;

        const rect = new QuadElement(100, 80);
        rect.setColor(this.color);
        rect.x = this.startX;
        rect.y = this.startY;
        this.quad = rect;
    }

    onActivate() {
        this.gfx.gameLayer.addChild(this.quad);
    }

    onDeactivate() {
        this.gfx.gameLayer.removeChild(this.quad);
    }
}
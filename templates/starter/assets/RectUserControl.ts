import {cmp, Component, GraphicsEngine, link, prop} from "typesprite";
import {Rect} from "./Rect";



/**
 * A controller component for Rect.
 *
 * The user can move it around using the arrow-keys
 *
 * Learn more: https://typespritejs.dev/start/components.html
 */
export class RectUserControl extends Component {

    @link('GraphicsEngine:typesprite')
    private gfx:GraphicsEngine;

    /**
     * A required reference to a component of type Rect.
     */
    @cmp('Rect')
    private rect:Rect;

    @prop('number', 100)
    private speedPixPerSec:number;


    onUpdate(elapsed: number) {

        if (this.gfx.isKeyDown("ArrowRight")) {
            this.rect.quad.x += elapsed * this.speedPixPerSec;
        }
        if (this.gfx.isKeyDown("ArrowLeft")) {
            this.rect.quad.x -= elapsed * this.speedPixPerSec;
        }
        if (this.gfx.isKeyDown("ArrowUp")) {
            this.rect.quad.y -= elapsed * this.speedPixPerSec;
        }
        if (this.gfx.isKeyDown("ArrowDown")) {
            this.rect.quad.y += elapsed * this.speedPixPerSec;
        }

    }
}
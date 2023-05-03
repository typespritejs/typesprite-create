import {cmp, Component, GraphicsEngine, link, prop} from "typesprite";
import {Rect} from "./Rect";



/**
 * A controller component for Rect.
 *
 * It moves the rect once per Update
 *
 * Learn more: https://typespritejs.dev/start/components.html
 */
export class RectSinusControl extends Component {

    @cmp('Rect')
    private rect:Rect;

    @prop('number', 100)
    private amplitude:number;

    private time:number = 0;
    private originY:number = 0;

    onInit() {
        this.originY = this.rect.quad.y;
    }

    onUpdate(elapsed: number) {
        this.rect.quad.y = this.originY + Math.sin(this.time) * this.amplitude;
        this.time += elapsed;
    }
}
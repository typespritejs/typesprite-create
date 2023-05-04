import {Component} from './typespritejs.js'


/**
 * A controller component for Rect.
 *
 * The user can move it around using the arrow-keys
 *
 * NOTE: this is the "vanilla approach". Keep in mind that
 * most docs will only cover this use case.
 *
 * See all classes: http://typespritejs.dev/api/modules.html
 */
export class RectUserControl extends Component {

    static requires = {
        props: {
            speedPixPerSec: ["number", 100]
        },
        cmps: [
             "Rect",
        ],
    }

    onInit() {
        this.gfx = this.world.statics["$GraphicsEngine:typesprite"];
        this.rect = this.entity.findComponent("Rect");
        this.speedPixPerSec = this.entity.props.speedPixPerSec;
    }

    onUpdate(elapsed) {
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
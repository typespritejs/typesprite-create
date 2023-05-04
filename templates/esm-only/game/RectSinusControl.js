import {Component} from './typespritejs.js'


/**
 * A controller component for Rect.
 *
 * It moves the rect once per Update
 *
 * NOTE: this is the "vanilla approach". Keep in mind that
 * most docs will only cover this use case.
 *
 * See all classes: http://typespritejs.dev/api/modules.html
 */
export class RectSinusControl extends Component {

    static requires = {
        props: {
            amplitude: ["number", 100]
        },
        cmps: [
             "Rect",
        ],
    }

    time = 0;
    originY = 0;

    onInit() {
        this.rect = this.entity.findComponent("Rect");
        this.amplitude = this.entity.props.amplitude;
        this.originY = this.rect.quad.y;
    }

    onUpdate(elapsed) {
        this.rect.quad.y = this.originY + Math.sin(this.time) * this.amplitude;
        this.time += elapsed;
    }
}
import Config from '../../Config';
import Circle from 'zrender/src/graphic/shape/Circle';
import Group from 'zrender/src/container/Group';

export default class AnimatePoint {
    constructor(opts) {
        this.r = opts['r'] || 0;
        this.x = opts['x'] || 0;
        this.y = opts['y'] || 0;
        this.fill = opts['fill'] || 'rgba(255, 255, 0, 1)';
        this.lineWidth = opts['lineWidth'] || 2;
        this.during = opts['during'] || Config.pointAnimateDuring;
        this.loop = opts['loop'];
        this.callback = opts['callback'] || (() => { });
    }

    render() {
        let outterCircleNum = 3; // 动态环的个数
        let maxRaduis = this.r * 2; //外环最大半径
        let g = new Group();

        let c = new Circle({
            shape: {
                cx: this.x,
                cy: this.y,
                r: this.r
            },
            style: {
                fill: this.fill
            }
        });

        g.add(c);

        // 生成环
        for(let index = 0; index < outterCircleNum; index++) {
            let circleShape = new Circle({
                shape: {
                    cx: this.x,
                    cy: this.y,
                    r: this.r
                },
                style: {
                    fill: 'none',
                    stroke: this.fill,
                    lineWidth: this.lineWidth,
                },
                hoverable: false
            });

            circleShape.animateShape(this.loop)
                .when(this.during, {
                    r: maxRaduis
                })
                .delay(this.during / (outterCircleNum) * index)
                .start(Config.animationEasing)
                .done(this.callback);

            circleShape.animateStyle(this.loop)
                .when(this.during, {
                    opacity: 0
                })
                .delay(this.during / (outterCircleNum) * index)
                .start(Config.animationEasing)
                .done(this.callback);

            g.add(circleShape);
        }

        return g;
    }
}
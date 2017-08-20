import * as L from 'leaflet';
import zrender from 'zrender/src/zrender';
import Group from 'zrender/src/container/Group';
import Circle from 'zrender/src/graphic/shape/Circle';

class LZrender extends L.Layer {
    constructor(options) {
        super(options);

        this.map = null;
        this.draw = options.draw || (() => { });
        this.rootGroup = new Group();
    }

    onAdd(map) {
        this.map = map;

        this.zr = zrender.init(map._panes.overlayPane, {
            width: getComputedStyle(map._container).width,
            height: getComputedStyle(map._container).height
        });

        this.zr.add(this.rootGroup);
        this.draw(this.rootGroup);
    }

    onRemove(map) {
        if (this.zr) {
            zr.dispose();
        }
    }

    getEvents() {
        return {
            zoomend: this._zoomUpdate,
            moveend: this._moveUpdate
        };
    }

    getAttribution() {

    }

    beforeAdd(map) {
    }

    addTo(map) {
        map.addLayer(this);
        return this;
    }

    _zoomUpdate(event) {
        console.log(this.map.getZoom());
        console.log(event);
    }

    _moveUpdate(event) {
        let translate = getComputedStyle(this.map._mapPane).transform.replace('matrix', '').replace('(', '').replace(')', '').split(',');
        let translateX = parseFloat(translate[4].trim());
        let translateY = parseFloat(translate[5].trim());

        this.rootGroup.position = [translateX, translateY];
        // Use dirty function and zrender will repaint.
        this.rootGroup.dirty();
        this.map._panes.overlayPane.style.transform = `translate(${-translateX}px, ${-translateY}px)`
    }
}

// L.Zrender = function (callback, options) {
//    return new LZrender(callback, options);
// }

export default LZrender;
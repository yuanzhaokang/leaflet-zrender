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

        this.initLngLat = L.latLng([0, 0]);
        this.initPos = [0, 0];
    }

    onAdd(map) {
        this.map = map;

        this.zr = zrender.init(map._panes.overlayPane, {
            width: getComputedStyle(map._container).width,
            height: getComputedStyle(map._container).height
        });

        this.zr.add(this.rootGroup);
        this.draw(this.rootGroup);

        this.initPos = this.map.latLngToLayerPoint(this.initLngLat);
    }

    onRemove(map) {
        if (this.zr) {
            zr.dispose();
        }
    }

    getEvents() {
        return {
            zoomend: this._zoomUpdate
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
        let initZoom = this.map.options.zoom;
        let nowZoom = this.map.getZoom();

        let offsetZoom = nowZoom - initZoom;
        let scale = Math.pow(2, offsetZoom);

        let shift = this.map.latLngToLayerPoint(this.initLngLat)._subtract(this.initPos.multiplyBy(scale));

        this.rootGroup.position = [shift.x, shift.y];
        this.rootGroup.scale = [scale, scale];

        this.rootGroup.dirty();
    }
}

// L.Zrender = function (callback, options) {
//    return new LZrender(callback, options);
// }

export default LZrender;
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

        this.lastZoom = 0;
    }

    onAdd(map) {
        this.map = map;

        this.zr = zrender.init(map._panes.overlayPane, {
            width: getComputedStyle(map._container).width,
            height: getComputedStyle(map._container).height
        });

        this.zr.add(this.rootGroup);
        this.draw(this.rootGroup);

        this.initPos = this.map.latLngToContainerPoint(this.initLngLat);
        this.lastZoom = this.map.getZoom();
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
        let initZoom = event.target.options.zoom;
        let nowZoom = this.map.getZoom();

        let offsetZoom = (1 / (nowZoom - this.lastZoom) * Math.abs((nowZoom - this.lastZoom))) * (nowZoom - initZoom);
        let { position } = this.rootGroup;
        let nowPos = this.map.latLngToContainerPoint(this.initLngLat);

        this.rootGroup.position = [];

        console.log(offsetZoom);
        this.lastZoom = this.map.getZoom();        
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
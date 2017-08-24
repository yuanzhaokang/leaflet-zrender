import * as L from 'leaflet';
import zrender from 'zrender/src/zrender';
import Group from 'zrender/src/container/Group';
import Circle from 'zrender/src/graphic/shape/Circle';

class Leaflet_zrender extends L.Layer {
    constructor(options) {
        super(options);

        this.map = null;
        this.draw = options.draw || (() => { });
        this.rootGroup = new Group();

        this.initLngLat = L.latLng([0, 0]);
        this.initPos = [0, 0];
        this.scale = 1;
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

        // let canvas = L.canvas();
        // console.log(canvas);
        // canvas.addTo(this.map);
    }

    onRemove(map) {
        if(this.zr) {
            this.zr.dispose();
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
        let initZoom = this.map.options.zoom;
        let nowZoom = this.map.getZoom();

        let offsetZoom = nowZoom - initZoom;
        let scale = Math.pow(2, offsetZoom);
        this.scale = scale;
        let shift = this.map.latLngToLayerPoint(this.initLngLat)._subtract(this.initPos.multiplyBy(scale));

        this.rootGroup.position = [shift.x, shift.y];
        this.rootGroup.scale = [scale, scale];
        this.rootGroup.dirty();
    }

    _moveUpdate(event) {
        let translate = getComputedStyle(this.map._mapPane).transform.replace('matrix', '').replace('(', '').replace(')', '').split(',');
        let translateX = parseFloat(translate[4].trim());
        let translateY = parseFloat(translate[5].trim());

        this.rootGroup.position = [translateX * this.scale, translateY * this.scale];
        this.map._panes.overlayPane.style.transform = `translate(${-translateX}px, ${-translateY}px)`
        // Use dirty function and zrender will repaint.
        this.rootGroup.dirty();
    }
}

export default Leaflet_zrender;
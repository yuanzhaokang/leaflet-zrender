import * as L from 'leaflet';
import zrender from 'zrender/src/zrender';

class LZrender extends L.Layer {
   constructor(options) {
      super(options);

      this.map = null;
      this.draw = options.draw || (() => { });
   }

   onAdd(map) {
      console.log(map);
      this.map = map;

      let zr = zrender.init(map._panes.overlayPane, {
         width: getComputedStyle(map._container).width,
         height: getComputedStyle(map._container).height
      });

      this.draw(zr, projection);
   }

   onRemove(map) {
      if(this.zr) {
         zr.dispose();
      }
   }

   getEvents() {
      return { zoomend: this._zoomUpdate };
   }

   getAttribution() {

   }

   beforeAdd(map) {
      // console.log("===");
   }

   addTo(map) {
      map.addLayer(this);
      return this;
   }

   _zoomUpdate(event) {
      console.log(this.map.getZoom());
      console.log(event);
   }
}

// L.Zrender = function (callback, options) {
//    return new LZrender(callback, options);
// }

export default LZrender;
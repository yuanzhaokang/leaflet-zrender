import * as L from 'leaflet';
import zrender from 'zrender/src/zrender';

class LZrender extends L.Layer {
   constructor(options) {
      super(options);

      this.map = null;
      this.zr = null;
   }

   onAdd(map) {
      console.log(map);

      this.zr = zrender.init(map._panes.overlayPane, {
         width: getComputedStyle(map._container).width,
         height: getComputedStyle(map._container).height
      });
   }

   onRemove(map) {
      if(this.zr) {
         zr.dispose();
      }
   }

   // getEvents() {
   //    return "";
   // }

   getAttribution() {

   }

   beforeAdd(map) {
      // console.log("===");
   }

   addTo(map) {
      map.addLayer(this);
      return this;
   }

   getZR() {
      return this.zr;
   }
}

// L.Zrender = function (callback, options) {
//    return new LZrender(callback, options);
// }

export default LZrender;
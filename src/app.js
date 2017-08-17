import * as L from 'leaflet';
import zrender from 'zrender/src/zrender';
import Circle from 'zrender/src/graphic/shape/Circle';

class LZrender extends L.Layer {
   constructor(options) {
      super(options);

      this.canvas = null;
      this.map = null;
      this.zr = null;
   }

   onAdd(map) {
      this.map = map;
      console.log(this.map._panes.overlayPane);

      this.zr = zrender.init(this.map._panes.overlayPane, {
         width: 300,
         height: 400
      });

      let c = new Circle({
         shape: {
            cx: 100,
            cy: 100,
            r: 30
         },
         style: {
            fill: 'blue'
         }
      });

      c.animateShape(true)
         .when(1000, {
            r: 50
         })
         .start();

      this.zr.add(c);
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
      console.log("===");
   }

   addTo(map) {
      map.addLayer(this);
      return this;
   }
}

// L.Zrender = function (callback, options) {
//    return new LZrender(callback, options);
// }

export default LZrender;
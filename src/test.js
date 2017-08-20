import * as L from 'leaflet';
import LZrender from './app';
import Circle from 'zrender/src/graphic/shape/Circle';
import 'leaflet/dist/leaflet.css';

var map = L.map("canvas", { center: [39.89, 116.38], zoom: 8 });
var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});
Esri_WorldTopoMap.addTo(map);

map.on('click', (e) => {
    // console.log(e.latlng);
});

let lz = new LZrender({
    draw: draw
});

lz.addTo(map);

function draw(root) {
    let lngLat = [39.89, 116.38];
    let pixel = map.latLngToLayerPoint(lngLat);

    let c = new Circle({
        shape: {
            cx: pixel.x,
            cy: pixel.y,
            r: 20
        },
        style: {
            fill: 'blue'
        }
    });

    c.animateShape(true)
        .when(5000, {
            r: 50
        })
        .start();

    root.add(c);
}
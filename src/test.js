import * as L from 'leaflet';
import LZrender from './app';

var map = L.map("canvas", { center: [46.81509864599243, 8.3221435546875], zoom: 8 });
var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
   attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});
Esri_WorldTopoMap.addTo(map);

let lz = new LZrender();
// lz.addTo(map);
lz.addTo(map);
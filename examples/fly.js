import * as L from 'leaflet';
import Leaflet_zrender from '../src/leaflet-zrender';
import AnimatePoint from './graphic/2d/AnimatePoint';
import Config from './Config';
import Link from './graphic/2d/Link';
import AttackLine from './graphic/2d/AttackLine';
import 'leaflet/dist/leaflet.css';

var map = L.map("canvas", { center: [0, 0], zoom: 2 });
var Esri_WorldTopoMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-night-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2luZHloIiwiYSI6ImNpbHdiazZyazAxcTV2Z2tzbnNwcG1xbTMifQ.jz162pjSUZ957Vv_wP6i1A', {
    attribution: 'leaflet-zrender'
});
Esri_WorldTopoMap.addTo(map);

let lz = new Leaflet_zrender({
    draw: draw
});

lz.addTo(map);

function draw(root) {
    let from = L.latLng(38.5, 118.3);
    let to = L.latLng(40.7, -74);

    let fromPixel = map.latLngToContainerPoint(from);
    let toPixel = map.latLngToContainerPoint(to);

    let fp = new AnimatePoint({
        r: Math.random() * 10 + 5,
        x: fromPixel.x,
        y: fromPixel.y,
        lineWidth: 1,
        loop: true,
        callback: function () {
            root.remove(fp);
        }
    }).render();

    root.add(fp);

    let tp = new AnimatePoint({
        r: Math.random() * 10 + 5,
        x: toPixel.x,
        y: toPixel.y,
        lineWidth: 1,
        loop: true,
        callback: function () {
            root.remove(tp);
        }
    }).render();

    root.add(tp);

    let link1 = new Link({
        from: {
            x: toPixel.x,
            y: toPixel.y
        },
        to: {
            x: fromPixel.x,
            y: fromPixel.y
        },
        stroke: 'rgba(255, 255, 0, 0.8)',
    }).render();

    root.add(link1);

    let link2 = new Link({
        from: {
            x: fromPixel.x,
            y: fromPixel.y
        },
        to: {
            x: toPixel.x,
            y: toPixel.y
        },
        stroke: 'rgba(255, 255, 0, 0.8)',
    }).render();

    root.add(link2);

    let attackLine1 = new AttackLine({
        link: link1,
        size: 3,
        loop: true,
        callback: function () {
            root.remove(link);
            root.remove(attackLine1);
        }
    }).render();

    root.add(attackLine1);

    let attackLine2 = new AttackLine({
        link: link2,
        size: 3,
        loop: true,
        callback: function () {
            root.remove(link);
            root.remove(attackLine2);
        }
    }).render();

    root.add(attackLine2);
}
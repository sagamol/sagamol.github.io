let myMap = L.map("map");
let etappe12group = L.featureGroup().addTo(myMap);
let myLayers = {
    osm: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),

    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),

    eKarte_Tirol_Sommer: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
         subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='http://wmts.kartetirol.at/wmts'>data.gv.at</a>",
    }
    ),

    eKarte_Tirol_Winter: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='http://wmts.kartetirol.at/wmts'>data.gv.at</a>",
    }
    ),

    eKarte_Tirol_Ortho: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
       // subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='http://wmts.kartetirol.at/wmts'>data.gv.at</a>",
    }
    ),

    // bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
       // subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
       // attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    //}
    //),

    gdi_nomenklatur: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
       // subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='http://wmts.kartetirol.at/wmts'>data.gv.at</a>",
    }
    ),

    //bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        //subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        //attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    //}
    //),

    //bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
       // subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
       // attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    //}
    //),

}

myMap.addLayer(myLayers.geolandbasemap);
myMap.addLayer(etappe12group);
let myMapControl = L.control.layers({
    "Openstreetmap": myLayers.osm,
    "basemap.at Grundkarte": myLayers.geolandbasemap,
    //"basemap.at grau": myLayers.bmapgrau,
    //"basemap.at highdpi": myLayers.bmaphidpi,
    //"basemap.at Orthofoto": myLayers.bmaporthofoto30cm,
    "gdi_base_summer": myLayers.eKarte_Tirol_Sommer,
    "gdi_base_winter": myLayers.eKarte_Tirol_Winter,
    "gdi_ortho": myLayers.eKarte_Tirol_Ortho,
}, {
        "basemap.at Overlay": myLayers.bmapoverlay,
        "Variante Pillersee": etappe12group,
        //"Beschriftung eKarte Tirol": gdi_nomenklatur,
    });
myMap.addControl(myMapControl);

myMap.setView([47.528115, 12.577668], 11);

//let geojson = L.geoJSON(etappe12data).addTo(etappe12group);
const geojson = L.geoJSON(etappe12data, {
    style: function(feature) {
       return { color: "#ff0000" };
    },
}).addTo(etappe12group);

L.control.scale({           
    maxWidth : 200,        
    metric : true,          
    imperial : false,      
    position : "bottomleft" 

}).addTo(myMap);           

const etappenbeginnkoor = [47.570246,12.468518];
const etappenendekoor = [47.501216,12.4901];

let etappenbeginnMarker = L.marker(etappenbeginnkoor).addTo(etappe12group);
etappenbeginnMarker.bindPopup('<p>Erpfendorf</p><a href="https://www.kitzbueheler-alpen.com/de/erpfendorf/erpfendorf-tirol-ortsinformation-zahlen-fakten.html"> Erpfendorf in Tirol - Ortsinformation</a>');

let myIcon1 = L.icon({
    iconUrl: 'start-race-2.png',
    });
L.marker([47.570246,12.468518], {icon: myIcon1}).addTo(myMap);


let etappenendeMarker = L.marker(etappenendekoor).addTo(etappe12group);
etappenendeMarker.bindPopup('<p>Mühlbach</p><a href="https://de.wikipedia.org/wiki/M%C3%BChlbach_am_Hochk%C3%B6nig"> Mühlbach am Hochkönig</a>');

let myIcon2 = L.icon({
  iconUrl: 'finish.png',
  });
L.marker([47.501216,12.4901], {icon: myIcon2}).addTo(myMap);

myMap.addLayer(etappe12group)

/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen

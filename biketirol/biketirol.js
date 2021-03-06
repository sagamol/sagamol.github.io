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
//let myMap = L.map("map");
let myMap = L.map("map", {
    fullscreenControl: true,
});
// Layer für Etappe12 und Start- Zielmarker hinzufügen
let etappe12group = L.featureGroup().addTo(myMap);
let overlayMarker = L.featureGroup().addTo(myMap);
let overlaySteigung = L.featureGroup().addTo(myMap);

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung)
const myLayers = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a","b","c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
    eKarte_Tirol_Sommer: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
    }
    ),
    eKarte_Tirol_Winter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
    }
    ),
    eKarte_Tirol_Ortho: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
    }
    ),
    bmapgrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
    gdi_nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
            pane: "overlayPane",
    }
    ),
    bmaphidpi: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
}

// Layergruppen für die Elektronische Karte Tirol definieren
const tirisSommer = L.layerGroup([
    myLayers.eKarte_Tirol_Sommer,
    myLayers.gdi_nomenklatur
]);
const tirisWinter = L.layerGroup([
    myLayers.eKarte_Tirol_Winter,
    myLayers.gdi_nomenklatur
]);
const tirisOrtho = L.layerGroup([
    myLayers.eKarte_Tirol_Ortho,
    myLayers.gdi_nomenklatur
]);

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen
let myMapControl = L.control.layers({
    "Openstreetmap": myLayers.osm,
    "basemap.at Grundkarte": myLayers.geolandbasemap,
    "basemap.at grau": myLayers.bmapgrau,
    "basemap.at highdpi": myLayers.bmaphidpi,
    "basemap.at Orthofoto": myLayers.bmaporthofoto30cm,
    "Elektronische Karte Tirol - Sommer": tirisSommer,
    "Elektronische Karte Tirol - Winter": tirisWinter,
    "Elektronische Karte Tirol - Orthophoto": tirisOrtho,
}, {
        //"Etappe12: Variante Pillersee": etappe12group,
        "Start / Ziel": overlayMarker,
        "Steigungslinie": overlaySteigung,
});

myMap.addControl(myMapControl);
myMap.addLayer(myLayers.geolandbasemap);
myMap.setView([47.528115, 12.577668], 9);

// Höhenprofil control hinzufügen
let hoehenprofil = L.control.elevation({
    position : "topright",
    theme : "steelblue-theme",
    collapsed: false,
}).addTo(myMap);


let gpxTrack = new L.GPX("data/etappe12.gpx", {
    async : true,
        marker_options : {
            startIconUrl : null,
            endIconUrl : null,
            shadowUrl : null,
        }
    })//.addTo(etappe12group);


gpxTrack.on("loaded", function(evt) {
    //console.log("get_distance",evt.target.get_distance().toFixed(0))
    //console.log("get_elevation_min",evt.target.get_elevation_min().toFixed(0))
    //console.log("get_elevation_max",evt.target.get_elevation_max().toFixed(0))
    //console.log("get_elevation_gain",evt.target.get_elevation_gain().toFixed(0))
    //console.log("get_elevation_loss",evt.target.get_elevation_loss().toFixed(0))
    let laenge = evt.target.get_distance().toFixed(0);
    document.getElementById("laenge").innerHTML = laenge;
    let tiefster_Punkt = evt.target.get_elevation_min().toFixed(0);
    document.getElementById("tiefster_Punkt").innerHTML = tiefster_Punkt;
    let hoechster_Punkt = evt.target.get_elevation_max().toFixed(0);
    document.getElementById("hoechster_Punkt").innerHTML = hoechster_Punkt;
    let aufstieg = evt.target.get_elevation_gain().toFixed(0);
    document.getElementById("aufstieg").innerHTML = aufstieg;
    let abstieg = evt.target.get_elevation_loss().toFixed(0);
    document.getElementById("abstieg").innerHTML = abstieg;

    myMap.fitBounds(evt.target.getBounds());
});

gpxTrack.on('addline', function(evt){
    hoehenprofil.addData(evt.line);
    console.log(evt.line);
    console.log(evt.line.getLatLngs());
    console.log(evt.line.getLatLngs()[0]);
    console.log(evt.line.getLatLngs()[0].lat);
    console.log(evt.line.getLatLngs()[0].lngs);
    console.log(evt.line.getLatLngs()[0].meta);
    console.log(evt.line.getLatLngs()[0].meta.ele);

    // alle Segmente Steigungslinie hinzufügen
    let gpxLinie = evt.line.getLatLngs();
    for (let i = 1; i < gpxLinie.length; i++) {
            let p1 = gpxLinie[i-1];
            let p2 = gpxLinie[i];
            //console.log(p1.lat,p1.lng,p2.lat,p2.lng,dist,delta,proz);

            // Entfernung zwischen den Punkten berechnen
            let dist = myMap.distance(
                [p1.lat,p1.lng],
                [p2.lat,p2.lng]
            );
            
            //Höhenunterschied berechnen
            let delta = p2.meta.ele - p1.meta.ele;

            // Steigung in % berechnen
            //let proz = 0;
            //if (dist > 0) {
            //let proz = (delta / dist * 100.0).toFixed(1);
            //}
            let proz = (dist > 0) ? (delta / dist * 100.0).toFixed(1) : 0;
            // Bedingung ? Ausdruck1 : Ausdruck2
            //console.log(p1.lat,p1.lng,p2.lat,p2.lng,dist,delta,proz);

            let farbe =
                proz > 10   ? "#d7301f" :
                proz > 6    ? "#fc8d59" :
                proz > 2    ? "#fdcc8a" :
                proz > 0    ? "#edf8fb" :
                proz > -2   ? "#b2e2e2" :
                proz > -6   ? "#66c2a4" :
                proz > -10  ? "#238b45" :
                            "green";
                // Farbschema grün ['#edf8fb','#b2e2e2','#66c2a4','#238b45'], http://colorbrewer2.org/?type=sequential&scheme=BuGn&n=4
                // Farbschema rot ['#fef0d9','#fdcc8a','#fc8d59','#d7301f'], http://colorbrewer2.org/?type=sequential&scheme=OrRd&n=4
            let segment = L.polyline(
                [
                    [p1.lat,p1.lng],
                    [p2.lat,p2.lng],
                 ], {
                     color: farbe,
                     weight: 10,
                    }
                ).addTo(overlaySteigung);
    }
});

// Maßstabsleiste metrisch
L.control.scale({           
    maxWidth : 200,        
    metric : true,          
    imperial : false,      
    position : "bottomleft" 
}).addTo(myMap);

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/
L.marker([47.570246,12.468518],{
    icon : L.icon({
        iconUrl : 'images/start-race-2.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    '<h3>Erpfendorf</h3><p><a href="https://www.kitzbueheler-alpen.com/de/erpfendorf/erpfendorf-tirol-ortsinformation-zahlen-fakten.html"> Erpfendorf in Tirol - Ortsinformation</a></p>'
).addTo(overlayMarker);

L.marker([47.501216,12.4901],{
    icon : L.icon({
        iconUrl : 'images/finish.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    '<h3>Mühlbach</h3><p><a href="https://de.wikipedia.org/wiki/M%C3%BChlbach_am_Hochk%C3%B6nig"> Mühlbach am Hochkönig</a></p>'
).addTo(overlayMarker);

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
//let geojsonTrack = L.geoJSON(etappe12data).addTo(etappe12group);

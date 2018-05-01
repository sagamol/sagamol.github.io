
let myMap = L.map("mapdiv");    // http://leafletjs.com/reference-1.3.0.html#map-l-map
let markerGroup = L.featureGroup();
let myLayers = {
    geolandbasemap : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],                          // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"    // http://leafletjs.com/reference-1.3.0.html#tilelayer-attribution
        }
    ),
    bmaporthofoto30cm : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
};
myMap.addLayer(myLayers.geolandbasemap);    // http://leafletjs.com/reference-1.3.0.html#map-addlayer
myMap.addLayer(markerGroup);

let myMapControl = L.control.layers({       // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "Marker": markerGroup,
});
myMap.addControl(myMapControl);     // http://leafletjs.com/reference-1.3.0.html#map-addcontrol

myMap.setView([47.267,11.383], 9); // http://leafletjs.com/reference-1.3.0.html#map-setview

myMapControl.expand();      // http://leafletjs.com/reference-1.3.0.html#control-layers-expand

L.control.scale({           // http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
    maxWidth : 200,         // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    metric : true,          // http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial : false,       // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    position : "bottomleft" // http://leafletjs.com/reference-1.3.0.html#control-scale-position

}).addTo(myMap);            // http://leafletjs.com/reference-1.3.0.html#control-scale-addto

const gehrenspitzekoor = [47.387131,11.133717];
const hafelekarkoor = [47.312079,11.383623];
const hohemundegipfelkoor = [47.346295,11.080385];
const hohemundewindstationkoor = [47.346612,11.083694];
const nassereithwannigkoor = [47.336922,11.862333];
const nassereitheralmkoor = [47.344376,11.849554];
const puiteggkoor = [47.394844,11.152817];
const rauthhuettekoor = [47.345909,11.104943];
const rosshuettewindstationkoor = [47.342025,11.227903];
const seegrubekoor = [47.306381,11.377933];
const dalfazkammkoor = [47.448514,11.751511];
const erfurterhuettekoor = [47.441861,11.762127];
const agetwoadkoor = [47.069889,11.862306];
const breitergrieskogelschneestationkoor = [47.083952,11.027383];
const breitergrieskogelwindstationkoor = [47.101055,11.023038];
const falkaunsalpekoor = [47.071488,11.76282];
const horntalerspitzlkoor = [47.099611,11.155416];
const klhorntalkoor = [47.096000,11.162388];
const lampsenspitzeschneestationkoor = [47.153491,11.120722];
const lampsenspitzewindstationkoor = [47.156075,11.095642];
const roterschrofenkoor = [47.04,11.7181];
const schlickeralmkoor = [47.154432,11.303207];
const seirloecherkogelkoor = [47.0339,11.8528];
const laemmerbichlalmkoor = [47.181266,11.751717];
const rastkogelwindstationkoor = [47.192132,11.767481];
const sonntagsköpflkoor = [47.275010,11.752086];
const sonntagsköpflwindstationkoor = [47.271989,11.755802];
const tuxerjochschneestationkoor = [47.093149,11.648053];
const tuxerjochwindstationkoor = [47.089717,11.648987];
const wandspitzeschneestationkoor = [47.121858,11.661969];
const wandspitzewindstationkoor = [47.120752,11.658062];


let gehrenspitzeMarker = L.marker(gehrenspitzekoor).addTo(markerGroup);
gehrenspitzeMarker.bindPopup("<p>Gehrenspitze</p><p>Datum: 2018-04-26 </p><p>Temperatur: 0.6</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png' alt='Gehrenspitze' />");

let hohemundegipfelMarker = L.marker(hohemundegipfelkoor).addTo(markerGroup);
hohemundegipfelMarker.bindPopup("<p>Hohe Munde</p><p>Datum: 2018-04-26 </p><p>Temperatur: </p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png' alt='Hohe Munde Gipfel' />");

let hafelekarMarker = L.marker(hafelekarkoor).addTo(markerGroup);
hafelekarMarker.bindPopup("<p>Hafelekar</p><p>Datum: 2018-04-26 </p><p>Temperatur: 1.6</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png' alt='Hafelekar' />");

let hohemundewindstationMarker = L.marker(hohemundewindstationkoor).addTo(markerGroup);
hohemundewindstationMarker.bindPopup("<p>Hohe Munde Windstation</p><p>Datum: 2018-04-26 </p><p>Temperatur: -4.1</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png' alt='Hohe Munde Windstation' />");

let nassereithwannigMarker = L.marker(nassereithwannigkoor).addTo(markerGroup);
nassereithwannigMarker.bindPopup("<p>Nassereith Wannig</p><p>Datum: 2018-04-26 </p><p>Temperatur: -1.2</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' alt='Nassereith Wannig' />");

let nassereitheralmMarker = L.marker(nassereitheralmkoor).addTo(markerGroup);
nassereitheralmMarker.bindPopup("<p>Nassereither Alm</p><p>Datum: 2018-04-26 </p><p>Temperatur: 4</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' alt='Nassereither Alm' />");

let puiteggMarker = L.marker(puiteggkoor).addTo(markerGroup);
puiteggMarker.bindPopup("<p>Puitegg</p><p>Datum: 2018-04-26 </p><p>Temperatur: 5.3</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png' alt='Puitegg' />");

let rauthhuetteMarker = L.marker(rauthhuettekoor).addTo(markerGroup);
rauthhuetteMarker.bindPopup("<p>Rauthhuette</p><p>Datum: 2018-04-26 </p><p>Temperatur: 11.7</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png' alt='Rauthhuette' />");

let rosshuettewindstationMarker = L.marker(rosshuettewindstationkoor).addTo(markerGroup);
rosshuettewindstationMarker.bindPopup("<p>Rosshuette</p><p>Datum: 2018-04-26 </p><p>Temperatur: 4.1</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rosshuette.png' alt='Rosshuette' />");

let seegrubeMarker = L.marker(seegrubekoor).addTo(markerGroup);
seegrubeMarker.bindPopup("<p>Seegrube</p><p>Datum: 2018-04-26 </p><p>Temperatur: 3.1</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png' alt='Seegrube' />");

let dalfazkammMarker = L.marker(dalfazkammkoor).addTo(markerGroup);
dalfazkammMarker.bindPopup("<p>Dalfazkamm</p><p>Datum: 2018-04-26 </p><p>Temperatur: 0.4</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png' alt='Dalfazkamm' />");

let erfurterhuetteMarker = L.marker(erfurterhuettekoor).addTo(markerGroup);
erfurterhuetteMarker.bindPopup("<p>Erfurterhuette</p><p>Datum: 2018-04-26 </p><p>Temperatur: 2.4</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png' alt='Erfurterhuette' />");

let agetwoadMarker = L.marker(agetwoadkoor).addTo(markerGroup);
agetwoadMarker.bindPopup("<p>Agetwoad</p><p>Datum: 2018-04-26 </p><p>Temperatur: 1.5</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/agetwoad.png' alt='Agetwoad' />");

let breitergrieskogelschneestationMarker = L.marker(breitergrieskogelschneestationkoor).addTo(markerGroup);
breitergrieskogelschneestationMarker.bindPopup("<p>Breiter Grieskogel Schneestation</p><p>Datum: 2018-04-26 </p><p>Temperatur: 1.1</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png' alt='Breiter Grieskogel Schneestation' />");

let breitergrieskogelwindstationMarker = L.marker(breitergrieskogelwindstationkoor).addTo(markerGroup);
breitergrieskogelwindstationMarker.bindPopup("<p>Breiter Grieskogel Windstation</p><p>Datum: 2018-04-26 </p><p>Temperatur: -3.4</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png' alt='Breiter Grieskogel Windstation' />");

let falkaunsalpeMarker = L.marker(falkaunsalpekoor).addTo(markerGroup);
falkaunsalpeMarker.bindPopup("<p>Falkaunsalpe</p><p>Datum: 2018-04-26 </p><p>Temperatur: 2.2</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png' alt='Falkaunsalpe' />");

let horntalerspitzlMarker = L.marker(horntalerspitzlkoor).addTo(markerGroup);
horntalerspitzlMarker.bindPopup("<p>Horntalerspitzl</p><p>Datum: 2018-04-26 </p><p>Temperatur: 4.3</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png' alt='Horntalerspitzl' />");

let klhorntalMarker = L.marker(klhorntalkoor).addTo(markerGroup);
klhorntalMarker.bindPopup("<p>Kleines Horntal</p><p>Datum: 2018-04-26 </p><p>Temperatur: 5.5</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png' alt='Kleines Horntal' />");

let lampsenspitzeschneestationMarker = L.marker(lampsenspitzeschneestationkoor).addTo(markerGroup);
lampsenspitzeschneestationMarker.bindPopup("<p>Lampsenspitze Schneestation</p><p>Datum: 2018-04-26 </p><p>Temperatur: 1.7</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png' alt='Lampsenspitze Schneestation' />");

let lampsenspitzewindstationMarker = L.marker(lampsenspitzewindstationkoor).addTo(markerGroup);
lampsenspitzewindstationMarker.bindPopup("<p>Lampsenspitze Windstation</p><p>Datum: 2018-04-26 </p><p>Temperatur: -0.8</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png' alt='Lampsenspitze Windstation' />");

let roterschrofenMarker = L.marker(roterschrofenkoor).addTo(markerGroup);
roterschrofenMarker.bindPopup("<p>Roter Schrofen</p><p>Datum: 2018-04-26 </p><p>Temperatur: -1</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png' alt='Roter Schrofen' />");

let schlickeralmMarker = L.marker(schlickeralmkoor).addTo(markerGroup);
schlickeralmMarker.bindPopup("<p>Schlicker Alm</p><p>Datum: 2018-04-26 </p><p>Temperatur: 6.5</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/schlickeralm.png' alt='Schlicker Alm' />");

let seirloecherkogelMarker = L.marker(seirloecherkogelkoor).addTo(markerGroup);
seirloecherkogelMarker.bindPopup("<p>Seirloecherkogel</p><p>Datum: 2018-04-26 </p><p>Temperatur: 0</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seirloecherkogel.png' alt='Seirloecherkogel' />");

let laemmerbichlalmMarker = L.marker(laemmerbichlalmkoor).addTo(markerGroup);
laemmerbichlalmMarker.bindPopup("<p>Laemmerbichlalm</p><p>Datum: 2018-04-26 </p><p>Temperatur: 3</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png' alt='Laemmerbichlalm' />");

let rastkogelwindstationMarker = L.marker(rastkogelwindstationkoor).addTo(markerGroup);
rastkogelwindstationMarker.bindPopup("<p>Rastkogel Windstation</p><p>Datum: 2018-04-26 </p><p>Temperatur: 0.1</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png' alt='Rastkogel Windstation' />");

let sonntagsköpflMarker = L.marker(sonntagsköpflkoor).addTo(markerGroup);
sonntagsköpflMarker.bindPopup("<p>Sonntagsköpfl</p><p>Datum: 2018-04-26 </p><p>Temperatur: 1.2</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png' alt='Sonntagsköpfl' />");

let sonntagsköpflwindstationMarker = L.marker(sonntagsköpflwindstationkoor).addTo(markerGroup);
sonntagsköpflwindstationMarker.bindPopup("<p>Sonntagsköpfl Windstation</p><p>Datum: 2018-04-26 </p><p>Temperatur: 3.3</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png' alt='Sonntagsköpfl Windstation' />");

let tuxerjochschneestationMarker = L.marker(tuxerjochschneestationkoor).addTo(markerGroup);
tuxerjochschneestationMarker.bindPopup("<p>Tuxerjoch Schneestation</p><p>Datum: 2018-04-26 </p><p>Temperatur: 6</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png' alt='Tuxerjoch Schneestation' />");

let tuxerjochwindstationMarker = L.marker(tuxerjochwindstationkoor).addTo(markerGroup);
tuxerjochwindstationMarker.bindPopup("<p>Tuxerjoch Windstation</p><p>Datum: 2018-04-26 </p><p>Temperatur: 1.5</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png' alt='Tuxerjoch Windstation' />");

let wandspitzeschneestationMarker = L.marker(wandspitzeschneestationkoor).addTo(markerGroup);
wandspitzeschneestationMarker.bindPopup("<p>Wandspitze Schneestation</p><p>Datum: 2018-04-26 </p><p>Temperatur: 1.3</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png' alt='Wandspitze Schneestation' />");

let wandspitzewindstationMarker = L.marker(wandspitzewindstationkoor).addTo(markerGroup);
wandspitzewindstationMarker.bindPopup("<p>Wandspitze Windstation</p><p>Datum: 2018-04-26 </p><p>Temperatur: -0.3</p><br /><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png' alt='Wandspitze Windstation' />");


myMap.fitBounds(markerGroup.get.Bounds());
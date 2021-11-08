const cabecera = document.getElementById('cabecera');

var mymap = L.map('map').setView([44.01007, -7.55834]);
var gpx = './tracks/LUGO_ALMERIA.gpx'; // URL to your GPX file or the GPX itself
let route = new L.GPX(gpx, {
	async: true,
	marker_options: {
		startIconUrl: 'images/start2.png',
		endIconUrl: 'images/finish.png',
		shadowUrl: 'images/pin-shadow.png'
	  }
});

route.on('loaded', function(e) {
  mymap.fitBounds(e.target.getBounds());
  cabecera.textContent="Ruta: "+e.target._info.name+" || Distancia: "+((e.target._info.length)/1000).toFixed(2)+" Kms";
  console.log(e.target._info.name);
}).addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/outdoors-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(mymap);

L.marker([43.01007, -7.55834],{
	title: "Horizonte de sucesos"
}).addTo(mymap);

L.circle([43.01007, -7.55834], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.2,
	radius: 150
}).addTo(mymap);

L.polygon([
	[51.509, -0.08],
	[51.503, -0.06],
	[51.51, -0.047]
]).addTo(mymap);


route.on('loaded', function(e) {
	mymap.fitBounds(e.target.getBounds());
	cabecera.textContent="Ruta: "+e.target._info.name+" || Distancia: "+((e.target._info.length)/1000).toFixed(2)+" Kms";	
}).addTo(mymap);
/* Different views from https://docs.mapbox.com/api/maps/styles/
mapbox://styles/mapbox/outdoors-v11
mapbox://styles/mapbox/streets-v11
mapbox://styles/mapbox/light-v10
mapbox://styles/mapbox/dark-v10
mapbox://styles/mapbox/satellite-v9
mapbox://styles/mapbox/satellite-streets-v11
mapbox://styles/mapbox/navigation-day-v1
mapbox://styles/mapbox/navigation-night-v1
*/
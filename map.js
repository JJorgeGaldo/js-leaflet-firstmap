const nomRuta = document.getElementById('nomRuta');
const rutas = document.getElementById('rutas');
const showBtn = document.getElementById('show');

/* Painting the map */


function paintMap(){
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/outdoors-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);
console.log("paso1");
}

var mymap = L.map('map').setView([43.01007, -7.55834], 15);
paintMap();


L.marker([43.01007, -7.55834],{
	title: "Horizonte de sucesos"
}).addTo(mymap);
console.log("paso2");
L.circle([43.01007, -7.55834], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.2,
	radius: 150
}).addTo(mymap);
console.log("paso3");
L.polygon([
	[51.509, -0.08],
	[50.503, -0.06],
	[51.51, -0.147]
]).addTo(mymap);
console.log("paso4");



/* Painting the Routes */

showBtn.onclick = (e) =>{
	//let gpx = '';
	//mymap.remove();
	paintMap();
	mymap.eachLayer(function(layer){
		layer.remove();
		//console.log(layer.getPane());
	});
	paintMap();
	console.log(rutas);
	e.preventDefault;
	switch(rutas.value){
		case '0':
			mymap = L.map('map').setView([44.01007, -7.55834]); // URL to your GPX file or the GPX itself
			console.log(gpx);
			break;
		case '1':
			gpx = '';
			console.log("I'm IN");
			gpx = './tracks/Viveiro_Bares.gpx';
			rutas.value = 0;
			console.log(gpx);
			break;
		case '2':
			gpx = '';
			console.log(gpx);

			gpx = './tracks/Viveiro_4Picos.gpx';
			console.log(gpx);
			break;
		case '3':
			gpx = '';
			gpx = './tracks/LUGO_ALMERIA.gpx';
			console.log(gpx);
			break;
		case '4':
			gpx = '';
			gpx = './tracks/LUGO_SANT_PORTUGAL_CADIZ.gpx';
			console.log(gpx);
			break;
	}
	
	console.log(gpx);
	let route = new L.GPX(gpx, {
		async: true,
		marker_options: {
			startIconUrl: 'images/start3.png',
			endIconUrl: 'images/finish2.png',
			shadowUrl: ''
		}
	});
	
	route.on('loaded', function(e) {
		mymap.fitBounds(e.target.getBounds());
		nomRuta.textContent="Ruta: "+e.target._info.name+" || Distancia: "+((e.target._info.length)/1000).toFixed(2)+" Kms";
		console.log(e.target._info);
	}).addTo(mymap);	
	
}









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
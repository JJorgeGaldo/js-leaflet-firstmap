const nomRuta = document.getElementById('nomRuta');
const rutas = document.getElementById('rutas');
const showBtn = document.getElementById('show');
//const elevation = document.getElementById('elevation');
const ctx = document.getElementById('elevation').getContext('2d');
const ctxContainer = document.getElementById('outline');
let pointsSaved = [];


/* Functions */

function setPointsSaved(x,y){
	pointsSaved.push(["pxy"+(pointsSaved.length+1),x,y]);
	console.log(pointsSaved);
}
function paintMap(){
	// The standard OSM map:
	/* L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		maxZoom: 20,
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		tileSize: 512,
		zoomOffset: -1,
		interactive: true,
		bubblingMouseEvents: true
	}).addTo(mymap); */

	// Another maps:
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/" class="attribution">Mapbox </a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		interactive: true,
		bubblingMouseEvents: true
	}).addTo(mymap);

}

function drawRoute(){
	
	let route = new L.GPX(gpx, {
		async: true,
		marker_options: {
			startIconUrl: 'images/start3.png',
			endIconUrl: 'images/finish2.png',
			shadowUrl: ''
		}
	});
	
	route.on('loaded', function(e) {
		console.log(e.target);
		mymap.fitBounds(e.target.getBounds());
		nomRuta.textContent=e.target._info.name+" || Distancia: "+((e.target._info.length)/1000).toFixed(2)+" Kms || Desnivel: "+((e.target._info.elevation.gain)).toFixed(2)+" mts";
		
		if(Math.floor(e.target._info.elevation.gain)){
			ctxContainer.style.display = "block";
			drawElevation(e.target._info.elevation._points);
		}else{
			ctxContainer.style.display = "none";
		}
		
	}).addTo(mymap);
}


function drawElevation(rawData){
	let chartStatus = Chart.getChart('elevation');
	if (chartStatus != undefined) {
		chartStatus.destroy();
	}
	let dist = [];
	let elev = [];
	for(let i = 0; i < rawData.length; i++){
		dist.push(((rawData[i][0])/1000).toFixed(2));
		elev.push(Math.floor(rawData[i][1]));
	}
	var gradient = ctx.createLinearGradient(0,150, 0,1000);
	gradient.addColorStop(.07, 'rgba(244,80,4,1)');
	gradient.addColorStop(.3, 'rgba(244,152,4,.9)');
	gradient.addColorStop(.7, 'rgba(215,169,70,.8)');

	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: dist,
			datasets: [{
				label: 'elevation',
				data: elev,
				backgroundColor: [
					gradient
					/* '#daa940' */
					/* background: rgb(244,112,4);
					background: linear-gradient(180deg, rgba(244,112,4,1) 7%, rgba(244,152,4,1) 30%, rgba(215,169,70,1) 70%); */
					/* 'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.8)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)' */
				],
				 /* borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)' 
				], */
				fill: true
				//borderWidth: 1
				
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					display: false //With this to false doesn't shows the legend
				},
				chartAreaBorder: {
					borderWidth: 2
				}
			},
			scales: {
				y: {
					beginAtZero: false
				}
			}
		},
		
	});
}

function popupText(){
	let text = prompt("Please, intro the message to show here","Watch out");
	return text;
}

/* Landing map */
var mymap = L.map('map').setView([43.01007, -7.55834], 17);
paintMap();

L.circle([43.01007, -7.55834], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.2,
	radius: 150
}).addTo(mymap);
L.polygon([
	[51.509, -0.08],
	[50.503, -0.06],
	[51.51, -0.057]
]).addTo(mymap);
L.marker([43.01007, -7.55834],).addTo(mymap)
	.bindPopup("<b>Horizonte de sucesos</b>")
	.openPopup();

mymap.on('click', (e) => {
	console.log(e.latlng);
	setPointsSaved(e.latlng.lat, e.latlng.lng);
	L.marker([e.latlng.lat, e.latlng.lng],).addTo(mymap)
		.bindPopup(`<b>${popupText()}</b>`)
		.openPopup();
})


/* Selecting the Route to show */
showBtn.onclick = (e) =>{
	// First we remove the previous routes
	mymap.eachLayer(function(layer){
		layer.remove();
		//console.log(layer.getPane()); // To show each layer that is rendering
	});
	// Now we repaint the map in which we show the route
	paintMap();

	e.preventDefault;
	switch(rutas.value){
		case '0':
			paintMap();
			console.log(gpx);
			break;
		case '1':
			gpx = './tracks/Viveiro_Bares.gpx'; // URL to your GPX file or the GPX itself
			rutas.value = 0;
			break;
		case '2':
			gpx = './tracks/Viveiro_4Picos.gpx';
			rutas.value = 0;
			break;
		case '3':
			gpx = './tracks/Lugo-Castro-Castroverde-Lugo.gpx';
			rutas.value = 0;
			break;
		case '4':
			gpx = './tracks/Penarubia-Geodesico.gpx';
			rutas.value = 0;
			break;
		case '5':
			gpx = './tracks/LUGO_ALMERIA.gpx';
			rutas.value = 0;
			break;
		case '6':
			gpx = './tracks/LUGO_SANT_PORTUGAL_CADIZ.gpx';
			rutas.value = 0;
			break;
	}
	drawRoute();
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
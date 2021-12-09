// Route Menu
const routeIcon = document.querySelector(".burger");
const routeMenu = document.getElementById("routes");
const routeList	= document.querySelectorAll(".routeX");
// Forecast Chart
const forecastIcon = document.getElementById('weatherIcon');
const forecast = document.getElementById('forecast').getContext('2d');
const forecastContainer = document.getElementById('forecastOutline');
// Route Info
const nomRuta = document.getElementById('nomRuta');
// Elevation Chart
const elevationIcon = document.getElementById("elevationIcon");
const elevation = document.getElementById('elevation').getContext('2d');
const elevationContainer = document.getElementById('elevationOutline');
// Other
const mapDiv = document.getElementById("map");
let pointsSaved = [];
let gpx;
let paint = "";


//! Creating the different map layers: */
let 
	outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/" class="attribution">Mapbox </a>',
		id: 'mapbox/outdoors-v11',
		tileSize: 512,
		zoomOffset: -1,
		interactive: true,
		bubblingMouseEvents: true
	}),
	streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/" class="attribution">Mapbox </a>',
		id: 'mapbox/outdoors-v11',
		tileSize: 512,
		zoomOffset: -1,
		interactive: true,
		bubblingMouseEvents: true
	}),
	dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/" class="attribution">Mapbox </a>',
		id: 'mapbox/dark-v10',
		tileSize: 512,
		zoomOffset: -1,
		interactive: true,
		bubblingMouseEvents: true
	}),
	satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/" class="attribution">Mapbox </a>',
		id: 'mapbox/satellite-streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		interactive: true,
		bubblingMouseEvents: true
	}),
	navigationDay = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/" class="attribution">Mapbox </a>',
		id: 'mapbox/navigation-day-v1',
		tileSize: 512,
		zoomOffset: -1,
		interactive: true,
		bubblingMouseEvents: true
	});
//! Initializing the map:
var mymap = L.map('map').setView([43.01007, -7.55834], 15, [outdoors,streets,dark,satelliteStreets,navigationDay]);

//!Creating the map layer selector:
var baseMaps = {
    "Outdoor": outdoors,
    "Streets": streets,
    "Dark Mode": dark,
    "Satellite": satelliteStreets,
    "Navigation": navigationDay,
};

//! Creating the Point layer selector: (NOT WORKING)*/
var overlayMapPoints = {
    "POI": pointsSaved
};

//! Functions */

// We check the local storage to look for data, and if there´s no data, we take the data from the .json and save it to a variable
const fetchData = async() => {
	if  (localStorage.getItem("localStoragedPoints")) {
        pointsSaved = JSON.parse(localStorage.getItem("localStoragedPoints"));
        pointsSaved.forEach(element => {
			//console.log(element);
			paintPoint(element);
		});
    }else{
		try{
			const res = await fetch('../dataPoints.json');
			//console.log(res);
			const pointsSaved = await res.json();
			pointsSaved.forEach(element => {
				//console.log(element);
				setPoint(element.lat, element.lng, element.text);
			});
		}catch(error){
			console.log(error);
		}
	}
	
}

const setPoint = (x,y,t) => {
	const point = {
		id: ("pxy"+(pointsSaved.length+1)),
		lat: x,
		lng: y,
		text: t
	}

	pointsSaved.push(point);
	console.log(pointsSaved);
	localStorage.setItem("localStoragedPoints", JSON.stringify(pointsSaved));
	paintPoint(point);
	console.log(pointsSaved.length);

}
const paintPoint = (obj) => {
	L.marker([obj.lat, obj.lng],).addTo(mymap)
		.bindPopup(`<b>${obj.text}</b>`);
	//.openPopup();
}
const paintMap = () => {
	
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

const drawRoute = () => {
	
	let route = new L.GPX(gpx, {
		async: true,
		marker_options: {
			startIconUrl: 'images/start3.png',
			endIconUrl: 'images/finish2.png',
			shadowUrl: ''
		}
	});
	
	route.on('loaded', function(e) {
		// Here we modify the bounds for managing the initial zoom of the route
		let bounds = e.target.getBounds();
		bounds._northEast.lat += /* e.target.getBounds()._northEast.lat + */ .05;
		bounds._northEast.lng += /* e.target.getBounds()._northEast.lat + */ .04;
		bounds._southWest.lat -= /* e.target.getBounds()._southWest.lng - */ .05;
		bounds._southWest.lng -= /* e.target.getBounds()._southWest.lng - */ .04;
		
		mymap.fitBounds(bounds);
		nomRuta.textContent=e.target._info.name+" || Distancia: "+((e.target._info.length)/1000).toFixed(2)+" Kms || Desnivel: "+((e.target._info.elevation.gain)).toFixed(2)+" mts";
		
		if(Math.floor(e.target._info.elevation.gain)){
			drawElevation(e.target._info.elevation._points);
			elevationIcon.classList.add('show');
			elevationIcon.style.color = '#b84348';
		}else{
			elevationIcon.classList.remove('show');
			elevationIcon.style.color = '#ccc';
		}
		
	}).addTo(mymap);
}

//! Elevation Chart
elevationIcon.addEventListener('click', (e) =>{
	if(elevationIcon.classList.contains("show")){
		console.log(elevationContainer.offsetHeight);
		e.preventDefault();
		console.log(e.target)
		if(elevationContainer.classList.contains("hidden")){
			elevationContainer.style.display = "block";
			mapDiv.style.height = "calc(100vh - "+elevationContainer.offsetHeight+"px)";
			elevationContainer.style.bottom = "0px";
			elevationContainer.classList.remove('hidden');
		}else{
			elevationContainer.style.bottom = "-200px";
			elevationContainer.style.display = "none";
			elevationContainer.classList.add('hidden');
			mapDiv.style.height = "100vh";
		}	
	}
	
	e.stopPropagation();
})

const drawElevation = (rawData) => {
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
	var gradient = elevation.createLinearGradient(0,150, 0,1000);
	gradient.addColorStop(.07, 'rgba(244,80,4,1)');
	gradient.addColorStop(.3, 'rgba(244,152,4,.9)');
	gradient.addColorStop(.7, 'rgba(215,169,70,.8)');

	const myChart = new Chart(elevation, {
		type: 'bar',
		data: {
			labels: dist,
			datasets: [{
				label: 'elevation',
				data: elev,
				backgroundColor: [
					gradient
				],
				fill: true
			}]
		},
		options: {
			maintainAspectRatio: false,
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

const popupText = () => {
	let text = prompt("Please, intro the message to show here","Hello from here!");
	return text;
}
//* ******************************************************************** */
//! Forecast Chart
forecastIcon.addEventListener('click', (e) =>{
	e.preventDefault();
	console.log(e.target)
	console.log(forecastContainer.classList.contains("hidden"));
	console.log(forecastContainer.classList[1]);
	if(forecastContainer.classList.contains("hidden")){
		forecastContainer.style.display = "block";
		forecastContainer.classList.remove('hidden');
		getClimate();
	}else{
		forecastContainer.style.display = "none";
		forecastContainer.classList.add('hidden');
	}
	e.stopPropagation();
})
//! Minute weather widget */
const weatherKey = "vVUOw5LAAnBGLhRmWvz2FRyHX0zFuxPk";
const loc = "43.01007, -7.55834";
const targetUrl = 'http://dataservice.accuweather.com/forecasts/v1/minute?q=43.01007%2C%20-7.55834&apikey=vVUOw5LAAnBGLhRmWvz2FRyHX0zFuxPk';
let arrayForecast = [];
let arrayTest = [];
let ChartLabel = [];

const getClimate = async () => {
	//const res = await fetch('http://dataservice.accuweather.com/forecasts/v1/minute?q='+loc+'&apikey='+weatherKey+'');
	//const data = await res.json();
	//console.log(data);
	//forecast.textContent = data.Link;
	drawForecast();
}
const drawForecast = () => {
	let chartStatus = Chart.getChart('forecast');
	ChartLabel = [];
	if (chartStatus != undefined) {
		chartStatus.destroy();
	}

	// Array that check the object and extract the minute-by-minute info
	arrayTest = [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0];
	for(i= 0; i<120;i++){
		ChartLabel.push(i);
	}
	/* console.log(rawData.Summaries[1].StartMinute);
	console.log(rawData.Summaries[1].EndMinute);
	console.log(rawData.Summaries[1].CountMinute);
	console.log(rawData.Summaries[1].TypeId);
	console.log(rawData.Summaries[1].Type); */
	/* for(let i = 0; i < rawData.Summaries.length; i++){
		if(rawData.Summaries[i].TypeId == 1){
			for(let j = rawData.Summaries[i].StartMinute; j <= rawData.Summaries[i].EndMinute; j++){
				arrayForecast.push(1);
				ChartLabel.push(j);
				console.log("Llueve en minuto: ");
				console.log(arrayForecast.length);
			}
		}else{
			for(let j = rawData.Summaries[i].StartMinute; j <= rawData.Summaries[i].EndMinute; j++){
				arrayForecast.push(0);
				ChartLabel.push(j);
				console.log("No llueve en minuto: ");
				console.log(arrayForecast.length);
			}
		}
	}
 */
	const myChart = new Chart(forecast, {
		type: 'bar',
		data: {
			labels: ChartLabel,
			datasets: [{
				label: 'forecast',
				data: arrayTest,
				backgroundColor: [
					'#B84348'
				],
				fill: true
			}]
		},
		options: {
			maintainAspectRatio: false,
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
					beginAtZero: true
				}
			}
		},
	});
}

//* ******************************************************************** */

//! Routes menu ***** /

routeIcon.addEventListener('click', () => {
	if(routeMenu.classList.contains("hidden")){
		routeMenu.style.top = "0px";
		routeMenu.classList.remove('hidden');
	}else{
		routeMenu.style.top = "-200px";
		routeMenu.classList.add('hidden');
	}
})

//! Selecting the Route to show: */
routeMenu.addEventListener('click', (e) =>{
	let paint = "";
	console.log(e.target.classList.value);
	//let paint = e.target.getAttribute('id');
	(e.target.classList.contains('routeContainer'))
		?paint = e.target.classList[1]
		:paint = e.target.classList.value;
	
	gpx = "";
	// First we remove the previous routes
	mymap.eachLayer(function(layer){
		layer.remove();
		//console.log(layer.getPane()); // To show each layer that is rendering
	});
	// Now we repaint the map in which we show the route
	paintMap();

	switch(paint){
		case 'route1':
			gpx = './tracks/Viveiro_Bares.gpx'; // URL to your GPX file or the GPX itself
			break;
		case 'route2':
			gpx = './tracks/Viveiro_4Picos.gpx';
			break;
		case 'route3':
			gpx = './tracks/Lugo-Castro-Castroverde-Lugo.gpx';
			break;
		case 'route4':
			gpx = './tracks/Penarubia-Geodesico.gpx';
			break;
		case 'route5':
			gpx = './tracks/RIBADEO-SanCibrao.gpx';
			break;
		case 'route6':
			gpx = './tracks/LUGO_SANT_PORTUGAL_CADIZ.gpx';
			break;
	}
	routeMenu.style.top = "-200px";
	routeMenu.classList.add('hidden');
	drawRoute();
})
/* routeMenu.addEventListener('onfocusout', () => {
	routeMenu.style.display = "none";
	routeMenu.classList.add('hidden');
}) */

//* ******************************************************************** */


/***********************************************************************************/
/***********************************************************************************/
/***********************************************************************************/

/* Landing page map */

document.addEventListener("DOMContentLoaded", () =>{
	fetchData();
	paintMap();
	L.control.layers(baseMaps).addTo(mymap);
	console.log(baseMaps);
})

/* let array = [{'index': 1,'value': 34},{a:2},{m:3,n:1}];
console.log(array);
array.push({r:43,sdf:55});
console.log(array);
console.log(array.length); */

L.circle([43.01007, -7.55834], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.2,
	radius: 150
}).addTo(mymap);

mymap.on('click', (e) => {
	console.log(e.latlng);
	let textOfPoint = popupText();
	if(textOfPoint){
		setPoint(e.latlng.lat, e.latlng.lng, textOfPoint);
	}
})






/* Different map views from https://docs.mapbox.com/api/maps/styles/
mapbox://styles/mapbox/outdoors-v11
mapbox://styles/mapbox/streets-v11
mapbox://styles/mapbox/light-v10
mapbox://styles/mapbox/dark-v10
mapbox://styles/mapbox/satellite-v9
mapbox://styles/mapbox/satellite-streets-v11
mapbox://styles/mapbox/navigation-day-v1
mapbox://styles/mapbox/navigation-night-v1
*/
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
  <div class="banner">
    <p>Welcome to the Sensor Map<br>Click on the markers on the map to see data for a specific sensor</p>
  </div>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>

  </div>
</template>

<script setup>
import { Map, MapStyle, Popup, Marker, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const db = getFirestore()


const mapContainer = shallowRef(null);
const map = shallowRef(null);

async function getSensors(db){

    const sensors = collection(db,"Sensor")
    const snap = await getDocs(sensors);
    //const sensorList = snap.docs.map(doc => doc.data())

    let sensorIds = []

    const sensorList = snap.docs.map((item) =>{

          sensorIds.push(item.id)
          return item.data()

    })
    
    return [sensorList,sensorIds]
}


function createSensorMarkers(map,sensor_data){

      sensor_data[0].forEach((item,index) =>{
          
            let sensorName = item.name;
            let location = item.location;

            let sensorId = sensor_data[1][index];

            /*
            let popup_template = `<div><h2>${sensorName}</h2>` +
                `<div><h3>Lat: ${location._lat}</h3><h3>Lon: ${location._long}</h3>` +
                  `</div><h3><div onclick="this.navigate(${sensorId})"> View Data </div></h3></div>`;

            */
            let holder = document.createElement("div");
            let name = document.createElement("h2");
            
            let inner = document.createElement("div");
            let lat = document.createElement("h3");
            let lon = document.createElement("h3");

            let linkHolder = document.createElement("h3");
            let link = document.createElement("a")
            //link.setAttribute("href","/data/" + sensorId)

            link.style.cursor = "pointer";
            link.style.textDecoration = "underline";
            link.style.color = "blue";

            link.addEventListener("click", ()=>{

              router.push({path: `/data/${sensorId}`});
                
            });
            link.innerText = "View Data";

            linkHolder.appendChild(link);


            name.innerText = sensorName;
            lat.innerText = "Lat: " + location._lat;
            lon.innerText = "Lon: " + location._long;

            inner.appendChild(lat);
            inner.appendChild(lon);

            holder.appendChild(name);
            holder.appendChild(inner);
            holder.appendChild(linkHolder);

          
            
            let pop = new Popup().setDOMContent(holder);

           //let pop = new Popup().setHTML(popup_template)

            new Marker({color: "#FF0000"})
            .setLngLat([location._long,location._lat])
            .setPopup(pop)
            .addTo(map);

      });
}

onMounted(async () => {
  config.apiKey = import.meta.env.VITE_API_KEY;

  //32.4319785,-81.783109

  const result = await getSensors(db)
  const data = result[0]
  //-81.852164
  

  const initialState = {lng: data[0].location._long, lat: data[0].location._lat, zoom: 16};

  map.value = markRaw(new Map({
    container: mapContainer.value,
    style: MapStyle.STREETS,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom
  }));


  createSensorMarkers(map.value,result);

    

    
  
 
  /*
  const pop = new Popup().setHTML(html)
  
  
  const mark = new Marker({color: "#FF0000"})
  .setLngLat([-81.783109 ,32.4319785])
  .setPopup(pop)
  .addTo(map.value);*/

  

  

}),

onUnmounted(() => {
  map.value?.remove();
})
</script>

<style scoped>


.message{
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
}
.map-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - 150px); /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}


    .banner {
      background-color: #f0f0f0; /* Light gray background color for the banner */
      padding: 10px;
      text-align: center;
      font-size:1.5em;
    }
</style>
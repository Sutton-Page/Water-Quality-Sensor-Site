<script>

//import sensorData from '../assets/big-data.json'
import Plotly from 'plotly.js-dist-min'

import '../firebaseInit';
import { getFirestore, collection, doc, getDocs,getDoc } from 'firebase/firestore/lite';


const db = getFirestore()

// to get params from route
// $route.params.location_id


export default {

    data() {

        return { res:[],
            sensor:{},
            content_length:0,
            slides:["g1","g2","g3","g4","g5"],
            images:[],
            columns:["Adjusted Time","Temp C","PH","Voltage (V)","Turbididty (NTU)","TDS (ppm)"]

            
        
        
        }
    },

    methods: {

        async getTitle(){

            let basePath = "Sensor/" + this.$route.params.location_id
            const sensor_col = doc(db,basePath);
            const sensor_data = await getDoc(sensor_col)
            let data = sensor_data.data()
            this.sensor = data


        },

        async getData(){

            console.log(this.$route.params.location_id)
            //const sensor_item = await doc(db,"Sensors",this.$route.params.location_id);

            let basePath = "Sensor/" + this.$route.params.location_id + "/Data"
            const sensor_col = collection(db,basePath);
            const sensor_data = await getDocs(sensor_col);

            let data_items = sensor_data.docs.map(item => item.data());
            
            

            let gr = [["Adjusted Time","Temp C","g1"],["Adjusted Time","PH","g2"],
            ["Adjusted Time","TDS (ppm)","g3"],
            ["Adjusted Time","Turbididty (NTU)","g4"]];

            gr.forEach((item) =>{

                this.basic(data_items[0],item[0],item[1],item[2]);


            });
        

        },

        basic(data,x_name,y_name,target_id) {

          let x_data = data[x_name]
          let y_data = data[y_name]

          this.content_length = x_data.length;

          /*
          data.forEach((item) =>{

              x_data.push(item[x_name]);
              y_data.push(item[y_name]);


          });*/

          if(x_name == "Adjusted Time"){

              x_name = "Time (hours)"
          }

          var trace = {
              x: x_data,
              y: y_data,
              mode: 'lines+markers',
              name:'lines'
          };

          var layout = {
            
              width:1300,
              title: y_name,
              
              xaxis:{
                title: x_name,
                autorange:true,
              },
              yaxis:{

                  title: y_name,
                  autorange:true
              },

              
          };

          Plotly.newPlot(target_id,[trace],layout)


        },

        check(){

            console.log("IT changed");
        }
    },

    mounted(){

        this.getTitle()
        this.getData();

        /*   
        let gr = [["Adjusted Time","Temp C","g1"],["Adjusted Time","PH","g2"],
        ["Adjusted Time","TDS (ppm)","g3"],["Adjusted Time","Voltage (V)","g4"],
        ["Adjusted Time","Turbididty (NTU)","g5"]];

        gr.forEach((item) =>{

            this.basic(this.res,item[0],item[1],item[2]);


        }); */


    },

    computed: {

        small_table(){

            return this.res.slice(0,20);
        },

       
    }

    
};


</script>

<template>
    
    <div>
      <div class="top">

            <h1>{{sensor.name}}</h1>
            <h3> There are {{content_length}} data entries</h3>
            <h3> <router-link to="/"> Back to map page </router-link></h3>

            
      </div>

      <div id="graphs"> 
        <v-btn color="info" :href="'/files/Georgia-Southern-Eagle-Creek-Data.xlsx'">Download Sensor Data</v-btn>
        <h2> Graphs of the data</h2>
      </div>
      <v-carousel hide-delimiters progress="primary">

        <template v-slot:prev="{ props }">
        <v-btn variant="elevated" color="info" @click="props.onClick"
            >Previous</v-btn
        >
        </template>
        <template v-slot:next="{ props }">
        <v-btn variant="elevated"  color="info" @click="props.onClick"
            >Next</v-btn
        >
        </template>

            <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            eager>
            
            <v-sheet>
                <div class="d-flex fill-height justify-center align-center">
                <div :id="slide"></div>
                </div>
            </v-sheet>
            
            </v-carousel-item>
      </v-carousel>
     

   

     </div>

    
      
</template>


<style scoped>

#graphs{

    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding-bottom: 30px;
    background-color: #f0f0f0;
}


#graphs h2{

    padding-bottom: 10px;
}


.ce {

    margin: 0;
  position: absolute;
  top: 50%;
}

.top {

    text-align: center;
    background-color: #f0f0f0;
    padding-bottom:10px;

}



h2{
    text-align: center;
}

.data-table{

    display:flex;
    align-content: center;
    justify-content: center;
    padding-bottom: 150px;
}

table {


  font-family: arial, sans-serif;
  border-collapse: collapse;
  width:80%;
  
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

</style>
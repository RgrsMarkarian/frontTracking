import React, {useState,useEffect,useMemo}  from "react";
import axios from 'axios';
import { GoogleMap,LoadScript,MarkerF, InfoWindow,PolygonF } from "@react-google-maps/api";

import TrackingTable from "../components/TrackingTable";


const containerStyle = {
    width: '100%',
    height: '800px'
};


const center = {
    lat:20.6650,
    lng: -103.3430
};

const options = {
    strokeColor: "#ff2343",
    strokeOpacity: '0.5',
    strokeWeight: 2
  };

const handleMapLoad = (map) => {
    console.log('Mapa cargado:', map);
  };


function Dashboard(){

    const [records, setRecords] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showInfoWindow, setInfoWindowFlag] = useState(true);
    const [rawCoords,setRawCoords] = useState([]);
 

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [recordSelected, setRecordSelected] = useState(null);

    const stableData = useMemo(() => records, [records]);

    

    const pathCoordinates = [
        { lat:20.675010833333,  lng: -103.307566},
        { lat: 20.675012166667, lng: -103.30756466667}
    ];
   
    const generateRawCoords = (data) => {

        const transformedCoords = data.map(record => ({
            
            lat: record.latitud, lng: record.longitud
        }));

        console.log(rawCoords);
      //  setRawCoords(transformedCoords);

      setRawCoords(transformedCoords);

    };



    useEffect(() => {
        const fetchRecords = async () => {
            try{
                const response = await axios.get('http://3.144.132.146/records');
                setRecords(response.data);
                //generateRawCoords(response.data);
              
            } catch (error){
                setError(error);
            }
            finally {
                setLoading(false);
              }
          
        };

        fetchRecords();
    }, []);


  //  if (loading) return <div>Loading...</div>;
   // if (error) return <div>Error: {error.message}</div>;
  


    return(

<div>
    
<LoadScript 
googleMapsApiKey="AIzaSyB5Ze6Ew9nhetaeNN63Tf6X0HFNl-ueVYE"
loadingElement={<div>Cargando mapa...</div>}
async>
    
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={handleMapLoad}
    >
          <MarkerF position={{lat: parseFloat(recordSelected=== null ? 0 :  recordSelected.latitud ), lng:parseFloat(recordSelected=== null ? 0 :  recordSelected.longitud)}} />

       <PolygonF
          path={stableData.filter(record => record.latitud > 0).map(record => ({
           
            lat: parseFloat(record.latitud), lng: parseFloat(record.longitud)
        }))}
          options={options}
        />
    
     

      
      
        </GoogleMap>
      


</LoadScript>

<TrackingTable records={records} setRecordSelected = {setRecordSelected}></TrackingTable>
    </div>
     
       
      




    );



}

export default React.memo(Dashboard);



//<TrackingTable records={stableData}></TrackingTable>

/*
    {records.map(record => {

            console.log(record.latitud);
            console.log("Rendering Mapa component");
           return (
            <Marker 
            position={{lat:parseFloat(record.latitud), lng:parseFloat(record.longitud)}}
            onClick={(props,marker) => {setSelectedMarker(selectedMarker === record ? null : record);  setActiveMarker(marker);}}
            />
           );
        })}

            {selectedMarker && (
          <InfoWindow
            visible={showInfoWindow}
            marker={activeMarker}
            position={{lat:parseFloat(selectedMarker.latitud), lng:parseFloat(selectedMarker.longitud)}}
            onCloseClick={() => setSelectedMarker(null)} // Cerrar el InfoWindow
          >
            <div>
              <h3>{selectedMarker.device}</h3>
              <p> {selectedMarker.latitud}</p>
              <p> {selectedMarker.longitud}</p>
              <p> {selectedMarker.created_at}</p>
            </div>
          </InfoWindow>
        )}  */











/*  {selectedMarker && (
          <InfoWindow
            visible={showInfoWindow}
            marker={activeMarker}
            position={{lat:parseFloat(selectedMarker.latitud), lng:parseFloat(selectedMarker.longitud)}}
            onCloseClick={() => setSelectedMarker(null)} // Cerrar el InfoWindow
          >
            <div>
              <h3>{selectedMarker.device}</h3>
              <p> {selectedMarker.latitud}</p>
              <p> {selectedMarker.longitud}</p>
              <p> {selectedMarker.created_at}</p>
            </div>
          </InfoWindow>
        )}  
       
        */
//<TrackingTable records={stableData}></TrackingTable>
/*
<LoadScript 
googleMapsApiKey="AIzaSyB5Ze6Ew9nhetaeNN63Tf6X0HFNl-ueVYE"
loadingElement={<div>Cargando mapa...</div>}
async>
    
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={handleMapLoad}
    >
      
        </GoogleMap>
      


</LoadScript>*/
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Interface for the data fetched from the API
interface CountryData {
    country: string;
    countryInfo: {
        _id: number;
        lat: number;
        long: number;
        flag: string; // Add flag property
    };
    active: number;
    recovered: number;
    deaths: number;
}

function Maps() {
    // State to store the fetched countries data
    const [countriesData, setCountriesData] = useState<CountryData[]>([]);

    // Fetch data from the API on component mount
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/countries')
            .then(response => response.json())
            .then((data: CountryData[]) => setCountriesData(data))
            .catch(error => console.error('Error fetching the data:', error));
    }, []);

    return (
        <div className='flex justify-center p-5 flex-col items-center gap-4'>
            <h1>Country Specific Data of COVID-19</h1>
            {/* Map container */}
            <div className='w-4/5 h-4/5 border p-3 flex justify-center'>
                <MapContainer style={{ height: "70vh", width: '70vw' }} center={[20, 0]} zoom={3}>
                    {/* OpenStreetMap tile layer */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Markers for each country */}
                    {countriesData.map(country => (
                        <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]} icon={new L.Icon({
                            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                            tooltipAnchor: [16, -28],
                            shadowSize: [41, 41],
                        })}>
                            {/* Popup for each marker with country data */}
                            <Popup>
                                <div>
                                    {/* Display country flag if available */}
                                    {country.countryInfo.flag ? (
                                        <img src={country.countryInfo.flag} alt={country.country} width="60" />
                                    ) : (
                                        <p>No flag available</p>
                                    )}
                                    <h3>{country.country}</h3>
                                    <p>Active cases: {country.active}</p>
                                    <p>Recovered cases: {country.recovered}</p>
                                    <p>Deaths: {country.deaths}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}

export default Maps;

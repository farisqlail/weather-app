<template>
    <div>
        <nav class="navbar bg-body-white">
            <div class="container">
                <a class="navbar-brand" href="#">Weather App by Farisqlail</a>
            </div>
        </nav>
        <!-- {{ weatherData }} -->

        <div class="container mt-3">
            <div class="card" style="background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
">
                <div class="card-body p-5">
                    <!-- {{ locationWeather }} -->
                    <div class="d-flex align-items-center">
                        <h2 class="text-white">{{ locationWeather.name }}</h2>, &nbsp;<span class="text-white">{{
                            locationWeather.country }}, {{
        locationWeather.region }}</span>
                    </div>
                    <div class="icon-current">
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- {{ currentWeather }} -->
                                <img :src="currentWeather.condition && currentWeather.condition.icon" class="img-fluid mt-3"
                                    width="100">
                                <span class="text-white">{{ currentWeather.condition && currentWeather.condition.text
                                }}</span>
                            </div>
                            <div class="col-sm-6 align-items-center">
                                <div align="center">
                                    <span class="text-white">Wind :</span> <span class="text-white">{{
                                        currentWeather.wind_mph }}</span> <br>
                                    <span class="text-white">Cloud :</span> <span class="text-white">{{ currentWeather.cloud
                                    }}</span>
                                    <h2 class="text-white">{{ currentWeather.temp_c }} <span> °f</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="foreCastDay mt-3">
                        <div class="row mt-3">
                            <div class="col-sm-3" v-for="(data, index) in forecast" :key="index">
                                <span class="text-white">{{ data.day.condition.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    head() {
        return {
            title: 'Weather App by Faris Rizqilail',
        };
    },
    data() {
        return {
            locationWeather: {},
            currentWeather: {},
            forecast: []
        };
    },
    async mounted() {
        await this.getData();
        await this.getDataFuture();
    },
    methods: {
        async getData() {
            try {
                const response = await axios.get('http://api.weatherapi.com/v1/current.json?key=ddf098aa8c49424391691331230109&q=Surabaya&aqi=no');
                this.locationWeather = response.data.location;
                this.currentWeather = response.data.current;
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        },
        async getDataFuture() {
            try {
                const tanggalSekarang = new Date();
                tanggalSekarang.setDate(tanggalSekarang.getDate() + 14);

                const tahun = tanggalSekarang.getFullYear();
                const bulan = String(tanggalSekarang.getMonth() + 1).padStart(2, '0');
                const tanggal = String(tanggalSekarang.getDate()).padStart(2, '0');
                const tanggalFormatted = `${tahun}-${bulan}-${tanggal}`;

                
                const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ddf098aa8c49424391691331230109&q=Surabaya&days=5&aqi=no&alerts=no`)
                // console.log(response.data.forecast.forecastday);
                this.forecast = response.data.forecast.forecastday;
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
    },
};
</script>
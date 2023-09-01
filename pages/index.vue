<template>
    <div>
        <nav class="navbar bg-body-white">
            <div class="container justify-content-center">
                <nuxt-link class="navbar-brand fw-semibold" to="/" style="border-bottom: 2px solid rgba(9,9,121,1);">Weather
                    App by Farisqlail</nuxt-link>
            </div>
        </nav>
        <!-- {{ weatherData }} -->

        <div class="container container-body mt-3">
            <div class="card card-header">
                <div class="card-body">
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
                        <div class="d-flex flex-forecast mt-3">
                            <div class="future-forecast" v-for="(data, index) in forecast" :key="index">
                                <span class="text-white">{{ formatDate(data.date) }}</span>
                                <div>
                                    <div class="icon-forecast">
                                        <img :src="data.day.condition.icon" class="img-fluid"
                                            :alt="data.day.condition.text">
                                    </div>
                                    <span class="text-white text-celcius fw-bold">{{ data.day.avgtemp_c }} °c</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="maps">
                <div id="map"></div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import L from 'leaflet';

useHead({
    title: 'Weather app by Farisqlail',
})

export default {
    data() {
        return {
            locationWeather: {},
            currentWeather: {},
            forecast: [],
            map: null,
        };
    },
    async created() {
        if (process.client) {
            // Hanya jalankan kode ini di sisi klien (peramban)
            import('leaflet').then(L => {
                // Sekarang Anda dapat menggunakan pustaka Leaflet di sini
                this.initMap();
                this.getAirPollutionData();
            });
        }

        // Sisanya tetap seperti sebelumnya
        await this.getData();
        await this.getDataFuture();
        await this.getDataPolution();
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
        },
        formatDate(date) {
            const tanggal = new Date(date);

            // Dapatkan bulan dalam bentuk dua digit (01 - 12)
            const options = { weekday: 'long' };
            const namaHari = tanggal.toLocaleDateString('en-US', options);

            return namaHari;
        },
        // async getDataPolution() {
        //     try {
        //         const response = await axios.get('http://api.airvisual.com/v2/city?city=Surabaya&state=Jawa%20Timur&country=INA&key=5def0ae4-5acc-4ec1-a52a-836941f772c5');

        //         console.log(response);
        //     } catch (error) {

        //     }
        // },
        async initMap() {
            // Inisialisasi peta Leaflet
            this.map = L.map('map', {
                maxZoom: 16, // Set maksimum tingkat zoom
            }).setView([-7.2575, 112.7521], 10);

            // Tambahkan peta dasar (misalnya, peta OpenStreetMap)
            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
        },
        async getAirPollutionData() {
            try {
                const apiKey = 'YOUR_API_KEY';
                const city = 'Surabaya';

                // Misalnya, Anda dapat menambahkan marker dengan koordinat Surabaya
                const latitude = -7.2575;
                const longitude = 112.7521;
                // const marker = L.marker([latitude, longitude]).addTo(this.map);

                // Panggil API atau lakukan apa yang Anda perlu lakukan dengan data polusi udara
            } catch (error) {
                console.error('Error fetching air pollution data:', error);
            }
        },
    },
};
</script>

<style>
.container-body {
    width: 768px;
    max-width: 768px;
}

.maps {
    width: 768px;
    max-width: 768px;
    margin-top: 50px;
}

#map {
    width: 768px;
    max-width: 768px;
    margin-top: 50px;
}

.card-header {
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);
    border: none;
    border-radius: 20px !important;
}

.flex-forecast {
    text-align: center;
    gap: 80px;
    padding-left: 10px;
}

.future-forecast .text-celcius {
    margin-top: 10px;
}

@media (max-width: 768px) {
    .container-body {
        width: 390px;
        max-width: 390px;
    }

    .card-header {
        width: 360px;
        max-width: 360px;
    }

    .flex-forecast {
        text-align: center;
        gap: 20px;
        padding-left: -10;
        overflow: scroll;
    }

    .icon-forecast {
        width: 100%;
        max-width: 100%;
        padding-bottom: 10px;
    }

}</style>
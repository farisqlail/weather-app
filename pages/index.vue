<template>
    <div>
        <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
  </div>
</nav>
        {{ weatherData }}
    </div>
</template>

<script>
import axios from 'axios';

export default {
    // title: "Weather App by Faris Rizqilail",
    data() {
        return {
            weatherData: null, // Inisialisasi weatherData dengan null
        };
    },
    mounted() {
        this.getData(); // Panggil getData saat komponen dimuat
    },
    methods: {
        async getData() {
            try {
                const response = await axios.get('http://api.weatherapi.com/v1/current.json?key=ddf098aa8c49424391691331230109&q=Surabaya&aqi=no');
                this.weatherData = response.data; // Setel weatherData dengan data dari respons API
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        },
    },
};
</script>
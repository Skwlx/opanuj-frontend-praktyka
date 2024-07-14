<script lang="ts">
  import { DailyWeather, Weather } from '../models/LocationWeather';
  import WeatherIcon from './WeatherIcon.svelte';

  export let dailyWeather: DailyWeather | Weather;

  const generateAverageTemperature = (dailyWeather: DailyWeather | Weather) => {
    if ('average_temperature' in dailyWeather) {
      return dailyWeather.average_temperature;
    }

    if ('averageTemperature' in dailyWeather) {
      return dailyWeather.averageTemperature;
    }

    return 'not available';
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };
</script>


<div class="bg-white rounded-xl p-4 shadow-lg">
  <h2 class="flex flex-row items-center space-x-2">
    <WeatherIcon type={dailyWeather.type} />
    <span>{formatDate(dailyWeather.date)}</span>
  </h2>
  <p class="text-xl font-bold mt-4">{generateAverageTemperature(dailyWeather)} *(C)</p>
</div>

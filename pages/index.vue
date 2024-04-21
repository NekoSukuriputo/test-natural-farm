<template>
  <v-container fluid>
    <v-sheet class="pa-5" :elevation="1" border height="100%" width="100%">
      <ClientOnly>
        <apexchart
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </ClientOnly>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
const series = ref([
  {
    name: "Sales",
    data: [251437000, 469456000, 754631000, 444912000, 159987000, 387547000],
  },
]);
const chartOptions = ref({
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: "Sales Trends by Months",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return new Intl.NumberFormat("id-ID").format(val);
      },
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return new Intl.NumberFormat("id-ID").format(val);
      },
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
});
</script>

<style scoped></style>

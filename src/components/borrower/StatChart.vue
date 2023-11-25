<template>
  <!--begin::Mixed Widget 13-->
  <div
      :class="widgetClasses"
      :style="`background-color: ${widgetColor}`"
      class="card theme-dark-bg-body"
  >
    <!--begin::Body-->
    <div class="card-body d-flex flex-column">
      <!--begin::Wrapper-->
      <div class="d-flex flex-column flex-grow-1">
        <!--begin::Title-->
        <span class="text-dark fw-bold fs-3">Number of loans on every month</span>
        <!--end::Title-->

        <!--begin::Chart-->
        <apexchart
            ref="chartRef"
            :height="chartHeight"
            :options="chart"
            :series="series"
            class="mixed-widget-14-chart"
            type="bar"
        ></apexchart>
        <!--end::Chart-->
      </div>
      <!--end::Wrapper-->
    </div>
  </div>
  <!--end::Mixed Widget 13-->
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, ref, watch} from "vue";
import type VueApexCharts from "vue3-apexcharts";
import type {ApexOptions} from "apexcharts";
import {useThemeStore} from "@/stores/theme";

export default defineComponent({
  name: "StatChart",
  props: {
    widgetClasses: String,
    widgetColor: String,
    chartHeight: String,
  },
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};
    const store = useThemeStore();

    const series = [
      {
        name: "Inflation",
        data: [
          1, 2, 1, 2, 4, 6, 4, 0, 2, 4, 2, 3, 1, 0, 2,
        ],
      },
    ];

    const themeMode = computed(() => {
      return store.mode;
    });

    onBeforeMount(() => {
      Object.assign(chart, chartOptions(props.chartHeight));
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions(props.chartHeight));

      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    return {
      chart,
      series,
      chartRef,
      refreshChart,
    };
  },
});

const chartOptions = (chartHeight: string = "auto"): ApexOptions => {
  return {
    chart: {
      fontFamily: "inherit",
      height: chartHeight,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    colors: ["#ffffff"],
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top", // top, center, bottom
        },
        columnWidth: "20%",
      },
    },
    dataLabels: {
      enabled: false,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#000000"],
      },
    },
    xaxis: {
      labels: {
        show: true,
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
      ],
      position: "bottom",
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      show: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
  };
};
</script>

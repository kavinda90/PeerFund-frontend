<template>
  <div :class="className" class="card card-flush">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <div class="card-title d-flex flex-column">
        <!--begin::Info-->
        <div class="d-flex align-items-center">
          <!--begin::Amount-->
          <span class="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{{ totalLoans }}</span>
          <!--end::Amount-->

        </div>
        <!--end::Info-->

        <!--begin::Subtitle-->
        <span class="text-gray-400 pt-1 fw-semibold fs-6"
        >Loan summary</span
        >
        <!--end::Subtitle-->
      </div>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Card body-->
    <div class="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
      <!--begin::Chart-->
      <div class="d-flex flex-center me-5 pt-2">
        <div
            id="kt_card_widget_17_chart"
            :data-kt-line="11"
            :data-kt-size="chartSize"
            :style="{
            minWidth: `${chartSize}px`,
            minHeight: `${chartSize}px`,
          }"
        ></div>
      </div>
      <!--end::Chart-->

      <!--begin::Labels-->
      <div class="d-flex flex-column content-justify-center flex-row-fluid">

        <!--begin::Label-->
        <div class="d-flex fw-semibold align-items-center">
          <!--begin::Bullet-->
          <div class="bullet w-8px h-3px rounded-2 bg-primary me-3"></div>
          <!--end::Bullet-->

          <!--begin::Label-->
          <div class="text-gray-500 flex-grow-1 me-4">Active loans</div>
          <!--end::Label-->

          <!--begin::Stats-->
          <div class="fw-bolder text-gray-700 text-xxl-end">{{ summary.active }}</div>
          <!--end::Stats-->
        </div>
        <!--end::Label-->

        <!--begin::Label-->
        <div class="d-flex fw-semibold align-items-center my-3">
          <!--begin::Bullet-->
          <div class="bullet w-8px h-3px rounded-2 bg-success me-3"></div>
          <!--end::Bullet-->

          <!--begin::Label-->
          <div class="text-gray-500 flex-grow-1 me-4">Approved loans</div>
          <!--end::Label-->

          <!--begin::Stats-->
          <div class="fw-bolder text-gray-700 text-xxl-end">{{ summary.approved }}</div>
          <!--end::Stats-->
        </div>
        <!--end::Label-->

        <!--begin::Label-->
        <div class="d-flex fw-semibold align-items-center">
          <!--begin::Bullet-->
          <div
              class="bullet w-8px h-3px rounded-2 me-3"
              style="background-color: #e4e6ef"
          ></div>
          <!--end::Bullet-->

          <!--begin::Label-->
          <div class="text-gray-500 flex-grow-1 me-4">Pending loans</div>
          <!--end::Label-->

          <!--begin::Stats-->
          <div class="fw-bolder text-gray-700 text-xxl-end">{{ summary.pending }}</div>
          <!--end::Stats-->
        </div>
        <!--end::Label-->
      </div>
      <!--end::Labels-->
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, onMounted} from "vue";
import {getCSSVariableValue} from "@/assets/ts/_utils";
import {LoanSummary} from "@/models/LoanSummary";

export default defineComponent({
  name: "LoanSummaryOld",
  components: {},
  props: {
    className: {type: String, required: false},
    summary: {type: LoanSummary, required: true},
  },
  setup(props, {expose}) {
    const totalLoans = Object.values(props.summary).reduce((a, b) => a + b, 0);

    const initChart = () => {
      expose();
      var el = document.getElementById("kt_card_widget_17_chart");

      if (!el) {
        return;
      }

      var options = {
        size: el.getAttribute("data-kt-size")
            ? parseInt(el.getAttribute("data-kt-size") as string)
            : 70,
        lineWidth: el.getAttribute("data-kt-line")
            ? parseInt(el.getAttribute("data-kt-line") as string)
            : 11,
        rotate: el.getAttribute("data-kt-rotate")
            ? parseInt(el.getAttribute("data-kt-rotate") as string)
            : 145,
        //percent:  el.getAttribute('data-kt-percent') ,
      };

      var canvas = document.createElement("canvas");
      var span = document.createElement("span");

      var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      canvas.width = canvas.height = options.size;

      el.appendChild(span);
      el.appendChild(canvas);

      ctx.translate(options.size / 2, options.size / 2); // change center
      ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

      //imd = ctx.getImageData(0, 0, 240, 240);
      var radius = (options.size - options.lineWidth) / 2;

      var drawCircle = function (
          color: string,
          lineWidth: number,
          percent: number
      ) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      };

      // Init
      drawCircle("#E4E6EF", options.lineWidth, 1);
      // This displays only active %, but approved % is necessary to visualise it correctly
      drawCircle(
          getCSSVariableValue("--bs-primary"),
          options.lineWidth,
          (props.summary.active + props.summary.approved) / totalLoans,
      );
      drawCircle(
          getCSSVariableValue("--bs-success"),
          options.lineWidth,
          props.summary.approved / totalLoans,
      );
    };

    onMounted(() => {
      initChart();
    });

    return {
      totalLoans,
      getAssetPath,
    };
  },
  data() {
    return {
      chartSize: 70,
    }
  }
});
</script>

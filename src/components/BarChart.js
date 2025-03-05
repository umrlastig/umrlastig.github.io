import * as React from "react";
import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>LASTIG Datasets</h2> */}
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Datasets",
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: true,
            },
            y: {
              display: true,
              type: "logarithmic",
            },
          },
          legendCallback: function (chart) {
            var text = [];
            text.push('<ul class="' + chart.id + '-legend">');
            for (var i = 0; i < chart.data.datasets.length; i++) {
              text.push(
                '<li><div class="legendValue"><span style="background-color:' +
                  chart.data.datasets[i].backgroundColor +
                  '">&nbsp;&nbsp;&nbsp;&nbsp;</span>',
              );

              if (chart.data.datasets[i].label) {
                text.push(
                  '<span class="label">' +
                    chart.data.datasets[i].label +
                    "</span>",
                );
              }

              text.push('</div></li><div class="clear"></div>');
            }

            text.push("</ul>");

            return text.join("");
          },
        }}
      />
    </div>
  );
};
export default BarChart;

// Statistics chart js start
var options = {
  series: [{
    name: 'Products sold',
    data: [15, 11, 16, 18, 15, 20]
  }, {
    name: 'Total views',
    data: [19, 8, 17, 12, 17, 10]
  }],
  chart: {
    height: 258,
    type: 'area',
    fontFamily: 'Source Sans Pro, sans-serif'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  colors: ['#B5B3FB','#80E2FF'],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [10, 90, 100]
    }
  },  yaxis: {
    labels: {
      formatter: function (value) {
        return "$" + value +"k";
      }
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  },
};
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
// Statistics chart js end

// Sales Distribution chart start
Chart.pluginService.register({
  beforeDraw: function (chart) {
    var width = chart.chart.width,
    height = chart.chart.height,
    ctx = chart.chart.ctx;
    ctx.restore();
    var fontSize = (height / 130).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";
    var text = chart.config.options.elements.center.text,
    textX = Math.round((width - ctx.measureText(text).width) / 2),
    textY = height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  }
});
var chartData = [{"Sales": 4260, "State": "France"},{"Sales": 3970, "State": "Italy"},{"Sales": 4260, "State": "Japan"},{"Sales": 3970, "State": "Canada"}]
var visitorData = [],
sum = 0,
visitData = [];
for (var i = 0; i < chartData.length; i++) {
  visitorData.push(chartData[i]['Sales'])
  visitData.push(chartData[i]['State'])
  sum += chartData[i]['Sales'];
}
var textInside = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
var myChart = new Chart(document.getElementById('mychart'), {
  type: 'doughnut',
  animation:{
    animateScale:true
  },
  data: {
    labels: visitData,
    datasets: [{
      label: 'Sales',
      data: visitorData,
      backgroundColor: [
      "#80E2FF",
      "#F49FA8",
      "#FFDF94",
      "#B5B3FB"
      ]
    }]
  },
  options: {
    elements: {
      center: {
        text: textInside
      }
    },
    responsive: true,
    legend: false,
    legendCallback: function(chart) {
      var legendHtml = [];
      legendHtml.push('<ul class="sales_label_list text-center p-0 m-0">');
      var item = chart.data.datasets[0];
      for (var i=0; i < item.data.length; i++) {
        legendHtml.push('<li>');
        legendHtml.push('<span class="chart-legend" style="background-color:' + item.backgroundColor[i] +'"></span><span class="chart-legend-label-text"><span class="city-name">'+chart.data.labels[i] +'</span><span class="sales-count">' + item.data[i] + ' Sales </span>');
        legendHtml.push('</li>');
      }
      legendHtml.push('</ul>');
      return legendHtml.join("");
    },
    tooltips: {
     enabled: true,
     mode: 'label',
     callbacks: {
      label: function(tooltipItem, data) {
        var indice = tooltipItem.index;
        return data.datasets[0].data[indice] + " Sales in " + data.labels[indice];
      }
    }
  },
}
});
document.getElementById('my-legend-con').innerHTML = (myChart.generateLegend());
console.log(document.getElementById('my-legend-con'));
// Sales Distribution chart end

// sidebar collapse js start
function SidebarEnableDisable() {
  var sidebarenable = document.getElementById("body");
  sidebarenable.classList.toggle("sidebar-disable");
}
// sidebar collapse js end

//mobile page load js start
if ( window.innerWidth < 991 ) {
  var sidebarenable = document.getElementById("body");
  sidebarenable.classList.toggle("sidebar-disable");
  var resizeEvent = window.document.createEvent('UIEvents'); 
  resizeEvent.initUIEvent('resize', true, false, window, 0); 
  window.dispatchEvent(resizeEvent);
}
//mobile page load js end

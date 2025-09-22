import ReactECharts from 'echarts-for-react';

export default function LineChart({ data }) {
  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: data.map((p) => p.date) },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'line',
        data: data.map((p) => p.value),
        smooth: true,
      },
    ],
    grid: { left: 48, right: 16, top: 24, bottom: 32 },
  };
  return <ReactECharts option={option} style={{ height: 280, width: '100%' }} />;
}
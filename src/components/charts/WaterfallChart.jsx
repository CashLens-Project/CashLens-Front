
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { fmtBRL } from '../../utils/format';

const WaterfallChart = ({ data }) => {
  const option = {
    title: {
      text: 'Waterfall de Lucro',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        let tar = params[1];
        return tar.name + ': ' + fmtBRL(tar.value);
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function (value) {
          return fmtBRL(value);
        },
      },
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent',
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
          },
        },
        data: data.map(item => item.value >= 0 ? item.base : (item.base + item.value)),
      },
      {
        name: 'Lucro',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'inside',
          formatter: function (params) {
            return fmtBRL(params.value);
          },
          color: '#fff',
        },
        itemStyle: {
          color: (params) => {
            if (params.name === 'Receita Bruta' || params.name === 'Receita Líquida' || params.name === 'Margem Bruta' || params.name === 'Resultado') {
              return '#4CAF50'; // Verde para resultados positivos
            } else if (params.value < 0) {
              return '#F44336'; // Vermelho para valores negativos
            } else {
              return '#2196F3'; // Azul para outros valores
            }
          },
        },
        data: data.map(item => item.value),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
};

export default WaterfallChart;


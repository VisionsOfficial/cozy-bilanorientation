import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import Box from '@material-ui/core/Box';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-labels';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

// ICON
import iconHead from '../../../assets/icons/icone-tete.svg';
import iconSpeed from '../../../assets/icons/icon-rapide.svg'; // color = #1C2057
import iconStudious from '../../../assets/icons/icon-studieux.svg'; // color = #21BBEE
import iconCultivated from '../../../assets/icons/icon-cultive.svg'; // color = #16F7B4
import iconConcentrate from '../../../assets/icons/icon-CONCENTRE.svg'; // color = #73FAD2
import iconDynamic from '../../../assets/icons/icone-DYNAMIQUE.svg'; // color = #455065
// import iconStar from '../../../assets/icons/icon-star.svg';

const DonutsChart = ({ badges }) => {
  const valueDonuts = [];
  const colorDonuts = [];
  const keyDonuts = [];

  const badgeProperties = name => {
    let color = '';
    let icon = '';
    switch (name) {
      case 'RAPIDE':
        color = '#1C2057';
        icon = iconSpeed;
        break;
      case 'STUDIEUX':
        color = '#21BBEE';
        icon = iconStudious;
        break;
      case 'RESPECTUEUX':
        color = '#16F7B4';
        icon = iconCultivated;
        break;
      case 'CONCENTRE':
        color = '#73FAD2';
        icon = iconConcentrate;
        break;
      case 'DYNAMIQUE':
        color = '#455065';
        icon = iconDynamic;
        break;
      case 'ADAPTABLE':
        color = '#97D2EC';
        icon = iconHead;
        break;
      case 'OPTIMISTE':
        color = 'green';
        icon = iconHead;
        break;

      default:
        color = '#455065';
        icon = iconHead;
        break;
    }
    return { color, icon };
  };

  const badgeValue = () => {
    Object.entries(badges).map(
      ([key, value]) => (
        valueDonuts.push(value),
        colorDonuts.push(badgeProperties(key).color),
        keyDonuts.push(` ${key} `)
      )
    );
  };

  badgeValue();

  var options = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;

          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let percentage = value + '%';
            return percentage;
          } else {
            return percentage;
          }
        },
        color: 'white'
      },
      labels: {
        render: 'image',
        images: [
          {
            src: 'https://i.stack.imgur.com/9EMtU.png',
            width: 20,
            height: 20
          }
        ]
      }
    }
  };

  return (
    <div className='talentPersoContainer'>
      <Box className='donutsChartContainer'>
        <Icon icon={iconHead} className='iconHead' />
        <Doughnut
          data={{
            labels: keyDonuts,
            datasets: [
              {
                data: valueDonuts,
                backgroundColor: colorDonuts,
                icons: ['&#9728;']
              }
            ]
          }}
          options={options}
          redraw={true}
        />
      </Box>
      <div className='tabBadgePersoContainer'>
        {Object.entries(badges).map(([key, value], index) => (
          <div key={index} className='tabBadgePerso'>
            <div
              className='iconTabPerso'
              style={{ background: badgeProperties(key).color }}
            >
              <Icon icon={badgeProperties(key).icon} />
            </div>
            <div className='iconInformation'>
              <p>
                {key}: <span>{value}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutsChart;

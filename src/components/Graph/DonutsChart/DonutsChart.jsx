import React from 'react'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Box from '@material-ui/core/Box'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Legend, Title, SubTitle } from 'chart.js'
Chart.register(ArcElement, Legend, Title, SubTitle)

// ICON
import iconHead from '../../../assets/icons/icone-tete.svg'
import iconSpeed from '../../../assets/icons/icon-rapide.svg' // color = #1C2057
import iconStudious from '../../../assets/icons/icon-studieux.svg' // color = #21BBEE
import iconCultivated from '../../../assets/icons/icon-cultive.svg' // color = #16F7B4
import iconConcentrate from '../../../assets/icons/icon-CONCENTRE.svg' // color = #73FAD2
import iconDynamic from '../../../assets/icons/icone-DYNAMIQUE.svg' // color = #455065

const DonutsChart = ({ badges }) => {
  const valueDonuts = []
  const colorDonuts = []
  const keyDonuts = []

  const badgeProperties = name => {
    let color = ''
    let icon = ''
    switch (name) {
      case 'RAPIDE':
        color = '#1C2057'
        icon = iconSpeed
        break
      case 'STUDIEUX':
        color = '#21BBEE'
        icon = iconStudious
        break
      case 'RESPECTUEUX':
        color = '#16F7B4'
        icon = iconCultivated
        break
      case 'CONCENTRE':
        color = '#73FAD2'
        icon = iconConcentrate
        break
      case 'DYNAMIQUE':
        color = '#455065'
        icon = iconDynamic
        break
      case 'ADAPTABLE':
        color = 'red'
        icon = iconCultivated
        break
      case 'OPTIMISTE':
        color = 'green'
        icon = iconCultivated
        break

      default:
        color = ''
        break
    }
    return { color, icon }
  }

  const badgeValue = () => {
    Object.entries(badges).map(
      ([key, value]) => (
        valueDonuts.push(value),
        colorDonuts.push(badgeProperties(key).color),
        keyDonuts.push(key)
      )
    )
  }

  badgeValue()

  return (
    <div className="talentPersoContainer">
      <Box className="donutsChartContainer">
        <Icon icon={iconHead} className="iconHead" />
        <Doughnut
          data={{
            datasets: [
              {
                label: keyDonuts,
                data: valueDonuts,
                backgroundColor: colorDonuts
              }
            ],
            options: {
              responsive: true,
              plugins: {
                datalabels: {
                  formatter: value => {
                    return value + '%'
                  }
                }
              }
            }
          }}
        />
      </Box>
      <div className="tabBadgePersoContainer">
        {Object.entries(badges).map(([key, value], index) => (
          <div key={index} className="tabBadgePerso">
            <div
              className="iconTabPerso"
              style={{ background: badgeProperties(key).color }}
            >
              <Icon icon={badgeProperties(key).icon} />
            </div>
            <div className="iconInformation">
              <p>
                {key}: <span>{value}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DonutsChart

import React from 'react'

const RowGraph = ({ percentage, name }) => {
  return (
    <div className="rowGraph">
      <div className="cel"></div>
      <div className="cel"></div>
      <div className="cel"></div>
      <div className="cel"></div>
      <div className="cel"></div>
      <div className="meterGraph" style={{ width: percentage + '%' }}></div>
      <p className="legendGraph">{name}</p>
    </div>
  )
}

export default RowGraph

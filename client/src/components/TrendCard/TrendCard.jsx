import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData.jsx'
const TrendCard = () => {
  return (
    <div className="TrendCard">
        <div className="TrendTitle">Hot Searches</div>
        {TrendData.map((trend)=> {
          return (
            <div className="trend" key={trend.name}>
              <span>#{trend.name}</span>
              <span>{trend.shares}k Share</span>
            </div>
          )
        })}
    </div>
  )
}

export default TrendCard
import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
  )

const StatisticLine = ({ value, text}) => (
  <div>
    <div>{text} {value} </div>
  </div>
)

const Statistics = (props) => {
  if (props.clicks.allClicks === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback has been given yet!</p>   
      </div>
    )
  }
  const avrg = props.clicks.average / props.clicks.allClicks
  const posPercentage = props.clicks.good / props.clicks.allClicks * 100
  return (
    <table>
      <tbody>
        <tr>  
          <th style={{fontSize:"32px", textAlign:"left"}}> <p></p> Statistics </th>
        </tr>    
        <tr>        
          <td><StatisticLine value={props.clicks.good} text={"Good feedback:"} /></td>
        </tr>
        <tr>
          <td><StatisticLine value={props.clicks.neutral} text={"Neutral feedback:"} /></td>
        </tr>
        <tr>
          <td><StatisticLine value={props.clicks.bad} text={"Bad feedback:"} /></td>
        </tr>
        <tr>
          <td><StatisticLine value={props.clicks.allClicks} text={"Total feedback:"} /></td>
        </tr>
        <tr>
          <td><StatisticLine value={avrg} text={"Average feedback:"} /></td>
        </tr>
        <tr>
          <td><StatisticLine value={posPercentage+"%"} text={"Positive percentage of feedback:"} /></td>
        </tr>
      </tbody>
    </table>     
  )
}

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, allClicks: 0, average: 0
  })

  const handleGoodClick = () => {
    setClicks({
      ...clicks,
      good: clicks.good + 1,
      allClicks: clicks.allClicks + 1,
      average: clicks.average + 1
    })
  }

  const handleNeutralClick = () => {
    setClicks({
      ...clicks,
      neutral: clicks.neutral + 1,
      allClicks: clicks.allClicks + 1,
      average: clicks.average + 0
    })
  }

  const handleBadClick = () => {
    setClicks({
      ...clicks,
      bad: clicks.bad + 1,
      allClicks: clicks.allClicks + 1,
      average: clicks.average - 1
    })
  }
 
  return (
    <div>
      <h1> Give feedback: </h1>
      <Button handleClick={handleGoodClick} text="Good :)" />
      <Button handleClick={handleNeutralClick} text="Neutral :I" />
      <Button handleClick={handleBadClick} text="Bad :(" />
      <Statistics clicks={clicks} />
    </div>
  )
}

export default App
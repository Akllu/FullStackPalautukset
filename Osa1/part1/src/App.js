import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content pt1={part1} exrc1={exercises1} pt2={part2} exrc2={exercises2} pt3={part3} exrc3={exercises3}/>
      <Total exrc1={exercises1} exrc2={exercises2} exrc3={exercises3}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        <Part pt={props.pt1} exrc={props.exrc1}/>    
      </p>
      <p>
        <Part pt={props.pt2} exrc={props.exrc2}/>
      </p>
      <p>
        <Part pt={props.pt3} exrc={props.exrc3}/>
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Total exercises: {props.exrc1 + props.exrc2 + props.exrc3}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.pt}, exercises: {props.exrc}
      </p>
    </div>
  )
}

export default App
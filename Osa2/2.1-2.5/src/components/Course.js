import React from 'react'

const Total = ({ parts }) => {
  const totalExrc = parts.map(part => part.exercises).reduce((sum, currentValue) => sum + currentValue)
  return (
    <b>
      Total exercises: {totalExrc}
    </b>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exrc}
    </p>
  )
}

const Content = ({ parts }) => {
  const showParts = () => parts.map(part =>
    <Part key={part.id} name={part.name} exrc={part.exercises} />)
    return (
      <div>
        {showParts()}
      </div>
    )
}

const Header = ({ header }) => {
  return (
  <h2> {header} </h2>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content  parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
import React from 'react'

const Courses = ({course}) => {
  return (
    <>
    {course.map( course => <Header key={course.id} course={course} />)}
    </>
  )
}

const Header = ({course}) => {
    console.log(course)
    return (
      <> 
      <h1>{course.name}</h1>
      <Content key={course.id} parts={course.parts} />
      </>
    )
}

const Content = ({parts}) => {
  console.log(parts)
  const sum = parts.reduce( (sum,order) => {return (sum + order.exercises) },0)
    return  (
    <>
    {parts.map( p => <Part key={p.id} name={p.name} exercises={p.exercises}/>)}
    <p>total of {sum} exercises</p>
    </>
  )
}

const Part = (props) => {
    return(
      <p>
      {props.name}{props.exercises}
      </p>
  
    )
}

export default Courses
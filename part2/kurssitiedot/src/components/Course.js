import React from 'react'

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ course }) => (
  <div>
    {course.parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ course }) => (
  <p><b>
    total of {course.parts.reduce(((i, j) => i + j.exercises), 0)} excercises
  </b></p>
)

export default Course
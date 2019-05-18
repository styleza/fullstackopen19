import React from 'react'

const Header = props =>
    <h1>{props.course}</h1>

const Total = props => {
    const total = props.parts.reduce((a,i) => a+i.exercises,0)

    return <p>yhteensä {total} tehtävää</p>
}


const Part = props =>
    <p>{props.part.name} {props.part.exercises}</p>

const Content = props => (
    <div>
        {props.parts.map(part => <Part part={part} key={part.id} />)}
    </div>
)

const Course = props => (
    <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </div>
)

export default Course;
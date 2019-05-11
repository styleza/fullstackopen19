import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => ( <h1>{props.course}</h1> )

const Part = (props) => ( <p>{props.name} {props.exercises}</p> )

const Content = (props) => {
    return (
        props.courses.map((course) => ( <Part name={course.name} exercises={course.exercises} /> ))
    )
}

const Footer = (props) => ( <p>Yhteensä {props.sum} tehtävää</p> )

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course.name} />
            <Content courses={course.parts} />
            <Footer sum={course.parts.reduce((a,i) => (a+i.exercises),0)} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
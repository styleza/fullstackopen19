import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Increment = (callback, counter) => {
    callback(counter+1)
}

const Button = (props) => {
    return (
        <button
            onClick={() => Increment(props.button.callback, props.button.counter)}>
        {props.button.name}</button>
    )
}

const Buttonset = (props) => {
    return (
        props.buttons.map((button, i) => ( <Button key={i} button={button} /> ) )
    )
}

const Statistic = (props) => {
    return (
        <tr><td>{props.name}</td><td>{props.value} {props.postfix}</td></tr>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const buttons = [
        {name: "Hyvä", counter: good, callback: setGood},
        {name: "Neutraali", counter: neutral, callback: setNeutral},
        {name: "Huono", counter: bad, callback: setBad}
    ]

    return (
        <div>
            <h1>Anna palautetta</h1>
            <Buttonset buttons={buttons} />
            <h1>statistiikka</h1>
            {good + neutral + bad > 0 ? (<table><tbody>
                <Statistic name="hyvä" value={good} />
                <Statistic name="neutraali" value={neutral} />
                <Statistic name="huono" value={bad} />
                <Statistic name="keskiarvo" value={((good - bad) / (good + neutral + bad))} />
                <Statistic name="positiivista" value={Math.round((good / (good + neutral + bad))*100)} postfix="%" />
                </tbody></table>) : ( <p>Ei yhtään palautetta annettu</p> )}
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
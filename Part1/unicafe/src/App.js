import React, { useState } from 'react'

	const Button = (props) => (
  		<button onClick={props.handleClick}>{props.text}</button>
	)

	const Statistics = ({good, neutral, bad}) => {
		const all = good + bad + neutral
		if (all === 0 ) {
			return (
      			<div>
       				No feedback given
      			</div>
    		)
		}
		return (
			<div>
				<StatisticLine text="good" value ={good} percent=" "/>
				<StatisticLine text="neutral" value ={neutral} percent=" " />
		  		<StatisticLine text="bad" value ={bad} percent=" " />
				<StatisticLine text="all" value ={all} percent=" "/>
				<StatisticLine text="average" value ={(good - bad)/all} percent=" "/>
				<StatisticLine text="positive" value ={good * 100/all} percent="%" />
	  		</div>
		)
	}	

	const StatisticLine = props => {
		return(
			<table>
				<tbody>
						<tr>
							<td width='60'>{props.text}</td>
							<td>{props.value}{props.percent}</td>
						</tr>
				</tbody>
			</table>
		)
	}
	
	
	
	
	const App = () => {
		const [good, setGood] = useState(0)
		const [neutral, setNeutral] = useState(0)
		const [bad, setBad] = useState(0)


 
  		return (
    		<div>
      			<h1>Give Feedback</h1>
				<Button handleClick={() => setGood(good + 1)} text="Good" />
				<Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
				<Button handleClick={() => setBad(bad + 1)} text="Bad" />
				<h2>Statistics</h2>
				<Statistics good={good} neutral={neutral} bad={bad} />
    		</div>
  		)
	}

export default App
import React, { useState } from "react";

class PomodoroClock extends React.Component {
	state = {
		session: 25,
		break: 5,
		timerStarted: false,
		displayMinutes: 0,
		displaySeconds: 0,
		timerType: 'session',
	}
	intervalId = 0;

	componentDidMount() {
		this.setState(() => ({ displayMinutes: this.state.session }))
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}

	handleIncrement = (stateName) => {
		if (!this.state.timerStarted && this.state[stateName] < 60) {
			const incrementedValue = this.state[stateName] + 1;
			const newState = {};
			if (stateName === 'session') {
				newState.session = incrementedValue;
				newState.displayMinutes = incrementedValue;
			} else {
				newState.break = incrementedValue;
			}
			this.setState(() => (newState));
		}
	}

	handleDecrement = (stateName) => {
		if (!this.state.timerStarted && this.state[stateName] < 60) {
			if (this.state[stateName] > 1) {
				const decrementedValue = this.state[stateName] - 1;
				const newState = {};
			if (stateName === 'session') {
				newState.session = decrementedValue;
				newState.displayMinutes = decrementedValue;
			} else {
				newState.break = decrementedValue
			}
			this.setState(() => ({ ...newState }));
			}
		}
	}

	handleReset = () => {
		const beep = document.getElementById('beep');
		beep.pause();
		beep.currentTime = 0;
		clearInterval(this.intervalId);
		this.setState(() => ({ 
			session: 25,
			break: 5,
			timerStarted: false,
			displayMinutes: 25,
			displaySeconds: 0,
			timerType: 'session' 
		}));
	}

	startTimer = () => {
		if (!this.state.timerStarted) {
			this.setState(() => ({ timerStarted: true }));
		}
		this.intervalId = setInterval(() => {
			if (this.state.displaySeconds === 0 && this.state.displayMinutes > 0) {
				const displayMinutes = this.state.displayMinutes - 1;
				this.setState(() => ({ displayMinutes, displaySeconds: 59 }))
			} else if (this.state.displaySeconds === 0 && this.state.displayMinutes === 0) {
				const timerType = this.state.timerType === 'session' ? 'break' : 'session';
				const displayMinutes = this.state[timerType];
				document.getElementById('beep').play().catch(() => { console.log('There is an error with audio') })
				clearInterval(this.intervalId);
				this.setState(() => ({ displayMinutes, timerType}));
				this.startTimer();
			} else {
				const displaySeconds = this.state.displaySeconds - 1;
				this.setState(() => ({ displaySeconds }));
			}
		}, 1000)
	}

	pauseTimer = () => {
		this.setState(() => ({ timerStarted: false }));
		clearInterval(this.intervalId);
	}

	render() {
		const displayMinutes = (this.state.displayMinutes < 10) ? `0${ this.state.displayMinutes }` : `${ this.state.displayMinutes }`;
		const displaySeconds = (this.state.displaySeconds < 10) ? `0${ this.state.displaySeconds }` : `${ this.state.displaySeconds }`;
		let displayColor = {}

		if (this.state.displayMinutes === 0) {
			displayColor = { color: 'red' }
		}

		return (
			<div id="pomodoro-clock">
				<div id="timer-container">
					<div id="break-label">
						<p className="label">break</p>
						<div>
							<p id="break-decrement" onClick={ () => this.handleDecrement('break') }>-</p>
							<p id="break-length">{ this.state.break }</p>
							<p id="break-increment" onClick={ () => this.handleIncrement('break') }>+</p>
						</div>
					</div>
					<div id="timer">
						<p id="timer-label" className="label">{ this.state.timerType }</p>
						<div id="time-left" style={ displayColor }>
							<p>{ displayMinutes }:{ displaySeconds }</p>
						</div>
					</div>
					<div id="session-label">
						<p className="label">session</p>
						<div>
							<p id="session-decrement" onClick={ () => this.handleDecrement('session') }>-</p>
							<p id="session-length">{ this.state.session }</p>
							<p id="session-increment" onClick={ () => this.handleIncrement('session') }>+</p>
						</div>
					</div>
				</div>
				<div className="controller">
					<div id="start_stop" onClick={ this.state.timerStarted ? this.pauseTimer : this.startTimer }>
						{ this.state.timerStarted ? 'Pause' : (this.state.displayMinutes === this.state.session) ? 'Start' : 'Resume' }
					</div>
					<div id="reset" onClick={ this.handleReset }>Reset</div>
				</div>
				<audio src="http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav" id="beep"></audio>
			</div>
		)
	}
}

const Wrapper = () => (
	<div id="wrapper">
		<PomodoroClock />
	</div>
)

export default Wrapper;
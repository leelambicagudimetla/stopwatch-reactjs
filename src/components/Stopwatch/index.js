// Write your code here
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    running: 0,
    times: 0,
    isStart: false,
    isStop: true,
  }

  componentWillUnmount = () => {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  setTimerCount = () => {
    this.setState(prevState => {
      const {running} = prevState
      return {running: running + 1}
    })
  }

  onResetButton = () => {
    this.setState({running: 0, times: 0, isStart: false})
    this.clearTimer()
  }

  onStartButton = () => {
    this.setState(prevState => ({isStart: !prevState.isStart}))
    const {isStart} = this.state
    console.log(isStart)
    if (!isStart) {
      this.intervalId = setInterval(() => {
        this.setTimerCount()
      }, 1000)
    }
  }

  onStoptButton = () => {
    this.setState(prevState => ({isStop: !prevState.isStop}))
    const {isStop} = this.state
    console.log(isStop)
    if (isStop) {
      this.clearTimer()
      this.setState({isStart: false})
    }
  }

  convertTimeToTimerFormat = () => {
    const {times, running} = this.state
    const timeInSeconds = times * 60 + running
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const minutesInStringFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsInStringFormat = seconds > 9 ? seconds : `0${seconds}`
    return `${minutesInStringFormat}:${secondsInStringFormat}`
  }

  render() {
    return (
      <div className="white-div">
        <h1 className="stop-heading">Stopwatch</h1>
        <div className="stop-div">
          <div className="timer-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png "
              alt="stopwatch"
            />
            <h1 className="timer">Timer</h1>
          </div>
          <h1 className="time-run">{this.convertTimeToTimerFormat()}</h1>
          <div className="buttons-list">
            <button
              onClick={this.onStartButton}
              className="greens"
              type="button"
            >
              Start
            </button>
            <button onClick={this.onStoptButton} className="reds" type="button">
              Stop
            </button>
            <button
              onClick={this.onResetButton}
              className="yellows"
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch

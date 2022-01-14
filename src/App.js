// App.js
import s from './App.css';
// import { Section } from './Components/Section';
import { Component } from 'react';
import FeedbackOptions from './Components/FeedbackOptions';
import Statistics from './Components/Statistics';
import Notification from './Components/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  setValue = e => {
    this.setState(state => ({
      [e]: state[e] + 1,
    }));
  };

  countTotalFeedback = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };

  countPositiveFeedbackPercentage = () => {
    return this.countTotalFeedback() > 0
      ? Math.round((this.state.good * 1000) / this.countTotalFeedback()) / 10
      : 0;
  };

  render() {
    return (
      <div className={s.feedBack}>
        <h2> Please leave feedback </h2>

        <FeedbackOptions options={Object.keys(this.state)} onLeaveFeedback={this.setValue} />
        {this.countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={this.state.good}
            neutral={this.state.neutral}
            bad={this.state.bad}
            total={this.countTotalFeedback()}
            positivePercentage={this.countPositiveFeedbackPercentage()}
          />
        )}
      </div>
    );
  }
}

export default App;

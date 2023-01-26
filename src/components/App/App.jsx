import { useState } from 'react';
import FeedbackOptions from 'components/FeedbackOptions';
import Statistics from 'components/Statistics';
import Section from 'components/Section';
import Notification from 'components/Notification';
import css from '../App/App.module.css';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // const [state, setState] = useState({
  //   good: 0,
  //   neutral: 0,
  //   bad: 0,
  // });

  // const { good, neutral, bad } = state;

  const feedback = { good, neutral, bad };

  const addFeedback = options => {
    // setState(state => ({ ...state, [options]: state[options] + 1 }));
    switch (options) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () =>
    Object.values(feedback).reduce((value, acc) => acc + value, 0);

  const countPositiveFeedbackPercentage = () =>
    Math.round((good / countTotalFeedback()) * 100) || 0;

  return (
    <div className={css.card}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          // options={Object.keys(state)}
          options={Object.keys(feedback)}
          onLeaveFeedback={addFeedback}
        />
      </Section>

      {countTotalFeedback() ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
}

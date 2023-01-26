import { useState } from 'react';
import FeedbackOptions from 'components/FeedbackOptions';
import Statistics from 'components/Statistics';
import Section from 'components/Section';
import Notification from 'components/Notification';
import css from '../App/App.module.css';

export default function App() {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const { good, neutral, bad } = state;

  const addFeedback = options =>
    setState(s => ({ ...state, [options]: state[options] + 1 }));

  const countTotalFeedback = () =>
    Object.values(state).reduce((value, acc) => acc + value, 0);

  const countPositiveFeedbackPercentage = () =>
    Math.round((good / countTotalFeedback()) * 100) || 0;

  return (
    <div className={css.card}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(state)}
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

# Anecdote Web App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

it is done alongside excercises in Fullstackopen course part 1

# Details

- Separated Components into sections:

  - Anecdote: display title, 1 selected anecdote, vote count
  - Buttons: take a name and handleClick function

- 3 state hooks were used:

  - [selected, setSelected]: track randomly selected anecdote index from array
  - [scores, setScores]: track all vote counts and change them using Object and indices to track scores.
  - [max, setMax]: track the anecdote index with the most vote and its index. max is an array with [maxValue, maxIndex]

- Structure:
  - Anecdote of the day: random display from anecdotes array
  - Buttons: upVote and nextAnecdote
  - Anecdote with most votes: show anecdote with most votes and its vote count

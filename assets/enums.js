module.exports = {
  playerClassifications: [
    { id: 0, value: 'bc1', text: 'BC1' },
    { id: 1, value: 'bc2', text: 'BC2' },
    { id: 2, value: 'bc3', text: 'BC3' },
    { id: 3, value: 'bc4', text: 'BC4' }
  ],

  tournamentTypes: [
    { value: 1, text: 'World Championships' },
    { value: 2, text: 'Regional Championships' },
    { value: 3, text: 'World Open' },
    { value: 4, text: 'Regional Open' },
    { value: 5, text: 'Paralympic Games' }
  ],

  competitionTypes: ['Individual', 'Pair', 'Team'],

  divisions: {
    individual: [
      { value: 1, text: 'BC1' },
      { value: 2, text: 'BC2' },
      { value: 3, text: 'BC3' },
      { value: 4, text: 'BC4' }
    ],

    pair: [
      { value: 1, text: 'BC3' },
      { value: 2, text: 'BC4' }
    ],

    team: [
      { value: 1, text: 'BC1/BC2' }
    ]
  },

  stageTypes: ['Pool', 'Elimination'],

  stageIndexes: {
    pool: [
      { value: 1, text: '1st match' },
      { value: 2, text: '2nd match' },
      { value: 3, text: '3rd match' },
      { value: 4, text: '4th match' },
      { value: 5, text: '5th match' }
    ],

    elimination: [
      { value: 1, text: '1/8 Final' },
      { value: 2, text: '1/4 Final' },
      { value: 3, text: '1/2 Final' },
      { value: 4, text: 'Bronze Final' },
      { value: 5, text: 'Final' }
    ]
  },

  scoredBallTypes: [
    { value: 1, text: 'First ball' },
    { value: 2, text: 'Placement' },
    { value: 3, text: 'Push on' },
    { value: 4, text: 'Push off' },
    { value: 5, text: 'Smash' },
    { value: 6, text: 'Ricochet' },
    { value: 7, text: 'Bounce over' },
    { value: 8, text: 'Roll on top' },
    { value: 9, text: 'Roll up and over' },
    { value: 10, text: 'Lob shot' }
  ],

  deadBallTypes: [
    { value: 1, text: 'Violation' },
    { value: 2, text: 'Time expiring' },
    { value: 3, text: 'Balls Not Thrown' }
  ],

  competitionBoxes: {
    individual: [{ id: 3, teamColor: 'red' }, { id: 4, teamColor: 'blue' }],
    pair: [{ id: 2, teamColor: 'red' }, { id: 3, teamColor: 'blue' }, { id: 4, teamColor: 'red' }, { id: 5, teamColor: 'blue' }],
    team: [{ id: 1, teamColor: 'red' }, { id: 2, teamColor: 'blue' }, { id: 3, teamColor: 'red' }, { id: 4, teamColor: 'blue' }, { id: 5, teamColor: 'red' }, { id: 6, teamColor: 'blue' }]
  }
}

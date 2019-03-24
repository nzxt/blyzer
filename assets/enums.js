module.exports = {
  tournamentTypes: [
    { value: 1, name: 'World Championships' },
    { value: 2, name: 'Regional Championships' },
    { value: 3, name: 'World Open' },
    { value: 4, name: 'Regional Open' },
    { value: 5, name: 'Paralympic Games' }
  ],

  competitionTypes: ['Individual', 'Pair', 'Team'],

  divisions: {
    individual: [
      { value: 1, name: 'BC1' },
      { value: 2, name: 'BC2' },
      { value: 3, name: 'BC3' },
      { value: 4, name: 'BC4' }
    ],

    pair: [
      { value: 1, name: 'BC3' },
      { value: 2, name: 'BC4' }
    ],

    team: [
      { value: 1, name: 'BC1/BC2' }
    ]
  },

  stageTypes: ['Pool', 'Elimination'],

  stageIndexes: {
    pool: [
      { value: 1, name: '1st match' },
      { value: 2, name: '2nd match' },
      { value: 3, name: '3rd match' },
      { value: 4, name: '4th match' },
      { value: 5, name: '5th match' }
    ],

    elimination: [
      { value: 1, name: '1/8 Final' },
      { value: 2, name: '1/4 Final' },
      { value: 3, name: '1/2 Final' },
      { value: 4, name: 'Bronze Final' },
      { value: 5, name: 'Final' }
    ]
  },

  scoredBallTypes: [
    { value: 1, name: 'First ball' },
    { value: 2, name: 'Placement' },
    { value: 3, name: 'Push on' },
    { value: 4, name: 'Push off' },
    { value: 5, name: 'Smash' },
    { value: 6, name: 'Ricochet' },
    { value: 7, name: 'Bounce over' },
    { value: 8, name: 'Roll on top' },
    { value: 9, name: 'Roll up and over' },
    { value: 10, name: 'Lob shot' }
  ],

  deadBallTypes: [
    { value: 1, name: 'Violation' },
    { value: 2, name: 'Time expiring' },
    { value: 3, name: 'Balls Not Thrown' }
  ],

  competitionBoxes: {
    individual: [{ id: 3, teamColor: 'red' }, { id: 4, teamColor: 'blue' }],
    pair: [{ id: 2, teamColor: 'red' }, { id: 3, teamColor: 'blue' }, { id: 4, teamColor: 'red' }, { id: 5, teamColor: 'blue' }],
    team: [{ id: 1, teamColor: 'red' }, { id: 2, teamColor: 'blue' }, { id: 3, teamColor: 'red' }, { id: 4, teamColor: 'blue' }, { id: 5, teamColor: 'red' }, { id: 6, teamColor: 'blue' }]
  }
}

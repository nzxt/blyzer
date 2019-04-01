module.exports = {
  matchTypes: [
    { id: 0, value: 'none', text: 'None' },
    { id: 1, value: 'tournament', text: 'Tournament' },
    { id: 2, value: 'training', text: 'Training' }
  ],

  playerClassifications: [
    { id: 0, value: 'bc1', text: 'BC1' },
    { id: 1, value: 'bc2', text: 'BC2' },
    { id: 2, value: 'bc3', text: 'BC3' },
    { id: 3, value: 'bc4', text: 'BC4' }
  ],

  competitionTypes: ['individual', 'pair', 'team'],

  competitionEvents: {
    default: [
      { id: 0, value: 'none', text: 'None' }
    ],
    individual: [
      { id: 1, value: 'bc1', text: 'BC1' },
      { id: 2, value: 'bc2', text: 'BC2' },
      { id: 3, value: 'bc3', text: 'BC3' },
      { id: 4, value: 'bc4', text: 'BC4' }
    ],
    pair: [
      { id: 5, value: 'pairBc3', text: 'BC3' },
      { id: 6, value: 'pairBc4', text: 'BC4' }
    ],
    team: [
      { id: 7, value: 'teamBc1Bc2', text: 'BC1/BC2' }
    ]
  },

  stageTypes: ['pool', 'elimination'],

  stageIndexes: {
    pool: [
      { id: 0, value: 'none', text: 'None' },
      { id: 1, value: 'poolA', text: '1st match' },
      { id: 2, value: 'poolB', text: '2nd match' },
      { id: 3, value: 'poolC', text: '3rd match' },
      { id: 4, value: 'poolD', text: '4th match' },
      { id: 5, value: 'poolE', text: '5th match' },
      { id: 6, value: 'poolF', text: '6th match' },
      { id: 7, value: 'poolG', text: '7th match' }
    ],

    elimination: [
      { id: 0, value: 'none', text: 'None' },
      { id: 1, value: 'final8', text: '1/8 Final' },
      { id: 2, value: 'final4', text: '1/4 Final' },
      { id: 3, value: 'final2', text: '1/2 Final' },
      { id: 4, value: 'bronzeFinal', text: 'Bronze Final' },
      { id: 5, value: 'final', text: 'Final' }
    ]
  },

  scoredBallTypes: [
    { id: 1, value: 'firstBall', text: 'First ball' },
    { id: 2, value: 'placement', text: 'Placement' },
    { id: 3, value: 'pushOn', text: 'Push on' },
    { id: 4, value: 'pushOff', text: 'Push off' },
    { id: 5, value: 'smash', text: 'Smash' },
    { id: 6, value: 'ricochet', text: 'Ricochet' },
    { id: 7, value: 'bounceOver', text: 'Bounce over' },
    { id: 8, value: 'rollOnTop', text: 'Roll on top' },
    { id: 9, value: 'rollUpAndOver', text: 'Roll up and over' },
    { id: 10, value: 'lobbingShot', text: 'Lob shot' }
  ],

  deadBallTypes: [
    { id: 0, value: 'none', text: 'None' },
    { id: 3, value: 'ballsNotThrown', text: 'Balls Not Thrown' },
    { id: 1, value: 'violation', text: 'Violation' },
    { id: 2, value: 'timeIsOut', text: 'Time expiring' }
  ],

  competitionBoxes: {
    individual: [
      { id: 3, teamColor: 'red' },
      { id: 4, teamColor: 'blue' }
    ],
    pair: [
      { id: 2, teamColor: 'red' },
      { id: 3, teamColor: 'blue' },
      { id: 4, teamColor: 'red' },
      { id: 5, teamColor: 'blue' }
    ],
    team: [
      { id: 1, teamColor: 'red' },
      { id: 2, teamColor: 'blue' },
      { id: 3, teamColor: 'red' },
      { id: 4, teamColor: 'blue' },
      { id: 5, teamColor: 'red' },
      { id: 6, teamColor: 'blue' }
    ]
  }
}

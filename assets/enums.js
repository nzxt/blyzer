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
    // default: [
    // { id: 0, value: 'none', text: 'None' }
    // ],
    individual: [
      // { id: 0, value: 'none', text: 'None' },
      { id: 1, value: 'bc1', text: 'Individual BC1', shortText: 'BC1' },
      { id: 2, value: 'bc2', text: 'Individual BC2', shortText: 'BC2' },
      { id: 3, value: 'bc3', text: 'Individual BC3', shortText: 'BC3' },
      { id: 4, value: 'bc4', text: 'Individual BC4', shortText: 'BC4' }
    ],
    pair: [
      // { id: 0, value: 'none', text: 'None' },
      { id: 5, value: 'pairBc3', text: 'Pair BC3', shortText: 'BC3' },
      { id: 6, value: 'pairBc4', text: 'Pair BC4', shortText: 'BC4' }
    ],
    team: [
      // { id: 0, value: 'none', text: 'None' },
      { id: 7, value: 'teamBc1Bc2', text: 'Team BC1/BC2', shortText: 'BC1/BC2' }
    ]
  },

  stageTypes: ['pool', 'elimination'],

  stageIndexes: {
    default: [
      { id: 0, value: 'none', text: 'None' }
    ],
    pool: [
      // { id: 0, value: 'none', text: 'N/A' },
      { id: 1, value: 'poolA', text: '1st' },
      { id: 2, value: 'poolB', text: '2nd' },
      { id: 3, value: 'poolC', text: '3rd' },
      { id: 4, value: 'poolD', text: '4th' },
      { id: 5, value: 'poolE', text: '5th' }
    ],

    elimination: [
      // { id: 0, value: 'none', text: 'N/A' },
      { id: 1, value: 'final8', text: '1/8' },
      { id: 2, value: 'final4', text: '1/4' },
      { id: 3, value: 'final2', text: '1/2' },
      { id: 4, value: 'bronzeFinal', text: 'Bronze' },
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
    // { id: 0, value: 'none', text: 'None' },
    { id: 1, value: 'ballsNotThrown', text: 'Balls Not Thrown' },
    { id: 2, value: 'violation', text: 'Violation' },
    { id: 3, value: 'timeIsOut', text: 'Time expiring' }
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

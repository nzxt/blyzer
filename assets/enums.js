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

  shotTypes: [
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
  },

  throwDistances: [
    { id: 0, value: 'Undefined', text: 'Undefined' },
    { id: 1, value: 'From15To20', text: '1.5-2.0 meters' },
    { id: 2, value: 'From20To25', text: '2.0-2.5 meters' },
    { id: 3, value: 'From25To30', text: '2.5-3.0 meters' },
    { id: 4, value: 'From30To35', text: '3.0-3.5 meters' },
    { id: 5, value: 'From35To40', text: '3.5-4.0 meters' },
    { id: 6, value: 'From40To45', text: '4.0-4.5 meters' },
    { id: 7, value: 'From45To50', text: '4.5-5.0 meters' },
    { id: 8, value: 'From50To55', text: '5.0-5.5 meters' },
    { id: 9, value: 'From55To60', text: '5.5-6.0 meters' },
    { id: 10, value: 'From60To65', text: '6.0-6.5 meters' },
    { id: 11, value: 'From65To75', text: '6.5-7.0 meters' },
    { id: 12, value: 'From70To75', text: '7.0-7.5 meters' },
    { id: 13, value: 'From75To80', text: '7.5-8.0 meters' },
    { id: 14, value: 'From80To85', text: '7.0-8.5 meters' },
    { id: 15, value: 'From85To90', text: '8.5-9.0 meters' },
    { id: 16, value: 'From90To95', text: '8.0-9.5 meters' },
    { id: 17, value: 'From95To100', text: '9.5-10.0 meters' }
  ]
}

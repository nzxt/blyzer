export interface RootState {}

export interface vObj {
  id?: number;
  value: string | number;
  text: string;
}

export interface Match {
  id: string;
  dateTimeStamp: string;
  matchType: string;
  competitionEvent: string;
  poolStage: string;
  eliminationStage: string;
  scoreRed: number;
  scoreBlue: number;
  appUserId: string;
  trainingId: string;
  tournamentId: string;
}

export interface Player {
  id: string;
  fullName: string;
  playerClassification: number;
  countryId: string;
}

export interface Box {
  id: number;
  teamColor: string;
  player?: Player;
}

export interface Country {
  id: string
  name: string
  code: number
  alpha2: string
  alpha3: string
}

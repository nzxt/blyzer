export interface IRootState {}

export interface IObj {
  id?: number;
  value: string | number;
  text: string;
}
export interface IPagination {
  page: number;
  rowsPerPage: number;
  sortBy: string,
  descending: Boolean,
  totalItems: number;
  totalPages?: number;
  search?: string;
}

export interface ITournament {
  id?:	string;
  name:	string;
  tournamentTypeId: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ITournamentType {
  id?: string;
  name: string;
  abbr: string;
  isBisFed?: boolean;
  icon?: string;
}

export interface IMatch {
  id?: string;
  dateTimeStamp: Date;
  matchType?: number;
  competitionEvent?: number;
  poolStage?: number;
  eliminationStage?: number;
  scoreRed?: number;
  scoreBlue?: number;
  appUserId: string;
  trainingId?: string;
  tournamentId?: string;
  matchToPlayers?: IMatchToPlayer[];
}

export interface ITraining {
  id?: string;
  dateTimeStamp: Date;
  appUserId: string;
  balls?: IBall[];
  matches?: IMatch[];
}

export interface IMatchToPlayer {
  id?: string;
  box: number;
  bib?: number;
  matchId?: string;
  playerId: string;
  isSubstitutePlayer?: Boolean;
}

export interface IStage {
  id?: string;
  index: number;
  matchId: string;
  isDisrupted?: Boolean;
  isTieBreak?: Boolean;
  scoreRed?: number;
  scoreBlue?:	number;
  balls?: IBall[];
  stageToPlayers?: IStageToPlayer[];
}

export interface IStageToPlayer {
  id?: string;
  bib?: number;
  box?: number;
  stageId: string;
  playerId: string;
}

export interface IBall {
  id?: string;
  rating?: number;
  isPenalty?: Boolean;
  isDeadBall?: Boolean;
  deadBallType?: number;
  shotType?: number;
  box: number;
  distance?: number;
  stageId: string;
  playerId: string;
  trainingId?: string;
}

export interface IPlayer {
  id: string;
  fullName: string;
  playerClassification: number;
  countryId: string;
}

export interface ICountry {
  id: string;
  name: string;
  code: number;
  alpha2: string;
  alpha3: string;
}

export interface IBox {
  id: number;
  teamColor: string;
  player?: IPlayer;
}

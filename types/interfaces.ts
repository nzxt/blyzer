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
  isBisFed: boolean;
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
}

export interface IMatchToPlayer {
  isSubstitutePlayer?: Boolean;
  matchId?: string;
  id?: string;
  bib?: number;
  box: number;
  playerId: string;
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

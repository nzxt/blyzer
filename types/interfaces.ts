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
  matchId: string;
  index: number;
  isDisrupted?: Boolean;
  isTieBreak?: Boolean;
  scoreRed?: number;
  scoreBlue?:	number;
  avgPointRed?: number;
  avgPointBlue?: number;
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
  isJack?: Boolean;
  isPenalty?: Boolean;
  isDeadBall?: Boolean;
  deadBallType?: number;
  shotType?: number;
  box?: number;
  distance?: number;
  stageId?: string;
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

export interface ITokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IApiService {
  $axios: any;
  request: Function;
  ApiAccountLoginPost: Function;
  ApiAccountGetProfileGet: Function;
  ApiAccountRegistrationPost: Function;
  ApiAccountRefreshTokensPost: Function;
  ApiAppRoleGet: Function;
  ApiAppRolePut: Function;
  ApiAppRolePost: Function;
  ApiAppRoleByIdGet: Function;
  ApiAppRoleGetDefaultGet: Function;
  ApiAppUserGet: Function;
  ApiAppUserPut: Function;
  ApiAppUserPost: Function;
  ApiAppUserByIdGet: Function;
  ApiAppUserByIdDelete: Function;
  ApiAppUserSetRolesPost: Function;
  ApiAppUserSetPassPost: Function;
  ApiBallGet: Function;
  ApiBallPut: Function;
  ApiBallPost: Function;
  ApiBallByIdGet: Function;
  ApiBallByIdDelete: Function;
  ApiConfigurationGet: Function;
  ApiConfigurationPut: Function;
  ApiConfigurationPost: Function;
  ApiConfigurationByIdGet: Function;
  ApiConfigurationByIdDelete: Function;
  ApiCountryGet: Function;
  ApiCountryPut: Function;
  ApiCountryPost: Function;
  ApiCountryByIdGet: Function;
  ApiCountryByIdDelete: Function;
  ApiMatchGet: Function;
  ApiMatchPut: Function;
  ApiMatchPost: Function;
  ApiMatchByIdGet: Function;
  ApiMatchByIdDelete: Function;
  ApiMatchToPlayerGet: Function;
  ApiMatchToPlayerPut: Function;
  ApiMatchToPlayerPost: Function;
  ApiMatchToPlayerByIdGet: Function;
  ApiMatchToPlayerByIdDelete: Function;
  ApiPlayerGet: Function;
  ApiPlayerPut: Function;
  ApiPlayerPost: Function;
  ApiPlayerByIdGet: Function;
  ApiPlayerByIdDelete: Function;
  ApiStageGet: Function;
  ApiStagePut: Function;
  ApiStagePost: Function;
  ApiStageByIdGet: Function;
  ApiStageByIdDelete: Function;
  ApiStageToPlayerGet: Function;
  ApiStageToPlayerPut: Function;
  ApiStageToPlayerPost: Function;
  ApiStageToPlayerByIdGet: Function;
  ApiStageToPlayerByIdDelete: Function;
  ApiTournamentGet: Function;
  ApiTournamentPut: Function;
  ApiTournamentPost: Function;
  ApiTournamentByIdGet: Function;
  ApiTournamentByIdDelete: Function;
  ApiTournamentTypeGet: Function;
  ApiTournamentTypePut: Function;
  ApiTournamentTypePost: Function;
  ApiTournamentTypeByIdGet: Function;
  ApiTournamentTypeByIdDelete: Function;
  ApiTrainingGet: Function;
  ApiTrainingPut: Function;
  ApiTrainingPost: Function;
  ApiTrainingByIdGet: Function;
  ApiTrainingByIdDelete: Function;
}

/* eslint-disable */
import {
  ITournament,
  ITraining,
  IMatch,
  IMatchToPlayer,
  IStage,
  IStageToPlayer,
  IBall,
} from '~/types/interfaces'
 /* eslint-enable */

export class Tournament implements ITournament {
  constructor (
    name: string,
    tournamentTypeId: string
  ) {
    this.name = name
    this.tournamentTypeId = tournamentTypeId
  }
  id?: string
  name: string;
  tournamentTypeId: string;
  dateFrom?: Date;
  dateTo?: Date;
}
export class Match implements IMatch {
  constructor (
    dateTimeStamp: Date = new Date(),
    appUserId: string
  ) {
    this.dateTimeStamp = dateTimeStamp
    this.appUserId = appUserId
  }
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

export class Training implements ITraining {
  constructor (
    dateTimeStamp: Date = new Date(),
    appUserId: string
  ) {
    this.dateTimeStamp = dateTimeStamp
    this.appUserId = appUserId
  }
  id?: string
  dateTimeStamp: Date;
  appUserId: string;
}

export class MatchToPlayer implements IMatchToPlayer {
  constructor (
    box: number,
    playerId: string
  ) {
    this.box = box
    this.playerId = playerId
  }
  isSubstitutePlayer?: Boolean;
  matchId?: string;
  id?: string;
  bib?: number;
  box: number;
  playerId: string;
}

export class Stage implements IStage {
  constructor (
    index: number,
    matchId: string
  ) {
    this.index = index
    this.matchId = matchId
    this.balls = []
    this.stageToPlayers = []
  }
  id?: string;
  index: number;
  matchId: string;
  isDisrupted?: Boolean;
  isTieBreak?: Boolean;
  scoreRed?: number;
  scoreBlue?: number;
  balls?: IBall[];
  stageToPlayers?: IStageToPlayer[];
}

export class Ball implements IBall {
  constructor (
    box: number,
    stageId: string,
    playerId: string
  ) {
    this.box = box
    this.stageId = stageId
    this.playerId = playerId
  }
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

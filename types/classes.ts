/* eslint-disable */
import {
  ITournament,
  ITraining,
  IMatch,
  IMatchToPlayer
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

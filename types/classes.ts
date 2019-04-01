/* eslint-disable */
import {
  ITournament,
  ITraining,
  IMatch
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
}

export class Training implements ITraining {
  constructor (
    dateTimeStamp: Date,
    appUserId: string
  ) {
    this.dateTimeStamp = dateTimeStamp
    this.appUserId = appUserId
  }
  id?: string
  dateTimeStamp: Date;
  appUserId: string;
}

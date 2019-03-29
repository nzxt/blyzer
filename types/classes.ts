/* eslint-disable */
import {
  ITournament,
  ITraining
} from '~/types/interfaces'
 /* eslint-enable */

export class Tournament implements ITournament {
  constructor (name: string, tournamentTypeId: string) {
    this.name = name
    this.tournamentTypeId = tournamentTypeId
  }
  id?: string
  name: string;
  tournamentTypeId: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export class Training implements ITraining {
  constructor (dateTimeStamp: Date, appUserId: string) {
    this.dateTimeStamp = dateTimeStamp
    this.appUserId = appUserId
  }
  id?: string
  dateTimeStamp: Date;
  appUserId: string;
}

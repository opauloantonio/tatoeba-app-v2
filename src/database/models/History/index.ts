import Realm from 'realm';

export class History extends Realm.Object<History, 'timestamp' | 'url'> {
  _id = new Realm.BSON.ObjectId();
  timestamp!: Date;
  url!: string;
}

import Realm from 'realm';

export class Bookmark extends Realm.Object<Bookmark, 'sentenceId' | 'data' | 'timestamp'> {
  _id = new Realm.BSON.ObjectId();
  sentenceId!: number;
  timestamp!: Date;
  data!: string;

  static primaryKey = '_id';
}

import Realm from 'realm';

export class Bookmark extends Realm.Object<Bookmark, 'sentenceId' | 'data'> {
  _id = new Realm.BSON.ObjectId();
  sentenceId!: number;
  data!: string;

  static primaryKey = '_id';
}

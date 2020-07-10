import { Service } from 'typedi';
import { Firestore } from '@google-cloud/firestore';
import { UUID } from 'utils/AuthContext';

@Service()
export class Repository {
  private _store: Firestore;
  private _collection: FirebaseFirestore.CollectionReference;

  get store() {
    return this._store
  }

  // TODO: setup environment
  private firebaseConfig: FirebaseFirestore.Settings = 
  {
    apiKey: 'AIzaSyBXrWSCwyMVcpbpHKPZCGY9MgeX71dvLMo',
    authDomain: 'our-1app.firebaseapp.com',
    databaseURL: 'https://our-1app.firebaseio.com',
    projectId: 'our-1app',
    storageBucket: 'our-1app.appspot.com',
    messagingSenderId: '526825359084',
    appId: '1:526825359084:web:6f81211bf08dcf606707c9',
    keyFilename: 'our-1app.json',
  };

  constructor() {
    this._store = new Firestore(this.firebaseConfig)
  }

  public setCollection(path: string) {
    this._collection = this._store.collection(path)
  }

  public getCollection() {
    return this._collection;
  }

  public async getDoc<T>(id: UUID, converter?: FirebaseFirestore.FirestoreDataConverter<T>) {
    converter = converter || defaultConverter<T>()
    return await this._collection.withConverter<T>(converter).doc(id).get()
  }

  public setDoc(id: UUID, newDoc: FirebaseFirestore.DocumentData) {
    this._collection.doc(id).set(JSON.parse(JSON.stringify(newDoc))).catch(e => { throw e });
    return newDoc;
  }

  public async query<T, TParam>(queryParameters: TParam, converter?: FirebaseFirestore.FirestoreDataConverter<T>) {
    converter = converter || defaultConverter<T>()
    return await this._collection.withConverter<T>(converter).get()
  }

  public async addDoc(newDoc: FirebaseFirestore.DocumentData) {
    let addedDoc;

    try {
      addedDoc = await this._collection.add(JSON.parse(JSON.stringify(newDoc)));
    } catch(e) {
      throw e;
    } finally {
      newDoc.id = addedDoc.id;
      return newDoc;
    }
  }

  public deleteDoc(id: UUID): UUID {
    try {
      this._collection.doc(id).delete();
    } catch(e) {
      throw e;
    } finally {
      return id;
    }
  }

  public async updateDoc(updateDoc: FirebaseFirestore.UpdateData) {
    await this._collection.doc(updateDoc.id).update(updateDoc).catch(err => { throw err })
    return updateDoc;
  }
}

function defaultConverter<T>(): FirebaseFirestore.FirestoreDataConverter<T> {
  return {
    toFirestore(object: T) {
      return object
    },
    fromFirestore(data: FirebaseFirestore.DocumentData) {
      return data as T
    },
  }
}
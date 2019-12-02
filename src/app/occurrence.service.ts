import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Occurrence } from './occurrence';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class OccurrenceService {
 
  
  dbPath = '/occurrence';
 
  occurrenceRef: AngularFireList<Occurrence> = null;
  bairroOccurrence = [];
  bairro = [];
  constructor(private db: AngularFireDatabase) {
    this.occurrenceRef = db.list(this.dbPath);
    console.log("occurrence",this.occurrenceRef);
  }
 
  createOccurrence(occurrence: Occurrence): void {
    this.occurrenceRef.push(occurrence);
  }

  getAll() {
    return this.occurrenceRef
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );

}
  
getBairro() {
  return this.occurrenceRef
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => (c.payload.val().bairro ));
      })
    );
}

}
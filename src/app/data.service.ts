import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public firestore: Firestore;

  constructor(public myfirestore: Firestore) {
    this.firestore=myfirestore;

  }

  getData(): any {
    return this.firestore;
  }
}

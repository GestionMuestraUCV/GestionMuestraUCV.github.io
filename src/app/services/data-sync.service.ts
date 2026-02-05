import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataSyncService {
  // Subjects for each collection
  private unitsSubject = new BehaviorSubject<any[]>([]);
  public units$ = this.unitsSubject.asObservable();

  private clientsSubject = new BehaviorSubject<any[]>([]);
  public clients$ = this.clientsSubject.asObservable();

  private samplesSubject = new BehaviorSubject<any[]>([]);
  public samples$ = this.samplesSubject.asObservable();

  // Loading state to show a spinner in the UI
  public isSyncing = new BehaviorSubject<boolean>(false);

  constructor(private firestore: Firestore) {}


  async fetchAllData() {
    this.isSyncing.next(true);
    //console.log("🚀 Starting Full Sync...");

    try {
      // Fetch everything in parallel
      const [unitsSnap, clientsSnap, samplesSnap] = await Promise.all([
        getDocs(query(collection(this.firestore, 'unidad-produccion'))),
        getDocs(query(collection(this.firestore, 'clientes'))),
        getDocs(query(collection(this.firestore, 'muestras')))
      ]);

      // Map and push to subjects
      this.unitsSubject.next(unitsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      this.clientsSubject.next(clientsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      this.samplesSubject.next(samplesSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      //console.log("✅ Sync Complete: All collections cached on disk.");
    } catch (error) {
      //console.error("❌ Sync failed:", error);
    } finally {
      this.isSyncing.next(false);
    }
  }

  getDataUnits(): any[] {
    return this.unitsSubject.value;
  }

  getDataClients(): any[] {
    return this.clientsSubject.value;
  }

  getDataSamples(): any[] {
    return this.samplesSubject.value;
  }



}






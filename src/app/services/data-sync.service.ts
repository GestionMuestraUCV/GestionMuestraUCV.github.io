import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, setDoc } from '@angular/fire/firestore';
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

  saveDataClients(newClient: any) {
    // Get the current list of clients from the Subject
    const currentClients = this.clientsSubject.value;

    // Check if the client already exists to avoid duplicates
    const index = currentClients.findIndex(c => c.email === newClient.email);

    let updatedClients;
    if (index > -1) {
      // Update existing client
      updatedClients = [...currentClients];
      updatedClients[index] = newClient;
    } else {
      // Add new client to the array
      updatedClients = [...currentClients, newClient];
    }

    // Push the updated list to all subscribers (Instant UI update)
    this.clientsSubject.next(updatedClients);
    console.log("Client saved locally in DataSyncService");
  }



  async uploadClient(client: any) {
    const docRef = doc(this.firestore, 'clientes', client.email);
    return setDoc(docRef, client);
  }


  async syncAllLocalToCloud() {
    this.isSyncing.next(true);
    const clients = this.getDataClients();

    try {
      // Pushes all local clients to the cloud in parallel
      await Promise.all(clients.map(c => this.uploadClient(c)));
      console.log('Cloud sync successful');
    } catch (error) {
      console.error('Cloud sync failed', error);
    } finally {
      this.isSyncing.next(false);
    }
  }




}






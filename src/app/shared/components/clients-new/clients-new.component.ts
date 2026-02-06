import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataSyncService } from 'src/app/services/data-sync.service';

@Component({
  selector: 'app-clients-new',
  templateUrl: './clients-new.component.html',
  styleUrls: ['./clients-new.component.css']
})
export class ClientsNewComponent {
  title = 'gestion-de-muestras-de-campo';
  public data: any = []
  public pid: any;
  public res: any="";
  public static text: string = "";

  @ViewChild('geo') geo: any;//ElementRef | undefined;
  public htmlToAdd: any;
  @Input() something !: any;
  @Output() somethingChange= new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore, private location: Location, private dataSync: DataSyncService){
    //this.getData();
  }
  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.pid=param['id'];
      //this.pid=param['id'];
      //this.generateBarcode(param);

    })
    //this.getData();
    //this.MyQuery();

  }

  handleRegister(value: any){
     this.addData(value);
     this.backPage();
  }

  addData(value: any) {
    // 2. Format the data object
    const clientData = {
      email: value.email,
      nombre: value.nombre,
      telefono: value.telefono,
      direccion: value.direccion,
      id: value.email // Firestore uses email as the doc ID in your code
    };

    // 3. Save locally FIRST in the DataSyncService
    this.dataSync.saveDataClients(clientData);

    // 4. Send to Firestore in the background
    const dbInstance = doc(this.firestore, 'clientes', value.email);
    setDoc(dbInstance, clientData)
      .then(() => {
        alert('Data Sent')
        // Optional: you could show a success toast here
      })
      .catch((err) => {
        alert("Error syncing to cloud: " + err.message);
        // Note: The local data remains available even if cloud sync fails temporarily
      });

  }

  getData() {
    const dbInstance = collection(this.firestore, 'muestras');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }


  showPosition(position: any) {

    //console.log(position.coords.latitude);
    //console.log(position.coords.longitude);

    var x = position.coords.latitude;
    var y = position.coords.longitude;
    ClientsNewComponent.text = x+", "+ y;
    //console.log(ClientsNewComponent.text);

  }

  async getLocation() {
    var test = "...";
    this.res=test;

    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(this.showPosition);

    } else {
      //x.innerHTML = "Geolocation is not supported by this browser.";
      console.log("error");
    }
    setTimeout(() => {
      this.res= ClientsNewComponent.text;
      //console.log(this.res);
      }
      ,1000);

  }

  backPage(){
    this.location.back();
  }


}

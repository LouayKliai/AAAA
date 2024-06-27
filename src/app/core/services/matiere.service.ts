
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Matiere } from '../models/matiere';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  url=" http://localhost:8080/matiere"

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,

  ) { }


  create_NewMatiere(record) {
    let matiere=new Matiere();
    matiere.description = record.description;
    matiere.niveau = record.niveau;
    matiere.titre=record.titre;
    this.http.post<Matiere>(this.url, matiere).subscribe(data=>{
      console.log(data);
     });
    return this.firestore.collection('Matieres').add(record);
  }

  read_Matieres() {
    return this.firestore.collection('Matieres').snapshotChanges();
  }


  update_Matiere(recordID, record) {
    this.firestore.doc('Matieres/' + recordID).update(record);
    console.log('updated');
  }

  delete_Matiere(record_id) {
    this.firestore.doc('Matieres/' + record_id).delete();
  }
}

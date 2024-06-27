
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReclamationsService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewReclamation(record) {
    return this.firestore.collection('Reclamation').add(record);
  }

  read_Reclamations() {
    return this.firestore.collection('Reclamation').snapshotChanges();
  }
  // readReclamations by id
  read_Reclamation(record_id) {
    return this.firestore.collection('Reclamation').doc(record_id).snapshotChanges();
  }


  read_technique(type:string) {
    return this.firestore.collection("Reclamation", (ref) => ref.where("type", "==", type))
    .snapshotChanges();
  }
  read_current(email) {
    return this.firestore.collection("Reclamation", (ref) => ref.where("email", "==", email))
    .snapshotChanges();
  }


  delete_Reclamation(record_id) {
    this.firestore.doc('Reclamation/' + record_id).delete();
  }
}

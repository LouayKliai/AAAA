
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import http
// import http client
import { HttpClient } from '@angular/common/http';
// import observable
import { Observable } from 'rxjs';
import { User } from '../models/user';
// import todo model
@Injectable({
  providedIn: 'root'
})
export class UsersService {

url=" http://localhost:8080/user"
  constructor(
    private firestore: AngularFirestore,
    // http service
    private http: HttpClient,
  ) { }


  create_NewUser(record) {
// send the new user to this.url post request
//
let user = new User();
user.nom=record.nom;
user.prenom=record.prenom;
user.email=record.email;
user.password=record.password;
user.grade="user";
user.tel=record.tel;
user.photo="none"
 this.http.post<User>(this.url, user).subscribe(data=>{
  console.log(data);
 });

    return this.firestore.collection('Users').add(record).then(
      ()=>{
        console.log("firebase created")
      }
    );
  }

  read_Users() {
    return this.firestore.collection('Users').snapshotChanges();
  }
  read_clients() {
    return this.firestore.collection("Users", (ref) => ref.where("grade", "==", "client"))
    .snapshotChanges();
  }
  read_admins() {
    return this.firestore.collection("Users", (ref) => ref.where("grade", "==", "admin"))
    .snapshotChanges();
  }
  read_current(email) {
    return this.firestore.collection("Users", (ref) => ref.where("email", "==", email))
    .snapshotChanges();
  }
  read_effectifs() {
    return this.firestore.collection("Users", (ref) => ref.where("grade", "!=", "client"))
    .snapshotChanges();
  }
  update_User(recordID, record) {
    this.firestore.doc('Users/' + recordID).update(record);
    console.log('updated');
  }

  delete_User(record_id) {
    this.firestore.doc('Users/' + record_id).delete();
  }
}

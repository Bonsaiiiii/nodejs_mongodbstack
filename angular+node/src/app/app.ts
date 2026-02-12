import { Component, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})

export class App implements OnInit {
  protected readonly title = signal('todoapp');
  readonly API_URL = 'http://localhost:5038/';

  constructor(private http:HttpClient) {}
  notes:any=[];

  refreshNotes() {
    this.http.get(this.API_URL+'getnotes').subscribe((data:any)=>{
      this.notes=data;
    })
  }

  ngOnInit() : void {
    this.refreshNotes();

    console.log('Inicializado');
  }

  addNotes() {
    var newNotes = (<HTMLInputElement>document.getElementById("newNotes")).value;
    var formData = new FormData();
    formData.append("newNotes", newNotes);
    this.http.post(this.API_URL+'postnotes',formData).subscribe((data:any)=> {
      alert(data);
      this.refreshNotes();
    })
  }

  deleteNotes(_id:any) {
    this.http.delete(this.API_URL+'deletenotes?_id=' + _id).subscribe((data:any)=> {
      alert(data);
      this.refreshNotes();
    })
  }
}

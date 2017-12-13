import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'my-component',
    templateUrl: './my.component.html',
    styleUrls: ['./my.component.css']
})
export class MyComponent {
    public someDataFromFirebaseDB;
    constructor(
        private database: AngularFireDatabase
    ) {
      database.list('some/path/to/my/data')
      .subscribe(response => {
          this.someDataFromFirebaseDB = response;
      });
    }  
}

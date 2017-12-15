
Official Repo of Sample Apps: https://firebase.google.com/docs/samples/

Other similar Apps
- https://github.com/firebase/firebase-angular-starter-pack
- https://github.com/bave8672/angular-firebase-starter/
- https://github.com/codediodeio/angular-firestarter

***


## JavaScript / Angular Extended / Firebase: Retrieving Data

**Source:** https://www.learnhowtoprogram.com/javascript/angular-extended/firebase-retrieving-data


Now that Firebase and AngularFire are configured in our application, let's test it out! In this lesson we'll begin addressing how to retrieve data from Firebase. We'll load Firebase with sample data, and program our application to retrieve it. We'll explore how to create database entries directly through the app in subsequent lessons, too.

### Loading Data into Firebase

First, let's make sure our database contains information for our application to retrieve. Thankfully, Firebase allows us to upload JSON directly to a database through its website.

Create a file in your project directory called sample-albums.json and copy this into it:

sample-albums.json
----------------------------------------

```js
{ "albums": [{
    "title": "Pulse",
    "artist": "Pink Floyd",
    "description": "A live  album by the English progressive rock band originally released in 1995, on the label EMI in the United Kingdom.",
    "id": "1"
    }, {
    "title": "Dilate",
    "artist": "Ani DiFranco",
    "description": "Her highest-selling and most acclaimed album, released in 1996.",
    "id": "2"
      }, {
    "title": "Axis Bold As Love",
    "artist": "Jimi Hendrix",
    "description": "Second studio album by the English-American band, released in 1967.",
    "id": "3"
  }]
}
```

This is simply a few of our Album objects in JSON format.

- Visit your Firebase Console and select your project's database.
- Click on the Database option in the left-hand navigational menu.
- Select the 3 vertical dots on the right-hand side of the grey bar with your database URL on it. (It's right next to the + and - buttons). This should bring up a small menu.
- Select Import JSON from this menu. This will result in a modal window prompting you to upload a file.
- Locate the sample-albums.json file from your project, and upload it.
- After the file is uploaded, you should see data in your database. Awesome! Our new database now has records!

### Retrieving Data from Firebase

Next, let's program our application to gather and display this data. We'll rely on our existing AlbumService to manage both retrieving it, and transporting it to components that require it.

Although, do note that **we're not required to retrieve data from Firebase in a service**. You can also retrieve data from a component directly, as depicted in the AngularFire2 Documentation.

We're opting to complete this process in a service simply because we'll eventually need to access database records in both the MarketplaceComponent and the AlbumDetailComponent anyway. Therefore, it keeps our code more DRY and better organized to retrieve data in one place, instead of two. Both components may still rely on the same service.

Moving on, we'll import the necessary additional packages at the top of our service file. We'll also continue importing the ALBUMS constant from mock-albums.ts for now, just to avoid compiler errors. Don't worry, we'll remove it completely in an upcoming lesson:


```js
src/app/album.service.ts
import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { ALBUMS } from './mock-albums';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
...
```

We'll also need to declare the `AlbumService`'s existing albums property to be `FirebaseListObservable<any[]>` type:

```js
src/app/album.service.ts
...
@Injectable()
export class AlbumService {
  albums: FirebaseListObservable<any[]>;
...
```

You likely haven't seen this type of object before. This is a special type of object that's returned from Firebase. Let's break it down:

* `List` is included in `FirebaseListObservable` because the data we'll request from Firebase will be a list of all `Albums` in our database. There is also a `FirebaseObjectObservable` object available to use when we're only returning a single object. We'll use this in an upcoming lesson.
* `Observable` is a type of design pattern. In this design pattern, a thing being observed notifies anything observing it when changes to its content occur. This is how Firebase works; our service observes the areas of our database we instruct it to. If changes occur, Firebase immediately notifies us, and the application updates accordingly. (At the end of this lesson, try deleting an item from Firebase directly, and watch your application update immediately!)
* `<any[]>` is something called a type parameter being specified by a TypeScript generic. It specifies the specific type of FirebaseListObservable this will be. We're stating that it'll be an array [] of any type of information. You're not required to know the details of this syntax for our course, but if you'd like to explore it on your own, we recommend checking out the TypeScript Documentation on Generics.

So, this means we're expecting Firebase to return an array list of database entries, of any variety. And, if changes to the database occur, our `FirebaseListObservable` object will automatically update accordingly.

Next, we'll include an instance of `AngularFireDatabase` in the service's constructor. This makes our Firebase application instance available for our service to use as soon as the service is instantiated:

```js
src/app/album.service.ts
...
@Injectable()
export class AlbumService {
  albums: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
  }
...
```

In the constructor, we'll also define the service's existing albums property. We'll set it to the list of Albums currently in our database:

```
src/app/album.service.ts
  constructor(private database: AngularFireDatabase) {
    this.albums = database.list('albums');
  }
```

Here, we call database (which is what we named our instance of AngularFireDatabase object in the constructor), then call .list to specify we're gathering a list of multiple things (remember, we're expecting a FirebaseListObservable)

We pass in 'albums' an argument to specify which list of data we'd like. Remember, our list of Albums is situated in Firebase under albums:

The 'albums' we pass as an argument in our service's constructor corresponds to the first key in our JSON data, albums, containing the array of our Album objects.

Next, let's make sure the `getAlbums()` method returns the contents we've just gathered from our database:

```js
src/app/album.service.ts
...
  getAlbums(){
    return this.albums;
  }
...
```

`getAlbums()` is called in `MarketplaceComponent`. It uses our `AlbumService` to retrieve its data. But because `getAlbums()` now returns a `FirebaseListObservable<any[]>` object, we need to make sure the album property in MarketplaceComponent matches this data type:

```js
src/app/marketplace/marketplace.component.ts
import { FirebaseListObservable } from 'angularfire2/database';

...
export class MarketplaceComponent implements OnInit {
  albums: FirebaseListObservable<any[]>;
...
```

### Async Pipe

Next, we'll have to update the code responsible for listing all our Albums in the MarketplaceComponent template, too. We need to add a built-in Angular pipe called async, like this:

```js
src/app/marketplace/marketplace.component.html
<h2>Marketplace</h2>

<div *ngFor="let album of albums | async" (click)="goToDetailPage(album)" class="panel panel-default">
  <div class="panel-body">
    <h3><em>{{album.title}}</em> by {{album.artist}}</h3>
  </div>
</div>
```


This lets Angular know that the data we are receiving there is asynchronous and we need to use a promise to wait for it to load. Firebase is fast but it'll still take time for our service to reach out to Firebase, request our data, and return it back into the component.

While the service is communicating with Firebase, our component's template will load. However, it won't yet know what albums is, because the Service has not yet provided it.

By adding the async pipe here, we're preemptively notifying Angular that albums is asynchronous and that it will likely come after the template attempts to load. Angular, in turn, doesn't immediately throw an error, and instead waits patiently for the albums information, which the Service eventually provides.For more information on the async pipe, check out the Angular Documentation.

At this point, we should be able to see our new, Firebase-backed data in our application! Make sure to restart your server to ensure it receives fresh data from Firebase.

Now that we know how to retrieve data from Firebase, we'll begin adding new data to it in the next lesson. Stay tuned!










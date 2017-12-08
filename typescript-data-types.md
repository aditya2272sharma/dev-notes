# Typescript Data Types reference:

The following article is written as a quick reference for all available typescript data types.
Refer the following repository for comprehensive high quality TypeScript type definitions.
* https://github.com/DefinitelyTyped/DefinitelyTyped

## Defining data type for a defined variable:
* The following material was taken from a video tutorial series:
  * https://codecraft.tv/courses/angular/es6-typescript/types/

### Scope of a variable
`let` has a block level scope.
It prevents re-declaration of variable twice.

```
let a;
a = 1;
a = '1';
```

### Steps

* Create a .ts file
* Compile it using the following command at the terminal:

```
tsc -w
# -w represents the watch flag
# throws an error 'Type string is not assignable to type number'
```

### tsconfig
- in tsconfig if the flag `noImplictAny` is set to `false` by default
- if so, then typescript will will assume it's of type ANY
- if set to `true`, then it doesn't assume anymore
- we either have to provide it a type,
- or, typescript will determine a variable's type during assigment

This brings us to explore -

##### Any-type
```js
let someUnknownType: any = 1; // can hold numbers
someUnknownType = '1'; // can hold strings throws no errors
```

Let's look at the other different types of variables that we'll be using.

##### Number, Boolean and String
```js
let age: number = 6; // double / floating point value
let isComplete: boolean = false; // boolean true/false value
let name: string = 'blue'; // string
```

##### Arrays
```js
let rollNumbers: number[] = [1, 2, 3];

// To hold generic types in an array
let list: Array<number> = [1, 2, 3];
```

##### Functions

```
let func: Function = () => console.log('hello');
```
Here, `Function` indicates that the variable `func` is meant to contain any data of `Function` type.

###### Restricting the Return type:

```
function returnNumber(): number {
  return 1;
}

function returnString(): string {
  return '1';
}
```
##### Enum
```
// declaring an enum
enum Direction {
  Up,
  Down,
  Right,
  Left
}

let go: Direction;
// let's assign some value to it
go = Direction.Up;

// if we try to assign something else or type
go = "Up"; // throws an error
```

##### Class

```
class Person {};
let person: Person; // holds a single instance of Person type
let people: Person[]; // holds multiple instances of Person type
```

##### void-type
```js
function returnsVoid(): void {
  console.log('It returns void'); // doesn't log undefined
  return 10; // logs an error
}
```

##### Type assertions
```
let someVar: any = "Some String value";
(<string>value).length; // we try to assert if it is a string type
```

##### More on Generic Type
```
class Audio {}
class Video {}
class Text {}
class Image {}

class Post<T> {
  content: T;
}
// here T represents a generic type. It can take any name,
// for instance `Abcdef` or `Efgh` & not just `T`
// `T` is just a convention

let videoPost: Post<Video>;
// this variable will hold an instance of Post,
// which will be of type Video
```



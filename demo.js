'use strict';
(function () {

  // Object literals
  let person = {
    firstName: 'Aditya',
    lastName: 'Tyagi',
    age: 24,
    isAdult: function () {

      // this = the object on which the function is being called on
      return this.age > 18 ? true : false;
    },
    isMinor() {
      // this method on object is created using Object Literal Method Declaration shorthand. You dont have to define it as a property
      // like you did in isAdult()
      return this.age < 18 ? true : false;
    }
  }

  // short hand for creating js object literals
  function createPerson(fName, lName) {

    // you dont have to use fName: fName, if the key and value variables are same
    let newPerson = {
      fName,
      lName
    };
    display(newPerson);
  }

  createPerson('Adi', 'Tyagi');

  display(person.age);
  display(person.isAdult());
  display(person.isMinor());

  // to get all the properties and methods on an object
  display(Object.keys(person));
  for (const key in person) {
    if (person.hasOwnProperty(key)) {
      const element = person[key]; // vlaue of every key
      display(key);
    }
  }

  let healthStats = {
    height: 150,
    weight: 70
  };

  function mergedHealthStats(person, healthStats) {
    return Object.assign({}, person, healthStats);
  }

  let mergedPerson = mergedHealthStats(person, healthStats);

  display(mergedPerson);

  // even the original object is also changed
  display(person);

  // creating an object using Function Constructor
  function Student(fName, lName, age) {

    // this refers to the object calling this function
    this.firstName = fName;
    this.lastName = lName;
    this.age = age;
    this.isAdult = function () {
      return this.age > 18 ? true : false;
    }
  }

  // new creates a new object and sets "this" to the calling object
  let student1 = new Student('Aditya', 'Tyagi');
  let student2 = new Student('Ayush', 'Tyagi');
  display(student1);
  display(student2);

  // creating an object using Object.create()
  let student3 = {
    firstName: 'Pinky',
    lastName: 'Tyagi'
  };

  let student4 = Object.create(
    Object.prototype,
    {
      firstName: {
        value: 'Pinky',
        enumerable: true,
        writable: true,
        configurable: true
      },
      lastName: {
        value: 'Tyagi',
        enumerable: true,
        writable: true,
        configurable: true
      }
    }
  );

  display(student3);

  // prints same for alot more code
  display(student4);

  // ---------------------------------------------------------

  let parent = {
    "first name": 'Kabir',
    "last name": "Singh",
    phoneNumber: '9811506498',
    address: {
      houseNo: 45,
      lane: 3
    },
    parentsName: {
      firstName: 'Rohan',
      lastName: 'Singh'
    }
  };

  let lastName = "last name";
  display(parent['first name']);
  display(parent[lastName]);

  // Object.defineProperty(parent, "phoneNumber", { configurable: false });

  // changing a property's writable property
  Object.defineProperty(parent, "phoneNumber", { writable: false });

  // This will not allow me to change the address property i.e will not allow me to let it point another object. 
  // But I will still be able to change the values on the address object.
  // the "address" pointer is just a pointer to an object in memory and when you make it read-only, so the only thing you are doing is
  // preventing it to point to some other object.
  Object.defineProperty(parent, "address", { writable: false });


  // throws error
  // parent.address = {};

  // does not throw error
  parent.address.houseNo = 77;

  // making address not enumerable
  Object.defineProperty(parent, "address", { enumerable: false });

  // will only print enumerable properties
  for (const key in parent) {
    if (parent.hasOwnProperty(key)) {
      display(key + ': ' + parent[key]);
    }
  }

  // the address property will also not show in Object.keys()
  display(Object.keys(parent));


  // throws error
  // parent.phoneNumber = '9888888';
  display(Object.getOwnPropertyDescriptor(parent, "phoneNumber"));

  // GETTERS
  // parentsFullName -> name of the getter
  Object.defineProperty(parent, 'parentsFullName',
    {
      get: function () {
        return this.parentsName.firstName + ' ' + this.parentsName.lastName;
      },
      set: function (value) {
        let nameParts = value.split(' ');
        this.parentsName.firstName = nameParts[0];
        this.parentsName.lastName = nameParts[1];
      }
    }
  );

  // using getter
  display(parent.parentsFullName);

  // using setter
  parent.parentsFullName = "Pankaj Singh";

  display(parent.parentsName.firstName);
  display(parent.parentsName.lastName);
  display(parent.parentsFullName);

  display('-------------------------------------------');

  function Person2(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  display(Person2.prototype);

  // changing only Person2's prototype also changes the prototype of the object created using the same function.
  Person2.prototype.age = 24;

  let jim = new Person2('Jim', 'Koopar');
  let hero = new Person2('Hero', 'Kapoor');

  display(jim.__proto__);
  display(hero.__proto__);

  // changing ant property on the prototype of an object created using the function constructor, will change the prototypes of all.
  // therefore, this is the same prototype
  hero.__proto__.age = 55;

  display(jim.__proto__ === Person2.prototype);

  let ayush = new Person2('Ayush', 'Tyagi');

  ayush.age = 18; // the age is present on the ayush object.
  display(ayush.hasOwnProperty('age')); // when the original ayush object has "age" as its own property and not only on its prototype
  display(ayush.age); // age is not present on the ayush object, it is present on the prototype of ayush object.
  display(ayush.__proto__.age); // even though the ayush object has a property "age" of its own, it also has the age property on its prototype

  display('-------------------------------------------');

  display(ayush.__proto__);
  display(ayush.__proto__.__proto__);
  display(ayush.__proto__.__proto__.__proto__);


  display('-------------------------------------------');

  // creating your own prototypal chain

  // PARENT - constructor function
  function PersonForCollege(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;

    // getters and setters
    Object.defineProperty(this, 'fullName', {
      get: function () {
        return this.firstName + ' ' + this.lastName;
      },
      enumerable: true
    });
  }

  // CHILD - constructor function
  // Make student inherit from person
  function StudentForCollege(firstName, lastName, age) {

    // calling the parent
    // this will add all the properties of the parent to the child as well and will be visible on logging
    PersonForCollege.call(this, firstName, lastName, age);

    this._enrolledCourses = [];

    this.enroll = function (courseId) {
      this._enrolledCourses.push(courseId);
    }

    this.getCourses = function () {

      // we are also able to access the parents properties using "this" like fullName
      return this.fullName + ' enrolled courses are: ' + this._enrolledCourses.join(', ');
    }
  }

  // Inherit person
  // These 2 lines are always required to create a Prototypal Inheritance chain
  // display(StudentForCollege.prototype.constructor);
  StudentForCollege.prototype = Object.create(PersonForCollege.prototype);
  // display(StudentForCollege.prototype.constructor);
  StudentForCollege.prototype.constructor = StudentForCollege;
  // display(StudentForCollege.prototype.constructor);

  let jimmy = new StudentForCollege('Jimmy', 'Kooper', 18);

  display(jimmy);
  display(jimmy.__proto__);
  display(jimmy.__proto__.__proto__);

  jimmy.enroll('CS101');
  jimmy.enroll('MAT01');
  display(jimmy.getCourses());

  display('-------------------CLASSES------------------------');
  class PersonForCollege2 {
    constructor(firstName, lastName, age) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
    }

    get fullName() {
      return this.firstName + ' ' + this.lastName;
    }

    set fullName(fullName) {
      var names = fullName.split(' ');
      this.firstName = names[0];
      this.lastName = names[1];
    }

    isAdult() {
      return this.age > 18 ? true : false;
    }
  }

  let tom = new PersonForCollege2('Tom', 'Holland', 18);

  // setter
  tom.fullName = 'Aditya Tyagi';

  // getter
  display(tom.fullName);

  display(tom.isAdult());

  // changing property descriptors of getter on a class
  Object.defineProperty(PersonForCollege2.prototype, 'fullName', { enumerable: true });

  display(tom);

  display('-------------------INHERITANCE IN CLASSES------------------------');

  class StudentForCollege2 extends PersonForCollege2 {
    constructor(firstName, lastName, age) {
      super(firstName, lastName, age); // this calls the constructor of the class we are extending
      this._enrolledCourses = [];
    }

    enroll(courseId) {
      this._enrolledCourses.push(courseId);
    }

    getCourses() {
      return this.fullName + ' has courses: ' + this._enrolledCourses.join(', ');
    }

    // static methods
    static fromPerson(person) {
      return new StudentForCollege2(person.firstName, person.lastName, person.age);
    }

    // static property
    static adultAge = 18;

  }

  let pinky = new StudentForCollege2('Pinky', 'Tyagi', 29);
  display(pinky);

  let newPer = new PersonForCollege2('Anant', 'Tyagi', 26);

  display(StudentForCollege2.fromPerson(newPer));
  display(StudentForCollege2.adultAge);


  display('-------------------MATH OBJECT------------------------');
  display(Math.PI);
  display(Math.max(1, 2, 44, 3, 21));

  display('-------------------DATE OBJECT------------------------');

  // the "Month" is 0 based, rest all are 1 based. Therefore 3 here will show April and not March.
  let date = new Date(2020, 3, 12, 16, 12, 12, 12);
  display(date.toString());

  // determining how much time has passed between two dates - subtract them
  let date1 = new Date(2050, 3, 25, 13, 1, 30, 15);
  let date2 = new Date(2050, 3, 25, 13, 1, 30, 20);

  display(date2 - date1); // 5 milliseconds

  display('-------------------REGEX OBJECT------------------------');
  function checkPasswordComplexity(password) {

    // when regex is in string, we have to provide an additional \ (backslash)
    // RegExp() takes a second parameter - the regex flags. g: global, i: ignore case
    // let regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$', 'gi');

    // alterante way to create a regex, so that we dont have to worry about escaping characters
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/gi;

    return regex.test(password);
  }

  display(checkPasswordComplexity('weak'));

  function findAlerts(logData) {
    // let regex = /ERROR.*?:/g;

    // CREATING CAPTURE GROUPS
    // 1. Capture the level of error
    // 2. Capture the error message
    let regex = /ERROR(.*?):(.*?);/g;

    // this will only call the regex twice
    // displayRegexArray(regex.exec(logData));
    // display('---------------');
    // displayRegexArray(regex.exec(logData));

    // return regex.exec(logData);

    // keep finding the error until there are no more
    let result = regex.exec(logData);
    while (result !== null) {
      display(result[1]);
      display(result[2]);
      display('--------------------******-----------------');
      result = regex.exec(logData);
    }

  }

  let logData = 'INFO:OK;ERROR(HIGH):Something broke;INFO:SAMPLE;ERROR(LOW):Something broke;';
  findAlerts(logData);
  // display(findAlerts(logData));
  // display(findAlerts(logData)); // same result, even with the flag because we are creating regex again - this resets the regex.
  // display(result);

  // display(result[0]); // accessing array
  // display(result.index); // where did the match was found
  // display(result.input); // original string


})();
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

})();
# NOTES ON JS OBJECTS, PROTOTYPES and CLASSES

# OBJECTS

## Creating JS Objects
There are 3 ways we can create a JS object:
1. Object Literals  
2. Constructor Functions  
3. Classes  

Functions on objects are called methods.  

Displaying keys/properties/methods on a object:  
1. Object.keys()  
2. for...in loop  

JS Equality Operators  
1. == 
2. ===  
3. Object.is() - Returns a boolean. Object.is(obj1, obj2)  

![image](https://user-images.githubusercontent.com/18363595/79635116-9bf2b300-818c-11ea-8a21-b949a3aafe39.png)

***  

## COMPARING OBJECTS
Objects are different than primitive types in JS when it comes to comparing them for equality. When we compare the primitive types, we are comparing their values using ==, === or Object.is().  

But when it comes to comparing 2 different objects with same properties using ==, === and Object.is(), it compares the memory addresses where these objects are stored. Thus they will always give FALSE, even if the properties of the 2 objects are same.  

![image](https://user-images.githubusercontent.com/18363595/79635276-a95c6d00-818d-11ea-90f2-b5e1ded4099d.png)

***  

## COPY OBJECT or MERGE OBJECTS

We always have to ensure about the mutation of the original object while making copies or merging objects.  

`Object.assign()` returns a merged object but at the same time it also mutates (changes) the original object too.  

`Object.assign()` takes unlimited parameters. It merges all the objects on the left to the object on the right. So if you give `{}` object to merge all the objects, it will not mutate the original object.  

## CONSTRUCTOR FUNCTIONS
When you want an object to have a particular shape for the entire app, you can create objects using Function Constructor.  
This will help us create making multiple instances.  

## Object.create()
The reason why nobody uses Object.create() is that it is very verbose. Technically, Object literals and Function constructor uses Object.create() behind the scenes to create the object.  

***  

# JAVASCRIPT OBJECT PROPERTIES

Access properties using the dot notation and the bracket notation.  
We use the bracket notation when the property names carry space. This is the case when the identifier name is not a valid identifier.  
A non-valid identifier is a property with space in it or any other special character.  

```javascript
  let parent = {
    "first name": 'Pawan',
    "last name": "Tyagi"
  };

  display(parent['first name']);
```
This is also used when the property name is saved in a variable. This is also used in for...in loop  

### Properties of a Object property - Important

You can use `Object.getOwnPropertyDescriptor(object, property)` to see details of an Object property.

```javascript
 let parent = {
    "first name": 'Pawan',
    "last name": "Tyagi",
    phoneNumber: '9811506498'
  };

console.log(Object.getOwnPropertyDescriptor(parent, "phoneNumber"));
```  
There are mainly 4 properties of an object's property:  
1. `value`: The value of the property.  
2. `writable`: It defines if the value can be changed from its initial value.  
3. `enumerable`: By default, all the properties on an object are enumerable i.e. we can enumerate over them using for...in loops and list them using `Object.keys()`. Changing this property will change all that!  
4. `configurable`: This property (if false) does not allow the object property's attributes (enumerable) to change.


You can even change an object property's property using `Object.defineProperty();`.  
But this will not prevent to change the property value in a nested object. For example:  

```javascript
  let parent = {
    "first name": 'Pawan',
    "last name": "Tyagi",
    phoneNumber: '9811506498',
    address: {
      houseNo: 45,
      lane: 3
    }
  };

  // This will not allow me to change the address property i.e will not allow me to let it point another object. 
  // But I will still be able to change the values on the address object.
  Object.defineProperty(parent, "address", {writable: false}); 

  
  // throws error
  // parent.address = {};
  
  // does not throw error
  parent.address.houseNo = 77;
```

### Object.freeze()
But if you still want to make the `address` property read-only, you can use `Object.freeze(parent.address)`. This way you wont be able to change property on that `address` property.  

### Making a property not enumerable
This means the property will not show in for...in loop and it will also not show in Object.keys().  
Even serialising the object using `JSON.stringify()` will not show that property.  

But...you'll still be able to access the property via dot notation or bracket notation.  

### Configurable attribute of object's property
This property (if false) does not allow the object property's attributes (enumerable) to change. Therefore, you cannot change the property descriptor. You can also NOT DELETE the property off an object.  



```javascript

  let parent = {
    "first name": 'Pawan',
    "last name": "Tyagi",
    phoneNumber: '9811506498',
    address: {
      houseNo: 45,
      lane: 3
    }
  };

 Object.defineProperty(parent, "phoneNumber", { configurable: false });

  // changing a property's enumerable property - WILL THROW ERROR
  Object.defineProperty(parent, "phoneNumber", { enumerable: false });

  // Once changed, you cannot change it back - WILL THROW ERROR 
  Object.defineProperty(parent, "phoneNumber", { configurable: true });

  delete parent.phoneNumber; // WILL GIVE AN ERROR
```

### GETTERS AND SETTERS using Object.defineProperty()
Get a value through a function and set a value through a function.  

```javascript
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
```
***  

# JAVASCRIPT PROTOTYPES AND INHERITANCE

**A Function's Prototype**  
A function's prototype is the object instance that will become the prototype of all objects created using this function as a function constructor.  
Every function in JS has a `prototype` property.  

**A Object's prototype**  
An object's prototype is the object instance from which the object is inherited.  
Every object has a prototype but not as its property.

Therefore, an object's prototype and a function's prototype are different. 

When you try to access a property on an object, it first looks in the main object to have a property by that name, if it fails to find it there, then it looks on it prototype. The instance properties overrides the prototypes properties.  

When you create a Function Constructor, an empty object with the name of the Function Constructor is also created in the memory. This empty object is the prototype obejct for that Function Constructor.  
![image](https://user-images.githubusercontent.com/18363595/79683353-1bdd5380-8247-11ea-8cc2-11844a9ef08d.png)


## CHANGING A FUNCTION'S PROTOTYPE
Now, if we make the Function Constructor's prototype to point to a completely new object in memory, then we'll be able to change the protoype the changes wont reflect on the object instances made from that Function constructor before changing the prototype.  

![image](https://user-images.githubusercontent.com/18363595/79683448-d40afc00-8247-11ea-9f76-9995f93009eb.png)

## OBJECT INHERITANCE  
There are multiple levels of inheritance for the prototypes. The last one is when you hit `null` while moving up the prototypal chain. This is usually the case when you hit the `Object`'s prototype.  By default, all object's in JS inherit from `Object` and `Object` has no prototype.

```javascript
function Person2(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

let ayush = new Person2('Ayush', 'Tyagi');

display(ayush.__proto__);
display(ayush.__proto__.__proto__);
display(ayush.__proto__.__proto__.__proto__); // null

```

## CREATING YOUR OWN PROTOTYPAL CHAIN
To create a Prototypal chain, the three lines you use are:  

```javascript

  // 1.
  StudentForCollege.prototype = Object.create(PersonForCollege.prototype);

  // 2.
  StudentForCollege.prototype.constructor = StudentForCollege;


  // and calling the Parent function constructor from the child and passing the the context via "this"
  PersonForCollege.call(this, firstName, lastName, age); 
```

1. We are using `Object.create()` and not `new` keyword to set the `StudentForCollege`'s prototype because if we use the `new` keyword, it will execute the `PersonForCollege()` function at this point. But we dont want that. We dont want to call the `PersonForCollege()` until we are actually creating a new student using `new StudentForCollege()`.  This also changes the `constructor` property on the prototype of `StudentForCollege` as a side effect. Hence, we need to explicitly set the constructor back to `StudentForCollege` in step 2.

2. All prototypes have a `constructor` property that points to the function that is used to create it. This is used to set the `constructor` property of the prototype of the `StudentForCollege` which was changed as a side effect by Step 1.  

***  

# CLASSES
Classes play the exact same role as the constructor functions. They are templates for creating objects and containing logic. Classes are syntactic sugar to do everything you can do using Function Constructors.  

## CREATING OBJECTS, GETTERS, SETTERS, FUNCTIONS
```javascript

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
  display(tom);
```

NOTE:  
When you create a getter, you create it with `enumerable` property set to false. This means that while you console.log(object) created using the class, the getter will not show.  

The Getters and Setters in the class live on the prototype and if I want to change property descriptors, then I have to use `Object.defineProperty()` on the prototype of class.  


## MODIFYING PROPERTY DESCRIPTORS
```javascript
  // changing property descriptors of getter on a class
  Object.defineProperty(PersonForCollege2.prototype, 'fullName', { enumerable: true });
```
## INHERITANCE IN CLASSES
 Use `extend` and `super()`.  

 ```javascript
   class StudentForCollege2 extends PersonForCollege2 {
    constructor(firstName, lastName, age) {
      super(firstName, lastName, age); // this calls the constructor of the class we are extending
      this._enrolledCourses = [];
    }

    enroll(courseId) {
      this._enrolledCourses.push(courseId);
    }

    getCourses() {
      // able to access "fullName" property defined on the parent class
      return this.fullName + ' has courses: ' + this._enrolledCourses.join(', ');
    }

  }
```

## STATIC PROPERTIES AND METHODS
Static properties and methods are items on the class that you can access without creating an instance of the class.  
They will have a single copy which will be used by all the instances created from that class.  
Calling static properties and methods is simple. You just call it via the class name with a dot notation. `Student.property`, without making any instance of the class.  

```javascript
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
```

# JS BUILT-IN OBJECTS

## [MATH](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
All the methods and properties on the Math object are static. We dont have to create an instance of Math object to use them. Because they are static, you can use them directly.  

```javascript
  display(Math.PI);
  display(Math.max(1, 2, 44, 3, 21));
```

## [DATE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
The dates are calculated from Jan, 1 1970 (Universal Time Zone). This is called UNIX EPOC time.  

```javascript
  // the "Month" is 0 based, rest all are 1 based. Therefore 3 here will show April and not March.
  let date = new Date(2020, 3, 12, 16, 12, 12, 12);
  display(date.toString());
```

## [REGEX](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

```javascript
  function checkPasswordComplexity(password) {

    // when regex is in string, we have to provide an additional \ (backslash)
    // RegExp() takes a second parameter - the regex flags. g: global, i: ignore case
    // let regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$', 'gi');

    // alterante way to create a regex, so that we dont have to worry about escaping characters
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/gi;

    return regex.test(password);
  }

  display(checkPasswordComplexity('weak'));
```

### EXEC
THe `Regex.exec()` is a method which helps to find a particular "thing" in a long string and returns an array as soon as it finds the first match.  It is used to search a string. But instead of returning a boolean value like `test()`, it returns the matching string

Always ensure that the while calling exec. you create the regex once and call the exec() multiple times (with the flag). Not the other way round. If the flag is ommited, then each time it will find the first match and stop trying. 

If you are not using regex flags like global, then the regex.exec() will always return the same result.

If you are calling regex.exec() multiple times after creating the regex once, exec() will use its internal state management and provide you with the next match, instead of the first.  It uses it to track where it is in searching string for future calls.

The array which regex.exec() returns has 3 properties: Regex match, index, input(original text input).  

### CAPTURE GROUPS
**Why does the regex.exec() returns an array even if there is a single match?**  
CAPUTRE GROUPS: They allow you to capture and return data from within the input strings.  
The `( )` creates capture groups.  













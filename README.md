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






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





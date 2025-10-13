---
outline: [2, 4]

footer: true
lastUpdated: true
next: false
prev: false
---
# Pointers

I learned about C++ pointers in 2010 and I was a college student traumatized by managing them. Maybe I had a professor that sucked though. 

Since coming back to a job where I have to interface with them, C++ has actually become way better than I thought, and Unreal Engine does a great job papering over a lot of the complexities that made me fucking hate myself when I had to manage pointers or remember remotely anything about them. 

## The Unreal pointers I care about

At its core, I care about maybe three pointers because they're the ones I use most often:
- `TObjectPtr` for your typical pointers, these have the benefits of access tracking (your IDE knowing when they're used) over normal pointers.
- `TWeakObjectPtr` for keeping pointers to something without necessarily needing it to be valid all the time.
- `TSoftObjectPtr` for keeping a pointer to a resource that _may or may not be loaded_

### TObjectPtr
I fucking love these things. They behave almost identically to their normal C++ counterparts, but they give you some additional goodies for
a better developer experience in the editor. 

```C++
/** C++ (still compatible) */
UMyObjectType* MyTypePointer = nullptr;

/** Unreal C++ (better developer experience in the editor, I guess) */
TObjectPtr<UMyObjectType> MyTypePointer = nullptr;
```


### TWeakObjectPtr

::: tip
**This is a Smart Pointer**
:::

I use `TWeakObjectPtr` when I need a pointer or reference to something my code doesn't own, but that it can use if it's valid. 
If I have a class `MyClass` and I need a pointer to `YourClass` that I get from some global system or call, I don't want your class
to stay alive if it doesn't need to, because a `TObjectPtr` will keep it alive.

```C++
/** This thing rips. */
TWeakObjectPtr<UMyObjectType> MyWeakTypePtr = ...;
```
Generally you want to check your weak pointer before you use it. 

```C++
/** Check validity first */
if(MyWeakTypePtrr.IsValid()) {
   UMyObjectType* ResolvedPtr = MyWeakTypePtr.Get()

    /** You are now free to use this as a normal pointer */
}

/** You could also just use an if-init statement. */
if(UMyObjectType* ResolvedPtr = MyWeakTypePtr.Get(), IsValid(ResolvedPtr)) {
    /** You are free to use your pointer as valid */
}
```


### TSoftObjectPtr

::: tip
**This is a Smart Pointer**
:::
This is a nice pointer too. It allows you to check to see if something is loaded. It isn't guaranteed to be `non-null`. but you have some validity checks
in place that will help you determine that. 

```C++
TSoftObjectPtr<USomethingINeedToLoad> MySoftPointer = ...;

/** 
Check to see if this pointer is a valid pointer 
(it still may resolve to NULL content though) 
*/
MySoftPointer.IsValid()

/** 
Check to see if this pointer is valid, 
and referring to something not yet loaded 
*/
MySoftPointer.IsNull()

/** 
This isn't pointing to anything valid, 
but it could in the future 
*/
MySoftPointer.IsPending()

/** 
Use this with an asynchronous (or synchronous) 
loading paradigm to get what it points to!
 */
MySoftPointer.ToSoftObjectPath()
```

## Other Unreal pointers I don't use as much
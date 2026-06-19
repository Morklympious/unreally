---
outline: [2, 4]

title: "Conceptualize This"
date: 2026-02-04
footer: true
lastUpdated: true
next: false
prev: false
---

# Conceptualize This
Alright. I'm not a huge C++ nerd. I come from the world of JavaScript where I don't _have_ types. I don't _do_ things for the compiler. There is nothing appealing about giving the compiler exactly what it wants. You might argue "b-but that's how you know it's working!". 

Bruh.

Let me shoot myself in the foot a little bit, okay? 

Anyways, I'll take this time to be a huge C++ nerd.

## Let's Talk About Templates. 

Templates are the thing I probably initially dreaded the most about C++, especially in college when all I knew before that point was a little bit of Java and I started delving into JavaScript. While they were scary at the time, they've become much, much better than I remember. Nowadays, if anything, templates help me reduce boilerplate all while managing to be cute when I write. 

Let's assume I'm writing a function that allows me to get the name of something. I'll use a template to assume it's some derivation of `UObject`

```C++
template <typename T = UObject>
FName GetNameOfObject(T* InObject)
{
    return InObject->GetName();
}
```

With a default, I can assume `T` will be a `UObject` unless expressly mentioned.
When compiling, the compiler will scan my code for every type I've called this function with, and generate a function signature based on how I've used my templated function. Which is GREAT. 

```C++
/** If I call it with these types... */
GetNameOfObject(UUserWidget* MyWidget);
GetNameOfObject(UPlayer* MyPlayer);

/** It'll generate these signatures */
FName GetNameOfObject(UUserWidget* InObject)
{
    return InObject->GetName();
}

FName GetNameOfObject(UPlayer* InObject)
{
    return InObject->GetName();
}
```

This works well! It works for almost any `UObject`. but what if I didn't want it to work with JUST `UObject`? What if I had a way to accept types and to have the compiler let me know when I pass in an incorrect type? The compiler actually has no idea that something won't work until it eventually runs into it. What if I pass something that isn't a UObject? what if I pass a struct?

In some of these cases, you can check with `static_assert` and validate in the function body. That's a great pattern, but what if it was more... "baked in" to the language?

## Let's Talk About Concepts

[Concepts](https://en.cppreference.com/cpp/language/constraints) are new as of C++ 20, and they help you supercharge your template implementations.
Building on our earlier example of "Getting the name of something", we can write a concept to enforce that we pass in the right type. Let's write a concept that the compiler can check against. We're going to write the "Is `UObject`" concept.

```C++
template <typename T>
concept CIsUObject = UE::CDerivedFrom<T, UObject>;
```

This is a concept that uses another concept that already exists. We can take our defined `CIsUObject` and enforce it in our template function. 

```C++
template <typename UObjectType = UObject>
requires CIsUObject<UObjectType>
FName GetNameOfObject(T* InObject)
{
    return InObject->GetName();
}
```

With this concept, if I try to call something like `GetNameOfObject({})` with an Array, or Struct, my compiler will tell me that I _cannot_ do that because it will **fail** the constraint of `is_derived_from<T, UObject>`. This is a solution that allows you to get more useful error messaging _at compile time_ when you pass in an incompatible type. 

And it's cool! We can go further though. What if I _did_ want to pass in a `struct` and have it work? This is where you have to understand ["nominal" vs. "structural" typing](https://liamduckett.com/posts/structural-and-nominal-typing). 

### Nominal vs. Structural Typing
I already linked you to a good resource, but in case you need a primer:

**Nominal typing** is probably what you're used to, it's an **explicit** declaration of a type, e.g. `UObject`. **Structural Typing** is less to do with an explicit declaration of a type, and more of a family of implementation. In our case, we're trying to write a function called `GetNameOfObject`, which is implicitly assuming a nominal type (`UObject`). What if we only accepted inputs to our function that simply implemented a `GetName()` function? 

Going back to our original, non-concept backed implementation, we can do that, but we cant _safely_ do that. 

```C++
template <typename T = UObject>
FName GetNameOfObject(T* InObject)
{
    return InObject->GetName();
}

/** Assuming this has a valid GetName function */
struct Nameable {
    FName GetName() { return "MyName" };
}

/** Should print "MyName" */
GetNameOfObject(Nameable());
```


Again, templates are super powerful, and this above example will work! but it also means we're back to square one of being at-risk to pass in an incompatible type. If you want compiler safety and a warning when you're doing something that isn't compatible, concepts can help us specify a structural type instead of a nominal one. 

## Rewriting Our Implementation

We can change our concept to look at the structure of an input rather than the type. 

```C++
/** Old */
template <typename T>
concept CIsUObject = UE::CDerivedFrom<T, UObject>;

/** New */
template <typename T>
concept CHasGetName = requires(T* GetNameType)
{
    /** This expression will be evaluated by the compiler */
    { GetNameType->GetName() } -> UE::CSameAs<FName>
}
```

With a change from `CIsUObject` to `CHasGetName`, we can actually now pass anything into that function that directly implements a `GetName` function. `UObjects` happen to do this, I could create a lightweight struct that implements a `GetName` function, and as long as the inputs I pass into my function have those specifications, that **structural identity**, they will be compatible!

With the new concept, our function might need a rewrite too. Let's rewrite `GetNameOfUObject` to simply be `GetName`


```C++
template <typename HasNameType = UObject>
requires CHasGetName<HasNameType>
FName GetName(HasNameType* InNameable)
{
    return InNameable->GetName();
}

/** If you only have one constraint you can also use shorthand */
template <CHasGetName HasNameType>
FName GetName(HasNameType* InNameable)
{
    return InNameable->GetName();
}
```

With this new concept backed implementation, you can pass:
- Any UObject
- Any Class Object with a `GetName` method
- Any Struct with a `GetName` method. 

This is useful for mocking data for testing, or for generalizing what would otherwise be more-verbose utility code to account for multiple different types as long as they are structurally similar.

## Wrapping Up
Concepts are super cool! You can use them to unify many codepaths in Unreal, especially when you're spending time making separate calls to get things like the `UWorld` or the `APlayerController` from a Widget, an Actor, a Subsystem, or anything else!

You can specify concept backed functions and create blueprint compatible shims that call into them with the appropriate types. Safety in C++ ultimately flows over to safety in Blueprint. 

Thanks for letting me nerd out. 
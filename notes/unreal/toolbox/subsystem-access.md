---
outline: [2, 4]

title: "Subsystem Access Toolbox"
footer: true
lastUpdated: true
next: false
prev: false
exclude: true
---

# Subsystem Access Snippets

::: warning
This is a work in progress! I'm trying, okay? I have a full time job and it's NOT THIS.
So if things are incomplete... uhhhh. I'LL FIGURE IT OUT (or bug me about it ok?)
:::

The following is a toolbox of snippets useful for accessing different subsystems in unreal engine.
For each of these following subsystem access snippets, I'm going to try to provide

1. A concept to enforce inputs related to retrieving the related subsystem
2. A templated function to accept the concept backed input
3. Some examples of usage!

::: tip
If your unreal engine version isn't running C++ 20 (some versions of 5.X run C++ 17) then you
won't be able to implement concepts (that's fine, just be careful!)
:::

## World Subsystem
### Templated Function
The regular templated function simply assumes you're really only using this with UObjects, as it 
```C++
template <typename WorldAwareType = UObject>
static ThisClass* Get(WorldAwareType* InWorldAwareContext)
{
    UWorld* CurrentWorld = InWorldAwareContext->GetWorld();

    if(!IsValid(CurrentWorld))
    {
        return nullptr;
    }

    return CurrentWorld->GetSubsystem<ThisClass>();
}
```

### Concept-backed Templated Function
The concept backed version uses a concept to assert that whatever is passed in to this function
is "world aware". We could write this as being derived from `UObject` (since all `UObject` types have a `GetWorld`),
but we're going broader to say you could also pass in a struct or any type that implements a `GetWorld()` function.

You'll also note that the concept enforces `IsValid` since the template function calls it. So we just need to be sure we
enforce at compile time that our type is going to not explode on calling those particular functions.

```C++
template <typename T>
concept CIsWorldAware = requires() 
{
    /** Implements a GetWorld Function that returns a UWorld */
    { T->GetWorld() } -> CSameAs<UWorld>

    /** Implements an IsValid Function that returns bool */
    { IsValid(T) } -> CSameAs<bool>
}

template <CIsWorldAware WorldAwareType>
static ThisClass* Get(WorldAwareType* InWorldAwareContext)
{
    UWorld* CurrentWorld = InWorldAwareContext->GetWorld();

    if(!IsValid(CurrentWorld))
    {
        return nullptr;
    }

    return CurrentWorld->GetSubsystem<ThisClass>();
}
```

## Game Instance Subsystem

## Local Player Subsystem



---
outline: [2, 4]

title: "UObject"
footer: true
lastUpdated: true
next: false
prev: false
---
# Object (`UObject`)
Objects in Unreal Engine... where do I begin. 

This is everything. Okay? it's basically everything meaningful in Unreal. Everything you think about that supports replication, `UPROPERTY` behavior, or any other garbage-collection lifecycle behavior essentially starts with being a `UObject`. 

## What You Should Know
- Everything is a `UObject`. Everything except for Structs (`FInstancedStruct`, `UStruct`)
- `UObjects` have wonderful semantics around validity checks, you can use `IsValid(Object)` to check the validity of anything deriving from a `UObject`.
- Everything prefixed with `U` in its classname is considered a `UObject` by convention.

## Additional Notes
- `GetNameSafe(Object)` is my favorite way to safely get the name of an object (it returns `"None"` on a `nullptr`)


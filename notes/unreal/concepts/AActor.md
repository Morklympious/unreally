---
outline: [2, 4]

title: "AActor"
footer: true
lastUpdated: true
next: false
prev: false
---
# Actor (`AActor`)

An actor is basically the lifeblood of any game. Anything you can kind of spawn on demand in the world is essentially an `AActor` instance. You name it: a character, a chair, a sphere that players can't see but that has behavior of its own? that's an actor!

`AActor` derives from `UObject`, but I mean... everything basically worth its salt in this engine is a `UObject`. This is just one of the first meaningful deviations you'll run into when it comes to talking about Unreal nomenclature.

## What You Should Know
- Actors are typically the "spawnable" things you place in the world or in the level. 
- There are also actors that DON'T have a spawnable representation, like `APlayerState` and `AGameMode`
- `AController` is a unique case that doesn't _technically_ have a visible presentation, but that needs to be spawned in the world and linked to a [Local Player](./ULocalPlayer.md).

## Spawning Actors
The `UWorld` instance of your game has the ability to spawn actors, there's `SpawnActor` and `SpawnActorDeferred`

## Additional Notes
- More later, I guess.


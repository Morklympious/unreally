---
outline: [2, 4]

title: "Local Player Subsystem"
footer: true
lastUpdated: true
next: false
prev: false
---
# Local Player Subsystem (`ULocalPlayerSubsystem`)

A local player subsystem refers to a singleton object that exists alongside a `ULocalPlayer` instance. Essentially if you have a local player, you are _guaranteed_ to have a local player subsystem.

## What You Should Know

- If you have a `ULocalPlayer`, you have a `ULocalPlayerSubsystem`. 
- Subclassing the `ULocalPlayerSubsystem` will create it for the local player in your game. 
- The Subsystem has a method called `PlayerControllerChanged` that will fire when the local player receives a controller 
- `ULocalPlayerSubsystem` instances only exist on the client. They're a good candidate for UI or other systems if you have only a single local player.

## Why it's Useful
a `ULocalPlayerSubsystem` is a useful construct if you need a singleton that has a lifetime tied to a local player. I personally like to tie user interface logic to a local player subsystem because without a local player to speak of, there's no need to render widgets for gameplay display.

## Additional Notes
- You can centralize a lot of event driven behavior at the local player subsystem level like when the subsystem gets a new valid player controller
- `UUserWidget` types can access a local player subsystem easily using `UserWidget->GetOwningLocalPlayer()` since they're typically associated with a local player when created
    - Using `CreateWidget` with an owner that is a particular Player Controller will wire a widget up such that calling for the owning local player will return the correct `ULocalPlayer`

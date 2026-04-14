---
outline: [2, 4]

title: "APawn"
footer: true
lastUpdated: true
next: false
prev: false
---

# Pawn (`APawn`)

A `Pawn` is a particular brand of `AActor` that is controllable by an instance of `APlayerController`. The pawn is basically a controllable actor that responds to the player's input. When you're playing a single player game, the character moving around the world at your behest is your pawn. When you enter a vehicle and start driving the vehicle? That's the new pawn. 

A pawn is basically "anything the local player controls with input".

## What You Should Know
- Pawns are controlled by Controllers. You'll typically see this by way of Player Controller. 
- Pawns are transient. If you're trying to retrieve them synchronously with the assumption they're there: don't.
- From the Pawn, you can access an `APlayerState` or `AController` instance. 

## Pawns Are Spicy `AActors`
Pawns are simply actors with a little more juice. They're possessed by a controller, they have easy links to the Player state using `GetPlayerState()` or the owning controller via `GetController()`

## Additional Notes
- You should never think of a pawn as a guarantee. Pawns disappear and reappear all the time.
- When you need a stable anchor to a pawn, you should bind to that pawn's owning controller, from there you can bind to `OnPawnPossessedChange`


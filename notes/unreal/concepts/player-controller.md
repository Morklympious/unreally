---
outline: [2, 4]

title: "The Player Controller"
footer: true
lastUpdated: true
next: false
prev: false
---
# The Player Controller

The Player Controller (`APlayerController`) refers to a "glue" layer between a human sitting in front of a screen interacting with the game
and the game itself. 

Something that makes me laugh from an actual page on the Unreal documentation site also explains it:

:::info
A PlayerController is the interface between the Pawn and the human player controlling it. The PlayerController essentially represents the human player's will.
:::

_I can't let you do that, Dave..._

Anyways:

It is responsible for a multitude of shit that make most of the game just work. At a glance, the
Player Controller can handle things like:

- Input
- Camera
- User-interface Elements
- You name it!

## This Thing is Everywhere
In general, it's a construct that is shared by many pieces of the game, and as such, _a lot of shit knows how to get the Player Controller_.

- `AActor` has `GetOwner()` and `GetOwner<APlayerController>()`
- `UUserWidget` has `GetOwningPlayer()`
- `UWorld` has `GetPlayerControllerIterator()`, `GetFirstPlayerController()`, `GetFirstPlayerController()`
- ... So yeah. 

If you have any object that is [World Aware](/journal/entries/15.10.25-static-world-aware-getter.md), then you basically have a way
to hassle-free retrieve the Player Controller

## Client and Server
The Player Controller is one of those things you'll pull your hair out trying to reason about because, I don't know, good documentation
is hard to come by, I guess. 

Here's what I've found out after suffering long enough:
- Player Controllers exist on both client and server. 
- Player Controllers can access Player State, Player Pawn, and a few other things that tie the concept of "Player" and "Game" together.
- Player Controllers **do not exist for networked actors** on a client machine. Only on the server.
- For each [Local Player](local-player.md) (`ULocalPlayer`), there exists a Player Controller (couch co-op will have multiple Player Controllers)

## Additional Notes
- I'll come back and add to this later, I'm sure. 


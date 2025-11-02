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

## What You Should Know
- The Player Controller exists for every **Local Player** on a client.
- Got 4 players playing split-screen? Congratulations, that's **four Player Controllers**
- Player Controllers _do not_ replicate from server to client by default (except for the Local Player's Controller)
- If you have a valid Player Controller, then you definitely have a valid Local Player (`ULocalPlayer`)

## This Thing is Everywhere
In general, it's a construct that is shared by many pieces of the game, and as such, _a lot of shit knows how to get the Player Controller_.

- `AActor` has `GetOwner()` which you can cast: `Cast<APlayerController>(GetOwner())`
- You can also use `GetInstigatorController()` if the actor was spawned by a pawn
- `UUserWidget` has `GetOwningPlayer()`
- `UWorld` has `GetPlayerControllerIterator()`, `GetFirstPlayerController()`, `GetFirstPlayerController()`

If you have any object that is [World Aware](/journal/entries/15.10.25-static-world-aware-getter.md), then you basically have a way
to hassle-free retrieve the Player Controller

## Client and Server
The Player Controller is one of those things you'll pull your hair out trying to reason about because, I don't know, good documentation
is hard to come by, I guess. 

Here's what I've found out after suffering long enough:

**On The Server**:
- Every connected player has a Player Controller
- Every Player Controller is accessible via `GetWorld()->GetPlayerControllerIterator()`

**On The Client**:
- Has **only its own** Player Controller, meant to represent the [Local Player](local-player.md)
- **DOES NOT** have Player Controllers for other networked players
- `APlayerState` exists instead of a Player Controller for discovering other player's information

**Example**:
1. If we have a networked multiplayer match with **4 players**:
- The server has **4 Player Controllers**
- Each client has **1 Player Controller** (representing their Local Player)

2. If we had the same networked multiplayer match with **4 players**, but **2** of them
were playing split screen on the same client:
- The server has **4 Player Controllers**
- The client with split-screen has **2 Player Controllers**
- The other two clients playing without split screen each have **1 Player Controller**

## Authority
Listen, I don't know much about this, but I do know that a Player Controller knows when it's local or not. A Player Controller can
call `IsLocalPlayerController`. Which means there are probably things that a client can do or request of its local Player Controller. 

If I (need to) figure it out I'll come back here.

## Additional Notes
- Player Controllers have one of the longest lifetimes. They persist through Pawns and sometimes level / map transitions.


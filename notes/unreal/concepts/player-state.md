---
outline: [2, 4]

title: "Player State"
footer: true
lastUpdated: true
next: false
prev: false
---
# Player State

The Player State (`APlayerState`) is... in terms I'll probably remember: "A box of random player related shit". I say this because from my understanding,
The Player State replicates to **all clients**, whereas the Player Controller only exists on the server and the owning client (it's not replicated to other clients).

Literally, the name is **Player State**. It's stateful information about the player that you might want to know.

I don't exactly know why that is, I just assume that a Player Controller is handling so much more than the Player State does that it 
would be _incredibly painful_ on the server to replicate player controllers. 

## What You Should Know
- Player State is information about a player, **replicated to all clients, not just the local client**.
- Player State is replicated _after_ the Player Controller, so it might be `nullptr` for a few frames at first.
- Player State persists through pawn changes (respawn / new possession).
- Any Player Pawn (`APawn`) can access a Player State associated with it with `APawn::GetPlayerState`

## Every Player has a Player State
This is a thing you'll have to understand, every player has a player state. Not just Local Players, but Networked Pawns too. 
This is basically how the Local Client finds out **literally anything** about a networked pawn or some pawn controlled by some other person over the internet.

Okay, maybe not literally anything, but things you'd like your local client player to know about other pawns including "metadata" style information about if they're
on your team, or in your party, or if they're on your friends list or they've captured some objective. Yeah. Like I said. It's called **Player State**.

## At-a-glance
`APawn` is an easy throughline to accessing Player State, here's an excerpt from 
`Pawn.h`:

```C++
/** 
    If Pawn is possessed by a player, returns its Player State. 
    Needed for network play as controllers are not replicated to clients. 
*/
APlayerState* GetPlayerState() const { return PlayerState; }

/** Templated convenience version of GetPlayerState. */
template<class T>
T* GetPlayerState() const { return Cast<T>(PlayerState); }
```

With this in mind, it means we can just call: `MyPawn->GetPlayerState()`. Since it's replicated though
it _might not_ return a valid pointer, so if you want to get more event-driven, you can do some overriding
for `APawn::OnPlayerStateChanged` in a subclass:

```C++
/** Called on both the client and server when ever SetPlayerState is called on this pawn. */
virtual void OnPlayerStateChanged(APlayerState* NewPlayerState, APlayerState* OldPlayerState) { }
```
If you pipe a delegate in there and `OnMyPlayerStateChangeDelegate.Broadcast(NewPlayerState)` you can 
begin reacting to Player State changes.

## Additional Notes
- Player State is also accessible from the Player Controller via `APlayerController::PlayerState`
- Changes to Player State should be authoritative on the server and replicate down. Any changes made locally won't meaningfully take.
- Player State commonly stores: player name, score, ping, team info, and other metadata that all clients need to see.
- For custom stats/data, subclass `APlayerState` and add replicated properties


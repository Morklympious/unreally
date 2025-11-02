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
the Player State actually replicates, where something like the Player Controller does not. 

I don't exactly know why that is, I just assume that a Player Controller is handling so much more than the Player State does that it 
would be _incredibly painful_ on the server to replicate player controllers. 

## What You Should Know
If you don't have time for this, here's the cliffnotes:

1. The Player State is not always valid, because it replicates. Initial calls to retrieve it might return `nullptr`.
2. The Player State is replicated to the client, thus point #1.
3. Any Player Pawn (`APawn`) has a method `GetPlayerState()`, that may or may not return a valid Player State.
4. Player State is accessible also from the Player Controller. 

Anyways, if you've got more time to read, go ahead.

## Every Player has a Player State
This is a thing you'll have to understand, every player has a player state. Not just Local Players, but Networked Pawns too. 
This is basically how the Local Client finds out **literally anything** about a networked pawn or some pawn controlled by some other person over the internet.


## Additional Notes
- I'll come back and add to this later, I'm sure. 


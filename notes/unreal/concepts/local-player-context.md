---
outline: [2, 4]

footer: true
lastUpdated: true
next: false
prev: false
---
# FLocalPlayerContext

The local player refers to a player on a client machine that is typically associated with a few things:
- Player Controller (`APlayerController`)
- Player State (`APlayerState`)
- Pawn (`APawn`)
- Game State (`AGameState`)
- Game Mode (`AGameModeBase`)
- Game Instance (`UGameInstance`)

Wow, that's a lot of shit to keep track of. If you want to support local multiplayer or local couch co-op, _it gets worse!_
Fortunately, we have `FLocalPlayerContext` to help with that. 

## What is it?
Local Player Context (`FLocalPlayerContext`) is a `struct` declared in `LocalPlayer.h` that will "wrap" a `ULocalPlayer` and give you
an insane amount of access methods that you're probably already doing on your own. 

:::info
This is not a blueprint exposed struct.
:::

Here are some problems `FLocalPlayerContext` can solve for you:

### Consistent Access Methods
```C++
/** 
* You can get Local Player in a number of ways, but
* establishing context is just as easy as constructing an instance
* of it like so.
*/
FLocalPlayerContext Context = FLocalPlayerContext(PlayerController->GetLocalPlayer());

APlayerController* MyController = Context.GetPlayerController();
AGameState* MyGameState = Context.GetMyGameState();
/** ... and so on */
```

### Check for LocalPlayer Association
`FLocalPlayerContext` exposes a method `bool IsFromLocalPlayer(AActor* ActorToTest)` that will check against the player state, player controller
and player-controlled pawn to see if any of them are associated with the local player. This means an easier time checking against other Actors
like network-owned player states or networked pawns. 

You can even use this in `UWidgetComponent` logic to determine if a piece of UI attached to an Actor is owned by the local player or just an NPC.


### Supercharge Widgets
You can use this context object and maybe a paradigm for data access to allow all of your systems to grab easy references to `UObject` and `AActor` 
pointers. 

**Well fuck,** as it turns out, `UUserWidget` exposes a method:
```C++
UMG_API const FLocalPlayerContext& GetPlayerContext() const;
```

Well. That's useful as hell. It even sets all of its instanced subwidgets in the widget tree.
Here's `SetPlayerContext` from `UUserWidget` (lightly pseudocoded so Epic doesn't rock my shit).
```C++
/** God damn. This is cool */
void UUserWidget::SetPlayerContext(const FLocalPlayerContext& InPlayerContext)
{
	PlayerContext = InPlayerContext;
	CachedWorld.Reset();

	if (/** Widget Tree is valid */)
	{
        /** 
        * 1. For each widget, run a Lambda function that accepts a UWidget* parameter
        * 2. Cast the lambda param to UUserWidget. If valid, call SetPlayerContext on it,
        *    passing in the InPlayerContext
        */
	}

}
```

## At-a-glance
```C++
struct FLocalPlayerContext {
    /** Access methods that let you establish context a number of ways */
    ENGINE_API FLocalPlayerContext();
	ENGINE_API FLocalPlayerContext(const class ULocalPlayer*, UWorld* = nullptr);
	ENGINE_API FLocalPlayerContext(const class APlayerController*);

    /** ... */

    /** I genuinely think this is one of the best functions in this thing */
    ENGINE_API bool IsFromLocalPlayer(const AActor* ActorToTest) const;

    /** Getters for every common thing you find yourself trying to get anyway: */
    	ENGINE_API UGameInstance* GetGameInstance() const;
        ENGINE_API class ULocalPlayer* GetLocalPlayer() const;

        /**
         * GetPlayerController, GetGameState, GetPlayerState, and GetPawn
         * all also have templatized flavors of these functions in this context 
         * just in case you need to cast. They also allow passing in a boolean
         * to perform a Cast vs. a CastChecked.
         */
        ENGINE_API class APlayerController* GetPlayerController() const;
        ENGINE_API class AGameStateBase* GetGameState() const;
        ENGINE_API class APlayerState* GetPlayerState() const;
        ENGINE_API class APawn* GetPawn() const;

        /** Lmfao who the fuck uses this */
        ENGINE_API class AHUD* GetHUD() const;

}
```

Wow. What a utility! All for free! 

## Additional Notes

- This is probably stupid powerful if you combine it with a Viewmodel or something that can auto update. 
- If you have a Player Controller reference that is valid, then it should be guaranteed you have a `ULocalPlayer` to use.

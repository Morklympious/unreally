---
outline: [2, 4]

footer: true
lastUpdated: true
next: false
prev: false
---

# Common Action Widget
This is a magical widget. I mean. It's alright. If "magic" were sufficiently complicated bullshit (which all magic is, okay?) It's basically a display widget that lets you map an input action to an input brush.

It's mostly straightforward, it can respond to input and it can show a pre-determined input icon based on whatever input action you feed it, enhanced or otherwise.

::: info
These notes assume you're already set up with [Common UI](https://dev.epicgames.com/documentation/en-us/unreal-engine/common-ui-quickstart-guide-for-unreal-engine) and you've enabled [support for Enhanced Input](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-commonui-with-enhnaced-input-in-unreal-engine) in your project settings.
:::

## Input brush lookup
Before we begin, the "magic" process of linking an input action to an input brush (icon) is a little bit indirect. So you should know that
1. An input action (or enhanced input action) maps on to a _hardware input_ like `Gamepad Face Button Bottom` or `Enter` or `Num Lock`, etc. 
2. To find an input brush, there is a mapping from _hardware input_ to _input brush_, which is your icon. 

In summary, your input action finds the hardware input the action points to, then your controller data uses that to find the brush. Without knowing this, it's easy to think that there's a magic
mapping from input action to input brush. It's more indirect than that: an `Input Action` maps to a `Hardware Button` (using the `CommonInputActionDataBase`), which is used to look up an `Input Brush` (using the `CommonInputBaseControllerData`).


Common UI and the Enhanced Input icon-lookup process are _roughly_ the same. They differ in basically two key parts:

- Standard input actions reference a data table of type `CommonInputActionDataBase`
- Enhanced Input actions reference the current input mapping contexts using the `UEnhancedInputLocalPlayerSubsystem`

### Without Enhanced Input (Common UI)
1. The Action widget iterates through the input action array
2. It grabs the appropriate Controller data (an asset of type `CommonInputBaseControllerData`) based on platform and input device
3. If the action in the `CommonInputActionDatabase` has a corresponding hardware button specified for your current input device (Keyboard vs. Controller, etc.), it will run a lookup on the  `CommonInputBaseControllerData` for a corresponding input brush (icon).
4. However, **If you've specified more than one input action** (e.g. you have a "set" of actions that together need their own icon), it looks through the `Input Brush Key Sets` area of the same `CommonInputBaseControllerData`.

### With Enhanced Input (Enhanced Input)
1. The Action Widget will take your input action and then query the `EnhancedInputLocalPlayerSubsystem` for currently active actions that could have a binding to a hardward input.
2. If there is a hardware input bound for your currently active input device, and if that input is in an active Input Mapping Context, CommonUI will look up the icon in the `CommonInputBaseControllerData`

## Additional Notes
- None (for now)






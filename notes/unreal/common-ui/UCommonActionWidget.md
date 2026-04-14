---
outline: [2, 4]

title: "Common Action Widget"
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

But it basically all starts with `GetIcon()`, which splits logic based on your Enhanced Input Support.

Basically: **did you specify an Enhanced Input action, and is Enhanced Input enabled?**
- Yes: `CommonUI::GetIconForEnhancedInputAction(...)`
- No: `CommonUI::GetIconForInputActions(...);` 

### Without Enhanced Input (Common UI)

```c++
FSlateBrush CommonUI::GetIconForInputActions(
    const UCommonInputSubsystem* CommonInputSubsystem, 
    const TArray<FDataTableRowHandle>& InputActions
) {
    /** Set up the Keys Array to add to */
	TArray<FKey> Keys;

    /** 
        For each input action, we're going to get it's corresponding 
        input information (FOR OUR CURRENT INPUT DEVICE) 
    */
	for (const FDataTableRowHandle& InputAction : InputActions)
	{
		if (const FCommonInputActionDataBase* Data = GetInputActionData(InputAction))
		{
            /** "TypeInfo" is a subsection of each row in the InputActionDatabase, like "Keyboard", "Gamepad", etc. */
			const FCommonInputTypeInfo& TypeInfo = InputActionData->GetCurrentInputTypeInfo(CommonInputSubsystem);
			Keys.Add(TypeInfo.GetKey());
		}
		else return *FStyleDefaults::GetNoBrush();
	}

    /** Empty brush to possibly populate */
	FSlateBrush SlateBrush;

    /** 
     * This function iterates through all of the UCommonInputBaseControllerData classes and tries getting the brush
     * on the ones that have an input type that matches the current input type mode, this will call
     * UCommonInputBaseControllerData::TryGetInputBrush(FSlateBrush& OutBrush, const FKey& Key) (for the Controller data)
     */
	if (UCommonInputPlatformSettings::Get()->TryGetInputBrush(SlateBrush, Keys, CommonInputSubsystem->GetCurrentInputType(), CommonInputSubsystem->GetCurrentGamepadName()))
	{
		return SlateBrush;
	}

    /** If we don't find anything from above, return an empty brush. */
	return *FStyleDefaults::GetNoBrush();
}
```
Last to note: if the number of `Keys` is greater than 1, the system will attempt to look for an input brush key set, which is a combination of input actions that map to a single icon. Each `UCommonInputBaseControllerData` has an "Input Brush Keysets" section that is meant for mapping more than one action (2+) to a single action icon!



### With Enhanced Input (Enhanced Input)
1. `CommonUI::GetIconForEnhancedInputAction(CommonInputSubsystem, EnhancedInputAction)`
2.  The Action Widget will call `CommonUI::GetFirstKeyForInputType` to query the `EnhancedInputLocalPlayerSubsystem` for currently active actions that could have a binding to `EnhancedInputAction`.
2. If `EnhancedInputAction` is bound, and inside an active Input Mapping Context, CommonUI will look up the icon in the `CommonInputBaseControllerData`

## Additional Notes
- I need to put a diagram in this MF. 






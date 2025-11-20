---
outline: [2, 4]

footer: true
lastUpdated: true
next: false
prev: false
exclude: true
---

# The Field Notification Interface
Interestingly, viewmodels in Unreal Engine are powered through an interface by the name of `INotifyFieldValueChanged`, which is 
an interface that exposes methods for consumers to implement for the viewmodel binding system. 

This interface exposes several useful function signatures that make them work with the data binding system:

```c++
/** Add a delegate that will be notified when the FieldId is value changed. */
virtual FDelegateHandle AddFieldValueChangedDelegate(...) = 0;

/** Remove a delegate that was added. */
virtual bool RemoveFieldValueChangedDelegate(...) = 0;

/** Remove all the delegate that are bound to the specified UserObject. */
virtual int32 RemoveAllFieldValueChangedDelegates(...) = 0;

/** Remove all the delegate that are bound to the specified Field and UserObject. */
virtual int32 RemoveAllFieldValueChangedDelegates(...) = 0;

/** @returns the list of all the field that can notify when their value changes. */
virtual const UE::FieldNotification::IClassDescriptor& GetFieldNotificationDescriptor() const = 0;

/** Broadcast to the registered delegate that the FieldId value changed. */
virtual void BroadcastFieldValueChanged(...) = 0;
```
A good chunk of these functions deal in `FFieldId` inputs, which is basically a specialized type that you
have to write a gigantic signature for:

`UE::FieldNotification::FFieldId InFieldId`

Like, without specifying something like `using` to alias that giant scope chain you're basically stuck using
the whole thing in your function signatures. Bit of a pain in the ass. However, this type is what enables
classes that implement `INotifyFieldValueChanged` to use field reflection and get their field values through 
another interface construct called a **Class Descriptor** (you can see it in the interface above).

The Class Descriptor is really useful for querying which fields on an object are `FieldNotify`, and internally it's
used to to updating / reflection. So it's pretty useful internally. I haven't used it much externally, though.

## The `FieldNotify` Directive
Field notify properties are "declared" in code at the `UPROPERTY` level. In a viewmodel it is often the case that a 
`UPROPERTY` will specify a few things to be ready to bind in a widget:

- `FieldNotify` to specify it's going to be a property that can be updated and triggered for changes
- `Setter` (optional) to enforce that a class *must* implement a setter with the name `Set[PropertyName]`.

```C++
UPROPERTY(FieldNotify, Setter, DisplayName = "Ammunition")
int Ammunition = 0;

void SetAmmunition(const int InNewAmmunition);
```

## Viewmodels Use This Interface
If you take a look at `UMVVMViewmodelBase`, you'll find that it automatically implements this interface, which is what
makes inheriting from it a smarter move. Your base classes should probably inherit from that, and I mean hell, create your own
base class if you like!

## Widgets Also Use This Interface
Something you'll notice in working with this interface, directly or indirectly, is that this interface is also implemented at the
`UUserWidget` level, meaning User Widgets also have access and capability to set up variables as broadcasted field notify properties. 

In general though, you won't find yourself using the User Widget implementation of this if you're already using a Viewmodel implementation.
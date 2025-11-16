---
outline: [2, 4]

footer: true
lastUpdated: true
next: false
prev: false
exclude: true
---

# UMG Viewmodel for Unreal Engine (for infant babies)

:::info
This is not an official documentation site, alright? 
You can find the [Official Documentation for UMG Viewmodels here](https://dev.epicgames.com/documentation/en-us/unreal-engine/umg-viewmodel-for-unreal-engine)
:::

# What Is Model View Viewmodel?
Model-View-Viewmodel (MVVM) is a pretty common pattern in a lot of software development. More specifically, it's useful because it's a clean
separation of concerns between the way user interface data is shown and the way it's exposed from something like a gameplay system to the UI. 

# Separating Logic From Presentation
"Separating logic from presentation" is a phrase you hear a lot, because it tackles something very muddy: UI doesn't often know the best way to get
information from the game. Without a clear way to do it, you end up with many people taking many approaches to get UI. In Unreal Engine, this happens a lot. 
In separating logic from presentation, you make UI very, very "stupid" and you can make _reasonable assumptions_ about what UI should show. 

# Viewmodels Enable Stupid UI
In my opinion, User interface elements should be stupid. They should be _very dumb_. In engineering we'd say that UI should be "stateless" in that it should be a _clear and calculable_
representation of its input. It shouldn't contain surprises or track things that it's not responsible for. If I have a button widget, I don't want that button widget to 
know anything except for what its content should be and what function it should call when it's clicked.

A Viewmodel in this case, is something a widget would "bind" to. The widget would bind to values on the Viewmodel and update when the viewmodel changes. The UI no longer has to 
track things, it has now _delegated_ that responsibility to the Viewmodel. If we were making an Ocean's Eleven analogy, the UI is "The Looks" and the Viewmodel is "The Brains"




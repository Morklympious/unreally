---
outline: [2, 4]

title: "Logging That Doesn't Suck"
date: 2026-02-04
footer: true
lastUpdated: true
next: false
prev: false
---

<script setup>
import { useData } from 'vitepress'

const { page } = useData();
</script>

# Logging That Doesn't Suck 
{{ new Date(page.frontmatter.date).toLocaleString('en-US', { dateStyle: 'short' }) }}

Sometimes you don't want to log something and you'd rather just plaster a `return nullptr` or `return;` somewhere you might
have loved to have a log, but the issue is you'll spend 10 minutes writing the log statement because every statement seems to come with
a complimentary google session for "how the fuck do I get my boolean to print in a log statement"

## Let's talk about `UE_LOG`
I'm not really a fan of logging using Unreal's most common macro, `UE_LOG`. It's also entirely possible 
I've shown up when a better tool is finally here to use, but the biggest issue I have is essentially the fact that
when using `UE_LOG`, I have to know what format specifier to use. 

Format specifier, yeah. It's that weird... uh. Percentage thing.

It's actually pretty terrible, there are at least [good resources](https://unrealcommunity.wiki/logging-lgpidy6i) that can help 
you understand which format specifier to go for, but just for a refresher:

| Specifier | What it decodes |
|-----------|-----------------|
| `%s`      | `FString`       |
| `%d`      | `int`           |
| `%f`      | `float`         |
| `%s`      | `FVector`       |

This isn't complete, but like. It's a pain in the ass? I don't want to remember five to seven different specifiers based 
on whatever type I'm using.

```C++
UE_LOG(LogTemp, Warning, TEXT("The integer value is: %d"), 1);
```

Like. Really? You're telling me `%d` is meant for numbers? I guess you could say "digit" is what
it stands for here. but I don't want to guess. So I won't. Let's talk about a cooler way to log. 

## Let's talk about `UE_LOGFMT`

**As of Unreal 5.2**, you can log in a VERY nice way that handles a lot of that formatting for you. Most of what you worry about 
is how to get a type that isn't easily serialized into a string to become a string. If we take the example above using `UE_LOGFMT`, 
we get this:

:::info
Again, this is **UNREAL 5.2 AND ONWARD**. Oh god who cares there's no reason you're running early 5.0 unless you're about to ship a game.
:::
```C++
/** Using positional arguments, too! */
UE_LOGFMT(LogTemp, Warning, "The integer value is: {v}", 1);
```
This macro automatically supports converting the type you provide it to the right format, and using positional arguments, you can pepper it with
all sorts of useful information!

### My favorite way to log
My favorite way to log is to log with a lot of information. but the fact that this exists makes logging something I want to do a lot more these days. 

```C++
UE_LOGFMT(
    LogTemp,
    Warning,
    "{fn}: This is a warning, you gave me a bad UObject! ({u})",
    __func__,
    IsValid(SomeObject) ? SomeObject->GetName() : "NONE"
);
```

Lo and behold! Let's break this down:
1. I'm using `UE_LOGFMT` with positional arguments. You can use named arguments where the order won't matter, but I like positional parameters.
2. I'm using `__func__`! This isn't an unreal thing, this is a C++ thing that returns the name of the currently executing function and I LOVE IT.

`UE_LOGFMT` works well with `FString`, `float`, `int`, `UObject` with `GetName` and any `FName` with `GetName`. Basically anything that can return a serializable
string version of itself will end up working! 

## Caveats
I haven't really tried this with larger structs, but as long as you implement a `ToString` function or something similar, or even use some utilities the engine offers, 
you can probably convert the value of a struct to a string pretty straightforwardly!

## Final thoughts
I have never really deviated from using `UE_LOGFMT` and I've never gone back to `UE_LOG`. It's just not worth it. Don't spend your time figuring out how
to log an `FVector`. Get on with your life. Write meaningful code, and log shit when things go wrong.
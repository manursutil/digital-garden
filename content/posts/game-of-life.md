---
title: Game of Life
date: 2025-08-27
excerpt: Learning C++ with the Game of Life
tags: [c++, coding, art]
cover: /images/game-of-life.gif
---

After making my first flocking simulation in p5.js, I couldn’t stop thinking about how code can create these little artificial worlds. That project felt like watching birds cross the sky, each following a few simple rules but still moving together and making their own decisions.

So I decided to take on something I had always heard about but never actually tried: \***\*Conway’s Game of Life\*\***. It felt like the natural next step. It’s one of those things that floats around the internet as a mix between math, philosophy, and computer science (all of which i'm very interested in and read about) But until recently I had never actually sat down to implement it myself. The game of life is, in essence, a universe of cells that evolves from a few simple rules.

I started learning C++ recently, so I figured this would be the perfect project. It’s small enough to build in weekend, but it forces you to think about structure, memory, loops, and how to keep track of a grid that updates itself over time. Basically, everything C++ wants you to wrestle with.

The result looks simple, it's just a bunch of cells flickering on and off, but writing the code to make it happen felt like unlocking a puzzle. Each cell lives or dies depending on its neighbors, and together they form these patterns that seem almost alive. Watching it run in my terminal was strangely \***\*hypnotic\*\***, specially if you let it run for a while in an infinite loop, it was like staring at a tiny artificial cosmos of stars dying and being born.

Debugging was its own adventure. It took some trial and error to make sure the rules worked as expected (birth, death, survival), and that the whole thing didn’t just freeze or collapse into nothingness. But once it worked, I could tweak the grid size, the speed, the initial conditions (which i kept random) and suddenly a whole range of behaviors appeared out of nowhere.

What I liked most is how something so minimal could capture so much. There’s no graphics, no fancy interface, just text and rules. It’s a reminder of how much \***\*complexity hides inside simple systems.\*\***

I came into this wanting to learn C++, but I walked away also learning a bit more about emergence, and most importantly, about how coding, even at its most technical, can feel surprisingly close to art. This is a topic I touched on a few days ago in my previous post, and wanted to expand just a little more.

Coming from the flocking simulation, I started to see a pattern: this kind of generative coding isn’t about controlling every pixel. It’s about setting rules and letting them play out. In a way, it feels closer to gardening than engineering. You plant the seeds, and then you watch what grows.

What I find fascinating is how these projects contrast with AI art as most people know it today. This is also “artificial intelligence,” but at a smaller, more hands-on scale.

---

### Resources:

Here's a great guide on how to build your own Conway's Game of Life:

[Robert Heaton's Game of Life Guide](https://robertheaton.com/2018/07/20/project-2-game-of-life/)

Robert Heaton, the author of the guide, writes it in Python but the concepts and how he breaks down the problem could be applied to any programming language.

You can also check out my code in C++ to have some guidance (keep in mind it is not perfect and many things could be tweaked) if you also decide to make it in this complex but strangely beautiful language:

[My take on Conway's Game of Life in C++](https://github.com/manursutil/game-of-life)

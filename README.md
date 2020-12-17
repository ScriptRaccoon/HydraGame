# Hydra Game

Demo: https://hydragame.netlify.app/

The Hydra Game starts with any finite rooted tree. The goal is to cut it down to its root.

Click on a leaf (a node without children) to cut it off, including the line segment leading to it. Then its parent tree is duplicated a random finite number of times. For simplicitly, we agree that at the nth step we produce n duplicates.

It may be surprising, because the tree seems to get larger and larger, but actually you can win this game. And this is true, in fact, regardless of the strategy you choose.

This is a consequence of [Goodstein's Theorem](https://en.wikipedia.org/wiki/Goodstein%27s_theorem). The Hydra Game as an illustration of this theorem was invented in a paper by Kirby-Paris, which you can find [here](http://www.cs.tau.ac.il/~nachumd/term/Kirbyparis.pdf).

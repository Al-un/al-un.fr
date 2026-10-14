---
title: "Ownership"
---

## The core idea

Ownership is the mechanism Rust uses to ensure memory safety without a garbage collector. It changes how you reason about values and lifetime.

## A typical pattern

Move values intentionally, borrow when needed, and keep ownership boundaries clear. This makes APIs easier to reason about in concurrent code.

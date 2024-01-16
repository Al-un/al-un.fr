---
title: TODO
draft: true
---

# Five Types of Magician Software Developers <!-- omit in toc -->

Spoiler: proper code documentation and development processes are always helpful.

- [The Enlightened](#the-enlightened)
- [The Copyist Monk](#the-copyist-monk)
- [The Ninja](#the-ninja)
- [The Archivist](#the-archivist)
- [The Void magician](#the-void-magician)

Congratulations programming adventurer! You have been accepted in a new guild and you will soon join your new party. There are many profiles in this world but some are more mysterious than the others. I call them "the magicians" because they often leave a surprising impression, for the best and the worst.

Dear adventurer, please let me share the different magicians that my humble fate put on my path.

## The Enlightened

Likely the most expected profile in the list. Their ability to understand and explore the unwritten laws of programming is translated by an immense, even overwhelming, level of elegance and sophistication in their code. To be honest, I sometimes worry if some innocent animal or soul were involved, in some faustian way, to acquire such tremendous knowledge.

There are many forms of enlightenment. Some are learning to satisfy their curiosity while others are seeking for optimal code. Regardless their motives, all enlightened share the common trait of going the extra mile.

Feared for his/her strong opinion or adored for his/her amazing skills, the enlighten does not go unnoticed and all have to agree that the enlighten is a very powerful ally we like to rely on in very dire circumstances.

However, this huge power is double edged because the pace set can be too fast for the rest of the party to follow.

When you have an enlightened in your party, it might be fearsome at first but here are some ways to deal with it:

- When you don't understand, ask! Most enlightened would be delighted to share their knowledge.
- When you are unsure why the code is built in a specific way, question the choices. Enlightened rarely made up their mind without reason but they do not always feel the need to justify all their decisions.

On the other way, the enlightened can help their teammates:

- Propose technical strategy

## The Copyist Monk

An adorer of Googlism, or the reformed DuckDuckGoism. A young copyist would not dare to defy God and as the Lord works in mysterious ways, the monk becomes the master of the art of blind copy-pasting. By blind copy pasting, I refer to some code such as

```js
/**
 * <some explanation relative to the discussion context>
 * NOTE: PLEASE DO NOT COPY THIS COMMENT
 */
function someFunction() {
  /** body */
}
```

Alternate religions involve the adoration of the all mighty StackOverflow.

How to compose with a copyist monk

- Copying from the internet is not bad per se as long as it fits in the codebase
- Ensure that no dead code is copied along the way
- Make sure the person who copied the code actually understand the copied code.

Please note that a copyist is not a bad pick for your party. They can be very good at cherry picking a relevant code which solves a problem, without re-inventing the wheel.

A specific problem we had could be solved with a library but we actually need a dozen of lines from it. It appears that this library was not compatible with tree shaking so we would import a huge library only for fraction of it. One of my teammates focused for some hours to identify all the parts we need, extracted them and adapted it to our codebase saving all of us a significant amount of time. From this day, I stop saying "never copy paste" but started saying "most of the time, avoid copy-pasting but actually, sometimes, you have to".

## The Ninja

Master of the art of invisibility, the ninja are rarely in the spotlight. Instead, they seem to patiently wait in the shadows to swiftly strike a deadly blow. Usually not part of your party but member of your guild, the surprise commits are what makes the ninja a magician.

Let's not judge a book by its cover. Ninja usually operate at the scale of the whole guild and see things that your party is not necessarily able to see. The time spent in the backstage is often a huge preparation to find out how they can minimize their impact while meeting their objectives.

Although they are not meant to backstab you, blindly trusting them is not an option neither. Being a bit prepared and protected does not hurt much.

How to counter a ninja:

- Continuous Integration is here a weapon of choice. Unit testing and other protection ensures that any newly added code does not break the codebase
- Protect your land with git branches protection. On GitHub, branches can be protected and pull requests can require approval being merged

Ninja often acts on cross teams operations and rarely work on business related matters as it would most likely fall into the scope of your team. If it happens to be a organisation wide change, such as deployment flow, dependencies management, or code styling configuration, there should be some communication ahead.

However, if the ninja acts on a business related topic, it could be dangerous because there would be a lot of by-passing in the process (product managers, QA, etc). Make sure you understand why the ninja is acting this way and ensures that process is somehow respected by informed the stakeholders.

## The Archivist

The wise among the wisest. Acquaint with the forgotten tales, the archivist knows the whole history of the coding language he/she is proficient at.

Documentation / librarian / translator

How to compose with archivists:

- Ask questions! They know a lot of things and most of them would be more than happy to share.
- Can be a combo with Enlighten

## The Void magician

Expert in destruction, the void magician excels at the art of making things disappears. Often appearing during refactoring season, the void magician strongly dislike dead code. Make sure the `@deprecated` flags are properly set if you do not want to see some code sunk in the abyss of a refactoring commit.

Properly evolving a codebase, while maintaining its cleanliness, is an art. Unfortunately, some void magicians only inherit this title thanks to their natural clumsiness. Needless to say that this is some unwanted skills among a party as suddenly, your code, documentation, or, worst, application, now tremble in fear of undesired obliteration.

When teaming up with a void magician, the most important point is to have a clear code depreciation policy. When the whole team is aligned on code evolution, it proves to be terrifically efficient.

- A good usage of `@deprecated` flags can be useful when using an IDE or when checking for deprecated code usage.
- Define how to delete dead code
- Keep track of outdated dependencies

To protect against a clumsy void magician:

- For code protection, continuous integration is your best bet.
- Code review can prevent on time explicit but unwanted code removal from happening. This can typically happen during code cleaning when a supposedly dead code is removed.
- To protect your data, proper access control and access validation process are the first shield to prevent any unwanted data access, especially in production environment. However, in general, production access should have a good balance between protection and emergency handling. For example, you want to be able to quickly restart a production when needed.
- In addition, back-up is the natural protection option. A good monitoring system can also help notifying when the application goes wrong due to incorrect or missing data.

---

If a young magician starts walking the path of void magic, please do not be too harsh. Most of the time, a simple discussion or explanation is more than sufficient to reroute to a better way.

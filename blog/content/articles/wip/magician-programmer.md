---
title: Five Types of Magician Software Developers and How to Compose With Them
draft: true
---

When going through different engineering teams, haven't you thought "wow, that guy/girl is magical"? I was lucky enough to have met few of these. Let me share my little knowledge of the software engineering folkore.

# Five Types of Magician Software Developers and How to Compose With Them

> Spoiler: respectful communication, ideally backed with good practices, is key to successfully interact with them.

Congratulations programming adventurer! You have been accepted in a new guild and you will soon join your new party. Many software engineer profiles run by this world but some are more mysterious, almost magical, than the others. Maybe... are you one of them?

Dear adventurer, please let me share the different magicians that my humble fate put on my path.

## The Erudite

### The living well of knowledge

Likely the most expected profile in the list. Their ability to understand and explore the unwritten laws of programming is translated by an immense, even overwhelming, level of elegance and sophistication in their code. To be honest, I sometimes worry if some innocent animal or soul were involved, in some faustian way, to acquire such tremendous knowledge.

There are many forms of enlightenment. Some are learning to satisfy their curiosity while others are seeking for optimal code. Regardless of their motives, all enlightened share the common trait of going the extra mile.

Feared for his/her strong opinion or adored for his/her amazing skills, the enlighten does not go unnoticed and all have to agree that the enlighten is a very powerful ally we like to rely on in very dire circumstances.

### The Erudite strengh and weaknesses

- Very good support for system design and architecture thanks to their sheer knowledge
- Very good mentoring potential

- Risk of losing the team, impacting the team morale
- Risk of over engineering

### Taming the knowledge power

However, this huge power is double edged because the pace set can be too fast for the rest of the party to follow.

When you have an enlightened in your party, it might be fearsome at first but here are some ways to deal with it:

- When you don't understand, ask! Most enlightened would be delighted to share their knowledge.
- When you are unsure why the code is built in a specific way, question the choices. Enlightened rarely made up their mind without reason but they do not always feel the need to justify all their decisions.

On the other way, the enlightened can help their teammates:

Propose technical strategy


## The Copyist

### The knowledge recycling expert

The copyist is taking the saying "Let's not reinvent the wheel" very seriously. For them, all problems already have an existing solution. Why bother spending effort when a ready-to-use option already exists?

As an adorer of Googlism, or the reformed DuckDuckGoism, the copyist excels in finding some written traces which will spare him/her some unnecessary effort. Their output often correlates with how fast they can search and copy the information to build some functioning code.

However, an inexperienced copyist might lack of knowledge to properly understand the finding. Afterall, the Lord works in mysterious ways (\*glancing at my past Webpack configurations\*). This obviously becomes an issue when a copy-pasted code include warnings...that were obviously ignored.

```js
/**
 * <some explanation relative to the discussion context>
 * NOTE: PLEASE DO NOT COPY THIS COMMENT
 */
function someFunction() {
  /** body */
}
```

### The copyist monk strenght and weakness

Having a copyist is not bad pick. Their investigation skills can prove to be powerful when browsing in the sea of corporate documentation of finding a specific programming point. 

Experienced copyist can even take things to a next level, making the call between adding a small library _or_ copying part of it. A specific problem we had could be solved with a library but we actually need few dozen lines from it. Additionally, it appeared that this library was not compatible with tree shaking. One of my teammates, the copyist, focused for some hours to identify all the parts we needed, cherry-picking them and adapted them to our codebase, saving all of us a significant amount of time. It saved the day, without degrading the codebase quality.

To sum up, copying find their strength in:

- Good investigation skills
- Good analytical skills

On the other hand, they bring some risks:

- Ris of deploying an inappropriate solution if the solution does not fit the problem (initial problem misunderstanding or mismatch between the found solution and the problem)
- Risk of code quality degradation
- Risk of copyright issue

### Composing with a copyist monk

When facing a problem, don't hesitate asking a copyist point of view: there might be already a solution! 

Among the different risks, the code quality degradation is the highest one. If the output of a copyist does not solve the business problem, it would be spotted by other stakeholders, may it be QA, product owner or even users. However, a code quality degradation can introduce a technical debt that goes off radar. 

## The Ninja

### Striking from the shadow

A master of the art of invisibility, striking swiftly from the shadows and quickly disappearing. Ninja are not part of any normal group and they usually are grouped together as a Ninja team. But let’s not judge a book by its cover. They are actually not hostile, rather, they are the hidden guardian angels of all teams. Usually operating at company level, they ensure that all development keeps some sort of consistency.


### Ninja strenghts and weaknesses

Pros

- Excellent in deploying company wide changes

Cons

- Risk of negative impact developement if changes are not carefully prepared

### How to get prepared for a ninja intervention

By definition, a ninja does not belong to any normal team so they usually have little background regarding your codebase. Whenever they are jumping with some commits ready, don’t hesitate to support them. Being hidden does not mean being idle. Ninja spend a lot of time and energy to prepare large scale changes while minimising the impact of all teams operation. For very large companies, you can assume how complex this can be so any support is always welcome.

On the other hand, if your team or codebase slightly deviates from the company standards, it is likely that a ninja change does not serve you. While it is tempting to push back, prefer discussion first to understand why a change is needed and how it can be deployed taking your specificities into account.


## The Archivist

### The living bridge between the Ancient Past and the Present

The wise among the wisest. For the Archivists, keeping knowledge is beyond everything. As a matter of fact, they like keeping note of everything, too afraid to lose a crumb of information. Their documentation skills are not to be doubted.

The sin of Archivists is to write so much that they lose the essence of the documentation purpose. If they become too verbose, their documentation becomes unreadable and actually backfires. Documentation is a living thing and must be kept updated along the product and outdated documentation can be a poison. If a project relies on incorrect information, it is likely that improper decisions will be taken.

For some Archivists, building documentation is not their only passion: they also know the history of changes. For those who stay in the same company, times is their previous ally: they do not know to learn about the changes if they are living through. 

Unlike in fairy tales where we imagine Archivist as old men with long white beards and a pointy hat, Archivist is a mindsetc of software engineers. Consequently, simplying relying on the apparent age can lead to a misjudgement.

### Archivist streghts and weaknesses

Among the Archivist strengths, we can find:

- Good source of knowledge regarding the history of a product or technology
- Good contact point to find documentation, but not necessarily as knowledgable as the Erudite

On the hand hands, the associated downsides could be:

- Risk of bloated and/or outdated information
- Risk of having a documentation difficult to understand


### The Archivist as companion

As a master of knowledge, Archivists are happy to share, this is why they are writing! Unlike Erudites, they pay extra attention to have knowledge that can be shared. Don’t hesitate to ask them questions! On the other hand, if your knowledge can help them, don’t hesitate to provide feedback. Documentation will happily be updated.

They are also good to keep a good record of a product evolution, may it be from a functional or a technical perspective. It can prove useful to understand the underlying reasons of a decision from the past.

And more importantly, keep the Archivist away from their deadly sin. Documentation is meant to be helpful and should support the team, not  giving a headache to know whether an information is correct or not.


## The Void magician

### The subtle, or not, art of destruction

The void. The art of making things disappear. Not the usual destruction / explosion decorum. The subtle `dev/null` advocate who subtly removes things. And… that’s just an awesome skill. Pretty aggressive, almost belligerent, at first, Void magicians are actually focusing on keeping things clean and tidy. They like having a top-notch codebase with regards to technical debts such as dead code, outdated dependencies or over-engineered solutions.

### Void magician strenghts and weaknesses

- Excellent for keeping a codebase light and clean

- Risk of regression

### Composing with a Void magician

While the thirst of removing code is clear, make sure that things are removed safely. Obviously, communication is a must here. But actions can be taken at the code level as well. At this point, there are two points to keep in mind:

- How to manage a progressive code clean
- How to ensure code integrity

When teaming up with a void magician, the most important point is to have a clear code depreciation policy. When the whole team is aligned on code evolution, it proves to be terrifically efficient.

- A good usage of `@deprecated` flags can be useful when using an IDE or when checking for deprecated code usage.
- Define how to delete dead code
- Keep track of outdated dependencies
- 
To protect against a clumsy void magician:

- For code protection, continuous integration is your best bet.
- Code review can prevent on time explicit but unwanted code removal from happening. This can typically happen during code cleaning when a supposedly dead code is removed.
- To protect your data, proper access control and access validation processes are the first shield to prevent any unwanted data access, especially in production environments. However, in general, production access should have a good balance between protection and emergency handling. For example, you want to be able to quickly restart a production when needed.
- In addition, back-up is the natural protection option. A good monitoring system can also help notifying when the application goes wrong due to incorrect or missing data.


---

If a young magician starts walking the path of void magic, please do not be too harsh. Most of the time, a simple discussion or explanation is more than sufficient to reroute to a better way.

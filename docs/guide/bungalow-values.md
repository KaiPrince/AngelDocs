# Thoughts on development methodology

> A Slack thread with [Albert O'Connor](http://albertoconnor.ca/) and others at Bungalow.
> Collected by Kai Prince.

This is a mix of cultural and procedural thoughts, but it can live here.
Individuals and interactions over processes and tools.
Working software over comprehensive documentation.
Responding to change over following a plan.

All process should aim to:

- Increase rather than hinder development speed and deployment of working product
- If process is causing thrash, adapt or remove. Be ruthless about this.
- We’re not agile for the sake of agile.
- Create tight feedback loops to reduce thrash
- Provide meaningful sense of direction and priority for all stakeholders
- Ensure a balance between feature development and reducing technical debt (enabling R&D)

Process should not aim to:

- Discourage experimentation. The best ideas will often come out of ideas that have a high chance of failure.
- Weed out under performers. This should be obvious beyond development methodology, and any attempt to weave this into process will result in high-performers losing trust.
- Act as surveillance. Communication must be be multi-directional between all stakeholders.
- Glorify emergency.

Product Owner:

- Focus should be on providing the what and why
- Leaves the how up to engineering
  Estimation:
- Should be focused on protecting the development team from taking on too much in a given sprint
- Should be a measure of complexity, not hours/time
- Not intended for performance evaluation

HQ <> Eng meeting:

- Not a status update meeting. It’s an opportunity for the eng team to assess its progress towards the sprint goal

## All Prudent Speed

Brought near the end of Slack (the book) as a counter point to the more natural hurry up/get things done faster focus on efficiency which removes the room to adapt and change and be proactive instead of reactive. All prudent speed is the speed ships generally travel. Work smart, get things done, tighten your loops, but also take the time to think about what you are doing.

## Tight Loops

Basically the faster developers can get feedback, the more productive we can be. You can think about this as fail fast as well. This means a tight debugging loop, or hot reloading, or linting in your editor, fast CI. Setting up a tight loop can take time (configuration etc), but that investment usually saves a huge amount of time over the long term. You can look at tight loops in other places, well, the sooner we can get feedback on our working code the sooner we can make better incremental changes.

## Static Analysis (Linting etc) as soon as possible

A corollary of tight loops, I still need to setup up vim to enable my static analysis by default, I also have to make sure I am in the right virtualenv, I should spend time finding ways to make it easier, because getting feedback on save (or even earlier if your editor supports it) can save a huge amount of time, increase code quality and maintainability by enforcing agreed upon conventions, and allow us to comment when they shouldn’t be followed, and why… # noqa in the Python/Flake8 context.

## Individual Process

We should have a smooth initial process for on boarding especially, which is currently docker, and it works well, but we shouldn’t enforce process, each develop should do what makes them the most affective. We should document alternatives and also try to share our process with eachother… either through pair programming or possibly screen cap videos (which we can share more broadly when appropriate)

## Keep Users the Main Focus

A core tenant of Agile and Lean is ensuring the users voice is at the table, most of the times these approaches are implemented the user part is usually ignored because it is hard. When we are doing sprint planning for blacklog grooming for a resident app, can we nominate a resident to have at the table to represent their interests. When we are demo that it shouldn’t just be to the Product team, it should be to the residents, and those demos can be more critical in nature because we want their feedback in the moment we can get it.

## Demos

We have been doing this so far pretty well I think, do we want to keep the focus on positive feedback, and hold notes until either the end, or the next day. To reiterate the goal if demos is to spend a moment celebrating the work that has been done. Writing code is a relatively lonely process of puzzel solving. We spend most of our time with our heads down trying to figure something out, and we don’t spend enough time celebrating the victories.

## Don’t Prematurely Optimize Anything

This is a bit tricky because you also don’t want to under design, or write overtly inefficient code, but it is also way to easy to obsess over the a highly optimized generic solution that we might never use more than one way. Profiling and refactoring should be easy if we are able to create a reasonable collecting of unit tests, and with the support of tools like Sentry behind us, let’s use them.

## Testing

TDD is great when you can do it. If the code’s final form isn’t clear, don’t worry too much about tests. When we run into bugs in the wild, create tests to help debug them and prevent regressions while fixing them. This also helps to ensure the fix works. Make sure your test fail first to help validate they are testing the right thing.

## The Output is Working Code

The output of a sprint is working code, and code isn’t really working until it is in production being used by real people. Everything from the initial write, to testing on the stage, to unit tests, etc are all part of the process of getting the code there, but something isn’t really done when it is merged. The output of a sprint isn’t story points or “done” tickets, it is code which has to potential to work correctly on production. (edited)

## Spend Time Specifying Tickets

Tell stories from the perspective a real user, try to specific what is and isn not part of a ticket. Make it possible for anyone to pick up a ticket as much a possible. This can be a iterative process, starting with noting something so we don’t forget it, then refining it through backlog grooming and getting clarification from product and users.

## “The Clean Architecture”

Express as much in plain old data as you can with a series of pure function which process that data. This is highly testable. Then on the outside of the process the messy IO happen, getting input from a user, writing to a database, sending data to another service. This is in different from layering the actually IO deep in layers of abstraction, which models the interaction possibly in the real world. Instead of that, in the top level keep the IO there and only layer the transformation of plain old data…

<https://www.youtube.com/watch?v=rrMnmLyYjU8> <- this talk is amazing for many reason, but the highlight and a bit of a spoiler is Brandon develops and develops his ASCII until he finally ends up with the clean architecture despite having given a talk on the clean architecture many many years ago. Shows how 1) powerful this pattern is and 2) how much effort it takes to keep it in mind.

## API Design

It matters. Use testing to enforce it since changes will cause clients to break. This is something we can do more of I think. Be weary of the micro-service crazy. It pushes all of the hard problems into the communication between services which can be very hard to debug, and it can lead to maintainability nightmares. Breaking up large system can still have value, but be careful about how it is approached.

Resist the urge to nest RESTful API I think. Having done this a few times now I am pretty sure it isn’t worth it.
Provide all context as arguments. Implicit user one gets through auth should be made overridable for user who have permission to enable impersonation when required.

## Photo Sync

I attempted to use a different process for individual property photo sync, and I feel the results were positive. Instead of just implement the easiest thing I could think of as fast as possible, I arranged a meeting with one of the CM with Ducan’s help to talk about it with them. That discussion immediately lead to an understanding that 1) the CMs as a group were in the dark about all the technological change which was happening and 2) I should strive for the button in the admin approach to photo sync rather than leverage an action (something I was familiar with).
We has a follow up demo to help explain how SFDC, Box and the website interactive and got more feedback form the rest of the CM group.
From there I worked on the button implementation in the admin, which took more effort, but maybe only a couple of hours, and I learned something new, and the result was 5 to 10 times less error prone, and more importantly want the CMs asked for.
When done I demoed it, to a more limited audience, and there is still work to be done on getting the word out about the admin photo sync. The process though created connects and bonds between users (CMs) and developers making it easier to do other processes like this and hopefully get their buy in as we move forward with Fieldstone.

Speaking of which has we move ahead with this large project, having group which representatives from each stakeholder group… CMs, LDRs maybe, HQ people who will have a vested interest in how the system will work would be handy so they can provide feedback individually and as a group when we are deciding what kind of experience we will be creating for them.

## Potential Values

- Trust/Communication/Candor
- Learning Focused: Blame free culture, we work together to learn and do the best we can.
- User Focused: Keeping users be they internal staff, residents, or property searchers top of mind.
- All Prudent Speed: Work as affectively as we can given the conditions, keeping time for craft and surprise and delight.
- Be an Owner: Autonomy, work when it works for you, care about what we are doing and the quality of the output...

Thinking in terms of hiring and recruitment being forward about the technology and why we use it, to optimize developer happiness and effectiveness. Python, DRF, Django Channels, Vue.JS. But also saying we are happy to explore new technologies and approach if they make our developers happier and more effective.

### Team Centric

Being humble, being patient, knowing that we share a common goal, and seek to actively find the best ways to achieve it. Over-communicate rather than under communicate. Celebrate wins, be constructive with criticism. Create a safe place for different ideas. Trust and the ability to be candid are key. Trust people especially when we fail.

### Learning Focused

Blame free culture, working together to maximize learning, understanding, and effectiveness. Prefer communication in public channels, ask "dumb" questions. Lead by example. Tight loops, feedback obsessed. Share learning, experiences, resources, talks.

### User Focused

Keeping the human beings who use our technology in the forefront even though it is hard. Talk to actual users when possible be it staff, residents, or property searcher. Empathy? Inclusion?

### All Prudent Speed

Work as effectively as we can based on the given conditions. Take time to test, improve quality, and surprise and delight. Allow for enough slack to enable change and better decision making. Whatever you do though, Don't prematurely optimize :slightly_smiling_face:

### Be an Owner

Be autonomous team members, work when it works for you, care about the quality of our output, and learn from your peers to become a better ower.

### Permission to Fail

We talk about this a lot, but it’s worth writing down. Especially in the context of software, it’s important to try ideas (ideally ones that are validated) accepting that they may not be a success or even something that we keep. We want to breed a culture of experimentation and creativity, and without acceptance of failure, it’s particularly hard to do that.
And since I love quoting Winston Churchill: “Success is going from failure to failure with no loss of enthusiasm.” (potentially spuriously attributed)

### Thoughts on remote work

from <https://blog.trello.com/working-from-home-is-not-remote-work>:

- Communication occurs digitally in open chat channels where anyone can chime in on the decision making process asynchronously.
- When some members of the meeting are remote, all participants hop on individual video screens, regardless of location (ie. No piping in one or two people as giant chat heads on a screen or worse, as voices on a call in the middle of a table).
- People who are not present in the office are not left out of decision making, only to be “filled in” later.
- Employees are having regular check-ins with their managers to ensure they are aware of their expectations and deadlines.
  Don’t necessarily agree with the all of the article, though Trello’s content marketing group normally does pretty good work, but I feel pretty strongly about the first 3 point if we are going to transition to remote first. I feel like the first point make the third point more achievable.
  It can be a tough habit to get into (using slack for most conversation and even problem solving), when we all sit together, but I think it is worth trying.
  The all hands just has so many people in it, probably not practical for everyone to connect directly, but other meeting involving someone remote might be better done individually.

<https://basecamp.com/books/remote>
<https://zapier.com/learn/remote-work/>

Read through the first part of the Zapier book, enjoying. They split up their tracker for bugs (GitHub) and for features (Trello), and they rotate one developer a week who is focused on bug fixing, while the rest are focused on feature development. I imagine the other developers support the person working on bug if something isn't clear.

The bug fixing rotation seems like a really good way to get developers familiar with most areas of the code base

As long as everyone gets into the bug fixing role it can work, otherwise the feature teams can have a tendency to create buggy things and not really worry about it because they don’t have to deal with it.

Rotation is key, and that is the point in terms of everyone learning about everyone's code. Also the person / persons fixing bug would be allowed to interrupt the feature devs since it is all about learning

## Premature Optimization

Though it isn't listed in our draft values, I wanted to talk about premature optimization in response to some good questions @luke has been asking.
My general belief is we should avoid premature optimization, and that can mean fighting against impulses we all developed from other projects we have worked on.
For me, premature optimization is doing anything which goes beyond the most straightforward implementation while writing the first pass of an implementation. Some reasons why I believe premature optimization should be avoided include:

- Without evidence of what needs to be optimized, the optimization may be ineffective.
- The optimization generally makes the code more complex, which will make it more error-prone and harder to reason about.
- The use case being optimized for may change or entirely disappear
  Avoiding premature optimization doesn't mean we don't optimize ever. Part of all prudent speed is reserving time after the working (though maybe not optimized) code has been used by representatives of the target audience and we have confirmation that the user experience is in line with that is desired.
  In my view, after that is done is the best time to test our assumptions about what parts of the code are not optimal, and try to fix them. Not only can we test the greater system to observe the inefficiencies we should have a battery of unit tests and some integration test to make sure that our optimizations don't break things.
  This doesn't mean that during a code review, the reviewer can't ask for the code to be optimized in any way. If the code is overtly inefficient and the change, for example, reduces the number of iterations without adding complexity it is worth doing as part of the first pass. Generally, such a change hopefully makes the code more readable and more understandable.
  Some insights we could take as guiding principles from this base could include don't sweat multiple API calls and don't worry about too many joins. Generally, we know how to optimize the problems these cause, and though it takes effort, the effort will be spent at a time we can best understand which set of optimization will be most effective.
  If there isn't a reasonable path from the simpler less optimized solution to the more optimized solution, then maybe the optimization should be taken into account earlier in the process. My feeling though is this isn't often the case.

In my opinion, I really like the idea of having games/rec stuff in the office, but there's always some kind of stigma that if you're playing games on company time say like ~15-20m then it's counter intuitive because you're getting paid to "not work" – I mean obviously this is the whole point, so you don't feel that way because:

- Doing things with your colleagues/bonding and makes your work relationships more effective
- When you take a break from work, your sub-conscious will still work on problems for you, works wonders.
- If you make time for fun, you'll just generally be a happier person overall and that will resonate outwards to your work and personal life and the folks around you.
  So... I guess it's just trying to let go of that stigma? :thinking_face: Anyone else have thoughts on this?

Like going for a walk in the park would have the same effect even (doesn't have to be games)

Yeah, it works better if the team isn’t overloaded with work, so that you don’t feel like you are letting everyone down if you stop to do something (or that you don’t feel like everyone else will feel like you are letting them down…)

<https://www.coursera.org/learn/learning-how-to-learn>

I think that's your own mental block. Getting past the traditional office work into figuring out how you work best. I really liked Beth's point about how it's not the metaphorical ping pong table itself, but the table in place of actual culture and figuring out what your employees need.
I use our meditation room. I just go sit in there quietly for 10 minutes and it refreshes me. Lately though, I feel guilty taking anything because we have been in hustle mode for so long which Caroline pointed out above.
Professional development time also falls into this. Which Titus just linked. I think we know all the things.
We don't have a people person mandating how we spend our time so it's really our own mental blocks and prioritizing the things that make our own work day most effective and that will look a bit different for everyone.

My more feminist friends would probably say that the guilt feeling for these kind of things is more of a female thing since we are trained to think that way. But I don’t know if that is true.

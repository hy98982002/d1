Chapter 14. Determining
Impact When You Can’t Run
an A/B Test

Recently I had the good fortune to attend an event featuring many of
the most prominent and prolific behavioral scientists in the world.
They had banded together to address one of the frontiers of
behavioral science: long-term behavior change.
The researchers were testing whether they could move the needle on
gym attendance. They ran nearly 20 simultaneous studies, with each
researcher pursuing their “best guess” of what would work. This
event was the first time that everyone in the group would hear the
results.
What happened? Not a single study was effective at long-term
behavior change. The best researchers in the world had each taken a
shot and had fallen short of their target.
Something that is often hidden, at least to those outside of the
research community, is that in our space the successes are few and
the failures are many. That’s normal. That’s expected. It’s because the
most interesting applications of behavioral science are often focused
on difficult and seemingly intractable problems, like exercise. Even
the best researchers in the world try again and again, before they find
a breakthrough that generates headlines and a best-selling book.
1
The lesson here isn’t merely to “fail fast” (a motto that is deeply
engrained in product development, at least in Silicon Valley and
similar tech hubs) or that embracing failure means embracing
iteration. 2
Rather, it’s a bit more nuanced. How did the researchers
know that they’d failed? It’s because they looked for failure. In their
case, they used randomized control trials to receive an unambiguous
signal that things hadn’t turned out as planned, without wiggle room
to lie to themselves or try to put a positive spin on the results.
Teams can’t always run experiments, but the need for rigorous
measurement doesn’t go away. The less wiggle room—the less one
can explain away the results or hide from flaws in the product and its
ability to behavior change—the better. We want to find problems
early and not let them turn into expensive messes. So let’s look at
other ways to measure impact.
Other Ways to Determine Impact
Experiments take care of all of the nasty details of figuring out
whether the application, or something else, changed the user’s
behavior and outcomes. The random assignment process, properly
done, ensures that nothing is different between the two groups except
for what they want: the product itself. So any difference in outcomes
is caused by the application.
As an academic, I could make the case that experiments are really the
only way to measure causal impact because of these benefits. But in
real-world products, that’s unrealistic and too restrictive. If you aren’t
using experiments, then you have to face the nasty details of
estimating the causal impact of the application head on. It can
certainly be done, but it should be done with open eyes.
The easiest and most common way to look at impact is a pre-post
analysis.
A Pre-Post Look at Impact
In a pre-post analysis, you look at user behavior and outcomes before
and after a significant change. For example, if users on average
walked 500 steps a day before using your product and 1,500 steps a
day after using it for one month, then the product might have
increased their walking by 1,000 steps a day.
In a pre-post analysis, you take the difference you see and try to
adjust it for all the other things that could have caused the change that
weren’t part of your product. This can be done informally or
formally. The formal version requires running a multivariate
statistical analysis like estimating a regression model. The informal
version means carefully thinking through what else could have
impacted the users and their behavior.
Personally, while I was trained in the formal, econometric approach, I
find that starting with an informal analysis is immensely valuable
(even if you later do the econometric analysis as well). Also, you’ll
probably need a stats person to handle the econometric analysis, but
anyone can do an informal analysis to help gauge how important
further analysis is, and as a reality check on the stats. So here’s how
to run an informal analysis of a pre-post study.
You have measurements of user behavior and real-world outcomes
before and after a change, either when you gave the users the product
for the first time or added a new feature, etc. Subtract the pre from
the post: that’s your working impact number. You also should have a
sense of how big of a change you need for you to care. If you get
people to walk two more steps a day, is that relevant? No. Maybe you
only care if the product can get people to walk at least a hundred
more steps a day—it’s not much, but at least it’s something to build
upon. That “when do I care?” number is your threshold.
Now, look for non-product-related things that would have caused the
impact you’re seeing. With pre-post studies, there are a few very
common factors. I’ll use the example of an exercise tracker to make
things concrete:
Time
Would the time of year, day of month, day of week, time of day,
etc., matter for this outcome? For example, if you saw that users
were walking more in the spring than in the dead of winter, would
that surprise you? No. So it’s unlikely that your product would
have caused a change you see in walking between winter and
spring.
Experience
Let’s say you launched your product last month. You’ve just
added a new feature that puts a smiley face on the tracker when
users do well. In a pre-post study, it will be difficult to know if the
smiley face caused increased exercise or if users just gained
experience with the product from its initial launch and slowly
exercised more because of that experience (rather than the smiley
face). Gradual changes over time are often caused by experience;
sharp changes in behavior are more likely to be caused by a
change in the product or another external “event” you can search
for.
Data availability or quality
Let’s say that in the new release of the tracker, you added a
smiley and someone in the engineering department fixed some
bugs in the analysis of accelerometer data. Walking is up! Hmm.
That could be because of the smiley or because you’re simply
getting better data about the users. I’ve found that data quality
issues in particular are often invisible and therefore often
misleading—someone changed something and didn’t think it was
important or didn’t want to admit the previous problem. Like
product changes, data quality and data availability changes are
sharp, sudden changes, so they are very hard to distinguish in a
pre-post study.
Composition of the population
Let’s say that with the new release of the tracker, you’ve added
lots of new features and made a big announcement. You see that
average walking is up! Excellent. But that may be because the
product caused people to walk more, or it may be that the
announcement of the new features caused new users to join who
were already walking more—and the new users brought up the
average. This occurs in sudden ways (like product
announcements) or through the slow addition and attrition of
users over time. You should counteract this by looking at a
specific group of people before and after the change.
In each case, you’re looking for a gut check—is this a big deal?
Measuring walking behavior in the dead of winter versus in spring is
a big deal. Measuring it from one Tuesday to the next usually isn’t
(barring holidays). A big deal is anything that looks like it’s going to
have a large impact on behavior relative to what you’re seeing pre-
post and relative to the threshold at which you care. If the
combination of many small things pushes the likely impact of your
product below the threshold at which you care, then you can usually
stop—and move on to something more promising.
If the pre-post impact is so large that nothing else seems to explain it
other than the product, excellent. You should check your work with a
statistical model and prepare to be surprised; but if you can’t, at least
you’ve gotten an initial estimate of impact.
This informal analysis feeds into formal statistical modeling. Each of
the factors you identify that might be important become variables in
the model—things that you are trying to control for in order to isolate
the unique impact of your product. You’ll need to identify data that
measures them and run the model itself. That’s beyond the scope of
this work—but a good stats person can help.
Seem complex? It can be. That’s why experiments are useful, because
they remove these complexities. But we can’t always run them or get
enough users into the system to get a solid result. And so we
sometimes must use pre-post analyses. When the product has a big
effect, and there aren’t many other things going on that confuse the
result, that’s enough to get a signal for further product development.
Another option is cross-sectional multivariate analysis, which is up
next.
A Cross-Sectional or Panel Data Analysis of Impact
In a cross-sectional analysis, you look for differences among groups
of users at a given point. You want to see how their usage of the
product impacts their behavior and outcomes, after taking into
account all of the other things that might be different about the users.
For example, you might look at the impact among frequent users of
the application versus infrequent users. As with pre-post analyses, I
usually start with an informal, logical analysis and then feed that
understanding into a formal statistical or machine learning model if it
looks like there’s enough of an impact from the product to care.
3
Cross-sectional analyses usually pull together diverse groups of
people; in order for the analysis to be valid, you’ll need to control for
all of the factors that make those groups different other than the
product.
As before, there are some common differences you need to take into
account. Most importantly is this: why are some people more
frequent users than others? Age, income, prior experience with the
behavior, prior experience with the product’s medium (mobile versus
web), self-confidence, sufficient free time, etc.—all of these are
factors that affect the users’ behavior above and beyond the product.
If there aren’t obvious candidates that explain the difference in
behavior across users, then take the list of factors you generate and
plug them into a statistical model. Again, it’s beyond the scope of this
work, but a good stats person can help.
In addition to cross-sectional and pre-post analyses, one can (and
should) also look at models that examine changes in behavior and
outcomes among many users over time. These models, using panel
datasets (or time-series cross-sectional datasets with many people, but
shorter time frames) provide a much more fine-grained look at
behavior. They can pull out impacts of the product that pre-post and
cross-sectional models can’t because they can control for other
differences across the individuals. However, they require much more
data and statistical knowledge.
Unique Actions and Outcomes
Experiments are the best general-purpose and accurate way to
measure the impact of your product. But there’s an important case in
which they aren’t needed to accurately gauge impact. That’s when
there is no conceivable way that the outcome would occur without the
product being there.
For example, imagine a new and highly effective cancer treatment. A
team is developing a product to make people aware of it; the target
outcome is for people to use the new cancer treatment. Without that
awareness, no one would know. There’s no comparison group needed
—any impact that occurs is because of the product.
Similarly, it’s easy to measure the baseline impact of the product
when the action only exists in the product itself—which often occurs
where the behavior change process entails the user learning to use a
new product. That’s the benchmark you can use to compare against
future changes. After that baseline has been established, you’ll still
need to run experiments (or use other means) to gauge the impact of
new features and other changes to the application to distinguish the
impact of the feature from that of the existing functionality.
What Happens If the Outcome Isn’t
Measurable Within the Product?
You can safely skip this section if users take action directly in your
product and you can easily measure the outcome there.
As we briefly discussed in Chapter 12, sometimes the target outcome,
and even the target action, may not be directly measurable in the
product. For example, think about a website that helps users set up an
urban vegetable garden with video tutorials. The target outcome is
more vegetable gardens; the target action is that users set them up
(rather than, for example, contractors being paid to set them up).
Each person who uses the urban garden site is tracked with a cookie
or authenticated login. Each step in the “how to set up an urban
garden” tutorial is tracked. When users complete the tutorial, are they
“done”? Did they complete the action? No. The action that the
company wants to drive is setting up vegetable gardens, not
completing a tutorial about setting up vegetable gardens. The
difference between those two could be slight, or it could be massive if
no one actually follows through. Without further information, there’s
no way the company can know if the product is successful at driving
behavior change. Similarly, it has no way of knowing that the product
has caused more vegetable gardens to be set up than there otherwise
would have been.
So what can a company do? If the action or outcome is not directly
measurable with the product, then a data bridge is needed. A data
bridge is something that convincingly connects the real-world
outcome with behavior within the product. There are two basic
strategies for building a data bridge:
Build it yourself
Find a reliable way to measure the target action and outcome.
Then, build a model of what behavior in the product relates to that
action and outcome.
Cheat
Find an academic researcher who has already established the link
between something you can reliably measure in the application
and the real-world outcome. For example, there are numerous
studies that document “overreporting” (lying) about voting when
people actually don’t vote. 4
If there isn’t an existing research
paper on the topic, work with researchers to generate one (ideas
on how to partner with researchers are discussed in Chapter 17).
For the rest of this discussion, I’ll assume that you haven’t been lucky
enough to find an existing research paper or interested researcher to
do the work for you—and so you have to build the data bridge
yourself.
Figure Out How to Measure the Outcome and Action
by Hook or by Crook (Not by Survey)
For our sample company that’s encouraging users to set up urban
vegetable gardens, it will need to measure the number of vegetable
gardens, plain and simple. An obvious route would be to ask the
participants with a survey. Not ideal. Surveys are good for gathering
facts when people have an incentive to actually answer the survey but
don’t have an incentive to lie. Imagine that the vegetable garden
company asked users of its website, after a week, whether they set up
a garden. Most people wouldn’t answer—especially those who didn’t
set one up. Some would answer truthfully. And some would answer
with, “What will be truthful when they get around to it” (i.e., they’ll
tell a white lie). The company can’t really know which is which, at
least, not without doing additional field research to verify if people
aren’t telling the truth.
If the company asked users about their intention to set up a garden,
that would be even worse. Users would be sorely tempted just to give
the answer that’s expected of them (“Yes, of course!”); that’s called
the social desirability bias in surveys. 5
Or, people might honestly
believe that they will set up a garden, but never get around to it. You
can try to reduce this bias in surveys with carefully worded questions,
but it’s difficult to know the success of that effort without
verification.
Direct observation is often the best option: either observing the
number of vegetable gardens themselves or other things that uniquely
indicate that the action was taken, like the number of people buying
special vegetable garden supplies within a city. The company doesn’t
need to measure every single action or every time the outcome
changes—it just needs to be able to measure a few times so it can
understand the relationship between the product, the action, and the
outcome. So a small pilot study where an intern goes out and
manually counts the number of vegetable gardens in an area is fine.
6
Building a data bridge follows the same rules as creating a
benchmark for the product, described earlier in this chapter. In this
case, you’re looking for the causal relationship between something
easily measurable in the application and a real-world outcome that’s
hard to measure, but what you really care about. If the real-world
outcome is unique to the product (i.e., if no one normally creates
vegetable gardens in the area you care about), then you can do a
simple observation of the real-world outcome, after people use your
product, as your metric. If the real-world outcome has multiple
possible causes, you’ll need to use an experiment, statistical model,
or pre-post analysis.
7
In either case, there are three factors to keep in mind when measuring
the real-world outcome itself. These determine how sturdy the
resulting data bridge will be:
Representativeness
You want to observe cases that are representative of what
“normally” happens; if you decide to count vegetable gardens in
Portland (very rainy), and most of your app’s users are in Phoenix
(rather dry), that won’t help you generalize much about vegetable
garden creation. The most solid results come from taking your
user base and randomly selecting some of them to directly
observe.
Getting enough data points
You need to ensure you have enough information to get a solid
signal about what the real-world outcome really is. For example,
if you make only one observation of whether people make a
vegetable garden after saying they will in the app, that’s not going
to tell you much about whether other people will. You need the
general percentage of people who create gardens when they say
they will. So how many observations are enough? There’s no
hard-and-fast rule—it depends how important the accuracy of the
estimate is to the company. For experiments, we discussed in
detail how you compute sample sizes. If you’re not using
experiments, you can use online tools for computing confidence
intervals, 8
which tell you how confident you can be in your
estimate; if you build a statistical model of the relationship, that
will also provide you with confidence intervals.
Getting a baseline
Sometimes things happen in the real world that have nothing to
do with your product. I know, it’s hard to believe. Some people
will create vegetable gardens on their own, even without the
vegetable garden app. So when you’re observing your real-world
outcome, include some cases in which people don’t use the app.
This is important if you’re doing a simple model in Microsoft
Excel or if you’re running a full experiment to build your data
bridge.
If these options fail, and there’s really no way to measure the
product’s real-world outcome, then the rest of this discussion about
impact can’t help. That signal—what’s actually happening in the
world—is essential for keeping the whole process honest.
Find Cases Where You Can Connect Product
Behavior to Real-World Outcomes
Now you have measurements of actions taken within the product and
of real-world outcomes (though perhaps imperfect measurements).
How can you connect the two? You can connect them at the
individual level or at an aggregated level. At the individual level, for
example, the urban gardening app could ask for users’ names and
addresses to connect their behavior in the product to whether they
actually have a vegetable garden (send the intern to their home and
mark it down in the record). Getting data about individual users is the
ideal—as long as the data meets the standards (representative,
sufficient in size, and with a clear baseline).
Alternatively, the action and outcome can be measured as an
aggregate, a known geographic area or a known group of people. If
you know that a certain set of users in the product correspond to the
known area or group (even if you don’t know who is who) and you
can measure the actions and outcomes reliability in that area or
group, you’re in business. As we’ll see, it’ll be more challenging to
figure out exactly what is going on, but you can do it.
Build the Data Bridge
A data bridge brings together something you know and can measure
frequently (user behavior within the application) with something you
have measured only a few times (the impact of the product on the
real-world target outcome). It allows you to estimate how much the
target outcome has probably changed based on behavior within the
product. You’ll estimate that relationship by running a pilot project
that gathers both datasets:
1. Take a circumstance in which you can reliably connect user
behavior in the product with the real-world outcome or
action, as we’ve just described.
2. Measure the causal impact of the product on the real-world
outcome or action using an experiment (ideal), statistical
model, pre-post analysis, etc.
3. Analyze the various user behaviors that occur within the
application and identify one or more that is strongly related
(correlated) to the application’s causal impact. If a
statistician is available, use a mediation analysis.
4. When the indicative user behavior occurs within the product,
build a model (in Excel or in a statistical package) of how
much that changes the target outcome. That’s the data
bridge.
9
5. In the future, whenever you see the behavior in the product,
use your model to estimate the likely impact on the target
outcome.
For example, the urban gardening site runs a pilot study where it
takes two sets of randomly selected people and offers its program to
one group and not the other. Some of the people in the first group
completed the training program; some did not. An intern visits the
homes of everyone in the study and measures the truth. The company
finds that 65% of people who were offered the program created a
garden, and 90% of those who were offered the program and
completed their training within the application created gardens.
Meanwhile, 15% of those who weren’t offered it nevertheless created
a garden. Those three stats provide a basic understanding of how to
interpret user behavior on the website in the future.
The company would improve the chance that a person will set up a
garden by 50 percentage points (from 15% to 65%) if it offers the
person its training program. It will improve the chance that the person
will set up a garden even more if it can convince them to complete
the training program. 10
The company can get a precise estimate of
that impact using what’s known as a mediation analysis on the
experiment.
In short, if your target outcome is something outside of the product
and not directly measurable, then you’ll need to build a data bridge.
The easiest way to do that is to find an existing research study that
documents the relationship you’re looking for—like between the
intention to plant a garden and the actual act of doing so. If not, look
for a case in which your team can directly observe the users’ behavior
and compare the things they do or say in the product to what they
actually do in the real world. That’s your data bridge. In the future,
you can use that relationship to estimate how much of an impact
you’re having based on what you see in the application and iteratively
improve your product for greater impact.
Putting It into Practice
Here’s what you’ll need to do:
In a pre-post analysis, look for discontinuities in behavior
and outcomes at the moment the new feature or
communication was deployed. The sharper the change and
the fewer alternative explanations there are for that change,
the more confidence you can have that your intervention was
the cause.
In a cross-sectional or panel-data analysis, look for other
people in as similar a situation as possible who didn’t receive
the intervention to compare against. Again, the goal is to
remove alternative explanations for any differences you see
in behavioral outcomes.
The text describes the logic behind measuring impact
without an experiment, and if you have a unique action or
outcome, that can be enough. Usually, however, you need a
trained stats person to carefully analyze the data and
statistically control for (eliminate) alternative explanations.
How you’ll know there’s trouble:
There’s no clear definition of success and failure for the
product’s attempt to change behavior. If so, return to
Chapter 6.
Many other things changed within your product or user base
at the same time as your new feature or communication—
making it difficult to eliminate alternative explanations for
behavioral outcomes.
You have a complicated environment, no experiment, and no
stats person to analyze the data. Don’t try to wing it and look
at bar charts or line graphs over time—behavior change is
just too complicated.
Deliverables:
A clear measurement of the product’s impact!
1 Now, before you dismiss this experience as one limited to a particular set of studies, a
recent review of research where the authors preregistered (wrote down and published)
their hypotheses before they conducted a study found that over 50% of studies in
biomedicine and psychology did not show the results that researchers expected
(Warran 2018). Johnson et al. (2017) estimate that 90% of research efforts in
psychology overall (i.e., including those that aren’t preregistered) had null or
negligible results. And, again, before you dismiss this as a researcher’s problem,
remember that famous researchers like Edison and Dyson iterated hundreds or
thousands of times before generating successful products (e.g., Syed 2015).
2 Pontefract (2018)
3 There are often many possible changes to the product you want to analyze—so
focusing too long on features that don’t appear to change behavior in practically
significant ways means you’re wasting time that could be used more valuably
elsewhere. This is a difference from academic social science work in that researchers
usually devote a significant amount of time to a single question; because of a lack of
data, they usually don’t have a long list of alternative questions that can be explored
immediately.
4 Silver et al. (1986)
5 Fisher (1993)
6 By the way, if the area is large, I imagine that the best way to do this would be access
government or commercial satellite imagery. Professional geographers have worked
out amazing algorithms to automatically detect vegetation cover, and even the type of
vegetation. The GeoEye satellite that is used by Google Earth, for example, measures
down to increments of 16 inches.
7 To clarify—at this point we’re just talking about how to measure the real-world
outcome. That forms half of the data you need to run an experiment, do a pre-post
analysis, or build a statistical model of the relationship between the real-world
outcome and user actions in the application. That process is what actually creates the
data bridge and is covered later. But it helps to plan ahead for the type of analysis you
will be running to ensure you’re gathering the right data you need when measuring the
real-world outcome.
8 For example, you can use for calculating confidence intervals of proportions (percent
of people creating vegetable gardens) and for calculating confidence intervals of
quantities (number of pounds lost after an exercise program). Penn State has a nice
summary of the underlying math.
9 In the simplest case, you might look at the simple linear relationship between the real-
world impact and user behavior in the product. But there’s no reason to limit the
analysis to a linear relationship. You want to build a model that most accurately
10 describes the relationship between behavior in the product and outcomes in the real
world.
Exactly how much additional improvement might occur would require additional
analysis, to separate out the self-selection into the program from the program’s causal
impact.

---
title: 'The State of Web Development'
date: 2021-06-29T18:01:06Z
tags: ["web development", "javascript", "python"]
categories: ["web development"]
showToc: false
TocOpen: false
draft: false
hidemeta: false
comments: false
canonicalURL: "https://canonical.url/to/page"
disableHLJS: false # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
editPost:
    URL: "https://github.com/<path_to_repo>/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: true # to append file path to Edit link
---

I've had to dabble in a bit of web development over the past year as part of my research fellowship and having not done this for a while, I have accrued a couple of thoughts I want to share.

## My background

First, a bit of background. Growing up, I've had the privilege of witnessing the birth and evolution of the modern internet. From the days of 56kbps dial-up modems which gets taken out by lightning(!) occasionally and back when Yahoo was the default home page for everybody (remember those days?). This was before MySpace and Friendster.

As I got through secondary school, that was my first real encounter with web development. We had to do group projects which involved making a webpage around a particular topic. Something like a wiki in the days when Wikipedia was barely around. I handcoded webpages with **notepad**. Yes, those days.

## Let's talk code editors

In 2021, I am glad to report I no longer use notepad. Now VSCode seems to be the defacto IDE and certainly is the one I would recommend. There is _AI code autocompletion_. What?! Just incredibly amazing. In fact, this blog is written purely in VSCode.

Nowhere has this evolution in IDEs been more impressive to me than in the world of Javascript coding. I used to waste countless hours hunting for that missing curly brace in Notepad which screwed up the entire program. And in fact, I hated JavaScript for that very reason. Now with eslint and autoformatting, JavaScript is a complete breeze and a joy to write. Let's not go into its idiosyncracies.

## How about CSS frameworks?

CSS is still probably one of the toughest things to get right. And then Bootstrap by Twitter came along and allowed everybody to stop handwriting CSS from scratch every single time. After that, the mobile revolution happened and websites had to accommodate a ridiculous number of screen sizes.

Now in 2021, it seems that all the jazz is around tailwindcss and rightly so. Initially I struggled to get my head around it. Why write things like:

```html
<div class="bg-blue-100 mb-4 rounded shadow"></div>
```

How is this different from html in the pre-CSS days?

```html
<div style="background: blue;"></div>
```

and that brings me onto:

## Javascript frameworks

The biggest difference in 2021 vs say 2010 are javascript frameworks - ReactJS is number one today, followed by Vue, Svelte, Angular, Alpine JS. When you make the conceptual switch from building whole web pages to building components, that's when the logic of tailwindcss really shines.

These frameworks allow you to build amazingly interactive websites that pretty much outstrip desktop applications in every way. The only desktop applications that are better installed in your machine are things like games which use tremendous amounts of horsepower.

## Backend frameworks

Backend frameworks in 2021 have now transformed into APIs that serve a variety of clients - whether web or mobile app. Again another major conceptual shift. In the pre-Ruby on Rails days you had to be a php wizard or know some cgi to interact with a database. In fact, the reason why Wordpress was so popular was because it allowed you to quickly set up a website with a database on what we used to call a LAMP stack.

## Deploying to the cloud

Deploying a website in 2021 has never been easier. Gone are the days of having to actually tinker with a physical machine and hook it up to your ISP's network in order to serve your first static web page ever. In 2021, a solo developer can single handedly build a web application that can scale across the entire world as long as you have a big enough credit card limit!

## The web is still the future

If there is one thing you can bet on, it's that the web is still the future. Although some may feel that the space has matured and there are a ton of tech giants, when you go into actual industries you will see that there are still a ton of things in the real world that haven't made the technological shift.

As someone who has been doing more real world stuff than being in the tech space, seeing the state of the web in 2021 has pretty much blown my mind. Companies that manage to get their heads round the above changes will rise while those who ignore them will have an increasingly tough time.

If you need any further convincing, I will just say one word - covid.

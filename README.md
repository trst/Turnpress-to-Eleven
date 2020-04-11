# Turnpress-to-Eleven

> Business in the front, party in the back

Create content in [WordPress](https://wordpress.org) but build out to beautiful static HTML, JS and CSS using [Eleventy](https://www.11ty.dev).

Work with technologies that you're most comfortable with, deploy the entire site to a CDN for a speed and reliability bump, use [Netlify](https://www.netlify.com/) generate a new site every time you a change to production and best of all, never worry about a faulty database migration/backup/corruption/whatever taking down a client's site.

## Wait, Why? WHY? WHY!?

### For the TL;DR crowd:

- Uses WordPress as a headless CMS, which your clients, copy writers, etc. will appreciate.
- Decreases the attack surface of the final site,
- Reduces the fragility of a dynamically generated site (e.g., database corruption won't take your site down!)
- Increases developer's ability to efficiently ship changes, tweaks and fixes,
- Eases development integration with existing or new technology stacks

### Explanation:

WordPress is great. It's a flexible content management system and a well-known quantity by many, making it a great base for many websites and simple applications; however, its flexibility, while empowering to users, often creates problems with accessibility, performance, security and maintainability.

Each of these problems can be completely, or at least better addressed by baking the site out as static HTML, CSS and JS. But while wiping the slate clean is appealing, there's little benefit in throwing away years of knowledge and expertise to chase the current hotness.

Web developers of all stripes often have themed, extended and deployed many WordPress instances. Though the Internet is ablaze with SPA and JS framework hype, it's a steep curve to follow. Why not make the start of that journey easy, by starting where many have made their careers using WordPress and abstracting a little bit. Keep WordPress as a headless backend, and generate the front end using whatever you feel comfortable in. Eleventy has a ton of templating languages to choose from (this project has defaulted to [Nunjucks](https://mozilla.github.io/nunjucks/), which is similar to [Twig](https://twig.symfony.com/), [Liquid](https://shopify.github.io/liquid/), [Jinja](https://jinja.palletsprojects.com/en/2.11.x/), etc.)

Or if that's not enough, add on a JS framework, like [React](https://reactjs.org/), [Vue](https://vuejs.org/), [Svelte](https://svelte.dev/), or heck, even the hilariously fun [Alpine.js](https://github.com/alpinejs/alpine) and get going. Once you get the concept, it won't be hard to break off into a more advanced setup using [Next.js](https://nextjs.org/), [Nuxt.js](https://nuxtjs.org/) or [Sapper](https://sapper.svelte.dev/) and just leveraged the concepts you learned in this first step. You're also not limited to WordPress either (shocker!), instead mix and match data sources as you see fit.

I just want to stress: this project is **not** an SPA starter template. Besides the use of Eleventy and Wordpress, you are free to stick to static, or build with whatever tickles your fancy.

## Why not just use a caching plugin?

In a word: Netlify. In a few more words: caching relieves a lot of performance concerns but means you're still on the hook for adding a CDN, staging/deployment infrastructure and processes, CI/CD, testing, etc.

I applaud anyone who can manage that level of infrastructure (particularly if you're at a small team at an agency--go you!) but I can't do it well for the time I can justify spending on it. So why not leverage the experts?

## Drawbacks

Nothing's perfect, but conveniently, this project has never tried to be :D

- WordPress is just a data source, so you will have to figure out how you'll integrate any and all functionality (most plugins won't automatically integrate).
- As with anything custom, your client's will have to rely on you to develop any and all changes beyond content.
- You'll need to augment your hosting strategy (e.g., a host for the API and a spot for the final site, I'd recommend Netlify for the latter and a cheap shared host for the former).
- Depending on size of site, number of data points, complexity of template, network latency, etc., builds can be slow.
- Other drawbacks, I'm not smart enough to think of!

# To-Do List

- [ ] Migrate this whole list into an actual wiki
- [ ] Start a repository for useful WordPress plugins
  - [ ] Actually write said WordPress plugins (e.g., custom endpoints)
  - [ ] Create example plugin for generating SEO data from popular plugins
  - [ ] Integrate with ACF fields
  - [ ] Create an example `composer.json` file for those who just want to download existing plugins and be off the hook for maintenance
- [ ] Create example and optional data sources
  - [ ] Fetch taxonomy data (e.g., categories and tags)
  - [ ] Fetch user information for post authors, or whatever else
- [ ] Create new templates
  - [ ] Create templates for taxonomy archives
  - [ ] Create templates for user pages
  - [ ] Add service worker
  - [ ] Add RSS template
- [ ] Documentation
  - [ ] Write getting started
  - [ ] Write up examples setting up Taxonomies, Users, etc.
  - [ ] Write up how to integrate with existing plugins
  - [ ] Write deployment guide
  - [ ] Create a wacky guide about integrating WP with sqlite and checking the whole lot into a massive mono repo

# Contributing

Please do :D

We can only improve as an industry together. Your time, development experience, questions, translations, documentation support, bug reporting, words of encouragement, recommendations to friends and gentle foot rubs are all greatly appreciated.

# Thank Yous

- [Zach Leatherman](https://twitter.com/zachleat) for writing Eleventy
- [Andy Bell](https://twitter.com/hankchizljaw) for writing [Hylia](https://hylia.website/) which got me thinking... a dangerous thing
- [Jérôme Coupé](https://twitter.com/jeromecoupe) for writing an [awesome tutorial](https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/) which opened my eyes a little wider

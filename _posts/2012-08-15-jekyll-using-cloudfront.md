---
layout: post
title: "Jekyll: Using CloudFront as a CDN"
description: "Using CloudFront in Jekyll-Bootstrap"
comments: true
categories: [Code,Cloud]
tags: [jekyll,amazon,cloudfront,ruby,jekyll-bootstrap]
description: Deploying style, script, and media assets to a CDN with Jekyll.
---

We decided to use [Amazon CloudFront](http://xorcode.net/R2fO1q) as a <abbr title="Content Delivery Network">CDN</abbr> to deliver media assets of our site. This seemed easy enough until we looked into how Jekyll-Bootstrap is written. For all intents and purposes, Jekyll-Bootstrap uses safe mode to indicate production. Though that would mean that none of our plugins would be used when deploying.

<!--more-->

> <img src="/uploads/2012/08/cloudfront.png" class="pull-right"> Amazon CloudFront is a web service for content delivery. It integrates with other Amazon Web Services to give developers and businesses an easy way to distribute content to end users with low latency, high data transfer speeds, and no commitments.

Time to modify jekyll itself.

Open up **jekyll/bin/jekyll** and add this new option:

```ruby
  opts.on("--[no-]production", "Production mode (default development)") do |production|
    options['production'] = production
  end
```

{% gist 3360764/jekyll.rb %}

After modifying this, and feeling a bit bad about it, we went on to change Jekyll-Bootstrap as well.

**_includes/JB/setup:**

{% gist 3360764/setup %}

**_includes/JB/analytics:**

{% gist 3360764/analytics %}

**_includes/JB/comments:**

{% gist 3360764/comments %}

**_config.yml:**

We changed our configuration to include `UPLOAD_PATH`.

{% gist 3360764/_config.yml %}

Finally we added the following task to our **Rakefile:**

{% gist 3360764/Rakefile %}

Now we can deploy to our production site and have it use the proper CloudFront URLs.


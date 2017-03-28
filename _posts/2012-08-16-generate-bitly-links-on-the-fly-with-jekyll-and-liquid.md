---
layout: post
title: "Jekyll: Generate Bit.ly Links on The Fly with Liquid"
description: "Generate Bit.ly Links on The Fly with Liquid in Jekyll"
comments: true
categories: Code
tags: jekyll liquid bitly
description: Filter links with Liquid to effortlessly turn them into bit.ly links on the fly with this plugin.
---

We needed a quick way of generating shortened links in our articles. Since we already use [bit.ly](http://bit.ly/) we figured that would be the best choice and there are several Ruby scripts and gems available. We picked one that is actively developed, appears stable, as well as has support for [bit.ly API V3](http://dev.bitly.com/data_apis.html).

<!--more-->

> <img src="{{ '/assets/uploads/2012/08/bitly.png' | relative_url }}" class="pull-right"> bitly is the easiest and most fun way to save, share and discover links from around the web. We call these links bitmarks, and you can use bitly to remember, curate and share them.

First you have to install the [Bit.ly gem]({{ 'https://github.com/philnash/bitly' | bitly }}):

```sh
$ sudo gem install bitly
```

Once you have installed the gem simply put the below file in your `_plugins` folder.

{% gist 3361948/bitly_filter.rb %}

Update your configuration file with the following values:
```yaml
bitly:
  username: YOUR_BITLY_USERNAME
  api_key: YOUR_BITLY_KEY
```

Then you can use tags like this in your content:

{% gist 3361948/sample_tag %}

Which would produce output similar to this:

{% gist 3361948/sample_output %}

The filter uses a cache to cache the shortened URLs during build time to minimize the calls to the [Bit.ly API](http://dev.bitly.com/api.html).

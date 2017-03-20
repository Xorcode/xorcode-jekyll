---
layout: post
title: "Supporting Liquid Templates in Wintersmith"
date: 2013-08-22 08:55
comments: true
categories: [Code]
tags: [wintersmith,node.js,liquid]
---
We've gotten used to [Liquid](https://github.com/Shopify/liquid/) from using [Jekyll](http://xorcode.net/13Tvyaq) and [Octopress](http://xorcode.net/13TvzLx). When we took [Wintersmith](http://xorcode.net/13TvDuX) for a spin we sort of missed Liquid. So we created a template plugin for Liquid that uses the [liquid-node](http://xorcode.net/13TtSOc) module to render Liquid templates.

<!--more-->

> Liquid plugin for Wintersmith, uses liquid-node to take advantage of asynchronous behavior. The **liquid-node** module uses Q internally and thus we can take advantage of this in our template plugin.

Template plugins for Wintersmith are quite easy to write. We published ours on [npm](http://xorcode.net/13Tu00a) after a few minutes after initially having been confounded by [CoffeeScript](http://xorcode.net/13TuZxs). Bonus: now we know how to write CoffeeScript!

## Installation instructions

Navigate to the folder you created with `wintersmith new` and run

```sh
$ npm install wintersmith-liquid --save
```

Once you have installed the plugin you need to modify your `config.json` and add `wintersmith-liquid` to the list of plugins for your site.

Templates with the `.html` extensions are parsed with Liquid.

<a href="http://xorcode.net/13TudAo" class="btn btn-primary"><i class="fa fa-bitbucket"></i> Clone wintersmith-liquid on Bitbucket</a>

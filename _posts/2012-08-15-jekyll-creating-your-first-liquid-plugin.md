---
layout: post
title: "Jekyll: Creating Your First Liquid Plugin"
comments: true
categories: Code
tags: jekyll jekyll-bootstrap ruby qr
description: Guide to creating your first Liquid plugin for use with Jekyll.
---

After switching from WordPress to [Jekyll](http://xorcode.net/Pb1SBF) and [Jekyll-Bootstrap](http://xorcode.net/SjE0JM) we realized that we were lacking in the [Plugin](http://xorcode.net/NkqtRj) department. We immediately set about writing plugins for Jekyll to fill the void. Our first plugin generates a QR code using Google's Charts API.

<!--more-->

> The Jekyll plugin system hooks allow you to create custom generated content specific to your site. You can run custom code for your site without having to modify the Jekyll source itself.

<span class="label label-info">caveat</span> The plugin we created prints out Twitter Bootstrap compatible HTML.

{% gist 3355761 %}

As you can see, the plugin generates a QR code for a Google Play item. All you need to do is supply the ID.

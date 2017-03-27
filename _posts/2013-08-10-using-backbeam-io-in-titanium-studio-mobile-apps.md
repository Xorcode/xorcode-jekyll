---
layout: post
title: "Using Backbeam in Titanium™ mobile applications"
date: 2013-08-10 19:42
comments: true
categories: Code
tags: titanium backbeam javascript api android ios web
description: Connecting Titanium™ mobile apps to Backbeam lets you develop hyper-connected applications.
decor_image: /uploads/2013/08/titanium-backbeam-feature.png
---
[Backbeam]({{ 'http://backbeam.io/' | bitly }}) provides a full-stack backend platform with API SDKs for Node.js/JavaScript, iOS, Android, and browsers. [Titanium™ Studio]({{ 'http://www.appcelerator.com/platform/titanium-studio/' | bitly }}) by Appcelerator<sup>®</sup> is a modern IDE for developers to rapidly build, test, package and publish cross platform, native mobile applications. We thought it was about time they met each other.

<!--more-->

In order to get started with Backbeam in Titanium™ you need only include the [Backbeam JavaScript SDK]({{ 'http://backbeam.io/documentation-javascript' | bitly }}) in your project and you are off to the races.

```javascript
Ti.include('/backbeam/hmac-sha1.js')
Ti.include('/backbeam/enc-base64.js')
var backbeam = require('/backbeam/backbeam')
```

Once included, backbeam can be called just as it would be called in a browser or in [node.js]({{ 'http://nodejs.org/' | bitly }}).

```javascript
backbeam.configure({
    project: 'your-project-name', // the subdomain of your project
    shared: 'your-shared-key',
    secret: 'your-secret-secret',
    env: 'dev' // can be 'dev' or 'pro'
})
```

Please see the documentation for respective product for more in-depth information.

<a href="{{ 'http://docs.appcelerator.com/titanium/latest/' | bitly }}" class="btn btn-primary">Titanium™ SDK/Studio Documentation</a> <a href="{{ 'http://backbeam.io/documentation-javascript' | bitly }}" class="btn btn-primary">Backbeam JavaScript SDK</a>

<small class="muted">Appcelerator<sup>®</sup> is a trademark of Appcelerator, Inc., registered in the U.S and/or other countries and is used under license.</small>

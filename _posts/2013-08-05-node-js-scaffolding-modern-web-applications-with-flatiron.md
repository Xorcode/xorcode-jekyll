---
layout: post
title: "Node.js: Scaffolding Modern Web Applications with Flatiron"
date: 2013-08-05 23:04
comments: true
categories: Code
tags: node.js flatiron union resourceful restful plates
description: After having used Express, Jade, Stylus, and Mongoose for quite some time we decided to try something new. Enter Flatiron, Union, Director, Plates, and Resourceful.
---
After having used [Express]({{ 'http://expressjs.com/' | bitly }}), [Jade]({{ 'http://jade-lang.com/' | bitly }}), [Stylus]({{ 'http://learnboost.github.io/stylus/' | bitly }}), and [Mongoose]({{ 'http://mongoosejs.com/' | bitly }}) for quite some time we decided to try something new. Enter [Flatiron]({{ 'http://flatironjs.org/' | bitly }}), [Union]({{ 'http://flatironjs.org/#middleware' | bitly }}), [Director]({{ 'http://flatironjs.org/#routing' | bitly }}), [Plates]({{ 'http://flatironjs.org/#templating' | bitly }}), and [Resourceful]({{ 'http://flatironjs.org/#data' | bitly }}).

<!--more-->

> No one agrees on frameworks. It's difficult to get consensus on how much or how little a framework should do. Flatiron's approach is to package simple to use yet full featured components and let developers subtract or add what they want.

Flatiron supports application boilerplates as well as straight inclusion in your `package.json` file.

### Getting started with a boilerplate

In order to get started with flatiron it needs to be installed on your system.

```sh
$ npm install flatiron -g
```

Once installed, the `flatiron` command line tool will be available. In order to start with a new web application boilerplate, issue the following command:

```sh
$ flatiron create <app-name> http
```

The boilerplate allows you to quickly start scaffolding a web application without a lot of custom development.

### Advanced use of flatiron in your project

Our `package.json` file includes several other components used in conjunction with flatiron.

{% gist 6162027/package.json %}

We decided to use flatiron, plates, resourceful, restful, and union for our example project.

{% gist 6162027/app.js %}

Our application server gets bootstrapped and launched through the `app.js` file. The application uses Union middleware to integrate plates, resourceful, and restful into flatiron.

{% gist 6162027/config.json %}

### Application Configuration

The `restful` and `resourceful` components are configured in the configuration file. Our example uses CouchDB. If you do not wish to use Couch, simply change the `engine` option to `memory` and remove `uri` and `auth` from the `resourceful` block.

### Controllers and Views

We decided to snag the **plates** plugin from the `scaffolding` branch in the `flatiron/flatiron` repository to allow us to easily render views in our application.

{% gist 6162027/plates.js %}

The **controllers** plugin serves as a new addition to flatiron and it's based on the plates plugin.

{% gist 6162027/controllers.js %}

The controllers plugin simplifies the inclusion of custom director routes. Each controller file contains all logic necessary for its routes to function.

The default controller serves up the index page.

{% gist 6162027/default.js %}

Our views use the `plates` module and the `plates` plugin which supports layouts. This example contains a basic layout to get you started.

{% gist 6162027/app.html %}

The index page automatically includes this layout and its contents replace the `<div id="body"></div>` tag.

{% gist 6162027/index.html %}

### Automatically generated REST API resources

By using the `restful` middleware plugin our application automatically discovers and makes resources available in the `/api` directory. The API prefix can be modified in the `config.json` file.

Our application now reports the following available resources:

```
GET     / 
GET     /api 
GET     /api/user 
POST    /api/user 
POST    /api/user/([._a-zA-Z0-9-]+) 
GET     /api/user/([._a-zA-Z0-9-]+) 
DELETE  /api/user/([._a-zA-Z0-9-]+) 
PUT     /api/user/([._a-zA-Z0-9-]+) 
```

Change the `explore` configuration option to `false` in order to not expose available API end-points.

### Resources with Resourceful

We also wrote a `user` resource with a couple of helper methods to ease generation of <abbr title="Password-Based Key Derivation Function 2">PBKDF2</abbr> encrypted passwords for heightened security.

{% gist 6162027/user.js %}

The packer used in the `user` resource resides in the `utils.js` file.

To quickly get started by inserting a user, utilize the snippet from the comment inside the `user.js` file.

{% gist 6162027/utils.js %}

With this custom boilerplate we are now ready to start cranking out pages as well as API end-points that can be consumed by our web application and mobile applications alike.

Feel free to fork our repository to add your own modifications. We greatly appreciate pull requests with improvements and new ideas!

<a href="https://github.com/Xorcode/flatiron-example" class="button"><i class="fa fa-github"></i> Fork on Github</a>

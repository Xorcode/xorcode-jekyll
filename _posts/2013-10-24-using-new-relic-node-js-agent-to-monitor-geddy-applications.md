---
layout: post
title: "Using New Relic's Node.js agent to monitor Geddy applications"
date: 2013-10-24 13:54
comments: true
categories: Code
tags: node.js geddy new-relic
---
Having used [New Relic]({{ 'http://newrelic.com/' | bitly }}) for other projects we of course jumped on the chance to get started with [New Relic for Node.js]({{ 'http://newrelic.com/nodejs' | bitly }}) when our sales contact reached out to us right after their beta ended. We've got several projects using [Geddy]({{ 'http://geddyjs.org/' | bitly }}), which is not supported out of the box, so we had to do some customization.

<!-- more -->

> Pinpoint and solve your Node.js application performance issues! New Relic is the only tool you'll need to see everything in your data intensive, real-time, Node.js applications—from application response times to server monitoring.

New Relic for Node.js officially launched today, and the [original press release]({{ 'http://blog.newrelic.com/2013/10/24/node-joins-new-relic-family/' | bitly }}) includes a short tutorial on how to get started, which we will also cover in this article.

## Create a new Geddy project

Create a new Geddy project.

    $ geddy gen app newrelic-test
    $ cd newrelic-test

Let's start with installing the New Relic Node.js agent.

    $ npm install newrelic --save

## Configuring Geddy and New Relic

Once you have installed the agent, you need to copy the configuration file into the root of your project.

    $ cp ./node_modules/newrelic/newrelic.js .

Open `newrelic.js` and change the value for **app_name** to the name of your application. Replace the value of **license_key** with your actual license key which you get from New Relic. We also change **logging.level** from _"trace"_ to _"info"_ to avoid agent log spam.

In order for New Relic to be able to properly report for your application we need to create a startup file since we can't run this with the `geddy` command like we normally do locally.

    $ npm install geddy --save

Create a new file in your project root called `app.js` and add the following to that file to get New Relic up and running in your Geddy project:

{% highlight js filename="app.js" %}
var geddy = require('geddy');

geddy.startCluster({
  hostname: '0.0.0.0'
, port: process.env.PORT || '4000'
, environment: process.env.NODE_ENV || 'development'
});
{% endhighlight %}

## Loading New Relic

Load New Relic in your `config/init.js` script.

{% highlight js filename="config/init.js" %}
var cluster = require('cluster');

if (cluster.isWorker && process.env.NODE_ENV == 'production') {
  process.env.NEW_RELIC_LOG = 'stdout';
  geddy.newrelic = require('newrelic');
}
{% endhighlight %}

We only require the New Relic module if we're running in production. You can always remove the `if` statement around `require('newrelic')` if that makes more sense to you. We also prefer that New Relic logs to `stdout` instead of to a log file since we host on various different platforms and we might not want files to be created at all.

## Scaffold test endpoint

We need something to report on, so let's scaffold an endpoint for our application to report on.

    $ geddy gen scaffold user username:string email:string

You'll see output similar to this:

```
[Added] app/models/user.js
[Added] db/migrations/20131024163436_create_users.js
[Added] test/models/user.js
[Added] test/controllers/users.js
[Added] app/controllers/users.js
[Added] Resource users route added to config/router.js
[Added] View templates
```

## Name requests properly in Geddy

Open up `app/controllers/application.js` and change its contents to the following:

{% highlight js filename="app/controllers/application.js" %}
var Application = function () {
  this.before(function () {
    geddy.newrelic.setControllerName(this.params.controller, this.params.action);
  });
};

exports.Application = Application;
{% endhighlight %}

We are using `newrelic.setControllerName()` to name our requests so that they do not all get grouped under `/*` or similar in New Relic.

## Run your application

Running our application with Node is simple:

    $ node app

Navigate to [http://localhost:4000/](http://localhost:4000/) and then [http://localhost:4000/users](http://localhost:4000/users) where you can start adding, editing, and removing users to get some sample data in your New Relic account.

Once you start your application you will begin to see data in New Relic within five minutes and your brand new Node.js application will be accessible from your New Relic dashboard.

## Repository

You can take a look at our example repository if you want to make sure you didn't miss anything.

<a href="{{ 'https://bitbucket.org/xorcode/geddy-newrelic-tutorial/' | bitly }}" class="button"><i class="fa fa-bitbucket"></i> Fork on Bitbucket</a>

## Documentation

For more information, please see the [Geddy documentation](http://geddyjs.org/reference#controllers.params) on controllers as well as the [New Relic Node.js project](https://github.com/newrelic/node-newrelic/#transactions-and-request-naming).

## Thank yous

Thanks to [Ben Ng](https://github.com/ben-ng) for finding the memory leak issue with New Relic and for supplying a fix.

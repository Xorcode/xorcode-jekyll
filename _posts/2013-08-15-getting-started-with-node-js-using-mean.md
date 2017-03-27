---
layout: post
title: "Getting Started with Node.js #1: Using the MEAN Stack"
date: 2013-08-15 13:05
comments: true
categories: Code
tags: mean node.js mongodb express angular tutorial series
series: Getting Started with Node.js
series_description: An introduction to MongoDB, Express, Angular, and Node.js describing how to use the MEAN stack to quickly set up fully functional web applications with Node.js. The series assume you have some programming experience.
---
Just like us here at Xorcode, [Linnovate]({{ 'http://www.linnovate.net/' | bitly }}) likes to contribute to the community. They have created an awesome Node.js boilerplate called [<abbr title="MongoDB, Express, Angular, Node.js">MEAN</abbr>]({{ 'http://mean.io/' | bitly }}), which we will show you how to get up and running with in a short time.

<!--more-->

The MEAN stack utilizes AngularJS to declare dynamic views for use with both browser-based script as well as views on the server itself. AngularJS sits on top of Express, a stable and flexible web application framework with great community support. The boilerplate also uses Mongoose, a MongoDB object modeling framework for Node.js.

> MEAN is a boilerplate that provides a nice starting point for MongoDB, Node.js, Express, and AngularJS based applications. It is designed to give you quick and organized way to start developing of MEAN based web apps with useful modules like mongoose and passport pre-bundled and configured. We mainly try to take care of the connection points between existing popular frameworks and solve common integration problems.

## Getting started with Node.js

If you haven't already installed Node.js on your development machine, now is the time to do so. Node.js provides installers for Mac OS X and Windows, and source code for other systems.

> Node.js is a platform built on [Chrome's JavaScript runtime]({{ 'http://code.google.com/p/v8/' | bitly }}) for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

### Installing Node.js on Windows or Mac

- Go to [nodejs.org]({{ 'http://nodejs.org/' | bitly }}) and click the INSTALL button. Your browser will download the install package, which can then be installed the usual way depending on operating system.
- Your development system should now be ready to use Node.js on the command line.

Open a terminal to verify Node.js installation:

#### Mac OS X

{% highlight sh %}
$ node --version
v0.11.5
{% endhighlight %}

#### Windows

```sh
C:\> node.exe --version
v0.11.5
```

If you get similar output from running node in your terminal, you are ready to proceed!

### Installing Node.js on Linux

You can either use your package manager to install Node.js on your system, or follow the instructions for other systems.

#### Apt-based systems (Ubuntu/Debian)

```sh
$ sudo apt-get install node
```

#### Yum-based systems (Redhat/Fedora)

```sh
$ sudo yum install node
```

### Installing Node.js on other systems

- Go to [nodejs.org]({{ 'http://nodejs.org/download/' | bitly }}) and select your desired binaries or source code.

## Getting started with MEAN

Once you have installed Node.js in your development environment, it's time to get MEAN.

```sh
$ git clone https://github.com/linnovate/mean
$ cd ./mean
```

<a href="https://github.com/linnovate/mean" class="btn btn-primary"><i class="fa fa-github"></i> Clone MEAN on Github</a>

### Starting the application

Linnovate recommends using Grunt to start the server:

```sh
$ grunt
```

Alternatively you can start the server directly with the `node` command line inteface:

```sh
$ node server
```

Then open a browser and go to:

```
http://localhost:3000
```

### Configurating MEAN

All configurations are specified in the `config` folder of your project, with `config.js` as the main starting point. Edit these files to specify your application name, database setup, as well as social applications such as Twitter, Facebook, Github, and Google.

#### Environmental Settings

MEAN support three environments out of the box: **development**, **test**, and **production**. Each of the environments has the following configuration options:

- `db` - Name of the application database, which is set to `mean-dev` by default.
- `root` - Determined automatically by the configuration file, but it can be overridden in the configuration if so desired.
- `app.name` - Name of the application or website. Can be different for each environment. That way you can tell what environment you are running simply by looking at the TITLE attribute that your application generates.

To run with a different environment when you start MEAN, just specify `NODE_ENV` when you start your application.

```sh
$ NODE_ENV=test grunt
$ NODE_ENV=test node server
```

<div class="alert alert-info"><span class="label label-info">Heads Up!</span> Running MEAN in production enables caching, which will prevent certain parts of your application from being updated when you re-save them.</div>

### Examining the Example

MEAN includes an example that defines model object schemas, a back-end controller, routes, AngularJS <abbr title="Create, Update, Delete">CRUD</abbr> routes, an AngularJS <abbr title="Representational State Transfer">REST</abbr> service, an AngularJS front-end controller, and AngularJS views for CRUD.

#### Model

Our model defines an Article schema for use with the example application. Here we define fields included in the schema as well as utility methods used by the model.

#### Back-End Controller

The back-end controller contains methods for listing articles, finding articles, showing an article, as well as creating, updating, and deleting a specific article. This controller responds with <abbr title="JSON with Padding">JSONP</abbr> payloads.

#### Routes

Routes for the index page, user-related tasks such as signing up and logging in, routes for social services such as Twitter and Facebook, and finally they define the routes that are used for the articles that are part of the example.

#### AngularJS routes

This file defines the routes that are used by the front-end to list, view, and edit articles as well as display the home page.

#### AngularJS service

AngularJS service for mapping to the REST API provided by the back-end.

#### The AngularJS Controller

Front-end controller that handles listing articles, creating, updating, and deleting articles.

#### AngularJS Views

These views are used by AngularJS to render content in the browser for the various routes available for the Articles controller.

## Conclusion

MEAN allows you to quickly bootstrap an application with its ready-to-rock application boilerplate. In a few minutes you have an application ready for use on the web, in mobile browsers, as well as by native desktop and mobile applications.

{% series %}

<div class="alert">This article is based on the instructions that come with the MEAN stack.</div>

### Credits

- [Linnovate]({{ 'http://www.linnovate.net/' | bitly }})
- [Madhusudhan Srinivasa]({{ 'https://github.com/madhums/' | bitly }})
- MEAN is licensed under the [MIT License]({{ 'http://opensource.org/licenses/MIT' | bitly }})

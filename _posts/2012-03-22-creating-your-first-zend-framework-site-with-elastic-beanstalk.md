---
layout: post
status: publish
published: true
title: Creating your first Zend Framework site with Elastic Beanstalk
date: 2012-03-22 19:22:04.000000000 -04:00
categories: Cloud Code
tags: amazon php aws elastic-beanstalk
---

Trying out the new feature of AWS Elastic Beanstalk we created and deployed a Zend Framework PHP project to Elastic Beanstalk in less than five minutes using git.

<!--more-->

> <img src="/uploads/2012/03/beanstalk.png" class="pull-right" style="height:125px;"> AWS Elastic Beanstalk is an even easier way for you to quickly deploy and manage applications in the AWS cloud. You simply upload your application, and Elastic Beanstalk automatically handles the deployment details of capacity provisioning, load balancing, auto-scaling, and application health monitoring.

We decided to try with a clean copy of Zend Framework to determine what we had to do to get one of our PHP Zend Framework powered sites up and running successfully on [Elastic Beanstalk](http://aws.amazon.com/elasticbeanstalk/). Using the Zend Studio project creation wizard we set up HelloWorld.

HelloWorld ran fine after we downloaded [Zend Framework](http://framework.zend.com/) and placed it in `library/` and added it to the `autoloaderNamespaces` configuration parameter. A few minor changes to the configuration of the Elastic Beanstalk environment are necessary to ensure that Zend Framework runs as it should.

![AWS Management Console](/uploads/2012/03/AWS-Management-Console.png)

Note that we used the Document Root `/public` to indicate that the web server container should be using the standard Zend Framework public directory as its starting point. Once this was done and the instances had reloaded their configuration our Zend Framework site popped right up and greeted us with the familiar Zend Framework boiler template starting page.

![Hello World, Elastic Beanstalk](/uploads/2012/03/helloworldelasticbeanstalk.png)

Now you are free to deploy your Zend Framework projects into the cloud with Elastic Beanstalk and PHP. We are excited about this new feature of AWS and we intend to use it to its fullest. We will come back with more updates regarding Amazon and Elastic Beanstalk in the near future.

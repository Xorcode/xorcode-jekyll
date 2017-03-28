---
layout: post
status: publish
published: true
title: Auto-Scaling with EC2
date: 2011-03-27 13:45:04.000000000 -04:00
categories: Cloud
tags: ec2 amazon
alias: [/guides/auto-scaling-with-ec2]
---

Set up a scalable server farm in less than 10 minutes with Amazon Elastic Compute Cloud utilizing Elastic Load Balancing and Auto Scaling.

<!--more-->

> <img class="pull-right" src="{{ '/assets/uploads/2011/03/aws_logo.png' | relative_url }}">Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale computing easier for developers.

If you have used EC2 at all you must have wondered how you can automate the creation of instances in your load balancer. So did we. After much searching and various testing back and forth we came up with the following solution.

## Dependencies

The EC2 tools all require Java to be installed. Follow the instructions for your operating system in order to install a Java runtime environment.

## Requirements

First you need to install these tools from Amazon:

- [EC2 API Command Line Tools](http://aws.amazon.com/developertools/351)
- [EC2 Auto-Scaling API Tools](http://aws.amazon.com/developertools/2535)
- [EC2 CloudWatch API Tools](http://aws.amazon.com/developertools/2534)

To make these exercises easier for you to read we have selected Ubuntu as our operating system. If you have a Mac there are very few things you need to change apart from how to install the above mentioned command line tools.

The EC2 command line tools are available through the Ubuntu Multiverse repository which you can activate through your package manager. Once you have done this, run the following command to install the tools:

```shell
$ sudo apt-get install ec2-api-tools
```

Once you have installed the tools you need to download your key pair from Amazon so that you can access the API via the tools. In order to do this you need to access them through your [AWS Account](http://aws.amazon.com/account/). Once there, click the "[Security Credentials](https://aws-portal.amazon.com/gp/aws/developer/account/index.html?ie=UTF8&amp;action=access-key)" link, here you need to create an X.509 Certificate for use with the EC2 Tools.

![X.509 Certificates - Create Certificate]('/assets/uploads/2011/03/createcert.png' | relative_url)

Download both the Private Key File and the X.509 Certificate by using the two buttons.

![Download X.509 Certificate]('/assets/uploads/2011/03/x.509cert.png' | relative_url)

Store your private key file somewhere safe. Like the text above states, if you lose it, there is no way to recover and you will have to create a new certificate. This is especially important with your SSH key used with your instances since you will lose SSH access if you lose your private key part.

Once you have both certificate parts, create the following directory:

```shell
EC2
```

In this directory create sub directories for `CloudWatch` and `AutoScaling`. Extract the respective tools into these directories and create the following files:

{% highlight shell filename="exports.sh" %}
#!/bin/sh
export EC2_PRIVATE_KEY=`pwd`/pk-XXXXXXXXXXXXXXXXXXXXXXXX.pem
export EC2_CERT=`pwd`/cert-XXXXXXXXXXXXXXXXXXXXXXXX.pem
export AWS_ELB_HOME=`pwd`/ELB
export AWS_AUTO_SCALING_HOME=`pwd`/AutoScaling
export AWS_CLOUDWATCH_HOME=`pwd`/CloudWatch
export JAVA_HOME=/usr
export PATH=$PATH:$AWS_ELB_HOME/bin:$AWS_AUTO_SCALING_HOME/bin:$AWS_CLOUDWATCH_HOME/bin
{% endhighlight %}

{% highlight shell filename="setup.sh" %}
#!/bin/sh
EC2_ROOT=`dirname $0`
. $EC2_ROOT/exports.sh
chmod +x $EC2_ROOT/AutoScaling/bin/*
chmod -x $EC2_ROOT/AutoScaling/bin/*.cmd
chmod +x $EC2_ROOT/ELB/bin/*
chmod -x $EC2_ROOT/ELB/bin/*.cmd
chmod +x $EC2_ROOT/CloudWatch/bin/*
chmod -x $EC2_ROOT/CloudWatch/bin/*.cmd
chmod +x $EC2_ROOT/*.sh
{% endhighlight %}

We are simply being lazy above and making sure that all executable files are executable and that the `*.cmd` files are not.

Now we can create the actual script that sets up our auto-scaling load balancer!

{% highlight shell filename="setup-autoscaling.sh" %}
#!/bin/sh

. ./exports.sh
./setup.sh

ZONE="us-east-1d"
KEY_NAME="mykeyname"
SECURITY_GROUP="default"
INSTANCE_SIZE="t1.micro"
LB_NAME="myscaling-lb"
LC_NAME="myscaling-lc"
LC_IMAGE_ID="ami-xxxxxxxx"
SG_NAME="myscaling-sg"

# Set up load balancer
elb-create-lb $LB_NAME --headers --listener "lb-port=80,instance-port=80,protocol=http"
    --availability-zones $ZONE
elb-configure-healthcheck  $LB_NAME  --headers --target "HTTP:80/alive.php"
    --interval 6 --timeout 2 --unhealthy-threshold 2 --healthy-threshold 7

# Setup auto scaling
as-create-launch-config $LC_NAME --image-id $LC_IMAGE_ID --instance-type $INSTANCE_SIZE
    --monitoring-disabled --key $KEY_NAME --group $SECURITY_GROUP
    --user-data-file ./user-data.yml
as-create-auto-scaling-group dmcleaner-sg --availability-zones $ZONE
    --launch-configuration $LC_NAME --min-size 1 --max-size 6
    --load-balancers $LB_NAME

# Set up scaling policies
SCALE_UP_POLICY=`as-put-scaling-policy MyScaleUpPolicy1
    --auto-scaling-group $SG_NAME --adjustment=1 --type ChangeInCapacity
    --cooldown 300`

mon-put-metric-alarm MyHighCPUAlarm1 --comparison-operator GreaterThanThreshold
    --evaluation-periods 1 --metric-name CPUUtilization --namespace "AWS/EC2"
    --period 600 --statistic Average --threshold 60
    --alarm-actions $SCALE_UP_POLICY
    --dimensions "AutoScalingGroupName=$SG_NAME"

SCALE_DOWN_POLICY=`as-put-scaling-policy MyScaleDownPolicy1
    --auto-scaling-group $SG_NAME --adjustment=-1 --type ChangeInCapacity
    --cooldown 300`

mon-put-metric-alarm MyLowCPUAlarm1 --comparison-operator LessThanThreshold
    --evaluation-periods 1 --metric-name CPUUtilization --namespace "AWS/EC2"
    --period 600 --statistic Average --threshold 10
    --alarm-actions $SCALE_DOWN_POLICY
    --dimensions "AutoScalingGroupName=$SG_NAME"
{% endhighlight %}

With the above script you will have a load balancer set up to scale between 2 and 6 instances. Feel free to tweak the values here to ensure that it works best for you.

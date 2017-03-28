---
layout: post
status: publish
published: true
title: Setting up Zend Framework — Part 1
date: 2011-03-31 20:35:22.000000000 -04:00
categories: Code
tags: web zend php
alias: [/guides/setting-up-zend-framework-part-1]
---

Zend Framework has a straightforward setup process providing that the developer sets everything up manually. This guide illustrates how to set up a modular installation of Zend Framework.

<!--more-->

> <img src="{{ '/assets/uploads/2011/03/zf-logo-mark1.png' | relative_url }}" class="pull-right"> Extending the art and spirit of PHP, Zend Framework is based on simplicity, object-oriented best practices, corporate friendly licensing, and a rigorously tested agile codebase.

## Requirements

  * [Zend Server](http://www.zend.com/en/products/server-ce/) -- Complete LAMP stack
  * or [Apache 2.2](http://xorcode.net/lWTo2d) and [PHP 5.3.x](http://xorcode.net/jBkXxG)
  * [Zend Framework 1.11.x](http://xorcode.net/lm0zQC)

## Project Creation

We will create the project manually since the default settings for Zend Framework do not conform with the module-based structure we desire.

### File Structure

```shell
myapp/
myapp/application/
myapp/application/configs/
myapp/application/layouts/
myapp/application/layouts/scripts/
myapp/application/modules/
myapp/application/modules/default/
myapp/application/modules/default/controllers/
myapp/application/modules/default/views/scripts/index/
myapp/application/modules/default/views/scripts/error/
myapp/library/
myapp/library/Myapp/
myapp/library/Myapp/Application/Resource
myapp/public/
myapp/public/lib/
myapp/public/lib/css/
myapp/public/lib/js/
myapp/public/lib/img/
```

### Creating necessary files

{% highlight shell filename="myapp/public/.htaccess" %}
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} -s [OR]
RewriteCond %{REQUEST_FILENAME} -l [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^.*$ - [NC,L]
RewriteRule ^.*$ index.php [NC,L]
{% endhighlight %}

{% highlight php filename="myapp/public/index.php" %}
<?php
// Define path to application directory
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH',
              realpath(dirname(__FILE__) . '/../application'));

// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV',
              (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV')
                                         : 'production'));

// Typically, you will also want to add your library/ directory
// to the include_path, particularly if it contains your ZF installed
set_include_path(implode(PATH_SEPARATOR, array(
    dirname(dirname(__FILE__)) . '/library',
    get_include_path(),
)));

/** Zend_Application */
require_once 'Zend/Application.php';

// Create application, bootstrap, and run
$application = new Zend_Application(
    APPLICATION_ENV,
    APPLICATION_PATH . '/configs/application.xml'
);
$application->bootstrap()
            ->run();
?>
{% endhighlight %}

{% highlight php filename="myapp/application/Bootstrap.php" %}
<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
}
?>
{% endhighlight %}

{% highlight xml filename="myapp/application/configs/application.xml" %}
<?xml version="1.0" encoding="UTF-8"?>
<config xmlns:zf="http://framework.zend.com/xml/zend-config-xml/1.0/">
    <global>
        <appnamespace>Application</appnamespace>

        <autoloaderNamespaces>
            <myapp>Myapp</myapp>
        </autoloaderNamespaces>

        <bootstrap>
            <path><zf:const zf:name="APPLICATION_PATH" />/Bootstrap.php</path>
            <class>Bootstrap</class>
        </bootstrap>

        <includePaths>
            <library><zf:const zf:name="APPLICATION_PATH" />/../library</library>
        </includePaths>

        <phpSettings>
            <date>
                <timezone>America/New_York</timezone>
            </date>
        </phpSettings>

        <pluginPaths>
            <Myapp_Application_Resource>Myapp/Application/Resource</Myapp_Application_Resource>
        </pluginPaths>

        <resources>
            <frontController>
                <defaultAction>index</defaultAction>
                <defaultControllerName>index</defaultControllerName>
                <defaultModule>default</defaultModule>
                <controllerDirectory><zf:const zf:name="APPLICATION_PATH" />/controllers</controllerDirectory>
                <moduleDirectory><zf:const zf:name="APPLICATION_PATH" />/modules</moduleDirectory>
            </frontController>

            <layout>
                <layoutPath><zf:const zf:name="APPLICATION_PATH" />/layouts/scripts/</layoutPath>
            </layout>

            <locale>
                <default>en</default>
            </locale>
        </resources>
    </global>

    <production zf:extends="global">
        <phpSettings>
            <display_startup_errors>0</display_startup_errors>
            <display_errors>0</display_errors>
        </phpSettings>

        <resources>
            <modules>
                <placeholder />
            </modules>

            <view>
                <basePath><zf:const zf:name="APPLICATION_PATH" />/views</basePath>
                <helperPath>
                    <Myapp_View_Helper>Myapp/View/Helper</Myapp_View_Helper>
                </helperPath>
            </view>
        </resources>
    </production>

    <staging zf:extends="production">
        <phpSettings>
            <display_startup_errors>1</display_startup_errors>
            <display_errors>1</display_errors>
        </phpSettings>
    </staging>

    <development zf:extends="production">
        <phpSettings>
            <display_startup_errors>1</display_startup_errors>
            <display_errors>1</display_errors>
        </phpSettings>

        <resources>
            <frontController>
                <disableOutputBuffering>1</disableOutputBuffering>
                <params>
                    <displayExceptions>1</displayExceptions>
                </params>
            </frontController>
        </resources>
    </development>
</config>
{% endhighlight %}

{% highlight php filename="myapp/application/modules/default/controllers/IndexController.php" %}
<?php
require_once 'Zend/Controller/Action.php';
class IndexController extends Zend_Controller_Action
{
    public function indexAction ()
    {
    }

    public function sitemapAction ()
    {
        $this->view->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        $sitemap = $this->view->navigation()->sitemap()
            ->setUseXmlDeclaration(true)
            ->setFormatOutput(true)
            ->setUseSitemapValidators(true)
            ->setRole();
        $this->getResponse()->setHeader('Content-Type', 'application/xml')->setBody($sitemap);
    }

    public function robotsAction ()
    {
        $this->view->layout()->disableLayout();
        $this->getResponse()->setHeader('Content-Type', 'text/plain');
    }
}
?>
{% endhighlight %}

{% highlight php filename="myapp/application/modules/default/controllers/ErrorController.php" %}
<?php
require_once 'Zend/Controller/Action.php';
class ErrorController extends Zend_Controller_Action
{
    public function errorAction()
    {
        $errors = $this->_getParam('error_handler');

        switch ($errors->type) {
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ROUTE:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_CONTROLLER:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ACTION:
                $this->getResponse()->setHttpResponseCode(404);
                $this->view->headTitle('Page Not Found');
                $this->view->requestUri = $this->getRequest()->getPathInfo();
                $view = 'notfound';
                break;
            default:
                $this->getResponse()->setHttpResponseCode(500);
                $this->view->headTitle('Application Error');
                $view = 'error';
                break;
        }

        $log = $this->getLog();
        if ($log) {
            $log->crit($this->view->message, $errors->exception);
        }

        // conditionally display exceptions
        if ($this->getInvokeArg('displayExceptions') == true) {
            $this->view->exception = $errors->exception;
        }

        $this->view->request = $errors->request;

        $this->render($view);
    }

    public function getLog()
    {
        $bootstrap = $this->getInvokeArg('bootstrap');
        if (!$bootstrap->hasPluginResource('Log')) {
            return false;
        }
        $log = $bootstrap->getResource('Log');
        return $log;
    }
}
?>
{% endhighlight %}

{% highlight php filename="myapp/library/Myapp/Application/Resource/View.php" %}
<?php
require_once ('Zend/Application/Resource/ResourceAbstract.php');
class Myapp_Application_Resource_View extends Zend_Application_Resource_ResourceAbstract
{
    protected static $_view;

    public function init ()
    {
        return $this->getView();
    }

    public function getView ()
    {
        if (null === self::$_view) {
            self::$_view = new Zend_View($this->getOptions());
            $layout = Zend_Layout::getMvcInstance();
            self::$_view->doctype('HTML5');
            self::$_view->setEncoding('UTF-8');
            self::$_view->addHelperPath('Myapp/View/Helper');
            self::$_view->headTitle('Myapp')
                ->setSeparator(' - ');
            self::$_view->headMeta()
                ->appendHttpEquiv('Content-Type', sprintf('text/html; charset=%s', self::$_view->getEncoding()));
            $viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper('ViewRenderer');
            $viewRenderer->setView(self::$_view);
        }
        return self::$_view;
    }
}
?>
{% endhighlight %}

{% highlight php filename="myapp/application/layouts/scripts/layout.phtml" %}
<?php echo $this->doctype() . PHP_EOL; ?>
<html>

<head>
<?php echo $this->headTitle() . PHP_EOL; ?>
<?php echo $this->headMeta() . PHP_EOL; ?>
<?php echo $this->headStyle() . PHP_EOL; ?>
<?php echo $this->headLink() . PHP_EOL; ?>
<?php echo $this->headScript() . PHP_EOL; ?>
</head>

<body>
<?php echo $this->layout()->content . PHP_EOL; ?>
</body>
</html>
{% endhighlight %}

{% highlight php filename="myapp/application/modules/default/views/scripts/index/index.phtml" %}
<h1>Index page</h1>
{% endhighlight %}

{% highlight php filename="myapp/application/modules/default/views/scripts/error/error.phtml" %}
<h1>Application Error</h1>

<?php if (isset($this->exception)): ?>
<h3>Exception information:</h3>
<p><strong>Message:</strong> <?php echo $this->exception->getMessage() ?></p>

<h3>Stack trace:</h3>
<pre class="code"><?php echo $this->exception->getTraceAsString() ?></pre>

<h3>Request Parameters:</h3>
<pre class="code"><?php echo var_export($this->request->getParams(), true) ?></pre>
<?php endif ?>
{% endhighlight %}

{% highlight php filename="myapp/application/modules/default/views/scripts/error/notfound.phtml" %}
<h1>Page not found</h1>

<?php if (isset($this->exception)): ?>

<h3>Exception information:</h3>
<p><strong>Message:</strong> <?php echo $this->exception->getMessage() ?></p>

<h3>Stack trace:</h3>
<pre class="code"><?php echo $this->exception->getTraceAsString() ?></pre>

<h3>Request Parameters:</h3>
<pre class="code"><?php echo var_export($this->request->getParams(), true) ?></pre>

<?php else: ?>

<p>The page <strong><?php echo $this->requestUri; ?></strong> could not be found.</p>

<p>There are a few things you can try:</p>
<ul>
    <li>Reload the page</li>
    <li>Check the URL and try again</li>
    <li>Go to the <a href="<?php echo $this->baseUrl('/'); ?>">home</a> page</li>
</ul>

<?php endif ?>
{% endhighlight %}

## Further Reading

  * <a href="http://framework.zend.com/manual/en/learning.quickstart.intro.html" target="_blank">Zend Framework MVC Introduction</a>
  * <a href="http://framework.zend.com/manual/en/learning.quickstart.create-project.html" target="_blank">Zend Framework Quick Start</a>

In the next installation in this series of guides we will cover the necessary basics for a fully fledged Zend Framework application including View plugins, Application Resource plugins, and how to prepare your application to be modular and easy to extend.

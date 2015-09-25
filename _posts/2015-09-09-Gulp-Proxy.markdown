---
layout: post
title:  "Gulp Proxy Setup"
date: 2015-09-09 20:34:02 
categories: gulp javascript
--- 

Theoretically web browser should allow cross-origin resource sharing (CORS), 
if Access-Control-Allow-Origin header is presented on web server's response headers. 
The problem is not every browser honor this setting.
At least Google Chrome 44.0.2403.107 under Linux does not response to HTTP header 'Access-Control-Allow-Origin: \*' at all.

The best solution would be embed a proxy on web server. 
Delegate all cross domain resources through a specific endpoint (e.g. /proxy).
With Gulp we can easily setup an dummy server with proxy support and benefits from the live-reload.

Here is an example of proxy through Alfresco's RESTful API.

```javascript
var gulp = require('gulp'),
var url = require('url');
var connect = require('gulp-connect');
var proxy = require('proxy-middleware');

gulp.task('connect', function() {
    connect.server();

    // Assume Alfresco runs on local host
    var proxyOptions = url.parse('http://localhost:8080/alfresco/service/');
    proxyOptions.route = '/api';

    connect.server({
        root: 'public',
        port: 8000,
        middleware: function(connect, opt) {
            return [proxy(proxyOptions)];
        },
        livereload: true
    });
});

gulp.task('default', ['connect']);
```

---
layout: post
title:  "Generate a Jekyll Archive Index"
date:   2015-08-30 15:54:53
categories: jekyll
---

Jekyll does not provide archive function out of the box.
There are some solution solve this problem by creating a separate archive page,
but I really like a archive side bar on the index page (like the one on this site).

After spend some time on Jekyll's documentation. 
I found this is actually pretty easy to achieve by implementing a custom plugin. 

First we need create a ruby file under `_plugins` with the following content.
The name of the file does not matter as long as it suffixes with `rb` it will be loaded on Jekyll start up.

    module Jekyll

      module ArchiveIndexFilter
        def to_archive(input, format) 
            # posts will be grouped by specified format (eg. month-year)
            input.group_by{ |a| a.date.strftime(format) }
        end
      end

    end

    Liquid::Template.register_filter(Jekyll::ArchiveIndexFilter)

Now we can use the filter we just created. If you like the archive index bar in this site, here is the HTML snippet:

Hint: ***Jekyll needs a restart to load the Ruby code***

    {% raw %}
    <div class="panel panel-default">
        <div class="panel-heading">Archive</div>
        <div class="panel-body">
            {% assign archive = site.posts | to_archive:'%b %Y' %}

            <ul class="nav">
                {% for archive_entry in archive %}
                <li class="archive-entry">
                    <a href="javascript:void(0)">{{ archive_entry[0] }} <span class="badge pull-right">{{ archive_entry[1] | size }}</span></a>
                    <ul>
                        {% for post in archive_entry[1] %}
                        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
                        {% endfor %}
                    </ul>
                </li>
                {% endfor %}
            </ul>
        </div>
    </div>
    {% endraw %}


# FYI

https://github.com/blessed-ng/blessed/tree/master/docs
https://github.com/yaronn/blessed-contrib
https://github.com/dundalek/react-blessed-contrib
http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm

# run

```
../rails-dashboard/node_modules/.bin/babel-node ../rails-dashboard/bin/rails-dashboard.js bin/rails s
```


```json
"babel-plugin-transform-modern-regexp": "^0.0.4",
"plugins": ["transform-modern-regexp"]
```

# colors

black
red
green
yellow
blue
magenta
cyan
white
gray

redBright
greenBright
yellowBright
blueBright
magentaBright
cyanBright
whiteBright

# blueprint

```
 [Top List]
 *status* *Controller#Action*              *Method* *Format* *Resp.Time*
 200      RailsAdmin::MainController#index GET      html     109 ms

 [Breakdown]
 *Component*       *Execution Time*
 ActiveRecord        6ms
 Rendering          40ms

 [Params]
 *Name*     *Value*
 user_type  hoge

 [ActiveRecord]
 *Location*               *Type*     *SQL*             *Duration*
 /Users/home/ruby/foo.rb  User Load  SELECT * FROM ~~  1ms

 [Rendering]
 *View*                              *Duration
 views/shared/_page_title.html.haml     1ms

 [Cache]



 [Log]



 [Error]

```


# example log


```

stdout data: => Booting Puma
=> Rails 5.1.2 application starting in development on http://localhost:3000
=> Run `rails server -h` for more startup options
stdout data: Puma starting in single mode...
* Version 3.9.1 (ruby 2.4.1-p111), codename: Private Caller
* Min threads: 5, max threads: 5
stdout data: * Environment: development
* Listening on tcp://0.0.0.0:3000
Use Ctrl-C to stop
stdout data: Started GET "/users/new" for 127.0.0.1 at 2017-07-28 19:48:06 +0900
stdout data:  (0.4ms)  SELECT "schema_migrations"."version" FROM "schema_migrations" ORDER BY "schema_migrations"."version" ASC
stdout data: Processing by UsersController#new as HTML
stdout data: Rendering users/new.html.erb within layouts/application
stdout data: Rendered users/_form.html.erb (66.4ms)
stdout data: Rendered users/new.html.erb within layouts/application (77.4ms)
stdout data: Completed 200 OK in 652ms (Views: 621.2ms | ActiveRecord: 0.5ms)  
```

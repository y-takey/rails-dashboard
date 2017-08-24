# FYI

https://github.com/blessed-ng/blessed/tree/master/docs
https://github.com/yaronn/blessed-contrib
https://github.com/dundalek/react-blessed-contrib
http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm

# run

```
NODE_ENV=dev ../rails-dashboard/node_modules/.bin/babel-node ../rails-dashboard/bin/rails-dashboard.js bin/rails s
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

# TODO

  * [x] adjust the color
  * [x] improve selected index
  * [x] improve server info
  * [x] suport keys with `g` (to top), `G` (to bottom), `space` (scroll a page)
  * [x] suport redirect
  * [x] cacth 4xx, 5xx
  * [] building
  * [] switch the stub by a env-var

```
Started GET "/" for 127.0.0.1 at 2017-08-23 09:13:20 +0900
Processing by WelcomeController#index as HTML
  Rendering welcome/index.html.erb within layouts/application
  Rendered welcome/index.html.erb within layouts/application (0.8ms)
Completed 200 OK in 27ms (Views: 25.7ms | ActiveRecord: 0.0ms)

Started POST "/users" for 127.0.0.1 at 2017-08-23 09:11:56 +0900
Processing by UsersController#create as HTML
  Parameters: {"utf8"=>"✓", "authenticity_token"=>"E/G1NnXQ==", "user"=>{"name"=>"test"}, "commit"=>"Create User"}
   (0.1ms)  begin transaction
  SQL (0.6ms)  INSERT INTO "users" ("name", "created_at", "updated_at") VALUES (?, ?, ?)  [["name", "test"], ["created_at", "2017-08-23 00:11:56.860679"], ["updated_at", "2017-08-23 00:11:56.860679"]]
   (0.7ms)  commit transaction
Redirected to http://localhost:3000/users/1
Completed 302 Found in 7ms (ActiveRecord: 1.4ms)

Started DELETE "/users/1" for 127.0.0.1 at 2017-08-23 09:12:39 +0900
Processing by UsersController#destroy as HTML
  Parameters: {"authenticity_token"=>"Y0XnQz7lj7KWNprK8LaSMHtK3uEj6jZo1EwWzMNqwCD2nZRPgArXeA5FIyyTZ+7kf7YN6P8+tDamhV9UvJSWkA==", "id"=>"1"}
  User Load (0.2ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
   (0.1ms)  begin transaction
  SQL (0.4ms)  DELETE FROM "users" WHERE "users"."id" = ?  [["id", 1]]
   (2.0ms)  commit transaction
Redirected to http://localhost:3000/users
Completed 302 Found in 7ms (ActiveRecord: 2.6ms)
```

<%=# @books, partial: 'books/book', as: :book %>

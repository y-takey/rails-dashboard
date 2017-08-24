# Rails Dashboard

This application is devl-tool for rails that improve your rails's log.

# Usage

```
$ npm install -g rails-dashboard
$ cd your/rails/project
$ rails-dashboard bin/rails s

# If you use npm 5.2 or higher
$ cd your/rails/project
$ npx rails-dashboard bin/rails s
```

and go to 'http://localhost:3000', then any operate.

# Keymap

key | desc
---- | ----
<kbd>j</kbd> or <kbd>↓</kbd> | move down by 1 row
<kbd>k</kbd> or <kbd>↑</kbd> | move up by 1 row
<kbd>space</kbd> | move down by 1 page
<kbd>shift</kbd> + <kbd>space</kbd> | move up by 1 page
<kbd>g</kbd> | move to top
<kbd>shift</kbd> + <kbd>g</kbd> | move to bottom
<kbd>enter</kbd> | show detail about selected row
<kbd>escape</kbd> | hide detail
<kbd>b</kbd> | show detail with Breakdown tab
<kbd>p</kbd> | show detail with Params tab
<kbd>a</kbd> | show detail with ActiveRecord tab
<kbd>r</kbd> | show detail with Rendering tab
<kbd>l</kbd> | show detail with Log tab

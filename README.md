# Frontend Boilerplate
A simple and opinionated frontend boilerplate which uses Gulp, LESS and Thin. It
uses HTML markup from HTML5 Boilerplate, and features **livereload**, **image
minification**, **concat & minify** JS files, **compile** LESS files and
organize and prefix CSS.

## Installation
To install just grab the latest version from GitHub and install the
dependencies, note that you won't want this repo as remote **origin** so you
can clone as follows

    $ git init my-project
    $ cd my-project
    $ git pull git@github.com:gosukiwi/frontend-boilerplate.git
    $ npm install

And you are ready to rock!

If you want a simple way to install it just run this command, some folks don't
like this installation method though only do this if you trust me :)

    $ curl https://cdn.rawgit.com/gosukiwi/frontend-boilerplate/master/install.sh | sh

## Usage
  
    $ gulp

Will build all source code files and fire a livereload server which serves the 
files in `dist/`. You also have the following tasks:

 * **less**: Compile all `*.less` files in the `less/` folder into 
   `dist/css/style.css`
 * **scripts**: Concatenate and minify all `*.js` files in the `js/` directory into
   `dist/js/main.min.js`
 * **images**: Minify all images in the `img/` folder
 * **html**: Copy all html files from `src/` `to `dist/`


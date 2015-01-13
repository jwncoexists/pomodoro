## Pomodoro Timer Application

An application based on the time management method developed by Francesco Cirillo in the late 1980s. The applicaiton uses a timer to break down work into intervals 25 minutes in length, separated by short 5 minute breaks.

It uses:

- Grunt for task management
- Express for backend
- Angular and ui-router for its frontend
- Sass/CSS (whichever is preferred) for styling
- HTML for markup
- Mongodb for storing data

__Note:__ While everything here should work fine with your computer, there may be some setup required for MongoDB. Try running the app without doing any separate installation, but if it doesn't work, try the following: If you're running Mac OSX, then you can follow [these instructions](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/) for getting Mongo setup. If you're running a Linux server (like Vagrant or Nitrous), you can make a run at [these instructions](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/), though you're probably best served doing this with your mentors help.

### Cloning and Installation

To get started working with the application, clone the repo into a new directory.

```bash
$ git clone https://github.com/jwncoexists/pomodoro.git pomodoro
```

Once you've cloned it, make sure to install all the necessary packages. If you're on Windows using Vagrant, don't forget to use the `--no-bin-links` param with `npm install`.

__For Mac/Linux/Nitrous.io__

```bash
$ pwd # make sure you're in the pomodoro root directory
$ npm install
$ bower install
```

__For Windows/Vagrant__

```bash
$ npm install --no-bin-links
$ bower install
```

### Directory Structure

```
client/
   |__app/
   |   |__home/
   |   |__main/
   |   |__app.js & app.scss
   |
   |__assets/
   |   |__images/
   |
   |__components/
   |
   |__bower_components/
   |
server/
   ...
```

There are two main directories in the app: `client` and `server`.

#### Component Organization

The app is organized by feature, not by component type. For example, in the `home` directory contains everything related to the homepage. Styling, controller logic and markup is all in the same folder.

The `assets` folder should only be used for static assets like images and fonts. Scripts and styling will be put into component folders in this app structure.


### Running the App

The app uses [Grunt](http://gruntjs.com/) for running tasks, including running the server in development mode. To get started running the app locally, just run:

```bash
$ grunt serve -d
```

Pay attention to the output in the terminal while the app is running. Some of it may be useful, as detailed error messages, benchmarks, and tests run with Grunt's [watch task](https://github.com/gruntjs/grunt-contrib-watch). The app should auto-reload everytime you change and save anything in the `client` directory (no need to refresh the page).

The app runs on `localhost:9000`. It should open the page automatically in Google Chrome on start, but if it doesn't, you can navigate to the site manually.

### Screenshots

![at work](/doc/screenshot-pomodoro-1.png)
![on break](/doc/screenshot-pomodoro-2.png)

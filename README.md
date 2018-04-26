# Capstone Project

Follow these guidelines for good commit messages when you push.
https://chris.beams.io/posts/git-commit/


This guide was followed to create dev environment (still need to couple with Docker later)

#### Pre Setup:
Make sure that mysql is installed and configured properly. You want a root user account with 'admin' and 'password' for your system or whatever. Follow part of the guide below for that.

https://www.digitalocean.com/community/tutorials/how-to-use-mysql-or-mariadb-with-your-django-application-on-ubuntu-14-04

#### Setting up Dev Server Env for UNIX:
1. `cd` into main capstone root dir
(note: requirements is currently in the `backend` folder)
2. `virtualenv env --python=python3.6`
3. `source env/bin/activate`
4. `pip install -r requirements.txt`
5. Log into root mysql with `mysql -u root -p` and password you set
6. `python manage.py runserver` (note: psycopg2 should be added to requirements.txt)
8. Navigate to http://127.0.0.1:8000/
9. Append /admin to the end of the URL and 	you should be able to access the login screen to the admin interface
10. Username is `admin` and Password is `password123`

#### Client Dev Setup
1. `cd` into client folder
2. `sudo npm install` if 1st time
3. `npm start` to start the react local server

#### Other resources:
1. For setting up Postgres with typical Django installation: https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04
2. Basic Postgres: https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

# Technical Requirements
Client:
  React
	LESS and SASS
Server:
	Django REST Framework 
	Helpful link: https://hackernoon.com/creating-websites-using-react-and-django-rest-framework-b14c066087c7
  “We serve the backend API with gunicorn, and the React app with a node.js express server.”
	Docker

Authentication:
	(Save for later) maybe just use Django built in?


Database:
	Postgres (psql)

Example query for events in current state: http POST http://localhost:8000/events/ name=jurisdiction1 start_date=2013-03-05 due_date=2014-03-05 sentencing_status=guilty event_type_name=Pre-trial case_number=0000000000

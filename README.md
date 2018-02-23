# Capstone Project

Follow these guidelines for good commit messages when you push.
https://chris.beams.io/posts/git-commit/


This guide was followed to create dev environment (still need to couple with Docker later)

#### Setting up Dev Server Env for Mac:
1. `cd` into main capstone root dir
(note: requirements is currently in the `backend` folder)
2. `pip install -r requirements.txt`
3. start postgres with `$sudo -i -u postgres`
4. access database with `$psql` (note: had to run with 'sudo')
5. `cd capstone-server`
6. `virtualenv env --python=python3.6`
7. `python manage.py runserver` (note: psycopg2 should be added to requirements.txt)
8. Navigate to http://127.0.0.1:8000/
9. Append /admin to the end of the URL and 	you should be able to access the login screen to the admin interface
10. Username is `admin` and Password is `capstone2018`

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


cd backend
virtualenv env --python=python3.6
source env/bin/activate  # On Windows use `env\Scripts\activate`
python manage.py runserver

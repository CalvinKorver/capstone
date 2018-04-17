cd backend
virtualenv env --python=python3.6
source env/bin/activate  # On Windows use `env\Scripts\activate`
pip install -r requirements.txt
python manage.py runserver

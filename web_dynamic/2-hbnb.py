#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
from flask import Flask, render_template, url_for
from models import storage
import uuid

app = Flask(__name__)

@app.route('/2-hbnb', strict_slashes=False)
def hbnb_filters():
    """
    Handle requests to custom template with states, cities & amenities
    """
    states = storage.all('State').values()
    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    cache_id = str(uuid.uuid4())
    return render_template('2-hbnb.html',
                         states=states,
                         amenities=amenities,
                         places=places,
                         users=users,
                         cache_id=cache_id)

@app.teardown_appcontext
def teardown_db(exception):
    """
    Close the storage on teardown
    """
    storage.close()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Survey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    date_of_birth = db.Column(db.Date)
    contact_number = db.Column(db.String(20))

    likes_pizza = db.Column(db.Boolean, default=False)
    likes_pasta = db.Column(db.Boolean, default=False)
    likes_pap_and_wors = db.Column(db.Boolean, default=False)
    likes_other = db.Column(db.Boolean, default=False)

    watch_movies_rating = db.Column(db.Integer)
    listen_radio_rating = db.Column(db.Integer)
    eat_out_rating = db.Column(db.Integer)
    watch_tv_rating = db.Column(db.Integer)

from flask import Flask, request, jsonify
from flask_cors import CORS
from Models import db, Survey
from dotenv import load_dotenv
from os import environ
from datetime import datetime, date
from sqlalchemy import func
from dateutil.relativedelta import relativedelta

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure MySQL connection
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

# to calculate age
def calculate_age(dob):
    today = date.today()
    return relativedelta(today, dob).years

# Submit survey
@app.route('/api/surveys', methods=['POST'])
def create_survey():
    data = request.get_json()

    required = ['full_name', 'email', 'date_of_birth', 'contact_number', 'favorite_foods', 'ratings']
    for field in required:
        if field not in data:
            return jsonify({'message': f"Missing field: {field}"}), 400

    dob = datetime.strptime(data['date_of_birth'], "%Y-%m-%d").date()
    age = calculate_age(dob)
    if age < 5 or age > 120:
        return jsonify({'message': 'Invalid age. Must be between 5 and 120.'}), 400

    new_survey = Survey(
        full_name=data['full_name'],
        email=data['email'],
        date_of_birth=dob,
        contact_number=data['contact_number'],
        likes_pizza='Pizza' in data['favorite_foods'],
        likes_pasta='Pasta' in data['favorite_foods'],
        likes_pap_and_wors='Pap and Wors' in data['favorite_foods'],
        likes_other='Other' in data['favorite_foods'],
        watch_movies_rating=int(data['ratings']['watch_movies']),
        listen_radio_rating=int(data['ratings']['listen_radio']),
        eat_out_rating=int(data['ratings']['eat_out']),
        watch_tv_rating=int(data['ratings']['watch_tv'])
    )

    db.session.add(new_survey)
    db.session.commit()

    return jsonify({'message': 'Survey submitted successfully'}), 201

# Get survey stats
@app.route('/api/surveys/stats', methods=['GET'])
def survey_stats():
    surveys = Survey.query.all()
    total = len(surveys)
    if total == 0:
        return jsonify({"total_surveys": 0})

    today = date.today()
    ages = [calculate_age(s.date_of_birth) for s in surveys if s.date_of_birth and calculate_age(s.date_of_birth) >= 5]

    def percent(count): return round((count / total) * 100, 1)

    return jsonify({
        "total_surveys": total,
        "average_age": round(sum(ages)/len(ages), 1) if ages else 0,
        "oldest_age": max(ages) if ages else 0,
        "youngest_age": min(ages) if ages else 0,
        "pizza_percent": percent(sum(s.likes_pizza for s in surveys)),
        "pasta_percent": percent(sum(s.likes_pasta for s in surveys)),
        "pap_and_wors_percent": percent(sum(s.likes_pap_and_wors for s in surveys)),
        "watch_movies_avg": round(sum(s.watch_movies_rating for s in surveys) / total, 1),
        "listen_radio_avg": round(sum(s.listen_radio_rating for s in surveys) / total, 1),
        "eat_out_avg": round(sum(s.eat_out_rating for s in surveys) / total, 1),
        "watch_tv_avg": round(sum(s.watch_tv_rating for s in surveys) / total, 1),
    })

if __name__ == '__main__':
    app.run(debug=True)

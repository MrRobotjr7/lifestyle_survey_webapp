import random
from datetime import datetime, timedelta
from assignment import app, db, Survey  

def random_date(start_year=1980, end_year=2018):
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 12, 31)
    return start + timedelta(days=random.randint(0, (end - start).days))

def create_dummy_survey():
    return Survey(
        full_name=f"User{random.randint(1, 10000)}",
        email=f"user{random.randint(1, 10000)}@example.com",
        date_of_birth=random_date(),
        contact_number=f"07{random.randint(10000000, 99999999)}",
        likes_pizza=random.choice([True, False]),
        likes_pasta=random.choice([True, False]),
        likes_pap_and_wors=random.choice([True, False]),
        likes_other=random.choice([True, False]),
        watch_movies_rating=random.randint(1, 5),
        listen_radio_rating=random.randint(1, 5),
        eat_out_rating=random.randint(1, 5),
        watch_tv_rating=random.randint(1, 5),
    )

with app.app_context():
    for _ in range(150):
        db.session.add(create_dummy_survey())
    db.session.commit()
    print(" Inserted 150 dummy survey records.")

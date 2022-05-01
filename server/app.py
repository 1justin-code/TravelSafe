from unicodedata import name
from flask import Flask, send_from_directory
from flask_cors import CORS #comment this on deployment
from flask import request, jsonify

from sqlalchemy import Column, DateTime, String, Integer, ForeignKey, Boolean, func
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import pandas as pd

session = sessionmaker()
Base = declarative_base()

engine = create_engine('mysql+pymysql://admin:Cs348proj135!@database-2.cbz6gnja77aw.us-east-2.rds.amazonaws.com/covidtravel_db')
Session = sessionmaker(bind=engine)

class users(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key = True, nullable = False )
    name = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    VaccineStatus = Column(String, nullable=False)
    VaccineType = Column(String, nullable=False)
    passport = Column(String, nullable=False)

class countries(Base):
    __tablename__= "countries"
    country_name = Column(String, primary_key = True, nullable = False)
    vaccines_required = Column(Boolean, nullable = True)
    testing_required = Column(Boolean, nullable = True)
    risk_level = Column(Integer, nullable = True)
    quarantine_required = Column(Boolean, nullable = True)

Base.metadata.create_all(engine)

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment

@app.route("/sign_up", methods=["POST"])
def create_account():
    name = request.headers.get("name")
    lastName = request.headers.get("lastName")
    email = request.headers.get("email")
    password = request.headers.get("password")
    VaccineStatus = request.headers.get("VaccineStatus")
    VaccineType = request.headers.get("VaccineType")
    passport = request.headers.get("passport")

    s = Session()

    data = {"name": [name], "lastName":[lastName], "email":[email], "password":[password], "vaccine_status":[VaccineStatus], "vaccine_type":[VaccineType], "passport":[passport]}

    df = pd.DataFrame(data)

    s.bulk_insert_mappings(users, df.to_dict(orient="records"))

    s.commit()
    s.close()

    print('hello friend')
    return jsonify('hello')

@app.route("/get_users", methods=["GET"])
def get_users():
    with engine.connect() as con:
        rs = con.execute('call covidtravel_db.get_users();')
        user_arr = []

        for row in rs:
            user_arr.append(row)

    return user_arr

@app.route("/insert_country", methods=["POST"])
def insert_country():
    '''country_name = request.headers.get("country_name")
    vaccines_required = request.headers.get("vaccines_required")
    testing_required = request.headers.get("testing_required")
    risk_level = request.headers.get('risk_level')
    quarantine_required = request.headers.get('quarantine_required')'''

    country_name = 'america'
    vaccines_required = False
    testing_required = False
    risk_level = '1'
    quarantine_required = False

    s = Session()

    data = {"country_name":[country_name], "vaccines_required":[vaccines_required], "testing_required":[testing_required], "risk_level":[risk_level], "quarantine_required":[quarantine_required]}

    df = pd.DataFrame(data)

    s.bulk_insert_mappings(countries, df.to_dict(orient="records"))

    s.commit()
    s.close()

    return 'success'

@app.route("/get_all_countries", methods=["GET"])
def get_all_countries():
    with engine.connect() as con:
        rs = con.execute('call covidtravel_db.get_countries();')
        user_arr = []

        for row in rs:
            user_arr.append(row)

    return user_arr








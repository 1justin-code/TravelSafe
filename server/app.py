from cgi import test
from pkgutil import get_data
from unicodedata import name
from flask import Flask, send_from_directory
from flask_cors import CORS #comment this on deployment
from flask import request, jsonify
from numpy import False_, insert, source

from sqlalchemy import Column, DateTime, String, Integer, ForeignKey, Boolean, func
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import pandas as pd

session = sessionmaker()
Base = declarative_base()

engine = create_engine('mysql://admin:Cs348proj135!@database-2.cbz6gnja77aw.us-east-2.rds.amazonaws.com/covidtravel_db')
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

class airlines(Base):
    __tablename__="airlines"
    airline_id = Column(Integer, primary_key = True, nullable = False)
    airline_name = Column(String, nullable = True)
    mask_policy = Column(Boolean, nullable = True)
    vaccine_required = Column(Boolean, nullable = True)

class vaccines(Base):
    __tablename__="vaccines"
    vaccine_id = Column(Integer,primary_key = True, nullable = False)
    vaccine_name = Column(String, nullable = True)

class trips(Base):
    __tablename__="trips"
    trip_id = Column(Integer,primary_key = True, nullable = False)
    user_id = Column(Integer,primary_key = False, nullable = False)
    source = Column(String, nullable = False)
    destination = Column(String, nullable = False)
    airline = Column(String, nullable = False)

Base.metadata.create_all(engine)

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment

def get_all_table(table):
    with engine.connect() as con:
        #calling stored procedure
        rs = con.execute('call covidtravel_db.get_' + table + '();')
        user_arr = []

        for row in rs:
            user_arr.append(row)

    return user_arr

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
    list = get_all_table('users')
    return jsonify({'result': [dict(row) for row in list]})

@app.route("/clear_users", methods=["POST"])
def clear_users():
    s = Session()
    s.query(users).delete()
    s.commit()
    s.close()
    return 'success'

@app.route("/insert_country", methods=["POST"])
def insert_country():
    country_name = request.headers.get("country_name")
    vaccines_required = request.headers.get("vaccines_required")
    testing_required = request.headers.get("testing_required")
    risk_level = request.headers.get('risk_level')
    quarantine_required = request.headers.get('quarantine_required')

    if testing_required == 'True':
        testing_required = True
    else:
        testing_required = False
    
    if vaccines_required == 'True':
        vaccines_required = True
    else:
        vaccines_required = False

    if quarantine_required == 'True':
        quarantine_required = True
    else:
        quarantine_required = False

    s = Session()

    data = {"country_name":[country_name], "vaccines_required":[vaccines_required], "testing_required":[testing_required], "risk_level":[risk_level], "quarantine_required":[quarantine_required]}

    df = pd.DataFrame(data)

    s.bulk_insert_mappings(countries, df.to_dict(orient="records"))

    s.commit()
    s.close()

    return 'success'

@app.route("/get_all_countries", methods=["POST"])
def get_all_countries():
    testing = request.headers.get("testing_status")
    quarantineStatus = request.headers.get("quarantine_status")
    vaccine = request.headers.get("vaccine_status")
    list = get_all_table('countries')
    if vaccine == 'none' and quarantineStatus == 'none' and testing == 'none':
        return jsonify({'result': [dict(row) for row in list]})
    else:
        if testing == 'false':
            testing = 0
        else:
            testing = 1
        if vaccine == 'false':
            vaccine = 0
        else:
            vaccine = 1
        if quarantineStatus == 'false':
            quarantineStatus = 0
        else:
            quarantineStatus = 1

        return jsonify({'result': [dict(row) for row in list if row[1] == vaccine and row[2] == testing and row[4] == quarantineStatus]})

@app.route('/clear_countries', methods=["POST"])
def clear_countries():
    s = Session()
    s.query(countries).delete()
    s.commit()
    s.close()
    return 'success'


@app.route("/insert_airlines", methods=["POST"])
def insert_airlines():
    airline_id = request.headers.get("airline_id")
    airline_name = request.headers.get("airline_name")
    mask_policy = request.headers.get("mask_policy")
    vaccine_required = request.headers.get('vaccine_required')


    if mask_policy == 'True':
        mask_policy = True
    else:
        mask_policy = False
    
    if vaccine_required == 'True':
        vaccine_required = True
    else:
        vaccine_required = False

    s = Session()

    data = {"airline_id":[airline_id], "airline_name":[airline_name], "mask_policy":[mask_policy], "vaccine_required":[vaccine_required]}

    df = pd.DataFrame(data)

    s.bulk_insert_mappings(airlines, df.to_dict(orient="records"))

    s.commit()
    s.close()

    return "success"

@app.route("/get_all_airlines", methods=["POST"])
def get_all_airlines():
    mask = request.headers.get("mask")
    vaccine = request.headers.get("vaccine_status")
    list = get_all_table('airlines')
    if mask == 'none' and vaccine == 'none':
        return jsonify({'result': [dict(row) for row in list]})
    else:
        if mask == 'false':
            mask = 0
        else:
            mask = 1
        if vaccine == 'false':
            vaccine = 0
        else:
            vaccine = 1
        for row in list:
            print (row[2], mask, row[3], vaccine) 
        return jsonify({'result': [dict(row) for row in list if row[2] == mask and row[3] == vaccine]})

@app.route('/clear_airlines', methods=["POST"])
def clear_airlines():
    s = Session()
    s.query(airlines).delete()
    s.commit()
    s.close()
    return 'success'

@app.route("/insert_vaccine", methods=["POST"])
def insert_vaccine():
    vaccine_id = request.headers.get("vaccine_id")
    vaccine_name = request.headers.get("vaccine_name")

    vaccine_id = int(vaccine_id)


    s = Session()

    data = {"vaccine_id":[vaccine_id], "vaccine_name":[vaccine_name]}

    df = pd.DataFrame(data)

    print(df.to_dict(orient="records"))

    s.bulk_insert_mappings(vaccines, df.to_dict(orient="records"))

    s.commit()
    s.close()
    return 'success'

@app.route("/get_all_vaccines", methods=["GET"])
def get_all_vaccines():
    return get_all_table('vaccines')

@app.route('/clear_vaccines', methods=["POST"])
def clear_vaccines():
    s = Session()
    s.query(vaccines).delete()
    s.commit()
    s.close()
    return 'success'


@app.route("/insert_trip", methods=["POST"])
def insert_trip():
    '''trip_id = request.headers.get("trip_id")
    user_id = request.headers.get("user_id")
    source = request.headers.get("source")
    destination = request.headers.get("destination")
    airline = request.headers.get("airline")'''


    trip_id = 2
    user_id = 2
    source = 'lopl'
    destination = ';asd'
    airline = 'spirit'

    s = Session()

    data = {"trip_id":trip_id, "user_id":user_id, "source":source, "destination":destination, "airline":airline}

    df = pd.DataFrame(data)

    s.bulk_insert_mappings(trips, df.to_dict(orient="records"))

    s.commit()
    s.close()
    return 'success'

@app.route("/get_all_trips", methods=["GET"])
def get_all_trips():
    return get_all_table('trips')

@app.route('/clear_trips', methods=["POST"])
def clear_trips():
    s = Session()
    s.query(vaccines).delete()
    s.commit()
    s.close()
    return 'success'


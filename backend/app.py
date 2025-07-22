from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os
from datetime import datetime

app = Flask(__name__)

# Home Route
@app.route('/')
def home():
    return "Hello, Flask!"

# Register Route
@app.route('/register', methods=['POST'])
def register():
    print(request.data)  # 🔍 Debug line to see raw data from Postman

    data = request.get_json()
    usn = data.get('usn', '').strip()
    password = data.get('password', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()

    if not usn or not password or not email or not phone:
        return jsonify({'message': 'All fields are required'}), 400

    filename = 'users.json'
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            users = json.load(f)
        if not isinstance(users, dict):
            users = {}
    else:
        users = {}

    if usn in users:
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = generate_password_hash(password)
    users[usn] = {
        'password': hashed_password,
        'email': email,
        'phone': phone
    }

    with open(filename, 'w') as f:
        json.dump(users, f)

    return jsonify({'message': 'Registration successful'}), 201

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usn = data.get('usn', '').strip()
    password = data.get('password', '').strip()

    if not usn or not password:
        return jsonify({'message': 'USN and password are required'}), 400

    filename = 'users.json'
    if not os.path.exists(filename):
        return jsonify({'message': 'No users registered yet'}), 404

    with open(filename, 'r') as f:
        users = json.load(f)

    user = users.get(usn)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid credentials'}), 401

    return jsonify({'message': 'Login successful'}), 200

# Check-in Route
@app.route('/checkin', methods=['POST'])
def checkin():
    data = request.get_json()
    usn = data.get('usn', '').strip()

    if not usn:
        return jsonify({'message': 'USN is required'}), 400

    filename = 'users.json'
    if not os.path.exists(filename):
        return jsonify({'message': 'No users registered yet'}), 404

    with open(filename, 'r') as f:
        users = json.load(f)

    user = users.get(usn)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Record current time
    timestamp = datetime.now().isoformat()

    # Append check-in time
    if 'checkins' not in user:
        user['checkins'] = []
    user['checkins'].append(timestamp)

    users[usn] = user

    with open(filename, 'w') as f:
        json.dump(users, f)

    return jsonify({'message': 'Check-in recorded', 'time': timestamp}), 200

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    filename = 'users.json'
    if not os.path.exists(filename):
        return jsonify({'message': 'No users registered yet'}), 404

    with open(filename, 'r') as f:
        users = json.load(f)

    leaderboard = []
    for usn, user in users.items():
        count = len(user.get('checkins', []))
        leaderboard.append({
            'usn': usn,
            'email': user.get('email'),
            'checkins': count
        })

    # Sort by checkins descending
    leaderboard.sort(key=lambda x: x['checkins'], reverse=True)

    return jsonify({'leaderboard': leaderboard}), 200

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
import jwt
from datetime import datetime, timedelta
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
CORS(app)

# Secret key for JWT token
app.config['SECRET_KEY'] = 'your_secret_key_here'

# Firebase Admin SDK initialization
cred = credentials.Certificate('firebase-adminsdk.json')  # Update if needed
firebase_admin.initialize_app(cred)
db = firestore.client()

# ------------------- Register -------------------
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    usn = data.get('usn')
    password = data.get('password')
    email = data.get('email')
    phone = data.get('phone')

    if not all([usn, password, email, phone]):
        return jsonify({"message": "Missing fields", "success": False}), 400

    doc_ref = db.collection('students').document(usn)
    if doc_ref.get().exists:
        return jsonify({"message": "USN already registered", "success": False}), 400

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    doc_ref.set({
        'usn': usn,
        'password': hashed_pw.decode('utf-8'),
        'email': email,
        'phone': phone
    })

    return jsonify({"message": "Registration successful", "success": True})

# ------------------- Login -------------------
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usn = data.get('usn')
    password = data.get('password')

    if not usn or not password:
        return jsonify({"message": "USN and password required", "success": False}), 400

    user_ref = db.collection('students').document(usn)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return jsonify({"message": "USN not registered", "success": False}), 404

    user_data = user_doc.to_dict()
    stored_pw = user_data.get('password')

    if not bcrypt.checkpw(password.encode('utf-8'), stored_pw.encode('utf-8')):
        return jsonify({"message": "Incorrect password", "success": False}), 401

    return jsonify({"message": "Login successful", "success": True})

# ------------------- Forgot Password -------------------
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    usn = data.get('usn')

    if not usn:
        return jsonify({"message": "USN is required", "success": False}), 400

    user_ref = db.collection('students').document(usn)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return jsonify({"message": "USN not registered", "success": False}), 404

    exp_time = datetime.utcnow() + timedelta(minutes=10)
    token = jwt.encode({'usn': usn, 'exp': exp_time}, app.config['SECRET_KEY'], algorithm='HS256')

    reset_link = f"http://localhost:5000/reset-password/{token}"
    print("🔗 Password Reset Link:", reset_link)

    return jsonify({"message": "Password reset link generated. Check console.", "success": True})

# ------------------- Reset Password -------------------
@app.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.get_json()
    usn = data.get('usn')
    email = data.get('email')
    phone = data.get('phone')
    new_password = data.get('new_password')

    if not usn or not new_password:
        return jsonify({"message": "Missing fields", "success": False}), 400

    user_ref = db.collection('students').document(usn)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return jsonify({"message": "User not found", "success": False}), 404

    user_data = user_doc.to_dict()

    # ✅ Verify email or phone
    if email and email != user_data.get('email'):
        return jsonify({"message": "Email doesn't match", "success": False}), 401
    if phone and phone != user_data.get('phone'):
        return jsonify({"message": "Phone number doesn't match", "success": False}), 401

    # 🔐 Hash new password
    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())

    # 🔁 Update in Firestore
    user_ref.update({"password": hashed_password.decode('utf-8')})

    return jsonify({"message": "Password reset successful", "success": True}), 200
# ------------------- Main -------------------
if __name__ == '__main__':
    app.run(debug=True)

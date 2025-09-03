import bcrypt

password = "YourPasswordHere"  # ← replace this with your actual password (inside quotes)
hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
print(hashed_pw.decode('utf-8'))

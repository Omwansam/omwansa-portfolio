from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token
from extensions import db
from models import User

# Blueprint Configuration
users_bp = Blueprint('auth', __name__)

# Utility function to get the current logged in user based on JWT token
def get_current_user():
    current_user_id = get_jwt_identity()
    if not current_user_id:
        return None
    return db.session.get(User, current_user_id)


# A protected route to test user access tokens
@users_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    user = get_current_user()
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    return jsonify({"message": f"Welcome, {user.username}! You are authorized to access this route"})


@users_bp.route("/refresh", methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    # Refresh token is required to generate new tokens
    current_user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user_id)
    return jsonify({'access_token': new_access_token}), 200


@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Check if email and password are provided
    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    email = data['email']
    password = data['password']

    # Fetch the user from the database
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify({
        "access_token": access_token,
        "refresh_token": refresh_token,
        "message": "Login successful",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_admin": user.is_admin
        }
    }), 200


@users_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # Validate input
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400
    
    username = data['username']
    email = data['email']
    password = data['password']
    
    # Check if the email already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400
    
    # Check if username already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400
    
    # Hash passwords before storing them in the database
    password_hash = generate_password_hash(password)

    # Create a new user
    user = User(username=username, email=email, password_hash=password_hash)
    try:    
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred while creating the user", "details": str(e)}), 500


@users_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user = get_current_user()
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "bio": user.bio,
        "avatar_url": user.avatar_url,
        "github_url": user.github_url,
        "linkedin_url": user.linkedin_url,
        "twitter_url": user.twitter_url,
        "website_url": user.website_url,
        "is_admin": user.is_admin,
        "created_at": user.created_at.isoformat() if user.created_at else None
    }), 200


@users_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user = get_current_user()
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.get_json()
    
    # Update allowed fields
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'bio' in data:
        user.bio = data['bio']
    if 'avatar_url' in data:
        user.avatar_url = data['avatar_url']
    if 'github_url' in data:
        user.github_url = data['github_url']
    if 'linkedin_url' in data:
        user.linkedin_url = data['linkedin_url']
    if 'twitter_url' in data:
        user.twitter_url = data['twitter_url']
    if 'website_url' in data:
        user.website_url = data['website_url']
    
    try:
        db.session.commit()
        return jsonify({"message": "Profile updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred while updating the profile", "details": str(e)}), 500


@users_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    user = get_current_user()
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.get_json()
    
    if not data.get('current_password') or not data.get('new_password'):
        return jsonify({"error": "Current password and new password are required"}), 400
    
    # Verify current password
    if not check_password_hash(user.password_hash, data['current_password']):
        return jsonify({"error": "Current password is incorrect"}), 400
    
    # Hash new password
    user.password_hash = generate_password_hash(data['new_password'])
    
    try:
        db.session.commit()
        return jsonify({"message": "Password changed successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred while changing the password", "details": str(e)}), 500



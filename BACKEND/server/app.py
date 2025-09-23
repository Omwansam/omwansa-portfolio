from flask import Flask, jsonify, send_from_directory
import os
from flask_cors import CORS
from models import User

from extensions import db, migrate, jwt, mail
from config import Config

# Import route blueprints
from routes.users_route import users_bp
from routes.projects_route import projects_bp
from routes.skills_route import skills_bp
from routes.experience_route import experience_bp
from routes.education_route import education_bp
from routes.contact_route import contact_bp
from routes.blog_route import blog_bp
from routes.portfolio_route import portfolio_bp
from routes.images_route import images_bp

# Configure Flask to serve React build (client/my-portfolio/dist)
app = Flask(
    __name__,
    static_folder='../../client/my-portfolio/dist',
    static_url_path='/'
)

# Load configuration
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
migrate.init_app(app, db)
jwt.init_app(app)
mail.init_app(app)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Register blueprints
app.register_blueprint(users_bp, url_prefix='/api/auth')
app.register_blueprint(projects_bp, url_prefix='/api')
app.register_blueprint(skills_bp, url_prefix='/api')
app.register_blueprint(experience_bp, url_prefix='/api')
app.register_blueprint(education_bp, url_prefix='/api')
app.register_blueprint(contact_bp, url_prefix='/api')
app.register_blueprint(blog_bp, url_prefix='/api')
app.register_blueprint(portfolio_bp, url_prefix='/api')
app.register_blueprint(images_bp, url_prefix='/api/images')

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": "Bad request"}), 400

@app.errorhandler(401)
def unauthorized(error):
    return jsonify({"error": "Unauthorized"}), 401

@app.errorhandler(403)
def forbidden(error):
    return jsonify({"error": "Forbidden"}), 403

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    # Serve static assets from React build if they exist
    build_path = app.static_folder
    requested_path = os.path.join(build_path, path)

    if path != '' and os.path.exists(requested_path):
        return send_from_directory(build_path, path)

    # Fallback to index.html for React Router routes
    return send_from_directory(build_path, 'index.html')

# Serve static files (uploads)
@app.route('/static/uploads/<path:filename>')
def serve_upload(filename):
    return send_from_directory('static/uploads', filename)    

@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": "2024-01-01T00:00:00Z"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
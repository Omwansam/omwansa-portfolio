#!/usr/bin/env python3
"""
Seed file for Omwansa Portfolio Database
This script will:
1. Delete all existing data
2. Recreate database tables
3. Populate with initial data
"""

import os
import sys
from datetime import datetime, date
from werkzeug.security import generate_password_hash

# Import modules directly since we're already in the server directory
from app import app
from extensions import db
from models import User, Skill, Project, Experience, Education, Contact, Blog, ProjectStatus, CategoryStatus

def clear_database():
    """Clear all data from the database"""
    print("🗑️  Clearing existing data...")
    
    # Drop all tables
    db.drop_all()
    print("   ✅ All tables dropped")
    
    # Create all tables
    db.create_all()
    print("   ✅ All tables recreated")

def create_users():
    """Create initial users"""
    print("👤 Creating users...")
    
    # Admin user
    admin_user = User(
        username='admin',
        email='admin@example.com',
        password_hash=generate_password_hash('admin123'),
        is_admin=True,
        first_name='Omwansa',
        last_name='Arnold',
        bio='Full-stack developer passionate about creating innovative web solutions. I specialize in React, Node.js, and modern web technologies.',
        avatar_url='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        github_url='https://github.com/omwansa',
        linkedin_url='https://linkedin.com/in/omwansa-arnold',
        twitter_url='https://twitter.com/omwansa_arnold',
        website_url='https://omwansa.dev'
    )
    
    db.session.add(admin_user)
    db.session.commit()
    
    print(f"   ✅ Created admin user: {admin_user.username}")
    print(f"   📧 Email: {admin_user.email}")
    print(f"   🔑 Password: admin123")
    
    return admin_user

def main():
    """Main function to run the seed script"""
    print("🌱 Starting database seeding...")
    print("=" * 50)
    
    with app.app_context():
        try:
            # Clear existing data
            clear_database()
            
            # Create users
            admin_user = create_users()
            
            print("=" * 50)
            print("✅ Database seeding completed successfully!")
            print(f"🎯 Admin credentials:")
            print(f"   Email: admin@example.com")
            print(f"   Password: admin123")
            print("=" * 50)
            
        except Exception as e:
            print(f"❌ Error during seeding: {str(e)}")
            db.session.rollback()
            raise

if __name__ == '__main__':
    main()

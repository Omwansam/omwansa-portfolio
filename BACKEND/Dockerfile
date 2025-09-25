# Backend Dockerfile (Flask + Gunicorn)
# Build a lightweight Python image and run the Flask app with Gunicorn.

FROM python:3.11-slim

# Prevent Python from writing .pyc files and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=5000

# Set working directory
WORKDIR /app

# System deps (for building some wheels) and cleanup
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps first (better caching)
COPY BACKEND/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY BACKEND/server ./server

# Ensure instance/upload dirs exist (for SQLite and uploads)
RUN mkdir -p server/instance server/static/uploads

# Expose the app port
EXPOSE ${PORT}

# Start the app with Gunicorn (threads for lightweight concurrency)
CMD ["sh", "-c", "gunicorn -w 3 -k gthread -b 0.0.0.0:${PORT:-5000} server.app:app"]



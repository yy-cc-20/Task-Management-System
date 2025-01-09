
# --- Frontend Stage ---
    FROM node:22 AS frontend-build

    WORKDIR /frontend
    
    # Copy package.json and package-lock.json
    COPY package*.json ./
    
    # Install frontend dependencies
    RUN npm install
    
    # Copy the frontend source code
    COPY ./ ./
    
    # Build the frontend application
    RUN npm run build
    
    # --- Final Stage ---
    # Use Nginx to serve the React app
    FROM nginx:latest
    
    # Remove default Nginx configuration
    RUN rm /etc/nginx/conf.d/default.conf
    
    # Copy the built React app to Nginx's web directory
    COPY --from=frontend-build /frontend/build /usr/share/nginx/html
    
    # Copy custom Nginx configuration (optional, for routing to backend)
    COPY nginx.conf /etc/nginx/conf.d/
    
    # Expose the frontend port
    EXPOSE 3000
    
    # Start Nginx
    CMD ["nginx", "-g", "daemon off;"]
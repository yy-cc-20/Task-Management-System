
# --- Backend Stage ---
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build

WORKDIR /backend

# Copy the solution file and restore dependencies
COPY . ./
RUN dotnet restore *.sln

# Build the backend
WORKDIR /backend/Task Management System
RUN dotnet build -c Release -o /backend/build

# Publish the backend, use runtime image for smaller image size
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS backend-publish
WORKDIR /backend
COPY --from=backend-build /backend/build .

# Start the API
EXPOSE 7094
ENV ASPNETCORE_URLS=http://+:7094
ENTRYPOINT ["dotnet", "Task Management System.dll"]
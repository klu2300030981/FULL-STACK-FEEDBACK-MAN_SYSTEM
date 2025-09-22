pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                // You can add steps here to checkout from a Git repository
                // For now, assume the code is already in the workspace
            }
        }

        stage('Maven Build') {
            steps {
                echo 'Building the backend with Maven...'
                // Run the Maven build command inside the backend-service directory
                dir('JFSD_BackendDeployment-main/JFSD_BackendDeployment-main') {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'
                // Use docker-compose to build both backend and frontend images
                sh 'docker-compose build --no-cache'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Starting Docker containers...'
                // Start all services defined in docker-compose.yml
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished. Check the container logs for status.'
        }
    }
}

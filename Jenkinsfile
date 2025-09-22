pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                // The declarative checkout is handled automatically
            }
        }

        stage('Maven Build') {
            steps {
                echo 'Building the backend with Maven...'
                // Use the 'bat' command for Windows
                dir('JFSD_BackendDeployment-main/JFSD_BackendDeployment-main') {
                    // Make sure 'mvn' is in the system PATH of the Jenkins agent
                    bat 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'
                // Use the 'bat' command for Windows
                bat 'docker-compose build --no-cache'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Starting Docker containers...'
                // Use the 'bat' command for Windows
                bat 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished. Check the container logs for status.'
        }
    }
}

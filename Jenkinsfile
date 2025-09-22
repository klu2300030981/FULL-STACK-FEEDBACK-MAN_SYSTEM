pipeline {
    agent any
    tools {
        maven 'MAVEN_HOME' 
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
            }
        }
        stage('Maven Build') {
            steps {
                echo 'Building the backend with Maven...'
                dir('JFSD_BackendDeployment-main/JFSD_BackendDeployment-main') {
                    withMaven(jdk: 'JDK_HOME') {
                        bat 'mvn clean install -DskipTests'
                    }
                }
            }
        }
        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'
                bat 'docker-compose build --no-cache'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Starting Docker containers...'
                // Add this new cleanup step before deployment
                bat 'docker-compose down'
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

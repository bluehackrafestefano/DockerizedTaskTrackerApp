#!groovy
pipeline {
    agent {
        label 'docker' 
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'docker --version' 
                sh 'docker compose up api'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'docker exec api python manage.py test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'echo not yet...'
            }
        }
    }
}
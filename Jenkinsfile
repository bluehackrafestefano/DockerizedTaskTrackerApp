#!groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'gradle:6.7-jdk11'
                    // Run the container on the node specified at the
                    // top-level of the Pipeline, in the same workspace,
                    // rather than on a new node entirely:
                    reuseNode true
                }
            }
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
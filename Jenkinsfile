#!groovy
pipeline {
        // agent {
        //     docker { image 'python:3.9' }
        // }
        stages {
            stage('Build') {
                steps {
                    sh 'docker compose up api'
                }
            }

            stage('Test') {
                steps {
                    sh 'docker exec api python manage.py test'
                }
            }

            stage('Deploy') {
                steps {
                    sh 'echo not yet...'
                }
            }
        }
    }
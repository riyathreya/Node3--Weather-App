pipeline {
    environment {
        DOCKER_HUB_USERNAME = 'riyaathreya'
        DOCKER_CREDENTIALS = credentials('docker-hub-credentails')
        DOCKER_IMAGE_TAG = 'weather-app-2'
        weather-app-2-image = ''
    }
    agent any
    stages {
        stage('Git access') {
            steps {
                git branch: 'master', url: 'https://github.com/riyathreya/Node3--Weather-App'
            }
        }
        stage('Build Docker Image'){
            steps {
                script {
                    weather-app-2-image = docker.build("${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_TAG}", "./")
                }
            }
        }
        stage('Install Dependencies'){
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage("Upload image to docker hub"){
            steps {
                script {
                    docker.withRegistry('https://registry-1.docker.io', DOCKER_CREDENTIALS){
                        weather-app-2-image.push()
                    }
                }
            }
        }
        stage("Cleanup"){
            steps {
                sh "docker rmi riyaathreya/weather-app-2"
            }
        }
    }
}
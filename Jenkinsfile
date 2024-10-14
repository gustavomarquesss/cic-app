pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Comando para compilar o projeto, como:
                sh 'mvn clean install' // Para um projeto Maven
                // ou 
                // sh 'gradle build' // Para um projeto Gradle
            }
        }

        stage('Test') {
            steps {
                // Comando para rodar os testes
                sh 'mvn test' // Para um projeto Maven
                // ou 
                // sh 'gradle test' // Para um projeto Gradle
            }
        }

        stage('Package') {
            steps {
                // Comando para empacotar a aplicação
                sh 'mvn package' // Para um projeto Maven
                // ou 
                // sh 'gradle build' // Para um projeto Gradle
            }
        }

        stage('Deploy') {
            steps {
                // Comando para implantar a aplicação
                // Exemplo de upload para um servidor ou similar
                echo 'Deploying...'
            }
        }
    }
}

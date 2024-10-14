pipeline {
    agent any  // O pipeline pode ser executado em qualquer nó do Jenkins

    stages {
        stage('Checkout') {
            steps {
                // Fazer o checkout do código do repositório Git
                git branch: 'main', url: 'https://github.com/usuario/repositorio.git'
            }
        }

        stage('Build') {
            steps {
                // Compile o código (no caso de um projeto Java)
                sh 'javac -d bin src/*.java'
            }
        }

        stage('Test') {
            steps {
                // Comando para rodar testes (personalize conforme sua stack de testes)
                sh 'echo "Running tests..."'
            }
        }

        stage('Package') {
            steps {
                // Empacote seu projeto (exemplo: criar um .jar)
                sh 'jar -cvf meuProjeto.jar -C bin .'
            }
        }

        stage('Deploy') {
            steps {
                // Aqui pode ser o processo de deploy ou outras etapas pós-build
                echo 'Deploying application...'
            }
        }
    }

    post {
        always {
            // Etapas que sempre serão executadas, independentemente de sucesso ou falha
            echo 'Build complete'
        }

        success {
            echo 'Build was successful!'
        }

        failure {
            echo 'Build failed!'
        }
    }
}

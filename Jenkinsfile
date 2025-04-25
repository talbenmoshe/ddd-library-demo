pipeline {
    agent {
        docker {
            image 'ghcr.io/talbenmoshe/fed-ci-container:latest'
            registryUrl 'https://ghcr.io'
            registryCredentialsId 'ghcr-creds'
        }
    }
    options {
      buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
      disableConcurrentBuilds(abortPrevious: true)
    }
    stages {
        stage('First Step') {
            steps {
                echo 'First Step'
            }
        }

        stage('Second Step') {
            steps {
                echo 'Second Step'
            }
        }
    }
}

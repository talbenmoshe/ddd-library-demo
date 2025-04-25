pipeline {
    agent {
        label 'fed-ci'
    }
    options {
      buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
      disableConcurrentBuilds(abortPrevious: true)
    }
    stages {
        stage('Install') {
            steps {
                sh 'pnpm install --frozen-lockfile'
            }
        }

        stage('Build') {
            steps {
                sh 'pnpm build'
            }
        }

        stage('Tetst') {
            steps {
                sh 'pnpm test'
            }
        }
    }
}

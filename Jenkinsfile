pipeline {
    agent any
    options {
      buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
      disableConcurrentBuilds(abortPrevious: true)
    }
    stages {
        stage('First Step') {
            steps {
                echo 'This is a remote 2'
            }
        }
    }
}

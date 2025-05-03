@Library("jenkins-shared-libs") _

pipeline {
    agent {
        label 'fed-ci'
    }
    options {
      buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
      disableConcurrentBuilds(abortPrevious: true)
    }
    stages {
        stage('ZDR Build') {
            steps {
                zdrBuild()
            }
        }
    }
}

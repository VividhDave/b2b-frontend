pipeline {
  agent any
  
  stages {
    stage('Install') {
      steps {
        sh 'npm install' }
    }

    stage('Build') {
      steps { 
        sh 'unset CI'
        sh 'ng build --prod' }
    }
  }
}

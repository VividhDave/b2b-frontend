pipeline {
  agent any
  
  stages {
    stage('Install') {
      steps {
        sh 'rm -rf node_modules'
        sh 'rm -rf package-lock.json'
        sh 'npm install' }
    }

    stage('Build') {
      steps { 
        sh 'unset CI'
        sh 'ng build --prod' }
    }
  }
}

pipeline {
  agent any
  
  stages {
    stage('Install') {
      steps {
        bat 'npm install' }
    }

    stage('Build') {
      steps { 
        bat 'unset CI'
        bat 'ng build --prod' }
    }
  }
}

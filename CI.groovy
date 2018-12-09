node "jenkins-slave", {
    container "common", {
        stage "Checkout sources", {
            checkout scm
        }

        stage "Build application", {
            sh "npm config set unsafe-perm true"
            sh "npm i -g yarn" 
            sh "yarn"
            sh "yarn build"
        }

        stage "Build and push Docker image", {
            docker.withRegistry "", "javatechnologies", {
                docker
                    .build("javatechnologies/penny-auction-ui:latest")
                    .push()
            }
        }

        stage "Deploy", {
            sh "helm upgrade --recreate-pods --namespace default --tiller-namespace default -i penny-auction-ui helm/penny-auction-ui"
        }
    }
}
node "jenkins-slave", {
    container "ci-cd-agent", {
        stage "Checkout sources", {
            checkout scm
        }

        stage "Build application", {
            sh "npm i -g yarn yarn"
            sh "yarn build"
        }

        stage "Build and push Docker image"), {
            docker.withRegistry "", "javatechnologies", {
                docker
                    .build("javatechnologies/penny-auction-ui:dev")
                    .push()
            }
        }
    }
}
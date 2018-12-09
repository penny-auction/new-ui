node("jenkins-slave") {
    container("ci-cd-agent") {
        stage("Checkout sources") {
            checkout scm
        }

        docker.withRegistry("", "javatechnologies") {
            docker
                .build("javatechnologies/penny-auction-ui:dev")
                .push()
        }
    }
}
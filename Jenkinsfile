pipeline {
	agent any

	stages {
    stage("Pre-Build") {
      steps {
        sh '''
          SERVER_NAME=anti-spider-service

          CONTAINER_ID=$(docker ps | grep "${SERVER_NAME}" | awk '{print $1}')
          IMAGE_ID=$(docker images | grep "${SERVER_NAME}" | awk '{print $3}')

          if [ -n "${CONTAINER_ID}" ]; then
          echo "存在${SERVER_NAME}容器 CID=${CONTAINER_ID}"
          echo "停止容器"
          docker stop ${SERVER_NAME}
          echo "删除容器"
          docker rm ${SERVER_NAME}
          fi

          if [ -n "${IMAGE_ID}" ]; then
          echo "存在${SERVER_NAME}镜像 CID=${IMAGE_ID}"
          echo "删除镜像"
          docker rmi -f ${IMAGE_ID}
          fi
        '''
      }
    }

		stage('Build') {
			steps {
				sh '''
          SERVER_NAME=anti-spider-service

          TAG=$(date +%Y%m%d)$(git rev-parse refs/remotes/${GIT_BRANCH}^{commit} | cut -c 1-4)
          IMAGE=${SERVER_NAME}:${TAG}

					docker buildx build -t ${IMAGE} .

					docker run -d -p 5000:5000 \
            --name=${SERVER_NAME} \
            -e NODE_ENV=production \
							${IMAGE}
				'''
			}
		}
	}
}
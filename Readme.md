# Installation
```shell
$ npm install -g @jscode-secret/cli
```

# Usage
```
$ jscode-cli nest g domain <domain name>
```

# Example
```
$ jscode-cli nest g domain comment
```

### Result
**1. 생성 파일 및 폴더**
- src
  - comment
    - application
      - requestDto
      - responseDto
      - comment.service.ts
    - domain
      - comment.entity.ts
      - comment.repository.ts
    - presentation
      - comment.controller.ts
    - test
    - comment.module.ts

**2. App.module.ts에 저절로 새로 생성된 도메인 Module 추가됨**

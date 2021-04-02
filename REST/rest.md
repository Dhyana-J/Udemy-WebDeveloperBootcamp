# What is REST?

> 소파에 누워 넷플릭스 보는게 아니야

---

## API

Client와 Server 사이에 쓰이는 API는 메뉴판과 같다.

Client에게 응답해줄 수 있는 요청을 적어놓은 목록.

---

## REST API

로이 필딩(Roy Fielding)박사에 의해 발표됨

방대한 웹에서 효율적으로 통신하기 위해서!

REST는 API를 디자인하기 위한 아키텍처와도 같다.

SOAP, GraphQL같은 것들도 API 디자인 아키텍처중에 하나다.

---

## RESTful한 API 만들기

### Two most important ones

-   Use HTTP Request Verbs (GET, POST, PUT, PATCH, DELETE)
    -   get(read), post(create), put/patch(update), delete
    -   put과 patch의 차이? -> 객체 통째로 바꾸기(put)와 부품(속성)만 갈아끼기(patch)의 차이
-   Use Specific Pattern of Routes/Endpoint URLs
    -   /articles (get, post, delete) 와 같은 endpoint (상위디렉토리)
    -   /articles/:title (get, put, patch, delete) (세부디렉토리)

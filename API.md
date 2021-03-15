# API (Application Programming Interface)

## API?

외부 서버의 데이터를 받아올 수 있게끔 해주는 것

ex) weather API, Police API, ...

-   API에서 고려해야할 네 가지

    -   Endpoint

        서버에 접근할 수 있도록 하는 url

        ex)Path에서 마지막 슬래시 '/' 까지가 endpoint

    -   Paths

        해당 서버 내의 다양한 resource들에 접근할 수 있도록 하는 url

    -   Parameters

        Paths 뒤에 ?variable1=value&variable2=value 형식으로 작성 가능

    -   Authentication

        API를 제공하는 서버에서 사용자의 usage를 알기 위해 인증을 진행한다.
        usage별로 가격을 다르게 매길 수 있다.

## API 테스트는 어떻게 할까?

-> URL에 직접 parameter를 바꿔가면서 입력하기엔 너무 복잡하다.
테스트를 위해 POSTMAN을 사용하면 된다


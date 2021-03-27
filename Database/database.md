# SQL과 NO SQL

내가 사용할 데이터 종류, 어떻게 데이터를 활용할 것인지에 따라 선택하자

---

## Structured Query Language (Relational DB)

-> MySQL, Postgres, ...

보통 행과 열로 이루어진 테이블을 사용한다.

그래서 일단 만들고 나면, 구조 변경이 어렵다.

그래서 유연하지가 않아! (데이터가 쌓일수록 점점 위태로운 고층 건물이 되어간다.)

특정 행에만 컬럼을 추가하는게 불가해서, 다른 행에 Null값을 넣어줘야하는 상황 발생

구조화를 시켜놓을 수 있으므로, 데이터를 각잡고 관리하기 좋다.

(테이블을 쪼개서 관계를 설정해둘 수 있음)

---

## Not Only Structured Query Language (Non-Relational DB)

-> MongoDB, Redis, ...

JSON Object(Key : Value Pair)를 사용한다.

데이터 구조가 미리 정의되어있지 않아서 유연하다!

Scalability(확장성)이 아주 좋다!

데이터 분산하기 좋다. (데이터가 쌓여도 낮고 안정적인 건물을 여러 개 지을 수 있다.)

데이터간의 관계를 정의하기 쉽지않다. (구조화하기 어려워서 생기는 문제가 있음)

---

## Summary

-   SQL

    -   More Mature
    -   Table Structure
    -   Requires a Schema
    -   Great with Relationships
    -   Scales Vertically

-   NO SQL
    -   Shiny and New
    -   Document Structure
    -   More Flexible to Changes
    -   Not Great With Complex Relationships
    -   Horizontally Scalable

---

# Mongo DB

-   용어 정리
    -   Collection : DB의 테이블과 비슷한 개념 (Document의 집합이 Collection이다)
    -   Document : 테이블의 행과 같은 개념

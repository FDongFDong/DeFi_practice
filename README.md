# DeFi_practice

- [CSMM](#CSMM)
___
## CSMM
> [Exchange.sol](https://github.com/FDongFDong/DeFi_practice/blob/main/CSMM/contracts/Exchange.sol)

> [Exchange.ts](https://github.com/FDongFDong/DeFi_practice/blob/main/CSMM/test/Exchange.ts)

- CSMM(Constant Sum Market Maker)은 유동성 풀의 합이 일정한 알고리즘
- CSMM이 독자적으로 사용되는 디파이 서비스는 없다.
    - 간단하게 디파이의 수식이 어떻게 계산되는지 알 수 있다.
    - 간단하게 스왑을 구현할 수 있다.
- 특징
    - 슬리피지가 없다. (항상 토큰을 1:1 비율로 교환)
    - 풀의 유동성이 0이 될 수 있다.
- 공식
  - x + y = k (x, y: 유동성 풀에 있는 토큰의 개수)
  - 스왑 후에도 k는 변하지 않는다.
  - 스왑 후 
    - x + y = (x + Δx) + (y - Δy) 
      - Δx는 input 토큰의 개수 
      - Δy는 output 토큰의 개수
      - x + y + Δx - Δy = x + y
      - Δx = Δy
  - 즉, 스왑 시 input으로 넣은 토큰의 개수와 output으로 넣은 토큰의 개수가 같다.
  
- 유동성 공급/제거
  - 유동성 공급은 사용자가 가진 토큰을 Exchange Contract로 보내는 것
    - 나의 토큰을 Exchange Contract가 가져가는 것
      - transferFrom() 함수를 사용하기 때문에.
  - 유동성 제거는 Exchange Contract에 넣은 나의 지분을 가져오는 것
  
---

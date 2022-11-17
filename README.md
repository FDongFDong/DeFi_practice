# DeFi_practice

- [DeFi_practice](#defi_practice)
  - [CSMM](#csmm)
  - [CPMM](#cpmm)
  - [Liquidity](#liquidity)
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
## CPMM
> [Exchange.sol](https://github.com/FDongFDong/DeFi_practice/blob/main/CPMM/contracts/Exchange.sol)

> [Exchange.ts](https://github.com/FDongFDong/DeFi_practice/blob/main/CPMM/test/Exchange.ts)

- 두 유동성 곱의 합이 일정한 알고리즘
- 공식
  - xy = k
  - 스왑 후
  - xy = (x + Δx)(y - Δy)
    - (x + Δx)(y - Δy) = xy
    - xy - xΔy + Δxy - ΔxΔy = xy
    - xy  = xy
    - Δxy = xΔy + ΔxΔy
    - yΔx = Δy(x+Δx)
    - Δy = yΔx / x + Δx
  - Δx는 input 토큰의 개수
  - Δy는 ouput 토큰의 개수
  - input 값인 Δx는 사용자가 입력한 값으로 정해져있다.
  - output 값인 Δy를 구하는 것이 핵심이다.
- Swap
  - 사용자가 입력한 inputAmount를 Exchange 컨트랙트로 보내고 이에 상응하는 OutputAmout를 계산해서 호출한 사용자에게 보내주는 것

```java
function getPrice(uint256 inputReserve, uint256 outputReserver) public pure returns (uint256) {
  uint256 numerator = inputReserve;
  uint256 denominator = outputReserve;
  return numerator / denominator
}
```
```java
function getOutputAmount(uint256 inputAmount, uint256 inputReserve, uint256 outputReserver) public pure returns (uint256) {
  uint256 numerator = (inputAmount * inputReserve);
  uint256 denominator = (inputReserve + inputAmount);
  return numerator / denominator
}
```
___
## Liquidity
> [Exchange.sol](https://github.com/FDongFDong/DeFi_practice/blob/main/Liquidity/contracts/Exchange.sol)

> [Exchange.ts](https://github.com/FDongFDong/DeFi_practice/blob/main/Liquidity/test/Exchange.ts)

- 유동성 공급을 하는 상황 2가지
  - 유동성이 0인 상황
    - 풀이 처음 만들어진 경우
  - 유동성이 있는 상황
    - 추가로 공급하는 경우
- 유동성을 공급하면 LP 토큰을 받는다.
- 유동성 제거
  - LP 토큰을 소각하고, ETH와 토큰을 돌려받는다.
  - 돌려받는 ETH와 토큰의 개수는 내가 회수하고자 하는 LP토큰의 개수와 전체 풀의 비율만큼 돌려 받는다.

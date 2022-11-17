# DeFi_practice

- [DeFi_practice](#defi_practice)
  - [Defi 개념 및 생태계](#defi-개념-및-생태계)
  - [Defi 구성요소](#defi-구성요소)
  - [AMM과 Swap에 활용되는 로직](#amm과-swap에-활용되는-로직)
  - [Stable Coin](#stable-coin)
  - [토큰 예치(Staking)](#토큰-예치staking)
  - [대출(Lending)](#대출lending)
  - [유동성 스테이킹(Liquid Staking)](#유동성-스테이킹liquid-staking)
  - [SuperFluid Staking](#superfluid-staking)
  - [Wrapped Token](#wrapped-token)
  - [CSMM](#csmm)
  - [CPMM](#cpmm)
  - [Liquidity](#liquidity)
    - [유동성 공급/제거](#유동성-공급제거)
    - [유동성을 공급하는 2가지 상황 / 제거 시 토큰 돌려받기](#유동성을-공급하는-2가지-상황--제거-시-토큰-돌려받기)
  - [수수료](#수수료)
  - [인터페이스](#인터페이스)
___

## Defi 개념 및 생태계

- 매수/매도 호가창(오더북) 존재하지 않음
- 매수/매도 가격은 AMM(Auto Market Maker)이라는 수식과 알고리즘에 의해 결정됨
- 거래 성립은 블록체인 네트워크에서 바로 이루어짐
- 거래마다 블록체인 수수료를 지불해야 하기 때문에 무제한 자전거래가 거의 불가능하다.

**거래소에서 중요한 것**

- 유동성
  - 체결 가의 차이가 적다.
  - 매수/매도자가 손실을 최소화하고 이익을 극대화하며 거래를 할 수 있음을 의미한다.

→ Defi에서는 실제 물량을 넣어야 하므로 유동성 조작이 거의 불가능하다.
___
## Defi 구성요소

- 유동성 공급자
  - 매수자가 토큰(코인)을 구매할 수 있도록 물량을 제공하는 사람이 필요하다.
    이를 요동성 공급자 LP(Liquidity Provider)라고 한다.
- AMM
  - 호가창 없이 거래 토큰의 가격을 결정하는 방식을 의미한다. Auto Market Maker의 약자이며 토큰 가격 결정에는 다양한 알고리즘이 존재한다.
  - LP Token, Slippage, Impermanent Lose와 같은 개념과 로직들이 AMM을 이룬다.
- 보상
  - LP(Liquidity Provider)에게는 보상이 필요하다. 유동성을 공급한다는 것은 내 돈이 거래소에 묶인다는 의미. 따라서 나의 물량을 제공하고 이에 따른 보상을 받는다. 보상이 없다면 유동성을 공급할 이유가 없기 때문이다.
- 거버넌스 토큰
  - 필수 구성 요소는 아니지만 보상, 투표등의 목적으로 거의 모든 디파이 서비스들에서 활용이 되고 있다.
___
## AMM과 Swap에 활용되는 로직

- 가격 결정 알고리즘
  - Swap에 있어 가장 핵심, 토큰의 가격을 결정하는 알고리즘
    - CPMM, CMMM 등
    - CPMM(Constant Product Market Maker)
      - x * y = k
      - x,y는 각각 풀에 존재하는 토큰의 개수.(유동성 총량)
      - k는 상수
      - 풀 내의 두 토큰 유동성의 곱이 일정하다.
- Slippage
  - 거래를 희망하는 가격과 실제 거래가 체결되는 가격과의 차이
    - Slippage를 줄이려면 유동성이 많아야한다
    -
- LP Token
  - 풀에 유동성 공급을 하면 받게되는 전체 유동성에서 내가 차지하는 비율을 증명하는 토큰
- Impermanent Lost(비영구적 손실)
  - 유동성 풀에 공급한 나의 유동성에 해당하는 가치 변화
    - 최소화하는 방법은 페어의 두 토큰 가격이 유사하게 움직일 경우에 최소화된다.
    - 스테이블 코인/코인의 경우에는 Impermanent Lose이 필연적으로 발생할 수밖에 없다.
    - 스테이블 코인/스테이블 코인 페어 혹은 WETH/ETH와 같은 페어는 Impermanent Lose가 거의 없다.
    - 스테이블 코인을 이해하는 것은 디파이 및 블록체인 생태계에서 매우 중요하다.
___

## Stable Coin

- 기본적으로 수요와 공급 원리를 따른다.
  - 스테이블 코인의 가격이 $1보다 크다 → 가격을 낮춰야 한다 → 수량을 늘려야 한다.
  - 스테이블 코인의 가격이 $1보다 작다 → 가격을 높혀야 한다 → 수량을 줄여야 한다.
  - 차액 거래자(Arbitrager)들이 위의 행동을 통해 수요와 공급량을 조절한다
- 분류
  - 실물화폐 담보
    - 실물 법정 화폐를 담보로 스테이블 코인 발행
  - 암호화폐 담보
    - 암호화폐를 담보로 스테이블 코인 발행
  - 알고리즘
    - 블록체인의 알고리즘 대로 Native 스테이블 코인이 발행, 무담보 시뇨리지 활용
  - 혼합(담보 + 알고리즘)
    - 실물 화폐, 암호화폐 담보와 알고리즘을 혼합하여 스테이블 코인을 발행, 시뇨리지 활용
- 기본 동작
  - Smart Contract에서 mint 함수를 이용하여 코인 발행
  - burn 함수를 이용하여 코인 소각
- 실물 법정 화폐 담보
  - 장점
    - $1 스테이블을 거의 유지할 수 있다. (운영 주체가 보증)
  - 단점
    - 스테이블 코인 운영 주체가 불투명하게 운영될 수 있다.(지급 준비금이 불투명 할 수 있음)
    - 탈중앙성이 떨어진다(모든 발행, 소각 권한을 재단에서만 가짐)
- 암호 화폐 담보
  - 사용자의 암호화폐를 담보로 잡고 스테이블 코인을 발행한다.
    - 코인을 담보로 제공하고 스테이블 코인을 받는다. 담보 가치가 떨어지면 청산될 수 있다.
  - 암호화폐를 담보로 발행된 스테이블 코인은 1달러 가치에 대한 보장은 되지 않지만 1달러를 목표로 한다.
  - 수요와 공급의 원리에 따라 1달러가 유지되도록한다.
  - 국가에서 통화량 발행을 조절하여 물가를 안정시키는 것과 유사하다.
___

## 토큰 예치(Staking)

- Proof Of Stake
  - 블록체인 네트워크의 검증인(Validator)에게 토큰을 맡기고 이에 따른 이자를 받는 것
  - POS/DPOS 합의 알고리즘을 가지는 블록체인 네트워크의 경우에 노드에 예치된 토큰의 양에 따라서 해당 노드가 블럭을 생성할 확률이 달라지게 된다.
  - 올바른 검증인(Validator)에 참여하는 것이 중요
- Defi LP Token Staking
  - LP 토큰을 스테이킹하면 추가 보상을 받을 수 있다.
  - LP 토큰을 스테키잉으로 보상 받는 것을 ‘농사’라고 표현하며 ‘Farming’이란 용어가 사용된다.
  - 디파이 서비스 관점에서 사용자의 LP 토큰이 스테이킹되면 자산이 서비스에 Lock되는 효과가 있다.
  - LP 토큰 뿐만 아니라 단일 토큰 스테이킹도 존재한다. 토큰을 Lock 시켜서 유동량을 줄여 가치를 올리는 효과가 있다. 또한 서비스 자체에서 사용자가 예치한 자산을 활용하여 다양한 금융 상품을 제공할 때 쓰인다.
___
## 대출(Lending)

- 디파이의 대출 서비스를 활용해 탈중앙화된 환경에서 암호화폐를 대출 받을 수 있다.
- 신용, 수입을 고려하지 않음으로 신용대출 같은 서비스는 어렵다.
- 대출을 받는 목적은 암호화폐 가격이 오를 것이라고 생각하고 대출을 받아서 다른 코인을 구매하는데 사용하는 목적이 있을 수 있다. → 롱포지션을 취한것과 동일
- 담보물의 가격이 LTV에 해당하는 가격 이하로 떨어지면 청산
- 사용자는 예금인도 될 수 있다. 자신이 가진 암호화폐를 서비스에 제공하고 이자를 받아가기 위함
- 대출 서비스 활성화를 위해 대출자에게도 대출에 대한 보상을 제공하는 경우도 있음
___
## 유동성 스테이킹(Liquid Staking)

- 일반적으로 스테이킹을 하게되면 자산이 네트워크/서비스에 묶이게 되어 활용도가 없어진다.
- 유동성 스테이킹은 이에 상응하는 토큰을 발급해준다. 발급 받은 토큰을 거래하거나 디파이 풀에 유동성 공급하여 추가로 이자를 얻을 수 있다.
___
## SuperFluid Staking

- 유동성 공급에 활용된 토큰의 일부를 스테이킹에 활용한다는 개념이다.
- 유동성 공급에 활용된 토큰은 블록체인 네트워크 보안 향상에 도움이 안되기 때문에 이를 보안하는 개념
- 이더리움에 스테이킹된 ETH는 이더리움 보안 향상에는 도움이 되지만 유니스왑의 유동성 풀에 들어있는 ETH는 유니스왑 서비스에만 활용되지 이더리움 보안에는 도움이 안된다.
___

## Wrapped Token

WBTC, WETH를 활용하면 비트코인과 이더리움도 디파이에서 사용할 수 있다.

- WBTC를 사용하는 이유
  - BTC는 이더리움과 다른 네트워크라 BTC와 1대1 매칭되는 WBTC로 ERC20 토큰 거래에 사용할 수 있다.
- WETH를 사용하는 이유
  - ERC20 표준은 ETH 보다 나중에 나온 표준으로 구현자체가 다르다.
  - ETH는 프로토콜 레벨에서 구현된것으로 SmartContract로 컨트롤 하는 것에는 한계가 있다.
  - ETH 전송은 가능하지만 approve, allowance 같은 함수는 사용할 수 없다.
___
## CSMM

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

___
## CPMM
> [Exchange.sol](https://github.com/FDongFDong/DeFi_practice/blob/main/CPMM_Swap/contracts/Exchange.sol)

> [Exchange.ts](https://github.com/FDongFDong/DeFi_practice/blob/main/CPMM_Swap/test/Exchange.ts)

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
### 유동성 공급/제거
> [Liquidity_Exchange.sol](https://github.com/FDongFDong/DeFi_practice/blob/main/Liquidity_add_remove/contracts/Exchange.sol)

> [Liquidity_Exchange.ts](https://github.com/FDongFDong/DeFi_practice/blob/main/Liquidity_add_remove/test/Exchange.ts)

### 유동성을 공급하는 2가지 상황 / 제거 시 토큰 돌려받기
> [CPMM_Liquidity_LP_Exchange.sol](https://github.com/FDongFDong/DeFi_practice/blob/main/CPMM_Liquidity_LP/contracts/Exchange.sol)

> [CPMM_Liquidity_LP_Exchange.ts](https://github.com/FDongFDong/DeFi_practice/blob/main/CPMM_Liquidity_LP/test/Exchange.ts)

- 유동성 공급을 하는 상황 2가지
  - 유동성이 0인 상황
    - 풀이 처음 만들어진 경우
  - 유동성이 있는 상황
    - 추가로 공급하는 경우
- 유동성을 공급하면 LP 토큰을 받는다.
- 유동성 제거
  - LP 토큰을 소각하고, ETH와 토큰을 돌려받는다.
  - 돌려받는 ETH와 토큰의 개수는 내가 회수하고자 하는 LP토큰의 개수와 전체 풀의 비율만큼 돌려 받는다.
- 유동성 공급 시
  - CPMM에서 xy = k로 k는 함께 증가, 감소하게 된다.
___

## 수수료
> [CPMM_Swap_Fee_Exchange.sol](https://github.com/FDongFDong/DeFi_practice/blob/main/CPMM_Swap_Fee/contracts/Exchange.sol)

> [CPMM_Swap_Fee_Exchange.ts](https://github.com/FDongFDong/DeFi_practice/blob/main/CPMM_Swap_Fee/test/Exchange.ts)
- 유동성 공급자들(LP)에게 수수료를 지급하는 방식
  - ETH
  - ERC20
  - LP 토큰
- 트레이더들에게 수수료를 부과하는 방식
  - 수수료를 포함한 InputAmount
  - 수수료를 제한 OutputAmount
- 유니스왑
  - LP들에게 ETH, ERC20 모두 보상으로 제공
  - 트레이더가 지급한 수수료 만큼 유동성 풀의 토큰 개수가 증가한다.
  - LP들이 유동성을 제거할 때 공급한 개수 보다 많은 토큰을 가져갈 수 있다.
  - 트레이더는 수수료를 제한 개수만큼 OutputAmount를 받게 된다.
  - 트레이딩 마다 0.3%의 수수료를 부과한다.

```jsx
  // 트레이더에게 수수료를 제외하고 토큰을 스왑해준다.
  function getOutputAmount(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) public{
  // 99인 이유는 1%의 수수료를 부과하기 위함(테스트)
  // 100개의 토큰을 inputAmount로 넣으면 99개의 inputAmount로 OutputAmount를 계산한다.
  // OutputAmount가 줄어들어 내가 받게되는 토큰의 개수가 줄어든다.
  // OuputAmount 수수료 만큼 Output에 해당하는 토큰의 Reserve가 증가하는 효과가 있다.
  uint256 inputAmountWithFee = inputAmount * 99;
  uint256 numerator = (inputAmountWithFee * outputReserve);
  uint256 denominator = (inputReserve * 100 + inputAmountWithFee);
  return numerator / denominator;
  }
```

- Ex
  - ETH: 50, A Token: 50개인 풀에서 ETH30개를 스왑 시 받게되는 토큰의 개수
    - 수수료가 0일 때
      - A Token 18.75개극 받게 된다.
        - Δy = yΔx / x+Δx
        - Δy = 50 * 30 / 50 + 30
        - Δy = 18.75
    - 수수료가 1%일 때
      - A Token 18.632371392722710163개를 받게된다.
        - Δy = 50 *30*(100 - 1) / (50 *100) + 30* (100 - 1)
        - Δy = 18.632371392722710163
      - 18.75 - 18.632371392722710163 = 약 0.1176
  - 수수료가 없을 때는 스왑 후 A Token 풀에 31.25개가 있지만 수수료 1%를 적용하면 31.3676개로 0.1176개가 추가된다.
  - 이는 LP들이 유동성을 제거했을 때 가져가게 되는 수수료
___

## 인터페이스

- 호출 대상의 실제 구현체를 알지 못해도 external로 구현된 함수라면 외부에서 호출할 수 있다.
- 컨트랙트 주소로 함수를 호출할 수 있다.
- 인터페이스는 다른 Contract의 함수를 호출(연동)할 때 사용한다.
- 유니스왑 V2 Contract 함수를 인터페이스를 통해 호출하기
  - Factory Contract 문서
    - [https://docs.uniswap.org/protocol/v2/reference/smart-contracts/factory](https://docs.uniswap.org/protocol/v2/reference/smart-contracts/factory)
  - Factory Contract 소스코드
    - [https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Factory.sol](https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Factory.sol)

```jsx
interface IUniswap{ 
      function getPair(address tokenA, address tokenB) external view returns (address pair);
}
contract Uniswap {
    function getPair() public view returns (address) {
        // 유니스왑 goreli address / WETH goreli / Uniswap goreli
        return IUniswap(0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f).getPair(0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6,0x69eE4c39246eBe3ac885eF45a92342960a599Fa8);
    }
}
```

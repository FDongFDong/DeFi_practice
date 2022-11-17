//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// payable을 사용하는 이유
// 유동성 공급을 할 때 토큰과 이더리움을 함께 집어넣기 때문
contract Exchange {
    IERC20 token;
    // 유동성을 받을 이더리움과 페어를 맞출 토큰 주소
    constructor (address _token) {
      token = IERC20(_token);
    }
  // 유동성 공급 함수
  function addLiquidity(uint256 _tokenAmount) public payable {
    // 해당 함수를 호출하는 사람,Exchange컨트랙트의 주소, 유동성으로 넣을 토큰의 개수
    // = 나의 토큰을 _tokenAmount만큼 Exchange컨트랙트가 가져갈 수 있도록 한다. 
    // transfer함수를 사용하지 않는 이유
    // 내가 아닌 Exchange 컨트랙트가 토큰 컨트랙트를 호출하는 것이기 때문에
    token.transferFrom(msg.sender, address(this), _tokenAmount);
  }

  // // 유동성 제거 함수
  // // Exchange 컨트랙트에 들어있는 ETH를 함수를 호출한 사용자에게 전송한다.
  // // Exchange 컨트랙트가 가지고 있는 ERC20을 나에게 전송하는 것이기 때문에 transfer함수를 호출한다.
  // function removeLiquidity(){
  //   msg.sender.transfer(ethAmount);
  //   token.transfer(msg.sender, tokenAmount);
  // }

  // 스왑 함수
  function ethToTokenSwap() public payable{
    uint256 inputAmount = msg.value;
    // output Token의 갯수는 사용자가 보낸 ETH의 개수와 같다.
    uint256 outputAmount = inputAmount;

    IERC20(token).transfer(msg.sender, outputAmount);

  }
}


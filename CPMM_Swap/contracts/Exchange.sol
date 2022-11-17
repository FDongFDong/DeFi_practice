//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Exchange {
    IERC20 token;

    constructor (address _token) {
        token = IERC20(_token);
    }
    
    function addLiquidity(uint256 _tokenAmount) public payable {
        require(token.transferFrom(msg.sender, address(this), _tokenAmount));
    }
  
    // ETH -> ERC20
    function ethToTokenSwap(uint256 _minTokens) public payable {
        uint256 inputAmount = msg.value;
        // 이 컨트랙트가 가지고 있는 이더리움의 개수 
        // 전송한 이더리움 개수가 포함된 값이므로 전송한 개수를 빼줘야한다.
        uint256 inputReserve =  address(this).balance - msg.value;
        // 토큰의 개수
        uint256 outputReserve = token.balanceOf(address(this));
        // calculate amount out
        uint256 outputAmount = getOutputAmount(inputAmount, inputReserve, outputReserve);
        // 내가 받을 토큰의 값은 내가 입력한 최소한으로 받기로 한 값보다는 커야한다.
        require(outputAmount >= _minTokens, "Insufficient output Amount");

        //transfer token out
        require(token.transfer(msg.sender, outputAmount));
    }

    // ERC20 -> ETH
    function tokenToEthSwap (uint256 _tokenSold, uint256 _minEth) public {
        uint256 tokenReserve = token.balanceOf(address(this));
        uint256 outputAmount = getOutputAmount(_tokenSold, tokenReserve, address(this).balance);

        require(outputAmount >= _minEth, "Insufficient output Amount");

        payable(msg.sender).transfer(_minEth);
        // msg.sender가 _tokenSold 개수만큼 이 컨트랙트로 보내준다.
        require(token.transferFrom(msg.sender, address(this), _tokenSold));
    }

    function getPrice(uint256 inputReserve, uint256 outputReserve) public pure returns (uint256) {
        uint256 numerator = inputReserve;
        uint256 denominator = outputReserve;
        return numerator / denominator;
    }
        

    function getOutputAmount(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) public pure returns (uint256) {
        uint256 numerator = (inputAmount * outputReserve);
        uint256 denominator = (inputReserve + inputAmount);
        return numerator / denominator;
    }

}


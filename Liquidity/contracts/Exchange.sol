//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// LP토큰을 발행하고 소각하기 위해서는 Exchange 컨트랙트 자체가 ERC20을 상속받아야한다.
contract Exchange is ERC20{
    IERC20 token;
    // LP토큰의 name과 symbol
    constructor (address _token) ERC20("FDong Uniswap V2", "FDONG-V2"){
        token = IERC20(_token);
    }
    // _maxToken: Frontend에서 슬리피지가 포함된 값
    function addLiquidity(uint256 _maxToken) public payable {
        // 유동성은 Exchange 컨트랙트에서 전체 발행되어 있는 전체 LP토큰의 개수
        uint256 totalLiquidity = totalSupply();
   
        // ETH와 페어로 공급되는 토큰의 양은 1:1 비율로 공급되어야 한다. 공급 후에도 풀에 비율은 같아야 한다.
        if (totalLiquidity > 0){
         // 기존 유동성이 있는 경우 
            // 현재 컨트랙트에 존재하는 이더리움의 개수  
            uint256 ethReserve = address(this).balance - msg.value;
            // 현재 컨트랙트에 존재하는 토큰의 개수
            uint256 tokenReseve = token.balanceOf(address(this));
            // 실제 유동성 공급 시 필요한 토큰 : 사용자가 넣는 이더리움의 개수 * 기존에 존재하는 풀의 비율
            uint256 tokenAmount = msg.value * tokenReseve / ethReserve;
            require(_maxToken >= tokenAmount);
            // 내가 가진 토큰을 가져간다.
            token.transferFrom(msg.sender, address(this), tokenAmount);
            // 내가 발행 받을 LP토큰의 개수: 내가 보내는 이더리움의 개수가 현재 풀에서 어느정도 차지를 하는지 구한다. 
            uint256 liquidityMinted = totalLiquidity * msg.value / ethReserve;
            _mint(msg.sender,liquidityMinted);
        }else{
        // 기존 유동성이 없는 경우 
            // 입력한 토큰 값이 그대로 유동성에 들어간다.
            uint256 tokenAmount = _maxToken;
            // 초기 유동성 값은 Exchange 컨트랙트가 가지고 있는 이더리움의 개수
            uint256 initialLiquidity = address(this).balance; 
            // ERC20의 mint()함수를 호출해서 msg.sender에게 initialLiquidity만큼의 LP토큰을 발행한다.
            _mint(msg.sender, initialLiquidity);
            // 내가 가진 토큰을 Exchange 컨트랙트에게 보내준다.
            token.transferFrom(msg.sender, address(this), tokenAmount);
        }
      
    }
  
}


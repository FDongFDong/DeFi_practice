import { ethers } from 'hardhat';
import { expect } from 'chai';

import { Exchange } from '../typechain-types/contracts/Exchange';
import { Token } from '../typechain-types/contracts/Token';
import { BigNumber } from 'ethers';

const toWei = (value: number) => ethers.utils.parseEther(value.toString());
const toEther = (value: BigNumber) => ethers.utils.formatEther(value);
const getBalance = ethers.provider.getBalance;

describe('Exchange', () => {
  let owner: any;
  let user: any;
  let exchange: Exchange;
  let token: Token;

  beforeEach(async () => {
    //기본적으로 10,000개의 Ether를 가지고 있음.
    [owner, user] = await ethers.getSigners();
    const TokenFactory = await ethers.getContractFactory('Token');
    token = await TokenFactory.deploy('FDongToken', 'FDONG', toWei(50));
    await token.deployed();

    const ExchangeFactory = await ethers.getContractFactory('Exchange');
    exchange = await ExchangeFactory.deploy(token.address);
    await exchange.deployed();
  });

  //   수수료를 적용한 스왑
  describe('swapWithFee', async () => {
    it('correct swapWithFee', async () => {
      await token.approve(exchange.address, toWei(50));

      // 유동성 공급 : 50 ETH, 50 토큰
      await exchange.addLiquidity(toWei(50), { value: toWei(50) });

      //  user가 30 ETH, 18.6323713927227 스왑
      await exchange
        .connect(user)
        .ethToTokenSwap(toWei(18), { value: toWei(30) });
      // 스왑 후 유저의 토큰 잔액 18.632371392722710163
      expect(toEther(await token.balanceOf(user.address)).toString()).to.equal(
        '18.632371392722710163'
      );
      // 유동성 제거
      await exchange.removeLiquidity(toWei(50));

      // 유동성 제거 시 돌려받은 토큰은 50 - 18.632371392722710163 = 31.367628607277289837
      expect(toEther(await token.balanceOf(owner.address)).toString()).to.equal(
        '31.367628607277289837'
      );
    });
  });
});

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
    token = await TokenFactory.deploy('FDongToken', 'FDONG', toWei(1000000));
    await token.deployed();

    const ExchangeFactory = await ethers.getContractFactory('Exchange');
    exchange = await ExchangeFactory.deploy(token.address);
    await exchange.deployed();
  });

  describe('addLiquidity', async () => {
    it('add liquidity', async () => {
      await token.approve(exchange.address, toWei(500));
      //  FDONGToken 500개, 이더리움 1000개 유동성 공급
      await exchange.addLiquidity(toWei(500), { value: toWei(1000) });
      // 초기 공급 이더리움 1000개
      expect(await getBalance(exchange.address)).to.equal(toWei(1000));
      // 초기 공급 토큰 500개 확인
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(500));

      await token.approve(exchange.address, toWei(100));
      // FdongToken 100개 , 이더리움 200개 추가 유동성 공급
      await exchange.addLiquidity(toWei(100), { value: toWei(200) });
      //  초기 이더리움 1000개 + 추가 이더리움 200개 = 이더리움 1200개
      expect(await getBalance(exchange.address)).to.equal(toWei(1200));
      // 초기 토큰 500개 + 추가 토큰 100개 = 600개
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(600));
    });
  });

  describe('removeLiquidity', async () => {
    it('remove liquidity', async () => {
      await token.approve(exchange.address, toWei(500));
      await exchange.addLiquidity(toWei(500), { value: toWei(1000) });
      expect(await getBalance(exchange.address)).to.equal(toWei(1000));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(500));

      await token.approve(exchange.address, toWei(100));
      await exchange.addLiquidity(toWei(100), { value: toWei(200) });
      expect(await getBalance(exchange.address)).to.equal(toWei(1200));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(600));

      // 유동성 풀에서 이더리움 600개 제거(비율만큼 토큰도 제거된다.)
      await exchange.removeLiquidity(toWei(600));
      // 이더리움 1200개 - 600개 = 600개
      expect(await getBalance(exchange.address)).to.equal(toWei(600));
      // 토큰 600개 - 300개 = 300개
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(300));
    });
  });
});

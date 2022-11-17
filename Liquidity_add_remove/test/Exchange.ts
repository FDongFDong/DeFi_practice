import { ethers } from 'hardhat';
import { expect } from 'chai';

import { Exchange } from '../typechain-types/contracts/Exchange';
import { Token } from '../typechain-types/contracts/Token';

const toWei = (value: number) => ethers.utils.parseEther(value.toString());

const getBalance = ethers.provider.getBalance;

describe('Exchange', () => {
  let owner: any;
  let user: any;
  let exchange: Exchange;
  let token: Token;

  beforeEach(async () => {
    // 1만개의 이더리움을 가지고 시작하게 된다.
    [owner, user] = await ethers.getSigners();

    const TokenFactory = await ethers.getContractFactory('Token');
    token = await TokenFactory.deploy('FDongToken', 'FDONG', toWei(1000000));
    await token.deployed();

    const ExchangeFactory = await ethers.getContractFactory('Exchange');
    exchange = await ExchangeFactory.deploy(token.address);
    await exchange.deployed();
  });

  describe('addLiquidity', async () => {
    it('add Liquidity', async () => {
      // approve 함수를 통해 exchange 컨트랙트가 나의 토큰을 사용할 수 있도록 하기 위함
      await token.approve(exchange.address, toWei(1000));
      //   FDongToken 1000개와 이더리움 1000개를 유동성 공급하기 위함
      await exchange.addLiquidity(toWei(1000), { value: toWei(1000) });

      expect(await getBalance(exchange.address)).to.equal(toWei(1000));
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(1000));
    });
  });

  describe('swap', async () => {
    it('swap', async () => {
      // approve 함수를 통해 exchange 컨트랙트가 나의 토큰을 사용할 수 있도록 하기 위함
      await token.approve(exchange.address, toWei(1000));
      //   FDongToken 1000개와 이더리움 1000개를 유동성 공급하기 위함
      await exchange.addLiquidity(toWei(1000), { value: toWei(1000) });
      //   이더리움 1만개를 가진 새로운 유저가 와서 1개의 이더리움을 스왑하는 시나리오
      await exchange.connect(user).ethToTokenSwap({ value: toWei(1) });
      // exchange 컨트랙트는 기존 1000개에 1개가 추가되어 1001개가 된다.
      expect(await getBalance(exchange.address)).to.equal(toWei(1001));
      // 스왑을 하였기 때문에 exchange 풀에 있는 토큰의 개수는 1개가 줄어든다.
      expect(await token.balanceOf(exchange.address)).to.equal(toWei(999));
      //  9999개 중 1개의 이더리움을 교환한 유저에게는 FDongToken이 1개가 생긴다.
      expect(await token.balanceOf(user.address)).to.equal(toWei(1));
      // 하지만 가스비등이 함께 빠져나가 딱 9999로 떨어지진 않는다. 9998.99ETH.....
      expect(await getBalance(user.address)).to.equal(toWei(9999));
    });
  });
});

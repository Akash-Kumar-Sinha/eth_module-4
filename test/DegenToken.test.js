const { expect } = require('chai');

describe('DegenToken', function () {
    let DegenToken;
    let token;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        DegenToken = await ethers.getContractFactory('DegenToken');
        token = await DegenToken.deploy();
        await token.deployed();
    });

    it('Should deploy with the correct name and symbol', async function () {
        expect(await token.name()).to.equal('Degen');
        expect(await token.symbol()).to.equal('DGN');
    });

    it('Should mint tokens', async function () {
        const initialBalance = await token.balanceOf(owner.address);
        const amountToMint = 1000;

        await token.mint(addr1.address, amountToMint);

        const newBalance = await token.balanceOf(addr1.address);
        expect(newBalance).to.equal(initialBalance.add(amountToMint));
    });

    it('Should burn tokens', async function () {
        const initialBalance = await token.balanceOf(owner.address);
        const amountToBurn = 500;

        await token.burn(owner.address, amountToBurn);

        const newBalance = await token.balanceOf(owner.address);
        expect(newBalance).to.equal(initialBalance.sub(amountToBurn));
    });

    it('Should allow purchasing tokens', async function () {
        const initialBalance = await token.balanceOf(owner.address);
        const purchaseAmount = ethers.utils.parseEther('1');

        await expect(() => owner.sendTransaction({ to: token.address, value: purchaseAmount }))
            .to.changeEtherBalance(owner, -purchaseAmount);

        const newBalance = await token.balanceOf(owner.address);
        const expectedTokens = purchaseAmount.mul(1000);

        expect(newBalance).to.equal(initialBalance.add(expectedTokens));
    });
});

const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const [myAccount] = await ethers.getSigners();

  const MyCalculator = await ethers.getContractFactory("ERC20Init"); // 어떤 문제의 컨트랙트 인지 넣으시오.
  const myCalculatorDeploy = await MyCalculator.connect(myAccount).deploy();
  await myCalculatorDeploy.deployed();

  const instance = "0x17Fb602Ae87a30162fc5b889Da8cBc52DDC3b704"; // 이곳에 문제 인스턴스 컨트랙트 주소를 넣으세요
  const Problem = await ethers.getContractFactory(
    "ERC20Init"
  ); // 어떤 문제인지 넣으시오
  const ProblemInstance = Problem.attach(instance);
  const result = await ProblemInstance.connect(myAccount).setWeb3ojt(
    myCalculatorDeploy.address
  );
  console.log(result);
}

async function main() {
  calculatorSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

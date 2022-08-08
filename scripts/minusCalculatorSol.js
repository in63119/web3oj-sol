const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const [myAccount] = await ethers.getSigners();

  const MyMinusCalculator = await ethers.getContractFactory(
    "MyMinusCalculator"
  );
  const myMinusCalculator = await MyMinusCalculator.connect(myAccount).deploy();
  await myMinusCalculator.deployed();

  const instance = "0xF48d5d2b70dCb3aeD4C5a15754C053a8a5148F70"; // 이곳에 뺄셈 문제 인스턴스 컨트랙트 주소를 넣으세요
  const MinusCalculatorProblem = await ethers.getContractFactory(
    "MinusCalculatorProblem"
  );
  const minusCalculatorProblem = MinusCalculatorProblem.attach(instance);
  const result = await minusCalculatorProblem
    .connect(myAccount)
    .setMinusCalculator(myMinusCalculator.address);
  console.log(result);
}

async function main() {
  calculatorSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

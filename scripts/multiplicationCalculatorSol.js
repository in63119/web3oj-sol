const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const [myAccount] = await ethers.getSigners();

  const MyCalculator = await ethers.getContractFactory(
    "MyMultiplicationCalculator"
  );
  const myCalculator = await MyCalculator.connect(myAccount).deploy();
  await myCalculator.deployed();

  const instance = "0xF8Fd0FF8Ba5CFB37f16EeC3DE2E52287e7030390"; // 이곳에 뺄셈 문제 인스턴스 컨트랙트 주소를 넣으세요
  const MultiplicationCalculatorProblem = await ethers.getContractFactory(
    "MultiplicationCalculatorProblem"
  );
  const multiplicationCalculatorProblem =
    MultiplicationCalculatorProblem.attach(instance);
  const result = await multiplicationCalculatorProblem
    .connect(myAccount)
    .setMultiplicationCalculator(myCalculator.address);
  console.log(result);
}

async function main() {
  calculatorSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

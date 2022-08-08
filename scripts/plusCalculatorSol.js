const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const [myAccount] = await ethers.getSigners();

  const MyPlusCalculator = await ethers.getContractFactory("MyPlusCalculator");
  const myPlusCalculator = await MyPlusCalculator.connect(myAccount).deploy();
  await myPlusCalculator.deployed();

  const instance = "0x08F453aFcA05A4655ca104D7633d88c660De7543"; // 이곳에 덧셈 문제 인스턴스 컨트랙트 주소를 넣으세요
  const PlusCalculatorProblem = await ethers.getContractFactory(
    "PlusCalculatorProblem"
  );
  const plusCalculatorProblem = PlusCalculatorProblem.attach(instance);
  const result = await plusCalculatorProblem
    .connect(myAccount)
    .setPlusCalculator(myPlusCalculator.address);
  console.log(result);
}

async function main() {
  calculatorSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

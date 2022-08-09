const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const [myAccount] = await ethers.getSigners();

  const MyCalculator = await ethers.getContractFactory("MyDivisionCalculator"); // 어떤 문제의 컨트랙트 인지 넣으시오.
  const myCalculatorDeploy = await MyCalculator.connect(myAccount).deploy();
  await myCalculatorDeploy.deployed();

  const instance = "0x4EA4C260A9C90DACA2FF746e986aBCa8dec4E693"; // 이곳에 덧셈 문제 인스턴스 컨트랙트 주소를 넣으세요
  const DivisionCalculatorProblem = await ethers.getContractFactory(
    "DivisionCalculatorProblem"
  ); // 어떤 문제인지 넣으시오
  const ProblemInstance = DivisionCalculatorProblem.attach(instance);
  const result = await ProblemInstance.connect(myAccount).setDivisionCalculator(
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

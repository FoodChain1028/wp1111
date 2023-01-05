import { QuestionDataModel } from "./src/models/Model"

const data = [
  {
    questionId: 1,
    name: "Array Sum",
    description: "Given an array of uint256. Please write a function that returns the total sum of this array.",
    example1: "Input: [1, 2, 3, 4, 5]\nOutput: 15",
    example2: "Input: [0, 0, 0, 0, 1]\nOutput: 1",
    others: "The array length is 5.\n(Please Do Not Modify Input)",
    code: "function solution(uint256[5] memory input) public returns(uint256 result){\n    //TO_DO\n}",
    answer: "function solution(uint256[5] memory input) public returns(uint256 result){\n    //TO_DO\n    for (uint i = 0; i < input.length; i++){\n        result += input[i];\n    }\n    return result;\n}"
  },
  {
    questionId: 2,
    name: "Simple Storage",
    description: "There are many types to store variables. One of them is called storage, which is permenantly stored on the blockchain.\nGiven a uint256 variable called `STORAGE`. Please write a function that can return a variable which is stored on blockchain.",
    example1: "STORAGE: 12\nOutput: 12",
    example2: "STORAGE: 1000\nOutput: 1000",
    others: "You can use `STORAGE` in your solution.\n(Please Do Not Modify Input)",
    code: "function solution() public view returns(uint256){\n    //TO_DO\n}",
    answer: "function solution() public view returns(uint256){\n    //TO_DO\n    return STORAGE;\n}"
  },
  {
    questionId: 3,
    name: "Hash Function",
    description: "Hash functions are able to implement asymmetric cryptography. After an element is hashed, its result is hard to recover to the original value.",
    example1: "Input: 100\nOutput: 0x26700e13983fefbd9cf16da2ed70fa5c6798ac55062a4803121a869731e308d2",
    example2: "Input: 360\nOutput: 0x8077777ae4769de06cbfd1c0b8b1f653b51ec156d91a9aca16a4102f19e03d9e",
    others:"(Please Do Not Modify Input)",
    code: "function solution(uint256 input) public view returns(bytes32){\n    //TO_DO\n}",
    answer: "function solution(uint256 input) public view returns(bytes32){\n    //TO_DO\n    return keccak256(abi.encodePacked(x));\n}"
  }
]

const dataInit = async() => {
  await QuestionDataModel.deleteMany({});
  await QuestionDataModel.insertMany(data);
  console.log("Database initialized!");
};

export { dataInit };


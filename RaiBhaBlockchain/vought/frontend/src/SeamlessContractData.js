const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "runs",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "points",
        type: "int256",
      },
    ],
    name: "Activity",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "_points",
        type: "int256",
      },
    ],
    name: "buyPoints",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "string",
        name: "_activityName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_runs",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "_points",
        type: "int256",
      },
    ],
    name: "performActivity",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "runs",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "streak",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastActivityDay",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "points",
            type: "int256",
          },
        ],
        internalType: "struct Seamless.ScoreCard",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "int256",
        name: "points",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "runs",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "item",
        type: "string",
      },
    ],
    name: "redeemPoints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "scores",
    outputs: [
      {
        internalType: "uint256",
        name: "runs",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "streak",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastActivityDay",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "points",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contract = "0x3EF11F63658E088a75D0083Ec3eF8Fc689a6c36B";

export { contract, abi };

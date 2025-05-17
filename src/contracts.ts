export const wagmiContractConfig = {
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  abi: [
    {
      "type": "function",
      "name": "answerMaster",
      "inputs": [
        {
          "name": "content",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "askSlave",
      "inputs": [
        {
          "name": "a",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "content",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "buySlave",
      "inputs": [
        {
          "name": "a",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "getOrDefault",
      "inputs": [
        {
          "name": "a",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct SlaveQA.Slave",
          "components": [
            {
              "name": "self",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "desc",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "price",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "master",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "slaves",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "chats",
              "type": "tuple[]",
              "internalType": "struct SlaveQA.Chat[]",
              "components": [
                {
                  "name": "who",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "content",
                  "type": "string",
                  "internalType": "string"
                },
                {
                  "name": "price",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getSlaves",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct SlaveQA.Slave[]",
          "components": [
            {
              "name": "self",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "desc",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "price",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "master",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "slaves",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "chats",
              "type": "tuple[]",
              "internalType": "struct SlaveQA.Chat[]",
              "components": [
                {
                  "name": "who",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "content",
                  "type": "string",
                  "internalType": "string"
                },
                {
                  "name": "price",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "sellSelf",
      "inputs": [
        {
          "name": "price",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "desc",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "sellSlave",
      "inputs": [
        {
          "name": "a",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "price",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "error",
      "name": "PriceError",
      "inputs": []
    },
    {
      "type": "error",
      "name": "SlaveNotExistError",
      "inputs": []
    },
    {
      "type": "error",
      "name": "SlaveStateError",
      "inputs": []
    },
    {
      "type": "error",
      "name": "TransferError",
      "inputs": []
    }
  ],
} as const;

// ABIs generated from contracts/artifacts by Hardhat (copied for frontend use)
export const GovernanceTokenABI: any[] = [
	{
		"inputs": [
			{ "internalType": "string", "name": "name_", "type": "string" },
			{ "internalType": "string", "name": "symbol_", "type": "string" },
			{ "internalType": "uint256", "name": "initialSupply", "type": "uint256" }
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" },
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" },
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" },
	{ "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

export const GrantRegistryABI: any[] = [
	{
		"anonymous": false,
		"inputs": [
			{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" },
			{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" },
			{ "indexed": false, "internalType": "string", "name": "metadataURI", "type": "string" }
		],
		"name": "ProjectRegistered",
		"type": "event"
	},
	{ "inputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "getProject", "outputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [], "name": "nextId", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "projects", "outputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "metadataURI", "type": "string" }, { "internalType": "bool", "name": "exists", "type": "bool" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "string", "name": "metadataURI", "type": "string" } ], "name": "registerProject", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }
];

export const DonationVaultABI: any[] = [
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "donor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Donated", "type": "event" },
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Withdrawn", "type": "event" },
	{ "inputs": [], "name": "donate", "outputs": [], "stateMutability": "payable", "type": "function" },
	{ "inputs": [ { "internalType": "uint256", "name": "projectId", "type": "uint256" } ], "name": "projectBalances", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "address payable", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

export const MatchingPoolABI: any[] = [
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Funded", "type": "event" },
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Matched", "type": "event" },
	{ "inputs": [], "name": "fundPool", "outputs": [], "stateMutability": "payable", "type": "function" },
	{ "inputs": [ { "internalType": "uint256", "name": "poolId", "type": "uint256" } ], "name": "poolBalances", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "uint256", "name": "poolId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "matchFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];


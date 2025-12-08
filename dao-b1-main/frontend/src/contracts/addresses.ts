// Replace the example addresses with deployed contract addresses for your environment.
export const CONTRACTS = {
  GrantRegistry: import.meta.env.VITE_GRANT_REGISTRY_ADDRESS || '',
  RoundManager: import.meta.env.VITE_ROUND_MANAGER_ADDRESS || '',
  DonationVault: import.meta.env.VITE_DONATION_VAULT_ADDRESS || '',
  MatchingPool: import.meta.env.VITE_MATCHING_POOL_ADDRESS || '',
  GovernanceToken: import.meta.env.VITE_GOVERNANCE_TOKEN_ADDRESS || ''
}

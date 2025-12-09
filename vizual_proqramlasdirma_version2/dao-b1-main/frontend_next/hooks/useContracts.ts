/**
 * React hooks for smart contract interactions
 */

import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther } from 'viem'

// Contract ABIs (import from your artifacts)
import GovernanceTokenABI from '../contracts/GovernanceToken.json'
import DonationVaultABI from '../contracts/DonationVault.json'
import MatchingPoolABI from '../contracts/MatchingPool.json'
import GrantRegistryABI from '../contracts/GrantRegistry.json'

// Contract addresses (should come from environment variables)
const CONTRACTS = {
    governanceToken: process.env.NEXT_PUBLIC_GOVERNANCE_TOKEN_ADDRESS,
    donationVault: process.env.NEXT_PUBLIC_DONATION_VAULT_ADDRESS,
    matchingPool: process.env.NEXT_PUBLIC_MATCHING_POOL_ADDRESS,
    grantRegistry: process.env.NEXT_PUBLIC_GRANT_REGISTRY_ADDRESS,
}

// Governance Token Hooks
export function useTokenBalance(address: `0x${string}` | undefined) {
    return useContractRead({
        address: CONTRACTS.governanceToken as `0x${string}`,
        abi: GovernanceTokenABI.abi,
        functionName: 'balanceOf',
        args: [address],
        enabled: !!address,
    })
}

export function useMintToken(to: `0x${string}`, amount: string) {
    const { config } = usePrepareContractWrite({
        address: CONTRACTS.governanceToken as `0x${string}`,
        abi: GovernanceTokenABI.abi,
        functionName: 'mint',
        args: [to, parseEther(amount)],
    })

    const { data, write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

    return { mint: write, isLoading, isSuccess, txHash: data?.hash }
}

// Donation Vault Hooks
export function useDonate(projectId: number, amount: string) {
    const { config } = usePrepareContractWrite({
        address: CONTRACTS.donationVault as `0x${string}`,
        abi: DonationVaultABI.abi,
        functionName: 'donate',
        args: [BigInt(projectId)],
        value: parseEther(amount),
    })

    const { data, write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

    return { donate: write, isLoading, isSuccess, txHash: data?.hash }
}

export function useProjectBalance(projectId: number) {
    return useContractRead({
        address: CONTRACTS.donationVault as `0x${string}`,
        abi: DonationVaultABI.abi,
        functionName: 'projectBalances',
        args: [BigInt(projectId)],
    })
}

export function useWithdraw(projectId: number, to: `0x${string}`, amount: string) {
    const { config } = usePrepareContractWrite({
        address: CONTRACTS.donationVault as `0x${string}`,
        abi: DonationVaultABI.abi,
        functionName: 'withdraw',
        args: [BigInt(projectId), to, parseEther(amount)],
    })

    const { data, write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

    return { withdraw: write, isLoading, isSuccess, txHash: data?.hash }
}

// Grant Registry Hooks
export function useRegisterProject(metadataURI: string) {
    const { config } = usePrepareContractWrite({
        address: CONTRACTS.grantRegistry as `0x${string}`,
        abi: GrantRegistryABI.abi,
        functionName: 'registerProject',
        args: [metadataURI],
    })

    const { data, write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

    return { register: write, isLoading, isSuccess, txHash: data?.hash }
}

export function useGetProject(projectId: number) {
    return useContractRead({
        address: CONTRACTS.grantRegistry as `0x${string}`,
        abi: GrantRegistryABI.abi,
        functionName: 'getProject',
        args: [BigInt(projectId)],
    })
}

// Matching Pool Hooks
export function useFundPool(poolId: number, amount: string) {
    const { config } = usePrepareContractWrite({
        address: CONTRACTS.matchingPool as `0x${string}`,
        abi: MatchingPoolABI.abi,
        functionName: 'fundPool',
        args: [BigInt(poolId)],
        value: parseEther(amount),
    })

    const { data, write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

    return { fundPool: write, isLoading, isSuccess, txHash: data?.hash }
}

export function useCalculateMatching(roundId: number, projectId: number) {
    return useContractRead({
        address: CONTRACTS.matchingPool as `0x${string}`,
        abi: MatchingPoolABI.abi,
        functionName: 'calculateMatching',
        args: [BigInt(roundId), BigInt(projectId)],
    })
}

export function useGetDonorCount(roundId: number, projectId: number) {
    return useContractRead({
        address: CONTRACTS.matchingPool as `0x${string}`,
        abi: MatchingPoolABI.abi,
        functionName: 'getDonorCount',
        args: [BigInt(roundId), BigInt(projectId)],
    })
}

// Event Listeners
export function useContractEvents() {
    // This would use wagmi's useContractEvent hook
    // to listen for Donated, Withdrawn, ProjectRegistered, etc.
    // Implementation depends on specific event handling needs
}

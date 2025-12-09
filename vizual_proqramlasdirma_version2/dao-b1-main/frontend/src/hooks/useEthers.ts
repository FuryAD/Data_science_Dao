import { useCallback, useEffect, useState } from 'react'
import { BrowserProvider, type JsonRpcSigner, Contract } from 'ethers'

type TxStatus = 'idle' | 'pending' | 'confirmed' | 'failed'

export function useEthers() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [network, setNetwork] = useState<string | null>(null)
  const [txStatus, setTxStatus] = useState<TxStatus>('idle')

  const connect = useCallback(async () => {
    if (!(window as any).ethereum) throw new Error('No injected wallet found')
    const p = new BrowserProvider((window as any).ethereum)
    setProvider(p)
    const s = await p.getSigner()
    setSigner(s)
    try {
      const a = await s.getAddress()
      setAddress(a)
    } catch {
      setAddress(null)
    }
    const net = await p.getNetwork()
    setNetwork(net.name)
    ;(window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
      setAddress(accounts[0] ?? null)
    })
    ;(window as any).ethereum.on('chainChanged', async () => {
      const n = await p.getNetwork()
      setNetwork(n.name)
    })
    return { provider: p, signer: s }
  }, [])

  const disconnect = useCallback(() => {
    setProvider(null)
    setSigner(null)
    setAddress(null)
    setNetwork(null)
  }, [])

  const sendTx = useCallback(
    async (txPromise: Promise<any>) => {
      setTxStatus('pending')
      try {
        const tx = await txPromise
        await tx.wait()
        setTxStatus('confirmed')
        return tx
      } catch (e) {
        setTxStatus('failed')
        throw e
      } finally {
        setTimeout(() => setTxStatus('idle'), 2000)
      }
    },
    []
  )

  useEffect(() => {
    if ((window as any).ethereum && !provider) {
      const p = new BrowserProvider((window as any).ethereum)
      setProvider(p)
    }
  }, [provider])

  const getContract = useCallback(
    (address: string | undefined | null, abi: any) => {
      if (!address) throw new Error('Contract address is undefined')
      if (!provider) throw new Error('Provider not initialized')
      const signerOrProvider = signer ?? provider
      return new Contract(address, abi, signerOrProvider as any)
    },
    [provider, signer]
  )

  return { provider, signer, address, network, connect, disconnect, sendTx, txStatus, getContract }
}

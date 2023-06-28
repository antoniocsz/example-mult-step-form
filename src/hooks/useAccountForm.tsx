import { useContext } from 'react'

import { AccountFormContext } from '../contexts/AccountFormContext'

export function useAccountFormContext() {
  const context = useContext(AccountFormContext)
  return context
}


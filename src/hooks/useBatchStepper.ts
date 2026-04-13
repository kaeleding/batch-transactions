import { useReducer } from 'react'
import type { BatchFormState, BatchStep, ValidatedRow } from '@/types/batch'

interface StepperState {
  currentStep: BatchStep
  formData: BatchFormState
}

type StepperAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_DETAILS'; payload: Pick<BatchFormState, 'batchName' | 'approver' | 'file'> }
  | { type: 'SET_ROWS'; payload: ValidatedRow[] }
  | { type: 'RESET' }

const INITIAL_FORM: BatchFormState = {
  batchName: '',
  approver: '',
  file: null,
  rows: [],
}

const INITIAL_STATE: StepperState = {
  currentStep: 1,
  formData: INITIAL_FORM,
}

function stepperReducer(state: StepperState, action: StepperAction): StepperState {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 3) as BatchStep,
      }
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1) as BatchStep,
      }
    case 'SET_DETAILS':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      }
    case 'SET_ROWS':
      return {
        ...state,
        formData: { ...state.formData, rows: action.payload },
      }
    case 'RESET':
      return INITIAL_STATE
    default:
      return state
  }
}

export function useBatchStepper() {
  const [state, dispatch] = useReducer(stepperReducer, INITIAL_STATE)

  return {
    currentStep: state.currentStep,
    formData: state.formData,
    dispatch,
  }
}

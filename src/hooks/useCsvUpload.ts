import { useState } from 'react'
import { parseCsvFile, CsvParseError } from '@/lib/csv-parser'
import { validateRow } from '@/lib/validators'
import type { ValidatedRow } from '@/types/batch'

export function useCsvUpload() {
  const [rows, setRows] = useState<ValidatedRow[]>([])
  const [parseError, setParseError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  async function handleFileChange(file: File | null) {
    if (!file) {
      setRows([])
      setParseError(null)
      setFileName(null)
      return
    }

    setFileName(file.name)
    setParseError(null)

    try {
      const rawRows = await parseCsvFile(file)
      const validated = rawRows.map(validateRow)
      setRows(validated)
    } catch (err) {
      const message =
        err instanceof CsvParseError
          ? err.message
          : 'Failed to parse CSV file'
      setParseError(message)
      setRows([])
    }
  }

  function reset() {
    setRows([])
    setParseError(null)
    setFileName(null)
  }

  return { rows, parseError, fileName, handleFileChange, reset }
}

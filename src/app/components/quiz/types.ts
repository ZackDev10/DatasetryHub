export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

export interface QuizResult {
  score: number
  total: number
  answers: (number | null)[]
  timestamp: number
}

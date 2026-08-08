'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { QuizQuestion, QuizResult } from './types'

interface QuizProps {
  questions: QuizQuestion[]
  title?: string
  /** Called when the user completes or resets the quiz */
  onResult?: (result: QuizResult | null) => void
}

const XP_PER_CORRECT = 150
const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export function Quiz({ questions, title, onResult }: QuizProps) {
  const total = questions.length

  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    () => new Array(total).fill(null)
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  // Highest index that has been locked in (submitted). -1 = nothing locked yet.
  const [lockedUpTo, setLockedUpTo] = useState(-1)
  const [completed, setCompleted] = useState(false)

  const currentQuestion = questions[currentIndex]
  const currentSelected = selectedAnswers[currentIndex]
  const isCurrentLocked = currentIndex <= lockedUpTo

  // ---------- derived ----------

  const correctCount = useMemo(
    () =>
      selectedAnswers.reduce<number>(
        (acc, answer, i) => acc + (i <= lockedUpTo && answer === questions[i].correctIndex ? 1 : 0),
        0
      ),
    [selectedAnswers, lockedUpTo, questions]
  )
  const xpEarned = correctCount * XP_PER_CORRECT
  const progressPercent = Math.round(((currentIndex + 1) / total) * 100)
  const allAnswered = selectedAnswers.every((a) => a !== null)

  // ---------- actions ----------

  const selectAnswer = useCallback(
    (optionIndex: number) => {
      if (isCurrentLocked || completed) return
      setSelectedAnswers((prev) => {
        const next = [...prev]
        next[currentIndex] = optionIndex
        return next
      })
    },
    [isCurrentLocked, completed, currentIndex]
  )

  const handlePrimaryAction = useCallback(() => {
    if (!isCurrentLocked) {
      setLockedUpTo(currentIndex)
      return
    }
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      setCompleted(true)
    }
  }, [isCurrentLocked, currentIndex, total])

  const reset = useCallback(() => {
    setSelectedAnswers(new Array(total).fill(null))
    setCurrentIndex(0)
    setLockedUpTo(-1)
    setCompleted(false)
    onResult?.(null)
  }, [total, onResult])

  // Fire onResult once the quiz is completed (mirrors previous submit-time behavior)
  useEffect(() => {
    if (!completed) return
    const score = selectedAnswers.reduce<number>(
      (acc, answer, i) => acc + (answer === questions[i].correctIndex ? 1 : 0),
      0
    )
    onResult?.({ score, total, answers: selectedAnswers, timestamp: Date.now() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed])

  const buttonLabel = !isCurrentLocked
    ? 'Submit Answer'
    : currentIndex < total - 1
      ? 'Next Question'
      : 'Finish Quiz'
  const buttonDisabled = !isCurrentLocked && currentSelected === null

  // ---------- render ----------

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-md sm:p-10">
      {title && <h2 className="mb-8 text-2xl font-bold text-slate-900">{title}</h2>}

      {/* Top progress bar */}
      <div className="mb-8">
        <div className="mb-2.5 flex items-center justify-between text-xs font-medium">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            Question {Math.min(currentIndex + 1, total)} of {total}
          </span>
          <span className="font-semibold text-indigo-500">{progressPercent}% Complete</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {!completed ? (
        <>
          {/* Current question */}
          <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
            <h3 className="mb-1 font-semibold text-slate-900">{currentQuestion.question}</h3>
            <p className="mb-5 text-xs text-slate-400">Select the most appropriate answer.</p>

            {/* Options stacked vertically as individual selectable cards */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, oi) => {
                const isSelected = currentSelected === oi
                const isCorrectOption = isCurrentLocked && oi === currentQuestion.correctIndex
                const isWrongSelected = isCurrentLocked && isSelected && oi !== currentQuestion.correctIndex

                let cardClass =
                  'flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all'

                if (isCurrentLocked) {
                  if (isCorrectOption) {
                    cardClass += ' bg-emerald-50 border-emerald-400 text-emerald-800 font-medium'
                  } else if (isWrongSelected) {
                    cardClass += ' bg-rose-50 border-rose-400 text-rose-800'
                  } else {
                    cardClass += ' border-slate-200 text-slate-400'
                  }
                } else {
                  cardClass += isSelected
                    ? ' border-indigo-500 bg-indigo-50 text-indigo-900 shadow-sm'
                    : ' border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer'
                }

                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => selectAnswer(oi)}
                    disabled={isCurrentLocked}
                    className={cardClass}
                    aria-pressed={isSelected}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${isCurrentLocked
                          ? isCorrectOption
                            ? 'bg-emerald-500 text-white'
                            : isWrongSelected
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-100 text-slate-400'
                          : isSelected
                            ? 'bg-indigo-500 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                    >
                      {OPTION_LETTERS[oi] ?? oi + 1}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Bottom action bar: Score + XP on the left, Submit on the right */}
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-1.5.174m0 0a6.772 6.772 0 01-1.5-.174"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Current Score
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {correctCount} / {Math.max(lockedUpTo + 1, 0)} Correct
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">XP Earned</p>
                  <p className="text-sm font-semibold text-slate-900">{xpEarned} XP</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrimaryAction}
              disabled={buttonDisabled}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200
                         disabled:cursor-not-allowed disabled:opacity-40
                         hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            >
              {buttonLabel}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

          {!isCurrentLocked && currentSelected === null && (
            <p className="mt-3 text-xs text-slate-400">Select an answer to continue.</p>
          )}
        </>
      ) : (
        // ---------- completion summary ----------
        <div className="text-center">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-8 shadow-md">
            <p className="text-2xl font-bold text-slate-900">
              You scored {correctCount} / {total}
            </p>
            <p className="mt-1.5 text-sm text-slate-500">{xpEarned} XP earned this attempt</p>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all"
                style={{ width: `${Math.round((correctCount / total) * 100)}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={reset}
            className="mt-5 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold
                       text-slate-700 shadow-sm hover:bg-slate-50 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          >
            Retry Quiz
          </button>
        </div>
      )}

      {!allAnswered && !completed && (
        <p className="mt-5 text-xs text-slate-300">{total - selectedAnswers.filter((a) => a !== null).length} question(s) remaining.</p>
      )}
    </div>
  )
}

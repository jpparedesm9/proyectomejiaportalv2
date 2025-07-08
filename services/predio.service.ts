const SELECTED_PREDIO_KEY = 'selectedPredio'

export class PredioService {
  static getSelectedPredio(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(SELECTED_PREDIO_KEY)
  }

  static setSelectedPredio(predio: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SELECTED_PREDIO_KEY, predio)
    }
  }

  static clearSelectedPredio(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SELECTED_PREDIO_KEY)
    }
  }

  static hasSelectedPredio(): boolean {
    return !!this.getSelectedPredio()
  }
}
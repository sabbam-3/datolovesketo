export type ExperienceStep =
  | 'question'
  | 'celebration'
  | 'messages'
  | 'dateType'
  | 'location'
  | 'surprise'
  | 'dateTime'
  | 'summary'

export interface DateType {
  id: string
  label: string
  emoji: string
}

export interface LocationChoice {
  id: string
  label: string
  emoji: string
}

export interface DateSelections {
  dateType: DateType | null
  location: LocationChoice | null
  surpriseResult: string | null
  dateTime: { date: string; time: string } | null
}

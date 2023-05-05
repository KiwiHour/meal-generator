export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null
          forename: string | null
          id: string
          meal_ids: number[] | null
        }
        Insert: {
          created_at?: string | null
          forename?: string | null
          id: string
          meal_ids?: number[] | null
        }
        Update: {
          created_at?: string | null
          forename?: string | null
          id?: string
          meal_ids?: number[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

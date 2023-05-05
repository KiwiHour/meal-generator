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
          is_new_profile: boolean
        }
        Insert: {
          created_at?: string | null
          forename?: string | null
          id: string
          is_new_profile?: boolean
        }
        Update: {
          created_at?: string | null
          forename?: string | null
          id?: string
          is_new_profile?: boolean
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

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
      users: {
        Row: {
          created_at: string | null
          id: number
          password: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          password?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          password?: string | null
          username?: string | null
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

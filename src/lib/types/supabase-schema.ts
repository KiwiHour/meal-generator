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
      logs: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string | null
          user_id?: string | null
        }
      }
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
      recipe_difficulties: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          value?: number | null
        }
      }
      recipe_ingredients: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
      }
      recipe_tags: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
      }
      recipies: {
        Row: {
          created_at: string | null
          difficulty_id: number | null
          id: number
          meal_type_id: number | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          difficulty_id?: number | null
          id?: number
          meal_type_id?: number | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          difficulty_id?: number | null
          id?: number
          meal_type_id?: number | null
          name?: string | null
          user_id?: string | null
        }
      }
      xref_recipe_ingredients: {
        Row: {
          created_at: string | null
          id: number
          ingredient_id: number | null
          recipe_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          ingredient_id?: number | null
          recipe_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          ingredient_id?: number | null
          recipe_id?: number | null
        }
      }
      xref_recipe_tags: {
        Row: {
          created_at: string | null
          id: number
          recipe_id: number | null
          tag_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          recipe_id?: number | null
          tag_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          recipe_id?: number | null
          tag_id?: number | null
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

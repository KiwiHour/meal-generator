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
          created_at: string
          id: number
          message: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          user_id?: string | null
        }
      }
      meal_types: {
        Row: {
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          created_at: string
          forename: string
          id: string
          is_new_profile: boolean
        }
        Insert: {
          created_at?: string
          forename: string
          id: string
          is_new_profile?: boolean
        }
        Update: {
          created_at?: string
          forename?: string
          id?: string
          is_new_profile?: boolean
        }
      }
      recipe_difficulties: {
        Row: {
          created_at: string
          id: number
          name: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          value: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          value?: number
        }
      }
      recipe_ingredients: {
        Row: {
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          user_id?: string
        }
      }
      recipe_tags: {
        Row: {
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          user_id?: string
        }
      }
      recipies: {
        Row: {
          created_at: string
          difficulty_id: number
          id: number
          meal_type_id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          difficulty_id: number
          id?: number
          meal_type_id: number
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          difficulty_id?: number
          id?: number
          meal_type_id?: number
          name?: string
          user_id?: string
        }
      }
      xref_recipe_ingredients: {
        Row: {
          created_at: string
          id: number
          ingredient_id: number
          recipe_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          ingredient_id: number
          recipe_id: number
        }
        Update: {
          created_at?: string
          id?: number
          ingredient_id?: number
          recipe_id?: number
        }
      }
      xref_recipe_tags: {
        Row: {
          created_at: string | null
          id: number
          recipe_id: number
          tag_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          recipe_id: number
          tag_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          recipe_id?: number
          tag_id?: number
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

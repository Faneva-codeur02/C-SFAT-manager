export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      account_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["accounting_entry_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          type: Database["public"]["Enums"]["accounting_entry_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["accounting_entry_type"]
        }
        Relationships: []
      }
      accounting_entries: {
        Row: {
          amount: number
          category_id: string
          created_at: string
          created_by: string | null
          description: string | null
          entry_date: string
          entry_type: Database["public"]["Enums"]["accounting_entry_type"]
          financial_account_id: string | null
          id: string
          payment_id: string | null
          season_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          category_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          entry_date: string
          entry_type: Database["public"]["Enums"]["accounting_entry_type"]
          financial_account_id?: string | null
          id?: string
          payment_id?: string | null
          season_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          entry_date?: string
          entry_type?: Database["public"]["Enums"]["accounting_entry_type"]
          financial_account_id?: string | null
          id?: string
          payment_id?: string | null
          season_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_entries_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "account_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounting_entries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounting_entries_financial_account_id_fkey"
            columns: ["financial_account_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounting_entries_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounting_entries_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      contribution_periods: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          id: string
          period_end: string
          period_start: string
          season_id: string
          updated_at: string
          week_number: number
        }
        Insert: {
          amount: number
          created_at?: string
          due_date: string
          id?: string
          period_end: string
          period_start: string
          season_id: string
          updated_at?: string
          week_number: number
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          id?: string
          period_end?: string
          period_start?: string
          season_id?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "contribution_periods_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_accounts: {
        Row: {
          account_type: Database["public"]["Enums"]["financial_account_type"]
          created_at: string
          current_balance: number
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          account_type: Database["public"]["Enums"]["financial_account_type"]
          created_at?: string
          current_balance?: number
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["financial_account_type"]
          created_at?: string
          current_balance?: number
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      invitation_codes: {
        Row: {
          code: string
          created_at: string
          created_by: string | null
          expires_at: string
          id: string
          used: boolean
          used_by: string | null
        }
        Insert: {
          code: string
          created_at?: string
          created_by?: string | null
          expires_at: string
          id?: string
          used?: boolean
          used_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string
          id?: string
          used?: boolean
          used_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invitation_codes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitation_codes_used_by_fkey"
            columns: ["used_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      member_contributions: {
        Row: {
          amount_due: number
          amount_paid: number
          contribution_period_id: string
          created_at: string
          id: string
          note: string | null
          paid_at: string | null
          profile_id: string
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
        }
        Insert: {
          amount_due: number
          amount_paid?: number
          contribution_period_id: string
          created_at?: string
          id?: string
          note?: string | null
          paid_at?: string | null
          profile_id: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Update: {
          amount_due?: number
          amount_paid?: number
          contribution_period_id?: string
          created_at?: string
          id?: string
          note?: string | null
          paid_at?: string | null
          profile_id?: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_contributions_contribution_period_id_fkey"
            columns: ["contribution_period_id"]
            isOneToOne: false
            referencedRelation: "contribution_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_contributions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      member_wallets: {
        Row: {
          balance: number
          profile_id: string
          updated_at: string
        }
        Insert: {
          balance?: number
          profile_id: string
          updated_at?: string
        }
        Update: {
          balance?: number
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_wallets_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      opening_balances: {
        Row: {
          amount: number
          balance_type: Database["public"]["Enums"]["opening_balance_type"]
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          profile_id: string | null
          season_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          balance_type: Database["public"]["Enums"]["opening_balance_type"]
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          season_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          balance_type?: Database["public"]["Enums"]["opening_balance_type"]
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          season_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "opening_balances_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opening_balances_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opening_balances_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_allocations: {
        Row: {
          allocated_amount: number
          created_at: string
          id: string
          member_contribution_id: string
          payment_id: string
        }
        Insert: {
          allocated_amount: number
          created_at?: string
          id?: string
          member_contribution_id: string
          payment_id: string
        }
        Update: {
          allocated_amount?: number
          created_at?: string
          id?: string
          member_contribution_id?: string
          payment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_allocations_member_contribution_id_fkey"
            columns: ["member_contribution_id"]
            isOneToOne: false
            referencedRelation: "member_contributions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_allocations_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          financial_account_id: string | null
          id: string
          note: string | null
          payment_date: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          profile_id: string
          received_by: string | null
          reference: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          financial_account_id?: string | null
          id?: string
          note?: string | null
          payment_date?: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          profile_id: string
          received_by?: string | null
          reference?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          financial_account_id?: string | null
          id?: string
          note?: string | null
          payment_date?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          profile_id?: string
          received_by?: string | null
          reference?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_financial_account_id_fkey"
            columns: ["financial_account_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_received_by_fkey"
            columns: ["received_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          adresse: string | null
          created_at: string
          date_entree: string | null
          date_naissance: string | null
          deleted_at: string | null
          email: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          member_number: string | null
          nom: string
          photo_url: string | null
          prenom: string
          profession: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["member_status"]
          telephone: string | null
          updated_at: string
          validated_at: string | null
          validated_by: string | null
          voice_part: Database["public"]["Enums"]["voice_part"] | null
        }
        Insert: {
          adresse?: string | null
          created_at?: string
          date_entree?: string | null
          date_naissance?: string | null
          deleted_at?: string | null
          email: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id: string
          member_number?: string | null
          nom: string
          photo_url?: string | null
          prenom: string
          profession?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["member_status"]
          telephone?: string | null
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
          voice_part?: Database["public"]["Enums"]["voice_part"] | null
        }
        Update: {
          adresse?: string | null
          created_at?: string
          date_entree?: string | null
          date_naissance?: string | null
          deleted_at?: string | null
          email?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          member_number?: string | null
          nom?: string
          photo_url?: string | null
          prenom?: string
          profession?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["member_status"]
          telephone?: string | null
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
          voice_part?: Database["public"]["Enums"]["voice_part"] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      seasons: {
        Row: {
          created_at: string
          end_date: string
          id: string
          is_current: boolean
          name: string
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          is_current?: boolean
          name: string
          start_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          is_current?: boolean
          name?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          description: string | null
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          payment_id: string | null
          profile_id: string
          transaction_type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          payment_id?: string | null
          profile_id: string
          transaction_type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          payment_id?: string | null
          profile_id?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      is_treasurer: { Args: never; Returns: boolean }
    }
    Enums: {
      accounting_entry_type: "income" | "expense"
      event_status: "draft" | "published" | "finished" | "cancelled"
      financial_account_type: "cash" | "bank" | "mobile_money"
      gender_type: "male" | "female"
      member_status: "pending" | "active" | "inactive" | "rejected"
      opening_balance_type:
        | "contribution_debt"
        | "contribution_credit"
        | "cash"
        | "bank"
      payment_method: "cash" | "mobile_money" | "bank_transfer" | "other"
      payment_status: "pending" | "partial" | "paid" | "cancelled"
      user_role: "admin" | "treasurer" | "member"
      voice_part: "soprano" | "alto" | "tenor" | "bass"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      accounting_entry_type: ["income", "expense"],
      event_status: ["draft", "published", "finished", "cancelled"],
      financial_account_type: ["cash", "bank", "mobile_money"],
      gender_type: ["male", "female"],
      member_status: ["pending", "active", "inactive", "rejected"],
      opening_balance_type: [
        "contribution_debt",
        "contribution_credit",
        "cash",
        "bank",
      ],
      payment_method: ["cash", "mobile_money", "bank_transfer", "other"],
      payment_status: ["pending", "partial", "paid", "cancelled"],
      user_role: ["admin", "treasurer", "member"],
      voice_part: ["soprano", "alto", "tenor", "bass"],
    },
  },
} as const

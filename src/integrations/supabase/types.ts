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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      cached_stats: {
        Row: {
          id: number
          metric_name: string
          metric_value: number
          updated_at: string | null
        }
        Insert: {
          id?: number
          metric_name: string
          metric_value: number
          updated_at?: string | null
        }
        Update: {
          id?: number
          metric_name?: string
          metric_value?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          acepta_politica: boolean
          asunto: string
          created_at: string
          email: string
          empresa: string
          id: string
          mensaje: string
          nombre: string
          telefono: string
          tipo_cultivo: string | null
          ubicacion: string | null
          updated_at: string
        }
        Insert: {
          acepta_politica?: boolean
          asunto: string
          created_at?: string
          email: string
          empresa: string
          id?: string
          mensaje: string
          nombre: string
          telefono: string
          tipo_cultivo?: string | null
          ubicacion?: string | null
          updated_at?: string
        }
        Update: {
          acepta_politica?: boolean
          asunto?: string
          created_at?: string
          email?: string
          empresa?: string
          id?: string
          mensaje?: string
          nombre?: string
          telefono?: string
          tipo_cultivo?: string | null
          ubicacion?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          capacidad_requerida: string | null
          comentarios_adicionales: string | null
          condiciones_ambientales: string | null
          created_at: string
          email: string
          empresa: string
          energia_disponible: string | null
          fecha_estimada: string | null
          id: string
          ip: unknown
          nombre: string
          presupuesto_aproximado: string | null
          source: string | null
          telefono: string
          tipo_cultivo: string | null
          tipo_producto: string
          ubicacion_proyecto: string
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          capacidad_requerida?: string | null
          comentarios_adicionales?: string | null
          condiciones_ambientales?: string | null
          created_at?: string
          email: string
          empresa: string
          energia_disponible?: string | null
          fecha_estimada?: string | null
          id?: string
          ip?: unknown
          nombre: string
          presupuesto_aproximado?: string | null
          source?: string | null
          telefono: string
          tipo_cultivo?: string | null
          tipo_producto: string
          ubicacion_proyecto: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          capacidad_requerida?: string | null
          comentarios_adicionales?: string | null
          condiciones_ambientales?: string | null
          created_at?: string
          email?: string
          empresa?: string
          energia_disponible?: string | null
          fecha_estimada?: string | null
          id?: string
          ip?: unknown
          nombre?: string
          presupuesto_aproximado?: string | null
          source?: string | null
          telefono?: string
          tipo_cultivo?: string | null
          tipo_producto?: string
          ubicacion_proyecto?: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_create_quote_request: {
        Args: { p_email: string; p_ip: unknown }
        Returns: boolean
      }
      cleanup_old_audit_data: { Args: never; Returns: undefined }
      get_contact_stats: {
        Args: { end_date?: string; start_date?: string }
        Returns: {
          avg_per_day: number
          top_companies: string[]
          top_subjects: string[]
          total_contacts: number
          total_quotes: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
  public: {
    Enums: {},
  },
} as const

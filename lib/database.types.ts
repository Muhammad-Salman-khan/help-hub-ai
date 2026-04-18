export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = "seeker" | "helper" | "both"
export type RequestStatus = "open" | "in_progress" | "solved"
export type RequestUrgency = "low" | "medium" | "high"
export type HelperStatus = "pending" | "accepted" | "declined"
export type NotificationType = "request" | "message" | "solved" | "helper" | "trending"
export type LeaderboardPeriod = "weekly" | "monthly" | "alltime"

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          bio: string | null
          location: string | null
          skills: string[]
          interests: string[]
          role: UserRole
          trust_score: number
          completed_onboarding: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          bio?: string | null
          location?: string | null
          skills?: string[]
          interests?: string[]
          role?: UserRole
          trust_score?: number
          completed_onboarding?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string | null
          bio?: string | null
          location?: string | null
          skills?: string[]
          interests?: string[]
          role?: UserRole
          trust_score?: number
          completed_onboarding?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      requests: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          urgency: RequestUrgency
          status: RequestStatus
          tags: string[]
          author_id: string
          ai_summary: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          urgency: RequestUrgency
          status?: RequestStatus
          tags?: string[]
          author_id: string
          ai_summary?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          category?: string
          urgency?: RequestUrgency
          status?: RequestStatus
          tags?: string[]
          author_id?: string
          ai_summary?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "requests_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      request_helpers: {
        Row: {
          id: string
          request_id: string
          helper_id: string
          status: HelperStatus
          created_at: string
        }
        Insert: {
          id?: string
          request_id: string
          helper_id: string
          status?: HelperStatus
          created_at?: string
        }
        Update: {
          request_id?: string
          helper_id?: string
          status?: HelperStatus
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "request_helpers_helper_id_fkey"
            columns: ["helper_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          sender_id?: string
          receiver_id?: string
          content?: string
          read?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: NotificationType
          title: string
          description: string | null
          link: string | null
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: NotificationType
          title: string
          description?: string | null
          link?: string | null
          read?: boolean
          created_at?: string
        }
        Update: {
          user_id?: string
          type?: NotificationType
          title?: string
          description?: string | null
          link?: string | null
          read?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      leaderboard: {
        Row: {
          id: string
          user_id: string
          helped_count: number
          rating: number
          points: number
          period: LeaderboardPeriod
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          helped_count?: number
          rating?: number
          points?: number
          period: LeaderboardPeriod
          updated_at?: string
        }
        Update: {
          user_id?: string
          helped_count?: number
          rating?: number
          points?: number
          period?: LeaderboardPeriod
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      request_status: RequestStatus
      request_urgency: RequestUrgency
      helper_status: HelperStatus
      notification_type: NotificationType
      leaderboard_period: LeaderboardPeriod
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Export typed helpers for use in components
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Export specific table types
export type Profile = Tables<'profiles'>
export type Request = Tables<'requests'>
export type RequestHelper = Tables<'request_helpers'>
export type Message = Tables<'messages'>
export type Notification = Tables<'notifications'>
export type LeaderboardEntry = Tables<'leaderboard'>

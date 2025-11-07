/*
  # StudySync Database Schema

  ## Overview
  Creates the complete database schema for StudySync - a real-time study room chat application.
  This migration sets up tables for users, study rooms, messages, reactions, and notifications.

  ## New Tables

  ### 1. profiles
  Extends auth.users with additional user information
  - `id` (uuid, primary key, references auth.users)
  - `display_name` (text)
  - `avatar_url` (text, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. study_rooms
  Virtual study rooms where students can collaborate
  - `id` (uuid, primary key)
  - `name` (text, room name)
  - `description` (text, optional)
  - `owner_id` (uuid, references profiles)
  - `is_active` (boolean, default true)
  - `max_participants` (integer, default 50)
  - `created_at` (timestamptz)

  ### 3. room_participants
  Tracks which users are in which rooms
  - `id` (uuid, primary key)
  - `room_id` (uuid, references study_rooms)
  - `user_id` (uuid, references profiles)
  - `joined_at` (timestamptz)
  - `is_muted` (boolean, default false)

  ### 4. messages
  Chat messages within study rooms
  - `id` (uuid, primary key)
  - `room_id` (uuid, references study_rooms)
  - `user_id` (uuid, references profiles)
  - `content` (text)
  - `message_type` (text, default 'text': text, file, system)
  - `file_url` (text, optional)
  - `file_name` (text, optional)
  - `is_pinned` (boolean, default false)
  - `mentioned_users` (uuid[], array of user IDs)
  - `created_at` (timestamptz)

  ### 5. reactions
  Emoji reactions to messages
  - `id` (uuid, primary key)
  - `message_id` (uuid, references messages)
  - `user_id` (uuid, references profiles)
  - `emoji` (text)
  - `created_at` (timestamptz)

  ### 6. notifications
  User notifications for mentions and room activity
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `message_id` (uuid, references messages, optional)
  - `type` (text: mention, room_invite, system)
  - `content` (text)
  - `is_read` (boolean, default false)
  - `created_at` (timestamptz)

  ## Security

  1. Enable Row Level Security (RLS) on all tables
  2. Profiles: Users can read all profiles, but only update their own
  3. Study Rooms: All authenticated users can read active rooms, only owners can update/delete
  4. Room Participants: Users can see participants of rooms they're in
  5. Messages: Users can read messages from rooms they're in, can only delete their own
  6. Reactions: Users can read all reactions, manage their own
  7. Notifications: Users can only see and manage their own notifications

  ## Indexes

  Create indexes on frequently queried columns for performance:
  - messages(room_id, created_at) for chat history
  - room_participants(room_id, user_id) for membership checks
  - notifications(user_id, is_read) for unread counts
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create study_rooms table
CREATE TABLE IF NOT EXISTS study_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  is_active boolean DEFAULT true,
  max_participants integer DEFAULT 50,
  created_at timestamptz DEFAULT now()
);

-- Create room_participants table
CREATE TABLE IF NOT EXISTS room_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES study_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  is_muted boolean DEFAULT false,
  UNIQUE(room_id, user_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES study_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  message_type text DEFAULT 'text',
  file_url text,
  file_name text,
  is_pinned boolean DEFAULT false,
  mentioned_users uuid[],
  created_at timestamptz DEFAULT now()
);

-- Create reactions table
CREATE TABLE IF NOT EXISTS reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES messages(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  emoji text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(message_id, user_id, emoji)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  message_id uuid REFERENCES messages(id) ON DELETE CASCADE,
  type text NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Study rooms policies
CREATE POLICY "Users can view active study rooms"
  ON study_rooms FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can create study rooms"
  ON study_rooms FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Room owners can update their rooms"
  ON study_rooms FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Room owners can delete their rooms"
  ON study_rooms FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Room participants policies
CREATE POLICY "Users can view participants in their rooms"
  ON room_participants FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM room_participants rp
      WHERE rp.room_id = room_participants.room_id
      AND rp.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join rooms"
  ON room_participants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave rooms"
  ON room_participants FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages in their rooms"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM room_participants rp
      WHERE rp.room_id = messages.room_id
      AND rp.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages in their rooms"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM room_participants rp
      WHERE rp.room_id = messages.room_id
      AND rp.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own messages"
  ON messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Room owners can update messages in their rooms"
  ON messages FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM study_rooms sr
      WHERE sr.id = messages.room_id
      AND sr.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM study_rooms sr
      WHERE sr.id = messages.room_id
      AND sr.owner_id = auth.uid()
    )
  );

-- Reactions policies
CREATE POLICY "Users can view reactions in their rooms"
  ON reactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM messages m
      JOIN room_participants rp ON rp.room_id = m.room_id
      WHERE m.id = reactions.message_id
      AND rp.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add reactions"
  ON reactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own reactions"
  ON reactions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
  ON notifications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_room_created ON messages(room_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_room_participants_room_user ON room_participants(room_id, user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_reactions_message ON reactions(message_id);
CREATE INDEX IF NOT EXISTS idx_study_rooms_active ON study_rooms(is_active);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
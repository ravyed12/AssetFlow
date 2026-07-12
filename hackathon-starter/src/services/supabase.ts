import { createClient } from "@/lib/supabase/server";

type DbRecord = Record<string, unknown>;
type DbInsertPayload = DbRecord | DbRecord[];

/**
 * Generic Database Query Service utilizing the server-side Supabase client.
 * Provides type-safe wrappers for database interactions.
 */
export const dbService = {
  /**
   * Fetch multiple records with optional filters
   */
  async findMany<T>(
    table: string,
    options?: {
      select?: string;
      orderBy?: { column: string; ascending?: boolean };
      limit?: number;
    }
  ): Promise<{ data: T[] | null; error: Error | null }> {
    try {
      const supabase = await createClient();
      let query = supabase.from(table).select(options?.select || "*");

      if (options?.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { data: data as T[], error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Fetch a single record by a key-value match
   */
  async findFirst<T>(
    table: string,
    column: string,
    value: unknown,
    select = "*"
  ): Promise<{ data: T | null; error: Error | null }> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from(table)
        .select(select)
        .eq(column, value)
        .single();

      if (error) throw error;
      return { data: data as T, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Insert a new record
   */
  async insert<T>(
    table: string,
    payload: DbInsertPayload
  ): Promise<{ data: T | null; error: Error | null }> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from(table)
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      return { data: data as T, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Update records matching a filter
   */
  async update<T>(
    table: string,
    column: string,
    value: unknown,
    payload: DbRecord
  ): Promise<{ data: T[] | null; error: Error | null }> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from(table)
        .update(payload)
        .eq(column, value)
        .select();

      if (error) throw error;
      return { data: data as T[], error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Delete records matching a filter
   */
  async delete(
    table: string,
    column: string,
    value: unknown
  ): Promise<{ success: boolean; error: Error | null }> {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from(table).delete().eq(column, value);

      if (error) throw error;
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err as Error };
    }
  },
};

import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const content = sqliteTable('cms_content', { key: text('key').primaryKey(), value: text('value').notNull(), revision: integer('revision').notNull().default(1), updatedAt: integer('updated_at').notNull() });
export const enquiries = sqliteTable('partner_enquiries', { id: text('id').primaryKey(), data: text('data').notNull(), createdAt: integer('created_at').notNull(), emailStatus: text('email_status').notNull().default('pending') }, t => [index('idx_enquiries_created_at').on(t.createdAt)]);
export const rateLimits = sqliteTable('enquiry_rate_limits', { bucket: text('bucket').primaryKey(), count: integer('count').notNull(), expiresAt: integer('expires_at').notNull() }, t => [index('idx_rate_limits_expiry').on(t.expiresAt)]);


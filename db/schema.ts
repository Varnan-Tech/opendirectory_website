import { pgTable, uuid, varchar, boolean, timestamp, text, pgEnum } from 'drizzle-orm/pg-core';

export const shirtSizeEnum = pgEnum('shirt_size', ['S', 'M', 'L', 'XL', 'XXL']);
export const claimStatusEnum = pgEnum('claim_status', ['pending', 'shipped', 'delivered', 'cancelled']);

export const mergedContributors = pgTable('merged_contributors', {
  id: uuid('id').primaryKey().defaultRandom(),
  githubUsername: varchar('github_username', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  hasClaimed: boolean('has_claimed').default(false).notNull(),
  mergedAt: timestamp('merged_at').defaultNow().notNull(),
});

export const merchClaims = pgTable('merch_claims', {
  id: uuid('id').primaryKey().defaultRandom(),
  contributorId: uuid('contributor_id').references(() => mergedContributors.id).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  githubEmail: varchar('github_email', { length: 255 }).notNull(),
  contactEmail: varchar('contact_email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  altPhone: varchar('alt_phone', { length: 50 }),
  addressLine1: text('address_line_1').notNull(),
  addressLine2: text('address_line_2'),
  city: varchar('city', { length: 255 }).notNull(),
  state: varchar('state', { length: 255 }).notNull(),
  pinCode: varchar('pin_code', { length: 50 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  shirtSize: shirtSizeEnum('shirt_size').notNull(),
  status: claimStatusEnum('status').default('pending').notNull(),
});

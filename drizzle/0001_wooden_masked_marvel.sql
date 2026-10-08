CREATE INDEX `idx_enquiries_created_at` ON `partner_enquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_rate_limits_expiry` ON `enquiry_rate_limits` (`expires_at`);
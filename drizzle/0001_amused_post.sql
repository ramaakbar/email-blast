ALTER TABLE `send_jobs` ADD `reply_to` text;--> statement-breakpoint
ALTER TABLE `smtp_profiles` ADD `default_sender_name` text;--> statement-breakpoint
ALTER TABLE `smtp_profiles` ADD `default_sender_address` text;--> statement-breakpoint
ALTER TABLE `smtp_profiles` ADD `default_reply_to` text;
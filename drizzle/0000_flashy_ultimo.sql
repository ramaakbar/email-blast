CREATE TABLE IF NOT EXISTS `generate_job_recipients` (
	`job_id` text NOT NULL,
	`recipient_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`output_path` text,
	`error_message` text,
	PRIMARY KEY(`job_id`, `recipient_id`),
	FOREIGN KEY (`job_id`) REFERENCES `generate_jobs`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipient_id`) REFERENCES `recipients`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "generate_job_recipients_status_check" CHECK("generate_job_recipients"."status" IN ('pending', 'generated', 'failed'))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `generate_jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`template_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`completed_at` text,
	FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "generate_jobs_status_check" CHECK("generate_jobs"."status" IN ('pending', 'generating', 'generated', 'cancelled'))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `recipients` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`metadata` text DEFAULT '{}' NOT NULL,
	`import_batch` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_recipients_email` ON `recipients` (`email`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_recipients_import_batch` ON `recipients` (`import_batch`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `send_job_recipients` (
	`job_id` text NOT NULL,
	`recipient_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`message_id` text,
	`error_message` text,
	`sent_at` text,
	PRIMARY KEY(`job_id`, `recipient_id`),
	FOREIGN KEY (`job_id`) REFERENCES `send_jobs`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipient_id`) REFERENCES `recipients`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "send_job_recipients_status_check" CHECK("send_job_recipients"."status" IN ('pending', 'sent', 'failed', 'skipped'))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `send_jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`generate_job_id` text,
	`channel` text DEFAULT 'email' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`smtp_profile_id` text,
	`smtp_override` text,
	`subject` text NOT NULL,
	`body_html` text NOT NULL,
	`sender_name` text NOT NULL,
	`sender_address` text NOT NULL,
	`delay_ms` integer DEFAULT 1000 NOT NULL,
	`cursor_index` integer DEFAULT 0 NOT NULL,
	`total_count` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`completed_at` text,
	FOREIGN KEY (`generate_job_id`) REFERENCES `generate_jobs`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`smtp_profile_id`) REFERENCES `smtp_profiles`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "send_jobs_channel_check" CHECK("send_jobs"."channel" IN ('email', 'whatsapp')),
	CONSTRAINT "send_jobs_status_check" CHECK("send_jobs"."status" IN ('pending', 'sending', 'paused', 'completed', 'cancelled'))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `smtp_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`host` text NOT NULL,
	`port` integer DEFAULT 587 NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `templates` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`file_path` text NOT NULL,
	`type` text NOT NULL,
	`slots` text DEFAULT '[]' NOT NULL,
	`output_pattern` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	CONSTRAINT "templates_type_check" CHECK("templates"."type" IN ('docx', 'image'))
);

ALTER TABLE `generate_job_recipients` ADD `template_value` text;--> statement-breakpoint
ALTER TABLE `generate_jobs` ADD `template_column` text;--> statement-breakpoint
ALTER TABLE `generate_jobs` ADD `template_assignment` text;--> statement-breakpoint
ALTER TABLE `generate_jobs` ADD `output_pattern` text;
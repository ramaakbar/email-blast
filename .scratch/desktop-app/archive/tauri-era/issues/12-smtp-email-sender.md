# 12: SMTP email sender (lettre)

Type: task
Status: ready-for-agent
Blocked by: 08

## What

Implement SMTP email sending via the `lettre` crate with retry logic.

## Steps

1. Create `src-tauri/src/email/mod.rs` and `src-tauri/src/email/sender.rs`
2. Define:

```rust
pub struct SmtpConfig {
    pub host: String,        // "smtp.gmail.com"
    pub port: u16,           // 587
    pub username: String,
    pub password: String,    // app password
}

pub struct EmailToSend {
    pub from_name: String,
    pub from_address: String,
    pub to_address: String,
    pub subject: String,
    pub body_html: String,
    pub attachment_paths: Vec<String>,
}
```

3. Implement `pub async fn send_email(config: &SmtpConfig, email: &EmailToSend) -> Result<String, SendError>`
4. Algorithm:
   - Build lettre `Message` with `MultiPart::mixed()`:
     - `SinglePart::html(body_html)` for the body
     - `SinglePart::body_from_file(path)` for each attachment
   - Create `AsyncSmtpTransport` with STARTTLS on port 587, provide `Credentials::new(username, password)`
   - Send with 3 retries on transient failures: `tokio::time::sleep` 1s, 2s, 4s between attempts
   - Return SMTP message ID on success
5. Define error enum:

```rust
#[derive(Debug, thiserror::Error)]
pub enum SendError {
    #[error("SMTP connection failed: {0}")]
    ConnectFailed(String),
    #[error("SMTP authentication failed: {0}")]
    AuthFailed(String),
    #[error("SMTP send failed: {0}")]
    SendFailed(String),
}
```

6. Add Tauri plugin permission for outbound network in `src-tauri/capabilities/default.json`

## Acceptance

- `cargo check` passes
- Manual test with real Gmail App Password: `#[ignore]` test that sends to a test address
- Retry logic: 3 attempts with 1s/2s/4s backoff

## Reference

Spec Section 6.4. Crate decision from ticket 01: `lettre` 0.11. Existing CLI: `src/send-email.ts` `sendEmail()` (nodemailer, same Gmail SMTP pattern).

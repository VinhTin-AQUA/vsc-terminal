use crate::{models::settings::Settings, terminal::terminal_settings};

#[tauri::command]
pub async fn get_settings_command() -> Result<Settings, String> {
    let t = terminal_settings::get_settings().await?;
    Ok(t)
}
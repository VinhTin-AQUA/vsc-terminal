use crate::{
    models::settings::Settings,
    terminal::terminal_settings::{get_settings, save_settings},
};

#[tauri::command]
pub async fn get_settings_command() -> Result<Settings, String> {
    let settings = get_settings().await;
    settings
}

#[tauri::command]
pub async fn save_settings_command(settings: Settings) -> Result<bool, String> {
    let settings = save_settings(&settings).await;
    settings
}

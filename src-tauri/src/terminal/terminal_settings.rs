use std::path::{Path, PathBuf};

use tokio::{fs, io::AsyncWriteExt};
use which::which;

use crate::{
    constansts::shell_consts::{LINUX_SHELL_LIST, WINDOWS_SHELL_LIST}, helpers::shell_helper, models::settings::{
        BackgroundType, CursorStyleType, FontFamilyType, Settings, TerminalSettings,
    }
};

const APP_NAME: &str = "vscode-terminal";
const SETTINGS_FILE: &str = "settings.json";

pub async fn get_settings() -> Result<Settings, String> {
    let path = get_settings_path()?;

    if !path.exists() {
        return Ok(default_settings());
    }

    let settings = match fs::read(&path).await {
        Ok(mut data) => simd_json::from_slice(&mut data).unwrap_or_else(|_| default_settings()),
        Err(_) => default_settings(),
    };

    Ok(settings)
}

pub async fn save_settings(settings: &Settings) -> Result<bool, String> {
    let path = get_settings_path()?;

    // create folder if not exists
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)
            .await
            .map_err(|e| format!("Create dir error: {}", e))?;
    }

    let json =
        serde_json::to_string_pretty(settings).map_err(|e| format!("Serialize error: {}", e))?;

    let mut file = fs::File::create(&path)
        .await
        .map_err(|e| format!("File create error: {}", e))?;

    file.write_all(json.as_bytes())
        .await
        .map_err(|e| format!("Write error: {}", e))?;

    file.flush()
        .await
        .map_err(|e| format!("Flush error: {}", e))?;

    Ok(true)
}

fn get_settings_path() -> Result<PathBuf, String> {
    let mut base_dir = dirs::config_dir().ok_or("Cannot determine config directory")?;

    base_dir.push(APP_NAME);

    Ok(base_dir.join(SETTINGS_FILE))
}

fn default_settings() -> Settings {
    Settings {
        app_theme_id: "dark".to_string(),
        default_profile_id: shell_helper::get_default_shell_id(),
        terminal_settings: TerminalSettings {
            cursor_style: CursorStyleType::Bar,
            font_weight: 400,
            font_size: 14,
            letter_spacing: 0,
            font_family: FontFamilyType::JetBrainsMono,
            cursor_width: 1,
            background: BackgroundType::Mica,
        },
    }
}

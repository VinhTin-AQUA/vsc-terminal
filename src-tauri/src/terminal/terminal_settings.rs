use ohmydb::{JsonDB};
use serde::{Deserialize, };

use crate::models::settings::{
    BackgroundType, CursorStyleType, FontFamilyType, Settings, TerminalSettings,
};

const USER_TABLE_NAME: &str = "settings";
const APP_CONFIG_PATH: &str = "data/test.json";

pub async fn get_settings() -> Result<Settings, String> {
    // ! Create a new instance of the `JsonDB` struct
    let mut db = JsonDB::new(APP_CONFIG_PATH).await.unwrap();

    let settings = db
        .find(USER_TABLE_NAME)
        .where_("id")
        .equals("1")
        .run()
        .await
        .ok()
        .unwrap();

    let first = settings.first().unwrap();
    let settings_desirialize: Settings = Settings::deserialize(first).unwrap_or(Settings {
        id: "1".to_string(),
        app_theme_id: "light".to_string(),
        default_profile_id: "cmd".to_string(),
        terminal_settings: TerminalSettings {
            cursor_style: CursorStyleType::Block,
            font_weight: 400,
            font_size: 14,
            letter_spacing: 1,
            font_family: FontFamilyType::JetBrainsMono,
            cursor_width: 2,
            background: BackgroundType::Mica,
        },
    });

    Ok(settings_desirialize)
}

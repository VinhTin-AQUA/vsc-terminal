#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Settings {
    pub app_theme_id: String,
    pub default_profile_id: String,
    pub terminal_settings: TerminalSettings,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TerminalSettings {
    pub cursor_style: CursorStyleType,
    pub font_weight: u32,
    pub font_size: u32,
    pub letter_spacing: i32,
    pub font_family: FontFamilyType,
    pub cursor_width: u8, // 1 -> 10
    pub background: BackgroundType,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub enum FontFamilyType {
    #[serde(rename = "'Courier Prime', monospace")]
    Courier,

    #[serde(rename = "Consolas")]
    Consolas,

    #[serde(rename = "'Ubuntu Mono', monospace")]
    UbuntuMono,

    #[serde(rename = "'Source Code Pro', monospace")]
    SourceCodePro,

    #[serde(rename = "'Fira Code', monospace")]
    FiraCode,

    #[serde(rename = "'JetBrains Mono', monospace")]
    JetBrainsMono,

    #[serde(rename = "'Inconsolata', monospace")]
    Inconsolata,

    #[serde(rename = "'Major Mono Display', monospace")]
    MajorMonoDisplay,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum BackgroundType {
    Transparent,
    Opaque,
    Blurred,
    Mica,
    Acrylic,
    Vibrancy,
}

// Bạn cần định nghĩa thêm nếu chưa có:
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum CursorStyleType {
    Block,
    Underline,
    Bar,
}

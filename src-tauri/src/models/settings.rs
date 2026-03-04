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
    #[serde(rename = "Courier")]
    Courier,

    #[serde(rename = "Consolas")]
    Consolas,

    #[serde(rename = "Monaco")]
    Monaco,

    #[serde(rename = "Menlo")]
    Menlo,

    #[serde(rename = "DejaVu Sans Mono")]
    DejaVuSansMono,

    #[serde(rename = "Ubuntu Mono")]
    UbuntuMono,

    #[serde(rename = "Liberation Mono")]
    LiberationMono,

    #[serde(rename = "Source Code Pro")]
    SourceCodePro,

    #[serde(rename = "Fira Code")]
    FiraCode,

    #[serde(rename = "JetBrains Mono")]
    JetBrainsMono,

    #[serde(rename = "Inconsolata")]
    Inconsolata,

    #[serde(rename = "Cascadia Code")]
    CascadiaCode,

    #[serde(rename = "Terminus")]
    Terminus,
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
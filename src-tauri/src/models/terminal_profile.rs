#[derive(Debug, serde::Serialize)]
pub struct Profile {
    pub id: String,
    pub name: String,
    pub command: String,
}

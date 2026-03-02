use crate::{
    models::terminal_profile::Profile, terminal::terminal_profile::get_available_terminals,
};

#[tauri::command]
pub fn get_available_terminals_command() -> Vec<Profile> {
    let profiles = get_available_terminals();
    profiles
}

mod commands;
mod models;
mod terminal;
mod constansts;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            terminal::manager::init(app.handle().clone());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::terminal_commands::create_terminal,
            commands::terminal_commands::write_terminal,
            commands::terminal_commands::resize_terminal,
            commands::terminal_commands::close_terminal,
            commands::terminal_profile_commands::get_available_terminals_command,
            commands::terminal_settings_commands::get_settings_command,
            commands::terminal_settings_commands::get_settings_command,
            commands::terminal_settings_commands::save_settings_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

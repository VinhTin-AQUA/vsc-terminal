use crate::terminal::manager;

#[tauri::command]
pub fn create_terminal(terminal_id: String) {
    manager::create(terminal_id);
}

#[tauri::command]
pub fn write_terminal(terminal_id: String, data: String) {
    manager::write(terminal_id, data);
}

#[tauri::command]
pub fn resize_terminal(terminal_id: String, cols: u16, rows: u16) {
    manager::resize_terminal(terminal_id, cols, rows);
}

#[tauri::command]
pub fn close_terminal(terminal_id: String) {
    manager::close(terminal_id);
}

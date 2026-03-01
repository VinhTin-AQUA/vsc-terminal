use once_cell::sync::Lazy;
use portable_pty::PtySize;
use std::collections::HashMap;
use std::sync::{Mutex, OnceLock};
use tauri::AppHandle;

use super::session::TerminalSession;

static SESSIONS: Lazy<Mutex<HashMap<String, TerminalSession>>> =
    Lazy::new(|| Mutex::new(HashMap::new()));

static APP_HANDLE: OnceLock<AppHandle> = OnceLock::new();

pub fn init(app: AppHandle) {
    APP_HANDLE.set(app).expect("APP_HANDLE already set");
}

pub fn create(terminal_id: String) {
    let app = APP_HANDLE.get().expect("AppHandle not initialized").clone();
    let session = TerminalSession::new(app, terminal_id.clone());
    SESSIONS.lock().unwrap().insert(terminal_id, session);
}

pub fn write(terminal_id: String, data: String) {
    if let Some(session) = SESSIONS.lock().unwrap().get_mut(&terminal_id) {
        session.write(&data);
    }
}

pub fn close(terminal_id: String) {
    SESSIONS.lock().unwrap().remove(&terminal_id);
}

pub fn resize_terminal(terminal_id: String, cols: u16, rows: u16) {
    if let Some(session) = SESSIONS.lock().unwrap().get_mut(&terminal_id) {
        let _ = session.resize(cols, rows);
    }
}

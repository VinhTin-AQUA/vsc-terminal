use std::path::Path;
use which::which;

use crate::{
    constansts::shell_consts::{LINUX_SHELL_LIST, WINDOWS_SHELL_LIST},
    models::terminal_profile::Profile,
};

pub fn get_available_terminals() -> Vec<Profile> {
    let mut profiles = Vec::new();

    // Helper thêm terminal nếu tồn tại
    let mut add_if_exists = |id: &str, name: &str, cmd: &str| {
        if let Ok(path) = which(cmd) {
            profiles.push(Profile {
                id: id.to_string(),
                name: name.to_string(),
                command: cmd.to_string(),
            });
        } else if Path::new(cmd).exists() {
            profiles.push(Profile {
                id: id.to_string(),
                name: name.to_string(),
                command: cmd.to_string(),
            });
        }
    };

    // =========================
    // Windows
    // =========================
    if cfg!(target_os = "windows") {
        for shell in &WINDOWS_SHELL_LIST {
            add_if_exists(shell.id, shell.name, shell.command);
        }
    }

    // =========================
    // macOS
    // =========================
    // if cfg!(target_os = "macos") {
    //     add_if_exists(
    //         "Terminal",
    //         "/Applications/Terminal.app/Contents/MacOS/Terminal",
    //     );
    //     add_if_exists("iTerm2", "/Applications/iTerm.app/Contents/MacOS/iTerm2");
    //     add_if_exists("zsh", "zsh");
    //     add_if_exists("bash", "bash");
    // }

    // =========================
    // Linux
    // =========================
    if cfg!(target_os = "linux") {
        for shell in &LINUX_SHELL_LIST {
            add_if_exists(shell.id, shell.name, shell.command);
        }
    }

    profiles
}

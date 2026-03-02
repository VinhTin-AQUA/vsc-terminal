use std::path::Path;
use uuid::Uuid;
use which::which;

use crate::models::terminal_profile::Profile;

pub fn get_available_terminals() -> Vec<Profile> {
    let mut profiles = Vec::new();

    // Helper thêm terminal nếu tồn tại
    let mut add_if_exists = |name: &str, cmd: &str| {
        if let Ok(path) = which(cmd) {
            profiles.push(Profile {
                id: name.to_string(),
                name: name.to_string(),
                command: path.to_string_lossy().to_string(),
            });
        } else if Path::new(cmd).exists() {
            profiles.push(Profile {
                id: name.to_string(),
                name: name.to_string(),
                command: cmd.to_string(),
            });
        }
    };

    // =========================
    // Windows
    // =========================
    if cfg!(target_os = "windows") {
        add_if_exists(
            "PowerShell",
            r"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe",
        );
        add_if_exists("Command Prompt", r"C:\Windows\System32\cmd.exe");
        add_if_exists("Windows Terminal", "wt.exe");
        add_if_exists("Git Bash", "bash.exe");
        add_if_exists("WSL", "wsl.exe");
    }

    // =========================
    // macOS
    // =========================
    if cfg!(target_os = "macos") {
        add_if_exists(
            "Terminal",
            "/Applications/Terminal.app/Contents/MacOS/Terminal",
        );
        add_if_exists("iTerm2", "/Applications/iTerm.app/Contents/MacOS/iTerm2");
        add_if_exists("zsh", "zsh");
        add_if_exists("bash", "bash");
    }

    // =========================
    // Linux
    // =========================
    if cfg!(target_os = "linux") {
        add_if_exists("GNOME Terminal", "gnome-terminal");
        add_if_exists("Konsole", "konsole");
        add_if_exists("XTerm", "xterm");
        add_if_exists("Alacritty", "alacritty");
        add_if_exists("Kitty", "kitty");
        add_if_exists("Bash", "bash");
        add_if_exists("Zsh", "zsh");
    }

    profiles
}

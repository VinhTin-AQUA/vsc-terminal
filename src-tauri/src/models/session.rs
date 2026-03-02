use portable_pty::{native_pty_system, CommandBuilder, MasterPty, PtySize};
use std::io::{Read, Write};
use std::{env, thread};
use tauri::{AppHandle, Emitter};

pub struct TerminalSession {
    pub writer: Box<dyn Write + Send>,
    pub master: Box<dyn MasterPty + Send>,
}

impl TerminalSession {
    pub fn new(app: AppHandle, tab_id: String) -> Self {
        let pty_system = native_pty_system();

        let pair = pty_system
            .openpty(PtySize {
                rows: 24,
                cols: 80,
                pixel_width: 0,
                pixel_height: 0,
            })
            .unwrap();

        // #[cfg(target_os = "windows")]
        // let shell = "powershell.exe";

        // #[cfg(not(target_os = "windows"))]
        // let shell = "/usr/bin/zsh";
        // let shell = "/bin/bash";

        let (shell, args) = Self::get_shell_and_args();
        let mut cmd = CommandBuilder::new(shell);

        for arg in args {
            cmd.arg(arg);
        }
        // ===== FIX APPIMAGE ISSUES =====
        #[cfg(not(target_os = "windows"))]
        {
            cmd.env_remove("PYTHONHOME");
            cmd.env_remove("PYTHONPATH");
            cmd.env("TERM", "xterm-256color");
        }

        let _child = pair
            .slave
            .spawn_command(cmd)
            .expect("Failed to spawn shell");

        drop(pair.slave);

        let mut reader = pair.master.try_clone_reader().unwrap();
        let writer = pair.master.take_writer().unwrap();
        let master = pair.master;

        let app_clone = app.clone();
        thread::spawn(move || {
            let mut buf = [0u8; 4096];
            loop {
                match reader.read(&mut buf) {
                    Ok(n) if n > 0 => {
                        let data = String::from_utf8_lossy(&buf[..n]).to_string();
                        let _ = app_clone.emit("terminal-output", (tab_id.clone(), data));
                    }
                    _ => break,
                }
            }
        });

        TerminalSession { writer, master }
    }

    pub fn write(&mut self, data: &str) {
        let final_data = data.to_string();

        if let Err(e) = self.writer.write_all(final_data.as_bytes()) {
            eprintln!("Write error: {:?}", e);
            return;
        }

        // Flush để đảm bảo gửi ngay (quan trọng trên Windows)
        if let Err(e) = self.writer.flush() {
            eprintln!("Flush error: {:?}", e);
        }
    }

    pub fn resize(&mut self, cols: u16, rows: u16) {
        let _ = self.master.resize(PtySize {
            rows,
            cols,
            pixel_width: 0,
            pixel_height: 0,
        });
    }

    pub fn get_default_shell() -> String {
        #[cfg(target_os = "windows")]
        {
            if let Ok(shell) = std::env::var("COMSPEC") {
                return shell;
            }
            return "cmd.exe".to_string();
        }

        #[cfg(target_os = "macos")]
        {
            if let Ok(shell) = std::env::var("SHELL") {
                return shell;
            }
            return "/bin/zsh".to_string();
        }

        #[cfg(all(unix, not(target_os = "macos")))]
        {
            if let Ok(shell) = std::env::var("SHELL") {
                return shell;
            }
            return "/bin/bash".to_string();
        }
    }

    pub fn get_shell_and_args() -> (String, Vec<String>) {
        #[cfg(target_os = "windows")]
        {
            if let Ok(comspec) = std::env::var("COMSPEC") {
                return (comspec, vec![]);
            }
            return ("cmd.exe".to_string(), vec![]);
        }

        #[cfg(target_os = "macos")]
        {
            if let Ok(shell) = std::env::var("SHELL") {
                return (shell, vec!["-l".into(), "-i".into()]);
            }
            return ("/bin/zsh".to_string(), vec!["-l".into(), "-i".into()]);
        }

        #[cfg(all(unix, not(target_os = "macos")))]
        {
            if let Ok(shell) = std::env::var("SHELL") {
                return (shell, vec!["-l".into(), "-i".into()]);
            }
            return ("/bin/bash".to_string(), vec!["-l".into(), "-i".into()]);
        }
    }
}

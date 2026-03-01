use portable_pty::{native_pty_system, CommandBuilder, MasterPty, PtySize};
use std::io::{Read, Write};
use std::thread;
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

        let shell_path = Self::get_default_shell().unwrap_or("".to_string());
        let shell = CommandBuilder::new(shell_path);
        let mut child = pair.slave.spawn_command(shell.clone()).unwrap();

        let mut reader = pair.master.try_clone_reader().unwrap();
        let writer = pair.master.take_writer().unwrap();
        let master = pair.master;

        // Spawn thread đọc output
        let app_clone = app.clone();
        thread::spawn(move || {
            let mut buf = [0u8; 4096];
            loop {
                match reader.read(&mut buf) {
                    Ok(n) if n > 0 => {
                        println!("hehe");
                        let data = String::from_utf8_lossy(&buf[..n]).to_string();
                        app_clone
                            .emit("terminal-output", (tab_id.clone(), data))
                            .unwrap();
                    }
                    _ => break,
                }
            }
        });

        TerminalSession { writer, master }
    }

    pub fn write(&mut self, data: &str) {
        // Xác định newline theo OS
        let newline = if cfg!(windows) { "\r\n" } else { "\n" };

        // Nếu data đã có newline rồi thì không thêm nữa
        let mut final_data = data.to_string();

        // if !final_data.ends_with('\n') {
        //     final_data.push_str(newline);
        // }

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
        // resize xử lý ở manager (cần giữ master handle nếu muốn chuẩn hơn)
    }

    pub fn get_default_shell() -> Option<String> {
        #[cfg(target_os = "windows")]
        {
            // Ưu tiên COMSPEC
            if let Ok(shell) = env::var("COMSPEC") {
                return Some(shell);
            }

            // Fallback phổ biến
            if let Ok(system_root) = env::var("SystemRoot") {
                return Some(format!(r"{}\System32\cmd.exe", system_root));
            }

            None
        }

        #[cfg(not(target_os = "windows"))]
        {
            // Ưu tiên SHELL

            use std::env;
            if let Ok(shell) = env::var("SHELL") {
                return Some(shell);
            }

            // Fallback an toàn
            Some("/bin/sh".to_string())
        }
    }
}

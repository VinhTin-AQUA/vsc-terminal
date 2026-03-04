use crate::constansts::shell_consts::{LINUX_SHELL_LIST, WINDOWS_SHELL_LIST};

pub fn get_default_shell_id() -> String {
    #[cfg(target_os = "windows")]
    {
        if let Ok(shell) = std::env::var("COMSPEC") {
            let r = WINDOWS_SHELL_LIST
                .iter()
                .find(|shell| shell.id == shell)
                .map(|shell| shell.command.to_string())
                .unwrap_or("bash".to_string());

            return r;
        }
        return "cmd".to_string();
    }

    // #[cfg(target_os = "macos")]
    // {
    //     if let Ok(shell) = std::env::var("SHELL") {
    //         return shell;
    //     }
    //     return "/bin/zsh".to_string();
    // }

    #[cfg(all(unix, not(target_os = "macos")))]
    {
        if let Ok(shell_name) = std::env::var("SHELL") {
            let r = LINUX_SHELL_LIST
                .iter()
                .find(|shell: &&crate::constansts::shell_consts::ShellConfig| {
                    shell.id == shell_name
                })
                .map(|shell| shell.command.to_string())
                .unwrap_or("bash".to_string());

            return r;
        }
        return "bash".to_string();
    }
}

pub struct ShellConfig {
    pub id: &'static str,
    pub name: &'static str,
    pub command: &'static str,
}

pub struct ShellConsts {
    pub cmd: ShellConfig,
    pub powershell: ShellConfig,

    pub zsh: ShellConfig,
    pub bash: ShellConfig,
}

pub const SHELL_CONSTS: ShellConsts = ShellConsts {
    cmd: ShellConfig {
        id: "cmd",
        name: "Command Prompt",
        command: r"C:\Windows\System32\cmd.exe",
    },

    powershell: ShellConfig {
        id: "powershell",
        name: "PowerShell",
        command: r"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe",
    },

    zsh: ShellConfig {
        id: "zsh",
        name: "Zsh",
        command: "/bin/zsh",
    },
    bash: ShellConfig {
        id: "bash",
        name: "Bash",
        command: "/bin/bash",
    },
};

pub const WINDOWS_SHELL_LIST: [ShellConfig; 2] = [
    SHELL_CONSTS.cmd,
    SHELL_CONSTS.powershell,
];

pub const LINUX_SHELL_LIST: [ShellConfig; 2] = [
    SHELL_CONSTS.zsh,
    SHELL_CONSTS.bash,
];

// linux command: "/bin/zsh" | "/usr/bin/zsh" | "/usr/bin/gnome-terminal"

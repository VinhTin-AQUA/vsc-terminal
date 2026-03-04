pub struct ShellConfig {
    pub id: &'static str,
    pub name: &'static str,
    pub command: &'static str,
}

pub struct ShellConsts {
    pub cmd: ShellConfig,
    pub powershell: ShellConfig,
    pub gitbash: ShellConfig,
    pub wsl: ShellConfig,

    pub gnome_terminal: ShellConfig,
    pub konsole: ShellConfig,
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

    gitbash: ShellConfig {
        id: "gitbash",
        name: "Git Bash",
        command: "bash.exe",
    },
    wsl: ShellConfig {
        id: "wsl",
        name: "WSL",
        command: "wsl.exe",
    },

    gnome_terminal: ShellConfig {
        id: "gnome-terminal",
        name: "GNOME Terminal",
        command: "gnome-terminal",
    },
    konsole: ShellConfig {
        id: "konsole",
        name: "Konsole",
        command: "konsole",
    },
    zsh: ShellConfig {
        id: "zsh",
        name: "Zsh",
        command: "zsh",
    },
    bash: ShellConfig {
        id: "bash",
        name: "Bash",
        command: "bash",
    },
};

pub const WINDOWS_SHELL_LIST: [ShellConfig; 4] = [
    SHELL_CONSTS.cmd,
    SHELL_CONSTS.powershell,
    SHELL_CONSTS.gitbash,
    SHELL_CONSTS.wsl,
];

pub const LINUX_SHELL_LIST: [ShellConfig; 4] = [
    SHELL_CONSTS.gnome_terminal,
    SHELL_CONSTS.konsole,
    SHELL_CONSTS.zsh,
    SHELL_CONSTS.bash,
];

// linux command: "/bin/zsh" | "/usr/bin/zsh" | "/usr/bin/gnome-terminal"

package util

import (
	"os"

	"golang.org/x/term"
)

// IsTerminal returns true if the current process is running in an interactive terminal.
func IsTerminal() bool {
	return term.IsTerminal(int(os.Stdin.Fd()))
}

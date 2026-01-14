package agent

import (
	"github.com/ptone/scion-agent/pkg/runtime"
)

// ResolveRuntime determines the runtime to use for an agent.
// It prioritizes the explicit profile, then saved profile, then saved runtime.
// Finally it uses the runtime system's default detection.
func ResolveRuntime(grovePath, agentName, profileFlag string) runtime.Runtime {
	effectiveProfile := profileFlag
	if effectiveProfile == "" {
		// If no profile flag, check if we have a saved profile for this agent
		effectiveProfile = GetSavedProfile(agentName, grovePath)
	}

	effectiveRuntime := effectiveProfile
	if effectiveRuntime == "" {
		// If still no profile, we'll let GetRuntime handle auto-detection
		// but we might want to check for saved runtime as fallback
		effectiveRuntime = GetSavedRuntime(agentName, grovePath)
	}

	return runtime.GetRuntime(grovePath, effectiveRuntime)
}

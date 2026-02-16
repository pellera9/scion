// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package config

import (
	"os"
	"path/filepath"
	"testing"
)

func TestInitProject_CreatesDefaultAgnosticTemplate(t *testing.T) {
	// Create a temporary directory for the project
	tempDir, err := os.MkdirTemp("", "scion-init-test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(tempDir)

	// Run InitProject
	err = InitProject(tempDir, GetMockHarnesses())
	if err != nil {
		t.Fatalf("InitProject failed: %v", err)
	}

	// Verify that templates/default exists (agnostic template)
	defaultDir := filepath.Join(tempDir, "templates", "default")
	if _, err := os.Stat(defaultDir); os.IsNotExist(err) {
		t.Errorf("Expected templates/default to be created, but it was not")
	}

	// Verify agnostic template files exist
	expectedFiles := []string{"scion-agent.yaml", "agents.md", "system-prompt.md"}
	for _, f := range expectedFiles {
		path := filepath.Join(defaultDir, f)
		if _, err := os.Stat(path); os.IsNotExist(err) {
			t.Errorf("Expected %s to be created in default template, but it was not", f)
		}
	}

	// Verify per-harness templates were NOT created
	for _, name := range []string{"gemini", "claude", "opencode", "codex"} {
		perHarnessDir := filepath.Join(tempDir, "templates", name)
		if _, err := os.Stat(perHarnessDir); !os.IsNotExist(err) {
			t.Errorf("Expected per-harness template %s to NOT be created at project level", name)
		}
	}
}
